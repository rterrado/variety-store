import { BinaryState } from "../../factories/BinaryState"
import { CallbackQueue } from "../../factories/CallbackQueue"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"

/**
 * These are the different states of `SecretKeyInputField` component. These states
 * are fed into the component's StateManager.
 */
type SecretKeyInputFieldState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: SecretKeyInputFieldState,
    value: string,
    validate:()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface SecretKeyInputField {
    /**
     * Allows parent component to explicitly render the 
     * `SecretKeyInputField` component.
     */
    __render:()=>Promise<void>
    __whenInputProvided:(callback:(value:string, valid: boolean)=>void)=>void
}


/** Component declarations */
app.component<SecretKeyInputField>('SecretKeyInputField',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CallbackQueue: CallbackQueue,
    BinaryState: BinaryState
)=>{
    const CallbackWhenInputProvided = new CallbackQueue
    const IsValidInput = new BinaryState
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })
    $scope.validate = () => {
        IsValidInput.set($scope.value !== null && $scope.value.trim() !== '')
        CallbackWhenInputProvided.withdraw().forEach(callback=>{
            callback($scope.value, IsValidInput.true())
        })
    }
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        },
        __whenInputProvided:(callback)=>{
            CallbackWhenInputProvided.add(callback)
        }
    }
})