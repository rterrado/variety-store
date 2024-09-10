import { StateManager } from "../../helpers/StateManager"
import { UtilHelper } from "../../helpers/UtilHelper"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CheckoutService } from "../../services/variety-store/CheckoutService"

/**
 * These are the different states of `OrderDateField` component. These states
 * are fed into the component's StateManager.
 */
type OrderDateFieldState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: OrderDateFieldState,
    value: number
    isoDate: string
    daysAgo: number
    dayText: 'day' | 'days'
    add:()=>void
    subtract:()=>void
    updateDaysAgo:()=>void
    disableInput: true
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface OrderDateField {
    /**
     * Allows parent component to explicitly render the 
     * `OrderDateField` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<OrderDateField>('OrderDateField',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    UtilHelper: UtilHelper,
    CheckoutService: CheckoutService
)=>{
    const DateTools = UtilHelper
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })

    const UpdateView = () => {
        $scope.value = CheckoutService.__getOrderDate()
        // @ts-expect-error
        $scope.isoDate = moment($scope.value).format()
        $scope.daysAgo = CheckoutService.__getBackDaysCount()
        $scope.dayText = ($scope.daysAgo === 1) ? 'day' : 'days'
    }
    UpdateView()

    CheckoutService.__whenOrderDateAdjusted(()=>{
        UpdateView()
        $patch()
    })
    

    $scope.disableInput = true

    $scope.add = () => {
        CheckoutService.__backdateOrderDate('-1')
    }
    $scope.subtract = () => {
        CheckoutService.__backdateOrderDate('+1')
    }
    $scope.updateDaysAgo = () => {
        CheckoutService.__backdateOrderDate($scope.daysAgo)
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