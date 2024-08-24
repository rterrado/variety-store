import { app } from "../interfaces/app";

export interface URLHelper {
    getParamValue: (key: string) => string|null
}
app.service<URLHelper>('URLHelper',()=>{
    class __HelperObject {
        getParamValue(key:string){
            const params = new URLSearchParams(window.location.search)
            const value = params.get(key)
            return value !== null ? value : null
        }
    }
    return new __HelperObject
})