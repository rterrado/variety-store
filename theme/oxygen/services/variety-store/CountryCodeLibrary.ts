import { BinaryState } from "../../factories/BinaryState";
import { CallbackQueue } from "../../factories/CallbackQueue";
import { app } from "../../interfaces/app";
import { HttpRequestHelper } from "../HttpRequestHelper";

export interface CountryCodeLibrary {
    get:(listener:(data: CountriesResourceEndpoint['response'])=>void)=>void
}

app.service<CountryCodeLibrary>('CountryCodeLibrary', (
    CallbackQueue: CallbackQueue,
    BinaryState: BinaryState,
    HttpRequestHelper: HttpRequestHelper
)=>{
    const listeners = new CallbackQueue()
    let data: CountriesResourceEndpoint['response'] = {}
    const loading = new BinaryState
    const ready = new BinaryState()
    loading.set(false)
    ready.set(false)
    return {
        get:(listener)=>{
            if (ready.true()){
                listener(data)
            }
            if (loading.false()) {
                loading.set(true)
                HttpRequestHelper.__get<CountriesResourceEndpoint>({
                    __host: 'https://kryptonite-apis.cloud',
                    __path: '/gl6d8zrgp64c03xxmindatalkstaging/assets/countries',
                    __doNotPassRequesterToken: true,
                    __params: {}
                }).then(response=>{
                    data = response
                    ready.set(true)
                    const queue = listeners.withdraw()
                    for (let i = 0; i < queue.length; i++) {
                        queue[i](data)
                    }
                })
            }
            listeners.add(listener)
        }
    }
})

export type CountryCodeItem = {
    dial_code: string,
    code: string
    unicode: string,
    image: string
    emoji: string
}

export type CountriesResourceEndpoint = {
    request: {
        path: '/gl6d8zrgp64c03xxmindatalkstaging/assets/countries'
    },
    response: {[key:string]: CountryCodeItem}
}