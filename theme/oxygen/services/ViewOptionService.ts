import { app } from "../interfaces/app";

export interface ViewOptionService {
    set:<T extends {[key:string]:any}>(options:T)=>void
    get:<T extends {[key:string]:any}>()=>T | null
}

app.service<ViewOptionService>('ViewOptionService',()=>{
    class __Service implements ViewOptionService {
        options: {[key:string]:any}
        constructor(){
            this.options = {}
        }
        set<T extends { [key: string]: any; }>(options: T){
            this.options = options
        }
        get<T extends { [key: string]: any; }>():T | null{
            return this.options as T
        }
    }
    return new __Service
})