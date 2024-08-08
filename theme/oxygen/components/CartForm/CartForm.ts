import { BlockManager } from "../../helpers/BlockManager"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
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
    roundOff:(total:number)=>number
    QuantityManager: {
        add: (index:number)=>void,
        remove: (index:number)=>void
    }
    LineItemManager: {
        calculateTotal:(quantity:number, price: number)=>number
    }
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
    CurrencySymbolsLibrary: CurrencySymbolsLibrary
)=>{
    $scope.CartItem = CartManager.get()
    $scope.CartItem = {
        items: [{
            product: {
                name: 'Black Leather Bag',
                url: '',
                imagesrc: 'https://cebu-clothing-shop.myshopify.com/cdn/shop/products/black-bag-over-the-shoulder_925x_a3fd21b4-f451-4cc7-bfea-c1d7244e6a7d.jpg?v=1617770055&width=600',
                id: '6611287081135',
                price: 30.31,
                currency: 'PHP'
            },
            quantity: 1
        }],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    const activate = async () => {
        CurrencySymbolsLibrary.get(async (data)=>{
            for (let i = 0; i < $scope.CartItem.items.length; i++) {
                const item = $scope.CartItem.items[i]
                const results = data.filter(dataitem => dataitem.abbreviation === item.product.currency)
                $scope.CartItem.items[i].product.currencySymbol = results[0]?.symbol ?? ''
            }
            console.log('activated')
            await StateManager.__switch('active')
        })
    }
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

    $scope.LineItemManager = {
        calculateTotal: (quantity, price)=>{
            return parseFloat((quantity * price).toFixed(2))
        }
    }

    $scope.QuantityManager = {
        add: (index)=>{
            $scope.CartItem.items[index].quantity++
            $patch()
        },
        remove: (index)=>{
            if ($scope.CartItem.items[index].quantity > 1) {
                $scope.CartItem.items[index].quantity--
            } else {
                $scope.CartItem.items = $scope.CartItem.items.filter((_, i) => i !== index)
            }
            $patch()
        }
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