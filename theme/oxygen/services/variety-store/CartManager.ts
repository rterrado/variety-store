import { BinaryState } from "../../factories/BinaryState";
import { app } from "../../interfaces/app";

export interface CartManager {
    get:()=>CartItem|null
    add:(product: Product)=>void,
    remove:(id: string) => void
}

app.service<CartManager>('CartManager', (
    BinaryState: BinaryState
)=>{
    const cartkey = 'vscart'
    const IsProductExisting = new BinaryState()
    const getlocalcart = (): CartItem => {
        const data = localStorage.getItem(cartkey)
        if (data === null) {
            return {
                items: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
        }
        return JSON.parse(data)
    }
    return {
        get:()=>{
            return getlocalcart()
        },
        add:(product)=>{
            const cart = getlocalcart()
            IsProductExisting.set(false)
            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i]
                if (item.product.id === product.id) {
                    cart.items[i].quantity++
                    IsProductExisting.set(true)
                }
            }
            if (IsProductExisting.false()){
                cart.items.push({
                    product: product,
                    quantity: 1
                })
            }
            cart.updatedAt = Date.now()
            localStorage.setItem(cartkey, JSON.stringify(cart))
        },
        remove:(id)=>{
            const cart = getlocalcart()
            const newitems = cart.items.map(item => {
                if (item.product.id === id && item.quantity > 0) {
                    item.quantity--
                }
                return item
            }).filter(item => item.quantity > 0)
            cart.items = newitems
            cart.updatedAt = Date.now()
            localStorage.setItem(cartkey, JSON.stringify(cart))
        }
    }
})

type Product = {
    id: string,
    name: string,
    url: string,
    imagesrc: string,
    price: number,
    currency: string,
    currencySymbol?: string
}

export type CartItem = {
    items: Array<{
        product: Product,
        quantity: number
    }>,
    createdAt: number,
    updatedAt: number
}