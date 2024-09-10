import { InputElement } from "../../factories/InputElement"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, BlockAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"

/**
 * These are the different states of `EmailInputField` component. These states
 * are fed into the component's StateManager.
 */
type EmailInputFieldState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: EmailInputFieldState,
    emailAddress: string,
    validate:(blockName:string)=>boolean
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface EmailInputField {
    /**
     * Allows parent component to explicitly render the 
     * `EmailInputField` component.
     */
    __render:()=>Promise<void>

    __getValue:(callback:(email: string | null) => void)=>void
}


/** Component declarations */
app.component<EmailInputField>('EmailInputField',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    $block: BlockAPI,
    InputElement: InputElement
)=>{
    $scope.emailAddress = null

    const isValidEmail=(emailAddress:string)=>{
        if (emailAddress===null)    return false 
        if (emailAddress.length<5)  return false 
        if (emailAddress.length>64) return false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailAddress)
    }

    $scope.validate=(blockName:string)=>{
        const inputHandler = new InputElement(blockName,$block)
        if (isValidEmail($scope.emailAddress)) {
            inputHandler.__removeError()
            return true
        }
        inputHandler.__showError('Sorry, the email address is invalid.')
        return false
    }

    const getBlockName = () => {
        return document.getElementById('EIFieldCom').querySelector('fieldset').getAttribute('plunc-block')
    }

    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        },
        __getValue:(callback)=>{
            if (!$scope.validate(getBlockName())) {
                callback(null)
                return
            }
            callback($scope.emailAddress)
        }
    }
})