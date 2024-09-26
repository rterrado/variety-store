import { BlockManager } from "../../helpers/BlockManager"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CartItem, CartManager } from "../../services/variety-store/CartManager"
import { CurrencySymbolsLibrary } from "../../services/variety-store/CurrencySymbolsLibrary"

/**
 * These are the different states of `Cart` component. These states
 * are fed into the component's StateManager.
 */
type CartState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: CartState,
    CartItem: CartItem
    currencies: Array<{
        currency: string,
        abbreviation: string,
        symbol: string
    }>
    roundOff:(total:number)=>number
    QuantityManager: {
        add: (index:number)=>void,
        remove: (index:number)=>void
    }
    LineItemManager: {
        calculateTotal:(quantity:number, price: number)=>number
    }
    checkout:()=>void
    clear:()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface CartForm {
    /**
     * Allows parent component to explicitly render the 
     * `Cart` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<CartForm>('CartForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CartManager: CartManager,
    BlockManager: BlockManager,
    CurrencySymbolsLibrary: CurrencySymbolsLibrary,
    URLHelper: URLHelper
)=>{
    $scope.CartItem = CartManager.__getExistingCart()
    const activate = async () => {
        await StateManager.__switch('active')
    }

    CartManager.__whenCartUpdated((cart)=>{
        $scope.CartItem = cart
        $patch()
    })
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        activate()
    })

    $scope.roundOff = (total) => {
        return parseFloat(total.toFixed(2))
    }

    $scope.clear = () => {
        CartManager.__clearCart()
    }

    $scope.LineItemManager = {
        calculateTotal: (quantity, price)=>{
            return parseFloat((quantity * price).toFixed(2))
        }
    }

    $scope.QuantityManager = {
        add: (index)=>{
            const product = $scope.CartItem.items[index].product
            CartManager.__addQuantity(product)
        },
        remove: (index)=>{
            const product = $scope.CartItem.items[index].product
            CartManager.__removeQuantity(product)
        }
    }

    $scope.checkout = () => {
        location.href = 'checkout.html?app_key=' + URLHelper.getParamValue('app_key')
    }

    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                activate()
                resolve(null)
            })
        }
    }
})