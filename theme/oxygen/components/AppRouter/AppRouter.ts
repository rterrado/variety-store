import { AppConfig } from "../../factories/AppConfig"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, PluncAppInstance, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { ViewOptionService } from "../../services/ViewOptionService"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { ErrorDispatchReport, PageErrorManager } from "../../services/events/PageErrorManager"
import { OrderServices } from "../../services/variety-store/OrderServices"
import { HeaderViewOptions } from "../Header/Header"

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
    AppConfig: AppConfig,
    ViewOptionService: ViewOptionService,
    OrderServices: OrderServices
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
    const runRefreshTokenJob = (appkey: string) => {
        const repeatevery = 1000 * 60 * 7
        setInterval(()=>{
            validateRequesterToken(appkey)
        },repeatevery)
    }
    const ErrorMessage = {
        missingParams: 'There appears to be missing key and value parameters in your request.',
        recordNotFound: 'We cannot find what you are looking for.'
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
            if (location.href.includes('collections.html')) {
                ViewOptionService.set<HeaderViewOptions>({
                    StoreNameView: true,
                    PaginationControl: true,
                    SearchBar: true,
                    RightSideBar: false,
                    CollectionLink: false,
                    LogOffButton: true
                })
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
                    location.href = 'login.html?app_key='+appKey
                    return
                }
                runRefreshTokenJob(appKey)
            }
            if (location.href.includes('checkout.html')) {
                ViewOptionService.set<HeaderViewOptions>({
                    StoreNameView: true,
                    PaginationControl: false,
                    SearchBar: false,
                    RightSideBar: true,
                    CollectionLink: true,
                    LogOffButton: true
                })
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
                    location.href = 'login.html?app_key='+appKey
                    return
                }
                runRefreshTokenJob(appKey)
            }
            if (location.href.includes('confirmation.html')) {
                ViewOptionService.set<HeaderViewOptions>({
                    StoreNameView: false,
                    PaginationControl: false,
                    SearchBar: false,
                    RightSideBar: true,
                    CollectionLink: false,
                    LogOffButton: false
                })
                const referenceId = getParamValue('id')
                if (referenceId === null) {
                    $scope.error = {
                        code: 400,
                        message: ErrorMessage.missingParams,
                        dispatcher: 'AppRouter'
                    }
                    await StateManager.__switch('error')
                    return
                }
                OrderServices.__getOrderByReferenceId(referenceId, async (data)=>{
                    if (data instanceof Error) {
                        $scope.error = {
                            code: 404,
                            message: ErrorMessage.recordNotFound,
                            dispatcher: 'AppRouter'
                        }
                        await StateManager.__switch('error')
                        return
                    }
                    await ActivatePage()
                })
                return
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