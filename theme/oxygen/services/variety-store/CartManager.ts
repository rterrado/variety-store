import { BinaryState } from "../../factories/BinaryState";
import { CallbackQueue } from "../../factories/CallbackQueue";
import { app } from "../../interfaces/app";
import { URLHelper } from "../URLHelper";

export interface CartManager {
    __getExistingCart:()=>CartItem|null
    __addProductToCart:(product: Product)=>void
    __removeProductFromCart:(product: Product) => void
    __addQuantity:(product: Product)=>void
    __removeQuantity:(product: Product)=>void
    __whenCartUpdated:(callback:(CartItem: CartItem)=>void)=>void
}

app.service<CartManager>('CartManager', (
    BinaryState: BinaryState,
    URLHelper: URLHelper,
    CallbackQueue: CallbackQueue
)=>{

    /** All listeners to cart update events */
    const CartUpdateListeners = new CallbackQueue()
    const InvokeListeners = (cart: CartItem) => {
        const listeners = CartUpdateListeners.withdraw()
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](cart)
        }
    }

    /** Localstorage key */
    const cartkey = `${URLHelper.getParamValue('app_key')}.cart`

    /** Retrieves stored cart data from local storage */
    const GetLocalCart = (): CartItem => {
        const data = localStorage.getItem(cartkey)
        if (data === null) {
            return {
                items: [],
                created: Date.now(),
                updated: Date.now()
            }
        }
        return JSON.parse(data)
    }

    /** Stores cart data into local storage */
    const StoreLocalCart = (cart: CartItem) => {
        cart.updated = Date.now()
        localStorage.setItem(cartkey, JSON.stringify(cart))
        InvokeListeners(cart)
    }

    const RemoveProductFromCart = (cart: CartItem, product: Product) => {
        const newitems = cart.items.map(item => {
            if (item.product.extid === product.extid && item.quantity > 0) {
                item.quantity--
            }
            return item
        }).filter(item => item.quantity > 0)
        cart.items = newitems
    }

    return {
        __getExistingCart:()=>{
            return GetLocalCart()
        },
        __addProductToCart:(product)=>{
            const cart = GetLocalCart()
            let index = cart.items.findIndex(item => item.product.extid === product.extid)
            if (index < 0) {
                cart.items.push({
                    product: product,
                    quantity: 0
                })
                index = cart.items.length - 1
            }
            cart.items[index].quantity++
            StoreLocalCart(cart)
        },
        __removeProductFromCart:(product)=>{
            const cart = GetLocalCart()
            RemoveProductFromCart(cart, product)
            StoreLocalCart(cart)
        },
        __addQuantity:(product)=>{
            const cart = GetLocalCart()
            const index = cart.items.findIndex(item => item.product.extid === product.extid)
            if (index < 0) return 
            cart.items[index].quantity++
            StoreLocalCart(cart)
        },
        __removeQuantity:(product)=>{
            const cart = GetLocalCart()
            const index = cart.items.findIndex(item => item.product.extid === product.extid)
            if (index < 0) return
            RemoveProductFromCart(cart, product)
            StoreLocalCart(cart)
        },
        __whenCartUpdated:(listener)=>{
            CartUpdateListeners.add(listener)
        }
    }
})

type Product = {
    extid: string,
    name: string,
    url: string,
    group: string | null
    imgsrc: string,
    price: number,
    currency: {
        value: string
        symbol: string
    }
}

export type CartItem = {
    items: Array<{
        product: Product,
        quantity: number
    }>,
    created: number,
    updated: number
}