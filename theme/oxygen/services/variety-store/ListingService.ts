import { app } from "../../interfaces/app";
import { EventManagerInterface } from "../EventManager";

export interface ListingService {
    __whenNextPageRequested:(listener:()=>void)=>void
    __whenPreviousPageRequested:(listener:()=>void)=>void
    __whenSearchListingRequested:(listener:(keyword:string)=>void)=>void
    __requestNextPage:()=>void
    __requestPreviousPage:()=>void
    __requestSearchListing:(keyword:string)=>void
}
app.service<ListingService>('ListingService',(
    EventManager: EventManagerInterface
)=>{
    const SearchEventListeners: Array<(keyword:string)=>void> = []
    const NextPageRequestEventName = 'NPARQE'
    const PreviousPageRequestEventName = 'PPARQE'
    EventManager.__register(NextPageRequestEventName)
    EventManager.__register(PreviousPageRequestEventName)
    class LSServiceObject {
        __requestNextPage(){
            EventManager.__dispatch(NextPageRequestEventName)
        }
        __requestPreviousPage(){
            EventManager.__dispatch(PreviousPageRequestEventName)
        }
        __requestSearchListing(keyword:string){
            for (let i = 0; i < SearchEventListeners.length; i++) {
                SearchEventListeners[i](keyword)
            }
        }
        __whenNextPageRequested(listener:()=>void){
            EventManager.__subscribe(NextPageRequestEventName, listener)
        }
        __whenPreviousPageRequested(listener:()=>void){
            EventManager.__subscribe(PreviousPageRequestEventName, listener)
        }
        __whenSearchListingRequested(listener:(keyword:string)=>void){
            SearchEventListeners.push(listener)
        }
    }
    return new LSServiceObject
})