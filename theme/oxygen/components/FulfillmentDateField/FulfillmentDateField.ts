import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CheckoutService } from "../../services/variety-store/CheckoutService"

/**
 * These are the different states of `FulfillmentDateField` component. These states
 * are fed into the component's StateManager.
 */
type FulfillmentDateFieldState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: FulfillmentDateFieldState
    set1DayafterOrderDate: boolean
    value: number
    isoDate: string
    daysAfterOrderDate: number
    displaySubtractOption: boolean
    dayText: string
    toggleAutoDate:()=>void
    add:()=>void
    subtract:()=>void
    textDisabled:()=>string
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface FulfillmentDateField {
    /**
     * Allows parent component to explicitly render the 
     * `FulfillmentDateField` component.
     */
    __render:()=>Promise<void>

    __getValue:(callback:(value: number) => void) => void
}


/** Component declarations */
app.component<FulfillmentDateField>('FulfillmentDateField',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CheckoutService: CheckoutService
)=>{
    $scope.set1DayafterOrderDate = true
    $scope.daysAfterOrderDate = 1
    $scope.displaySubtractOption = false
    $scope.toggleAutoDate = () => {
        UpdateView()
        $patch()
    }
    $scope.textDisabled = () => {
        return ($scope.set1DayafterOrderDate) ? '' : '--fdf-disabled-text'
    }
    $scope.add = () => {
        $scope.daysAfterOrderDate++
        UpdateView()
        $patch()
    }
    $scope.subtract = () => {
        if ($scope.daysAfterOrderDate < 2) return 
        $scope.daysAfterOrderDate--
        UpdateView()
        $patch()
    }
    const OneDayMs = 86400000
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })
    const UpdateView = () => {
        if ($scope.set1DayafterOrderDate) {
            $scope.value = CheckoutService.__getOrderDate() + OneDayMs
        } else {
            $scope.value = CheckoutService.__getOrderDate() + (OneDayMs * $scope.daysAfterOrderDate)
        }
        // @ts-expect-error
        $scope.isoDate = moment($scope.value).format()
        $scope.dayText = ($scope.daysAfterOrderDate === 1) ? 'day' : 'days'
        $scope.displaySubtractOption = ($scope.daysAfterOrderDate !== 1)
    }
    UpdateView()
    CheckoutService.__whenOrderDateAdjusted(()=>{
        UpdateView()
        $patch()
    })
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        },
        __getValue:(callback)=>{
            callback($scope.value)
        }
    }
})