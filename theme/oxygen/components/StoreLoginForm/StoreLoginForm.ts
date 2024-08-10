import { AppConfig } from "../../factories/AppConfig"
import { ButtonElement } from "../../factories/ButtonElement"
import { BlockManager } from "../../helpers/BlockManager"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, PluncElementInterface, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { AppKeyInputField } from "../AppKeyInputField/AppKeyInputField"
import { SecretKeyInputField } from "../SecretKeyInputField/SecretKeyInputField"

/**
 * These are the different states of `StoreLoginForm` component. These states
 * are fed into the component's StateManager.
 */
type StoreLoginFormState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    appkey: string | null
    secretkey: string | null
    state: StoreLoginFormState
    login:(button: PluncElementInterface<HTMLButtonElement>)=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface StoreLoginForm {
    /**
     * Allows parent component to explicitly render the 
     * `StoreLoginForm` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<StoreLoginForm>('StoreLoginForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    AppKeyInputField: AppKeyInputField,
    SecretKeyInputField: SecretKeyInputField,
    BlockManager: BlockManager,
    URLHelper: URLHelper,
    HttpRequestHelper: HttpRequestHelper,
    ButtonElement: ButtonElement,
    AppConfig: AppConfig
)=>{
    const APP_CONFIG = new AppConfig
    const SubmitButtonState = new BlockManager('/BlockManager/SendButtonBlock/')
    const validateButtonState = () => {
        if ($scope.appkey !== null && $scope.secretkey !== null) {
            SubmitButtonState.__toReady()
        }
    }

    const LoginFormMessage = new BlockManager('/BlockManager/LoginFormMessage/')


    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
        $scope.appkey = URLHelper.getParamValue('app_key')
        $scope.secretkey = null
        await AppKeyInputField.__render($scope.appkey)
        await SecretKeyInputField.__render()
        AppKeyInputField.__whenInputProvided((value, valid)=>{
            if (valid) {
                $scope.appkey = value
                validateButtonState()
            }
        })
        SecretKeyInputField.__whenInputProvided((value, valid)=>{
            if (valid) {
                $scope.secretkey = value
                validateButtonState()
            }
        })
    })

    $scope.login = (button) => {
        const loginButton = new ButtonElement(button)
        loginButton.__freeze()
        HttpRequestHelper.__post<Rehearsal.Endpoints.Yotpo.Login>({
            __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
            __path: '/:tenantId/rehearsal/yotpo/token/generate',
            __params: { tenantId: APP_CONFIG.__getTenantId() },
            __data: {
                app_key: $scope.appkey,
                secret_key: $scope.secretkey
            },
            __doNotPassRequesterToken: true
        }).then(response => {
            localStorage.setItem(`${$scope.appkey}.token`,response.token)
            location.href = '/collections.html?app_key='+$scope.appkey
        }).catch(error => {
            loginButton.__defrost()
            LoginFormMessage.__toError()
        })
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