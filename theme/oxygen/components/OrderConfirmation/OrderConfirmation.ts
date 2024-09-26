import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { OrderServices } from "../../services/variety-store/OrderServices"

/**
 * These are the different states of `OrderConfirmation` component. These states
 * are fed into the component's StateManager.
 */
type OrderConfirmationState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: OrderConfirmationState
    order: Rehearsal.Endpoints.Yotpo.Orders.Get.ByReferenceId['response']
    LineItemManager: {
        calculateTotal:(quantity:number, price: number)=>number
    }
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface OrderConfirmation {
    /**
     * Allows parent component to explicitly render the 
     * `OrderConfirmation` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<OrderConfirmation>('OrderConfirmation',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    OrderServices: OrderServices,
    URLHelper: URLHelper
)=>{
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        const referenceId = URLHelper.getParamValue('id')
        OrderServices.__getOrderByReferenceId(referenceId, async (data)=>{
            if (data instanceof Error) {
                return
            }
            $scope.order = data
            await StateManager.__switch('active')
        })
    })

    $scope.LineItemManager = {
        calculateTotal: (quantity, price)=>{
            return parseFloat((quantity * price).toFixed(2))
        }
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