import { AppConfig } from "../../factories/AppConfig"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { YotpoAPI } from "../../interfaces/yotpo/interface"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CartManager } from "../../services/variety-store/CartManager"
import { CurrencySymbolsLibrary } from "../../services/variety-store/CurrencySymbolsLibrary"
import { ListingService } from "../../services/variety-store/ListingService"
import { ProductBottomlineService } from "../../services/variety-store/ProductBottomlineService"
import { StarRatingsWidget } from "../../services/variety-store/StarRatingsWidget"
import { ViewProductModal } from "../ViewProductModal/ViewProductModal"

/**
 * These are the different states of `ProductList` component. These states
 * are fed into the component's StateManager.
 */
type ProductListState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    appkey: string
    state: ProductListState,
    inventory: Array<YotpoAPI.Products.ListItem>
    products: Array<YotpoAPI.Products.ListItem>
    page: number
    currencies: Array<{
        currency: string,
        abbreviation: string,
        symbol: string
    }>
    printer:{
        price:(product:YotpoAPI.Products.ListItem)=>string
    }
    conditionals: {
        hasTag:(product:YotpoAPI.Products.ListItem)=>boolean
    }
    ViewSingleProduct:(index: number)=>void
    AddToCart:(index: number)=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface ProductList {
    /**
     * Allows parent component to explicitly render the 
     * `ProductList` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<ProductList>('ProductList',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    URLHelper: URLHelper,
    HttpRequestHelper: HttpRequestHelper,
    AppConfig: AppConfig,
    CurrencySymbolsLibrary: CurrencySymbolsLibrary,
    ListingService: ListingService,
    ViewProductModal: ViewProductModal,
    ProductBottomlineService: ProductBottomlineService,
    StarRatingsWidget: StarRatingsWidget,
    CartManager: CartManager
)=>{
    const APP_CONFIG = new AppConfig
    const getProducts = (appkey: string, pagetoken: string): Promise<Rehearsal.Endpoints.Yotpo.Products.Get.All['response']> => {
        return new Promise (async (resolve, reject) => {
            try {
                const response = await HttpRequestHelper.__get<Rehearsal.Endpoints.Yotpo.Products.Get.All>({
                    __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
                    __path: '/:tenantId/rehearsal/yotpo/products/get/all?next=:next_page_token',
                    __params: { next_page_token: pagetoken, tenantId: APP_CONFIG.__getTenantId() },
                    __data: {}
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }
    const searchProducts = (appkey: string, ids: string): Promise<Rehearsal.Endpoints.Yotpo.Products.Get.ByIds['response']> => {
        return new Promise (async (resolve, reject) => {
            try {
                const response = await HttpRequestHelper.__get<Rehearsal.Endpoints.Yotpo.Products.Get.ByIds>({
                    __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
                    __path: '/:tenantId/rehearsal/yotpo/products/search?ids=:ids',
                    __params: { tenantId: APP_CONFIG.__getTenantId(), ids: ids},
                    __data: {}
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const RenderStarRatingsWidget = () => {
        setTimeout(()=>{
            $scope.products.forEach(product=>{
                ProductBottomlineService.get($scope.appkey, product.external_id)
                .then(bottomline => {
                    StarRatingsWidget.__ratingsFull(
                        `product_list_star_rating_${product.external_id}`,
                        bottomline.totalReviews,
                        bottomline.averageScore,
                        {displayCount: true}
                    )
                })
                .catch(error => console.error(error))
            })
        },2000)
    }

    $scope.products = []
    const UpdateProductListing = (page: number) => {
        $scope.products = []
        for (let i = 0; i < (page * 9); i++) {
            if ($scope.inventory[i] !== undefined && i >= ((page * 9) - 9)) {
                $scope.products.push($scope.inventory[i])
            }
        }
    }
    $scope.printer = {
        price: (product)=>{
            const results = $scope.currencies.filter(dataitem => dataitem.abbreviation === product.currency)
            const price = product.price
            return `${results[0]?.symbol ?? ''}${parseFloat(price.toFixed(2))}`
        }
    }
    $scope.conditionals = {
        hasTag: (product) => {
            if (!('custom_properties' in product)) return false 
            if (product.custom_properties === null) return false 
            if (!('review_form_tag' in product.custom_properties)) return false
            return true
        }
    }

    /**
     * Views the product by activating the SingleProductView
     * component.
     */
    $scope.ViewSingleProduct = async (index) => {
        ViewProductModal.__render($scope.products[index])
    }

    /**
     * Add a product to cart
     */
    $scope.AddToCart = (index) => {
        const product = $scope.products[index]
        const results = $scope.currencies.filter(dataitem => dataitem.abbreviation === product.currency)
        CartManager.__addProductToCart({
            extid: product.external_id,
            name: product.name,
            url: product.url,
            imgsrc: product.image_url,
            group: product.group_name,
            price: product.price,
            currency: {
                value: product.currency,
                symbol: results[0].symbol
            }
        })
    }

    /**
     * This is triggered when user clicks on the 
     * next page button in the header
     */
    ListingService.__whenNextPageRequested(async ()=>{
        if (StateManager.__getCurrentState() === 'loading') return
        await StateManager.__switch('loading')
        setTimeout(async ()=>{
            $scope.page++
            UpdateProductListing($scope.page)
            await StateManager.__switch('active')
            RenderStarRatingsWidget()
        },3000)
    })

    /**
     * This is triggered when user clicks on the
     * previous page button in the header
     */
    ListingService.__whenPreviousPageRequested(async ()=>{
        if ($scope.page === 1) return
        if (StateManager.__getCurrentState() === 'loading') return
        await StateManager.__switch('loading')
        setTimeout(async ()=>{
            $scope.page--
            UpdateProductListing($scope.page)
            await StateManager.__switch('active')
            RenderStarRatingsWidget()
        },3000)
    })

    /**
     * This is triggered when user inputs any keyword
     * in the search bar in the header
     */
    ListingService.__whenSearchListingRequested(async (keyword)=>{
        if (keyword.trim() === '') {
            UpdateProductListing($scope.page)
            await StateManager.__switch('active')
            RenderStarRatingsWidget()
            return
        }
        if (StateManager.__getCurrentState() === 'loading') return
        await StateManager.__switch('loading')
        const ids = [] 
        const items = keyword.includes(' ') ? keyword.split(' ') : keyword.split(',')
        for (let i = 0; i < items.length; i++) {
            if (i < 9) ids.push(items[i])
        }
        
        const data = await searchProducts($scope.appkey, ids.join(','))
        $scope.products = data.products
        await StateManager.__switch('active')
        RenderStarRatingsWidget()
    })

    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        $scope.appkey = URLHelper.getParamValue('app_key')
        if ($scope.appkey === null) return
        const data = await getProducts($scope.appkey, '')
        $scope.inventory = data.products.filter(product => product.external_id !== 'yotpo_site_reviews')
        $scope.page = 1
        UpdateProductListing(1)
        CurrencySymbolsLibrary.get(async (data)=>{
            $scope.currencies = data
            await StateManager.__switch('active')
            RenderStarRatingsWidget()
        })
    })
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        }
    }
})