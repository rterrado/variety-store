import { StateManager } from "../../helpers/StateManager"
import { ThemeSelectorPlugin } from "../../helpers/plugins/ThemeSelectorPlugin"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { URLHelper } from "../../services/URLHelper"
import { ViewOptionService } from "../../services/ViewOptionService"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { YotpoAPIClient } from "../../services/yotpo/YotpoAPIClient"
import { PaginationControl } from "../PaginationControl/PaginationControl"
import { ProductSearchBar } from "../ProductSearchBar/ProductSearchBar"

/**
 * These are the different states of `Header` component. These states
 * are fed into the component's StateManager.
 */
type HeaderState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: HeaderState
    views: HeaderViewOptions
    goToCollections: ()=>void
    logout: ()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface Header {
    /**
     * Allows parent component to explicitly render the 
     * `Header` component.
     */
    __render:()=>Promise<void>
}

export type HeaderViewOptions = {
    StoreNameView: boolean
    PaginationControl: boolean
    SearchBar: boolean
    RightSideBar: boolean
    CollectionLink: boolean
    LogOffButton: boolean
}


/** Component declarations */
app.component<Header>('Header',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    PaginationControl: PaginationControl,
    ProductSearchBar: ProductSearchBar,
    YotpoAPIClient: YotpoAPIClient,
    URLHelper: URLHelper,
    ViewOptionService: ViewOptionService,
    ThemeSelectorPlugin: ThemeSelectorPlugin
)=>{
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        $scope.views = ViewOptionService.get<HeaderViewOptions>()
        await StateManager.__switch('active')
        if ($scope.views.PaginationControl) {
            await PaginationControl.__render()
        }
        if ($scope.views.SearchBar) {
            await ProductSearchBar.__render()
        }
        if ($scope.views.StoreNameView) {
            YotpoAPIClient.__getAccountDetails(URLHelper.getParamValue('app_key'))
            .then(response=>{
                document.getElementById('header_store_name').innerHTML = response.account_settings.store_name
            })
            .catch(error=>console.error(error))
        }
    })
    $scope.goToCollections = () => {
        const appkey = URLHelper.getParamValue('app_key')
        location.href = 'collections.html?app_key='+appkey
    }
    $scope.logout = () => {
        const appkey = URLHelper.getParamValue('app_key')
        localStorage.removeItem(`${appkey}.token`)
        location.href = 'login.html'
    }
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        }
    }
})