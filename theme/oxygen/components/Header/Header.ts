import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { URLHelper } from "../../services/URLHelper"
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
    state: HeaderState,
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
    URLHelper: URLHelper
)=>{
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
        await PaginationControl.__render()
        await ProductSearchBar.__render()
        YotpoAPIClient.__getAccountDetails(URLHelper.getParamValue('app_key'))
        .then(response=>{
            document.getElementById('header_store_name').innerHTML = response.account_settings.store_name
        })
        .catch(error=>console.error(error))
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