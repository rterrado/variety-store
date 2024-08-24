import { BlockManager } from "../../helpers/BlockManager"
import { ModalManager } from "../../helpers/ModalManager"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { YotpoAPI } from "../../interfaces/yotpo/interface"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CurrencySymbolsLibrary } from "../../services/variety-store/CurrencySymbolsLibrary"
import { StarRatingsWidget } from "../../services/variety-store/StarRatingsWidget"
import { YotpoAPIClient } from "../../services/yotpo/YotpoAPIClient"

/**
 * These are the different states of `ViewProductModal` component. These states
 * are fed into the component's StateManager.
 */
type ViewProductModalState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: ViewProductModalState
    product: YotpoAPI.Products.ListItem
    bottomline: {
        totalReviews: number
        averageScore: number
    }
    printer:{
        price:()=>string
    }
    conditionals: {
        hasTag:()=>boolean
        withoutTag:()=>boolean
    }
    currencies: Array<{
        currency: string,
        abbreviation: string,
        symbol: string
    }>
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface ViewProductModal {
    /**
     * Allows parent component to explicitly render the 
     * `ViewProductModal` component.
     */
    __render:(product: YotpoAPI.Products.ListItem)=>Promise<void>
}


/** Component declarations */
app.component<ViewProductModal>('ViewProductModal',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    ModalManager: ModalManager,
    BlockManager: BlockManager,
    CurrencySymbolsLibrary: CurrencySymbolsLibrary,
    YotpoAPIClient: YotpoAPIClient,
    URLHelper: URLHelper,
    StarRatingsWidget: StarRatingsWidget
)=>{
    const ModalCtrl = ModalManager.__bind('/ModalManager/Dialog/')
    const Component = new BlockManager('/BlockManager/Content/')
    ModalCtrl.__events().__whenOpened(async ()=>{
        await Component.__toLoading()
        const appkey = URLHelper.getParamValue('app_key')
        setTimeout(async ()=>{
            await Component.__toActive()
            YotpoAPIClient.__getProductBottomline(appkey, $scope.product.external_id)
            .then(response=>{
                const totalReviews = response.response.bottomline.total_reviews
                StarRatingsWidget.__ratingsFull(
                    'view_product_star_rating',
                    response.response.bottomline.total_reviews,
                    response.response.bottomline.average_score,
                    {displayCount: false}
                )
                const grammar = (totalReviews === 1) ? 'Review' : 'Reviews'
                document.getElementById('view_product_review_count').innerHTML = `${totalReviews} ${grammar}`
            })
            .catch(error=>{})
        },2000)
    })
    $scope.printer = {
        price: ()=>{
            const results = $scope.currencies.filter(dataitem => dataitem.abbreviation === $scope.product.currency)
            const price = $scope.product.price
            return `${results[0]?.symbol ?? ''}${parseFloat(price.toFixed(2))}`
        }
    }
    const hasTag = () => {
        if (!('custom_properties' in $scope.product)) return false 
        if ($scope.product.custom_properties === null) return false 
        if (!('review_form_tag' in $scope.product.custom_properties)) return false
        return true
    }
    $scope.conditionals = {
        hasTag: () => {
            return hasTag()
        },
        withoutTag: () => {
            return !hasTag()
        }
    }
    CurrencySymbolsLibrary.get(async (data)=>{
        $scope.currencies = data
        await StateManager.__switch('active')
    })
    return {
        __render:(product)=>{
            $scope.product = product
            return new Promise(async (resolve,reject)=>{
                ModalCtrl.__open()
                resolve(null)
            })
        }
    }
})