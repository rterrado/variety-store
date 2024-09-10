import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { YotpoAPI } from "../../interfaces/yotpo/interface"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CartItem, CartManager } from "../../services/variety-store/CartManager"
import { CheckoutService } from "../../services/variety-store/CheckoutService"
import { CurrencySymbolsLibrary } from "../../services/variety-store/CurrencySymbolsLibrary"

/**
 * These are the different states of `CheckoutSummary` component. These states
 * are fed into the component's StateManager.
 */
type CheckoutSummaryState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: CheckoutSummaryState
    cart: CartItem
    subtotal: number
    tax: number
    total: number
    printer:{
        price:(index:number)=>string
    }
    currencies: Array<{
        currency: string,
        abbreviation: string,
        symbol: string
    }>
}

type CartProduct = CartItem['items']

/**
 * All the methods that are exposed for use by other components.
 */
export interface CheckoutSummary {
    /**
     * Allows parent component to explicitly render the 
     * `CheckoutSummary` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<CheckoutSummary>('CheckoutSummary',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CartManager: CartManager,
    CheckoutService: CheckoutService,
    CurrencySymbolsLibrary: CurrencySymbolsLibrary
)=>{
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        $scope.cart = CartManager.__getExistingCart()
        $scope.subtotal = parseFloat(CheckoutService.__calculateCartTotal($scope.cart).toFixed(3))
        $scope.tax = parseFloat(CheckoutService.__getTaxAmount($scope.cart).toFixed(3))
        $scope.total = parseFloat(CheckoutService.__calculateTotalPayable($scope.cart).toFixed(3))
        if ($scope.cart.items.length === 0) {
            await StateManager.__switch('empty')
        } else {
            await StateManager.__switch('active')
        }
    })
    $scope.printer = {
        price: (index)=>{
            return ''
        }
    }
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                if ($scope.cart.items.length === 0) {
                    await StateManager.__switch('empty')
                } else {
                    await StateManager.__switch('active')
                }
                resolve(null)
            })
        }
    }
})