import { StateManager } from "../../helpers/StateManager"
import { ApplicationAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { PageActivationManager } from "../../services/events/PageActivationManager"
import { PageErrorManager } from "../../services/events/PageErrorManager"
import { ListingService } from "../../services/variety-store/ListingService"

/**
 * These are the different states of `PaginationControl` component. These states
 * are fed into the component's StateManager.
 */
type PaginationControlState = 'loading' | 'active' | 'error'

/** Component Object */
type ComponentScope = {
    state: PaginationControlState,
    next:()=>void
    previous:()=>void
}

/**
 * All the methods that are exposed for use by other components.
 */
export interface PaginationControl {
    /**
     * Allows parent component to explicitly render the 
     * `PaginationControl` component.
     */
    __render:()=>Promise<void>
}


/** Component declarations */
app.component<PaginationControl>('PaginationControl',(
    $scope: ScopeObject<ComponentScope>,
    $patch: PatchAPI,
    PageErrorManager: PageErrorManager,
    PageActivationManager: PageActivationManager,
    StateManager: StateManager,
    ListingService: ListingService
)=>{
    /** 
     * You can self-activate this component by subscribing to the `PageActivationEvent`. 
     * This event is fired after the @AppRouter component signals the page activation.
     */
    PageActivationManager.__subscribe(async ()=>{
        await StateManager.__switch('active')
    })
    $scope.next = () => ListingService.__requestNextPage()
    $scope.previous = () => ListingService.__requestPreviousPage()
    return {
        __render:()=>{
            return new Promise(async (resolve,reject)=>{
                await StateManager.__switch('active')
                resolve(null)
            })
        }
    }
})