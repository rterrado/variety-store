import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CountryCodeLibrary } from "../../services/variety-store/CountryCodeLibrary"

/**
 * These are the different states of `BillingAddressForm` component. These states
 * are fed into the component's StateManager.
 */
type BillingAddressFormState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: BillingAddressFormState
    isAddBillingAddress: boolean
    addressLine1: string
    townCity: string 
    stateProvince: string 
    zipcode: string
    country: string
    toggleForm:()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface BillingAddressForm {
    /**
     * Allows parent component to explicitly render the 
     * `BillingAddressForm` component.
     */
    __render:()=>Promise<void>

    __getData:(callback:(data:BillingAddressFormData | null)=>void)=>void
}

export type BillingAddressFormData = {
    addressLine1: string
    townCity: string 
    stateProvince: string 
    zipcode: string
    countryCode: string
}


/** Component declarations */
app.component<BillingAddressForm>('BillingAddressForm',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CountryCodeLibrary: CountryCodeLibrary
)=>{

    $scope.isAddBillingAddress = false

    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })

    $scope.toggleForm = () => {
        $patch()
    }
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        },
        __getData:(callback)=>{
            if (!$scope.isAddBillingAddress) {
                callback(null)
                return
            }
            CountryCodeLibrary.get(data => {
                if ($scope.country in data) {
                    callback({
                        addressLine1: $scope.addressLine1 ?? '',
                        townCity: $scope.townCity ?? '', 
                        stateProvince: $scope.stateProvince ?? '', 
                        zipcode: $scope.zipcode ?? '',
                        countryCode: data[$scope.country].code
                    })
                    return
                }
                callback(null)
                return
            })
            
        }
    }
})