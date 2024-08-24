import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, BlockAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { ListingService } from "../../services/variety-store/ListingService"

/**
 * These are the different states of `ProductSearchBar` component. These states
 * are fed into the component's StateManager.
 */
type ProductSearchBarState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: ProductSearchBarState
    button: 'search' | 'empty'
    keyword: string
    clear:()=>void
    search:()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface ProductSearchBar {
    /**
     * Allows parent component to explicitly render the 
     * `ProductSearchBar` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<ProductSearchBar>('ProductSearchBar',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    $block: BlockAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    ListingService: ListingService
)=>{
    const listenToFormSubmissions = () => {
        $block('ProductSearchForm',(form)=>{
            form.$element.addEventListener('submit',()=>{
               ListingService.__requestSearchListing($scope.keyword)
               SwitchButton('empty')
            })
        })
    }
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })

    const SwitchButton = (type: 'search' | 'empty') => {
        $scope.button = type
        $patch('ProductSearchForm')
    }
    
    $scope.search = () => {
        ListingService.__requestSearchListing($scope.keyword)
        SwitchButton('empty')
    }

    $scope.clear = () => {
        $scope.keyword = ''
        ListingService.__requestSearchListing('')
        SwitchButton('search')
    }
    
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                $scope.button = 'search'
                await StateManager.__switch('active')
                listenToFormSubmissions()
                resolve(null)
            })
        }
    }
})