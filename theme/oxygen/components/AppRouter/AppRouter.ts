import { AppConfig } from "../../factories/AppConfig"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, PluncAppInstance, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { ErrorDispatchReport, PageErrorManager } from "../../services/events/PageErrorManager"

/** States of the component */
type RouterState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: RouterState
    error: ErrorDispatchReport
}

/** Exportables */
export interface AppRouter {
    
}

/** Component declarations */
app.component<AppRouter>('AppRouter',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    $app: ApplicationAPI,
    StateManager: StateManager,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    HttpRequestHelper: HttpRequestHelper,
    AppConfig: AppConfig
)=>{
    const APP_CONFIG = new AppConfig
    $scope.state = 'loading'
    const getParamValue = (key: string) => {
        const params = new URLSearchParams(window.location.search)
        const value = params.get(key)
        return value !== null ? value : null
    }
    const validateRequesterToken = (appkey: string): Promise<boolean> => {
        return new Promise (async (resolve, reject)=>{
            try {
                const token = localStorage.getItem(`${appkey}.token`)
                if (token === null) {
                    throw new Error('Store token not found')
                }
                const response = await HttpRequestHelper.__get<Rehearsal.Endpoints.Yotpo.Refresh>({
                    __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
                    __path: '/:tenantId/identity-authority/yotpo/token/refresh',
                    __params: { tenantId: APP_CONFIG.__getTenantId() }
                })
                localStorage.setItem(`${appkey}.token`,response.token)
                resolve(true)
            } catch (error) {
                console.error(error)
                resolve(false)
            }
        })
    }
    const ErrorMessage = {
        missingParams: 'There appears to be missing key and value parameters in your request.'
    }
    
    /**
     * Apply your page activation logic here
     */
    $app.ready(async ()=>{
        setTimeout(async ()=>{
            if (!PageErrorManager.__hasRenderClearance()) {
                $scope.error = PageErrorManager.__getReport()
                await StateManager.__switch('error')
                return
            }
            if (location.href.includes('product.html')) {
                const appKey = getParamValue('app_key')
                const productId = getParamValue('product_id')
                if (appKey === null || productId === null) {
                    $scope.error = {
                        code: 400,
                        message: ErrorMessage.missingParams,
                        dispatcher: 'AppRouter'
                    }
                    await StateManager.__switch('error')
                    return
                }
            }
            if (location.href.includes('collections.html')) {
                const appKey = getParamValue('app_key')
                if (appKey === null) {
                    $scope.error = {
                        code: 400,
                        message: ErrorMessage.missingParams,
                        dispatcher: 'AppRouter'
                    }
                    await StateManager.__switch('error')
                    return
                }
                if (!(await validateRequesterToken(appKey))) {
                    location.href = '/login.html?app_key='+appKey
                    return
                }
                (function e(){
                    var e=document.createElement("script");
                    e.type="text/javascript",
                    e.async=true,
                    e.src="//staticw2.yotpo.com/"+appKey+"/widget.js";
                    var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}
                )();
            }
            await ActivatePage()
        },3000)
    })

    /**
     * @NOTE
     * Activation executes in this specific order: 
     * - Setting the state to active
     * - Patching the component 
     * - Dispatching the Page activation event for other 
     * components to catch on
     */
    const ActivatePage = async () => {
        await StateManager.__switch('active');
        PageActivationManager.__dispatch()
    }

    return {}
})