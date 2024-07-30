import { BlockManager } from "../../helpers/BlockManager"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
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
    state: StoreLoginFormState
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
    BlockManager: BlockManager
)=>{
    const SubmitButtonState = new BlockManager('/BlockManager/SendButtonBlock/')
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
        await AppKeyInputField.__render()
        await SecretKeyInputField.__render()
        AppKeyInputField.__whenInputProvided((value, valid)=>{
            console.log({value,valid})
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