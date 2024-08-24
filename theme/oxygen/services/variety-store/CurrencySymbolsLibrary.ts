import { BinaryState } from "../../factories/BinaryState";
import { CallbackQueue } from "../../factories/CallbackQueue";
import { app } from "../../interfaces/app";
import { HttpRequestHelper } from "../HttpRequestHelper";

export interface CurrencySymbolsLibrary {
    get:(listener:(data: RepositorySourceEndpoint['response'])=>void)=>void
}

app.service<CurrencySymbolsLibrary>('CurrencySymbolsLibrary',(
    CallbackQueue: CallbackQueue,
    BinaryState: BinaryState,
    HttpRequestHelper: HttpRequestHelper
)=>{
    const listeners = new CallbackQueue()
    let data: RepositorySourceEndpoint['response'] = []
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
                HttpRequestHelper.__get<RepositorySourceEndpoint>({
                    __host: 'https://cdn.shopify.com',
                    __path: '/s/files/1/0560/7466/6159/files/currencies.json?v=:v',
                    __doNotPassRequesterToken: true,
                    __params: {v: '1722967930'}
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

type RepositorySourceEndpoint = {
    request: {
        path: '/s/files/1/0560/7466/6159/files/currencies.json?v=:v'
    },
    response: Array<{
        currency: string,
        abbreviation: string,
        symbol: string
    }>
}