import { AppConfig } from "../../factories/AppConfig"
import { ButtonElement } from "../../factories/ButtonElement"
import { InputElement } from "../../factories/InputElement"
import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, BlockAPI, PatchAPI, PluncElementInterface, ScopeObject, app } from "../../interfaces/app"
import { Rehearsal } from "../../interfaces/rehearsal/interface"
import { HttpRequestHelper } from "../../services/HttpRequestHelper"
import { URLHelper } from "../../services/URLHelper"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CartItem, CartManager } from "../../services/variety-store/CartManager"
import { CheckoutService } from "../../services/variety-store/CheckoutService"
import { YotpoAPIClient } from "../../services/yotpo/YotpoAPIClient"
import { BillingAddressForm, BillingAddressFormData } from "../BillingAddressForm/BillingAddressForm"
import { EmailInputField } from "../EmailInputField/EmailInputField"
import { FulfillmentDateField } from "../FulfillmentDateField/FulfillmentDateField"
import { FullNameInputFields } from "../FullNameInputFields/FullNameInputFields"
import { OrderDateField } from "../OrderDateField/OrderDateField"
import { PhoneNumberSelector } from "../PhoneNumberSelector/PhoneNumberSelector"


/**
 * These are the different states of `CheckoutForm` component. These states
 * are fed into the component's StateManager.
 */
type CheckoutFormState = 'loading' | 'active' | 'error' | 'empty'

/** Component Object */
type ComponentScope = {
    state: CheckoutFormState
    cart: CartItem
    submit:(button:PluncElementInterface<HTMLButtonElement>)=>void
    customer: {
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        phoneNumber: string | null
    }
    billingAddress: BillingAddressFormData | null
    orderDate: number
    fulfillmentDate: number
    appKey: string 
    storeName: string
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface CheckoutForm {
    /**
     * Allows parent component to explicitly render the 
     * `CheckoutForm` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<CheckoutForm>('CheckoutForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CartManager: CartManager,
    FullNameInputFields: FullNameInputFields,
    EmailInputField: EmailInputField,
    PhoneNumberSelector: PhoneNumberSelector,
    OrderDateField: OrderDateField,
    FulfillmentDateField: FulfillmentDateField,
    BillingAddressForm: BillingAddressForm,
    CheckoutService: CheckoutService,
    ButtonElement: ButtonElement,
    HttpRequestHelper: HttpRequestHelper,
    AppConfig: AppConfig,
    URLHelper: URLHelper,
    YotpoAPIClient: YotpoAPIClient
)=>{
    const APP_CONFIG = new AppConfig
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        $scope.cart = CartManager.__getExistingCart()
        if ($scope.cart.items.length === 0) {
            await StateManager.__switch('empty')
            return
        }
        await StateManager.__switch('active')
        await FullNameInputFields.__render()
        await EmailInputField.__render()
        await OrderDateField.__render()
        await FulfillmentDateField.__render()
        await BillingAddressForm.__render()
        await PhoneNumberSelector.__render()
    })

    $scope.appKey = URLHelper.getParamValue('app_key')
    YotpoAPIClient.__getAccountDetails($scope.appKey)
    .then(response=>{
        $scope.storeName = response.account_settings.store_name
    })
    .catch(error=>console.error(error))

    $scope.customer = {
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null
    }

    $scope.billingAddress = null

    $scope.submit = (button) => {
        FullNameInputFields.__getValues((firstName, lastName)=>{
            $scope.customer.firstName = firstName 
            $scope.customer.lastName = lastName
        })
        EmailInputField.__getValue((email) => {
            console.log(email)
            $scope.customer.email = email
        })
        PhoneNumberSelector.__getValue(value => {
            $scope.customer.phoneNumber = value
        })
        BillingAddressForm.__getData(data => {
            $scope.billingAddress = data
        })
        FulfillmentDateField.__getValue(value => {
            $scope.fulfillmentDate = value
        })

        if (
            $scope.customer.firstName === null 
        ||  $scope.customer.lastName === null
        ||  $scope.customer.email === null
            ) return

        console.log($scope.billingAddress)
        const SubmitButton = new ButtonElement(button)
        SubmitButton.__freeze()

        // @ts-expect-error
        const orderDate = moment(CheckoutService.__getOrderDate()).format()
        // @ts-expect-error
        const fulfillmentDate = moment($scope.fulfillmentDate).format()

        HttpRequestHelper.__post<Rehearsal.Endpoints.Yotpo.Orders.Create.V3SingleOrder>({
            __host: APP_CONFIG.__getServiceHost().__Rehearsal(),
            __path: '/:tenantId/rehearsal/yotpo/orders/v3/create/single',
            __params: { tenantId: APP_CONFIG.__getTenantId() },
            __data: {
                appKey: $scope.appKey,
                storeName: $scope.storeName,
                cart: CartManager.__getExistingCart(),
                customer: $scope.customer,
                billingAddress: $scope.billingAddress,
                orderDate: orderDate,
                fulfillmentDate: fulfillmentDate
            }
        }).then(async (response)=>{
            console.log(response)
        }).catch(error=>{
            console.error(error)
        })
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