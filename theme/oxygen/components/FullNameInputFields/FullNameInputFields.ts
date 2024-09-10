import { InputElement } from "../../factories/InputElement"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, BlockAPI, PatchAPI, PluncElementInterface, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"

/**
 * These are the different states of `FullNameInputFields` component. These states
 * are fed into the component's StateManager.
 */
type FullNameInputFieldsState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: FullNameInputFieldsState
    validate:(blockName: string)=>void
    firstName: string
    lastName: string
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface FullNameInputFields {
    /**
     * Allows parent component to explicitly render the 
     * `FullNameInputFields` component.
     */
    __render:()=>Promise<void>

    __getValues:(callback:(firstName:string|null, lastName: string|null)=>void)=>void
}


/** Component declarations */
app.component<FullNameInputFields>('FullNameInputFields',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    $block: BlockAPI,
    InputElement: InputElement
)=>{
    const validateName = (name:string) => {
        const validNamesRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/
        if (!validNamesRegex.test(name)) return false
        if (name.length<2||name.length>32) return false 
        return true
    }

    const printErrorMessage=(message:string)=>{
        $block('/FNIF/Message',(block: PluncElementInterface<HTMLDivElement>)=>{
            block.$element.innerHTML = message
        })
    }

    const EVENTS = {
        __onUpdateEvent: ()=>{}
    }
    const FNIFBlockNames = []
    let areNamesValid = false
    $scope.validate=(blockName)=>{
        if (!FNIFBlockNames.includes(blockName)) FNIFBlockNames.push(blockName)
        if ($scope.firstName.trim()!==''&&$scope.lastName.trim()!=='') {
            FNIFBlockNames.forEach(name=>{
                const fieldset = new InputElement(name,$block)
                if (!validateName($scope.firstName)) {
                    fieldset.__showError('',false)
                    printErrorMessage('First name is invalid')
                    return
                }
                if (!validateName($scope.lastName)) {
                    fieldset.__showError('',false)
                    printErrorMessage('Last name is invalid')
                    return
                }
                fieldset.__removeError()
                printErrorMessage('')
                areNamesValid = true
            })
        }
        if (areNamesValid) {
            EVENTS.__onUpdateEvent()
        }
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
        __getValues:(callback)=>{
            if ($scope.firstName.trim() === '' || $scope.lastName.trim() ==='') {
                printErrorMessage('First name and last name must be valid.')
                callback(null, null)
                return
            }

            if (!validateName($scope.firstName) ) {
                printErrorMessage('First name is invalid')
                callback(null, null)
                return 
            }

            if (!validateName($scope.lastName)) {
                printErrorMessage('Last name is invalid')
                callback(null, null)
                return 
            }

            callback(
                $scope.firstName.trim(), 
                $scope.lastName.trim() 
            )
        }
    }
})