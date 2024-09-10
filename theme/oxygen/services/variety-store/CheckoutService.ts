import { CallbackQueue } from "../../factories/CallbackQueue";
import { app } from "../../interfaces/app";
import { CartItem } from "./CartManager";

export interface CheckoutService {
    __calculateTotalPayable:(cart: CartItem)=>number
    __getTaxAmount:(cart: CartItem)=>number
    __calculateCartTotal:(cart: CartItem)=>number
    __getOrderDate:() => number
    __getBackDaysCount:()=>number
    __backdateOrderDate:(value: '+1' | '-1' | number) => void
    __whenOrderDateAdjusted:(listener:()=>void)=>void
}

app.service<CheckoutService>('CheckoutService', (
    CallbackQueue: CallbackQueue
)=>{
    const OrderDateAdjustmentListener = new CallbackQueue
    const calculateCartTotal = (cart: CartItem) => {
        let amount = 0
        cart.items.forEach(item => {
            amount += item.product.price * item.quantity
        })
        return amount
    }
    const calculateTax = (cart: CartItem, percentage: number) => {
        let amount = calculateCartTotal(cart)
        return amount * percentage
    }
    class __Service implements CheckoutService {
        __taxPercentage: number
        __orderDateTS: number
        __orderDateBackdayCount: number
        constructor(){
            this.__taxPercentage = 0.4
            this.__orderDateTS = Date.now()
            this.__orderDateBackdayCount = 1
        }
        __getTaxAmount(cart: CartItem):number {
            return calculateTax(cart, this.__taxPercentage)
        }
        __calculateTotalPayable(cart: CartItem): number {
            const taxAmount = calculateTax(cart, this.__taxPercentage)
            const cartTotal = calculateCartTotal(cart)
            return cartTotal + taxAmount
        }
        __calculateCartTotal(cart: CartItem): number {
            return calculateCartTotal(cart)
        }
        __getOrderDate():number {
            return this.__orderDateTS
        }
        __getBackDaysCount(): number {
            return this.__orderDateBackdayCount
        }
        __backdateOrderDate(value: '+1' | '-1' | number): void {
            switch(value) {
                case '+1': 
                    this.__orderDateBackdayCount--
                break;

                case '-1':
                    this.__orderDateBackdayCount++
                break;

                default: 
                    // minifier lib issue when adding typecheck here
                    this.__orderDateBackdayCount = value
                break;
            }
            this.__orderDateTS = Date.now() - (this.__orderDateBackdayCount * 86400000)
            const listeners = OrderDateAdjustmentListener.withdraw()
            listeners.forEach(listener => {
                listener()
            })
        }
        __whenOrderDateAdjusted(listener: () => void): void {
            OrderDateAdjustmentListener.add(listener)
        }
    }
    return new __Service
})