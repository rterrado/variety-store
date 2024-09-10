import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { CountriesResourceEndpoint, CountryCodeItem, CountryCodeLibrary } from "../../services/variety-store/CountryCodeLibrary"

// https://gist.github.com/anubhavshrimal/75f6183458db8c453306f93521e93d37
// https://github.com/risan/country-flag-emoji-json

/**
 * These are the different states of `PhoneNumberSelector` component. These states
 * are fed into the component's StateManager.
 */
type PhoneNumberSelectorState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: PhoneNumberSelectorState,
    CountryCodes: CountriesResourceEndpoint['response']
    country: {
        name: string,
        data: CountryCodeItem
    }
    select: {
        country:()=>void
    }
    value: string | null
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface PhoneNumberSelector {
    /**
     * Allows parent component to explicitly render the 
     * `PhoneNumberSelector` component.
     */
    __render:()=>Promise<void>
    __getValue:(callback:(value: string | null) => void) => void
}


/** Component declarations */
app.component<PhoneNumberSelector>('PhoneNumberSelector',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    CountryCodeLibrary: CountryCodeLibrary
)=>{

    /** Default Country Here */
    $scope.country = {
        name: 'Philippines',
        data: {
            dial_code: '+63',
            image: 'https:\/\/cdn.jsdelivr.net\/npm\/country-flag-emoji-json@2.0.0\/dist\/images\/PH.svg',
            emoji: "\ud83c\uddf5\ud83c\udded",
            code: 'PH',
            unicode: "U+1F1F5 U+1F1ED"
        }
    }

    $scope.select = {
        country:()=>{
            const country = $scope.country.name 
            if (country in $scope.CountryCodes) {
                $scope.country = {
                    name: $scope.country.name,
                    data: $scope.CountryCodes[country]
                }
                $patch()
            }
        }
    }

    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                CountryCodeLibrary.get(async data=>{
                    $scope.CountryCodes = data
                    await StateManager.__switch('active')
                })
                resolve(null)
            })
        },
        __getValue:(callback)=>{
            callback(($scope.value === null) ? null : $scope.country.data.dial_code + $scope.value)
        }
    }
})