import { app } from "../interfaces/app"
import { ExtractParams, Route } from "../interfaces/kernel/interface"
import { RequesterSession } from "./requester-engine/RequesterEngine"

/**
 * A StrawberryJS service that bridges on jQuery Ajax to make
 * network calls on API endpoints
 */
export interface HttpRequestHelper {
    __post:<T extends Route.Endpoint.Schema>(config:RequestConfig<T>)=>Promise<T['response']>
    __get:<T extends Route.Endpoint.Schema>(config:RequestConfig<T>)=>Promise<T['response']>
    __put:<T extends Route.Endpoint.Schema>(config:RequestConfig<T>)=>Promise<T['response']>
    __patch:<T extends Route.Endpoint.Schema>(config:RequestConfig<T>)=>Promise<T['response']>
    __delete:<T extends Route.Endpoint.Schema>(config:RequestConfig<T>)=>Promise<T['response']>
}

app.service<HttpRequestHelper>('HttpRequestHelper',()=>{

    const RunAjax=<T extends Route.Endpoint.Schema>(method: Route.Http.Method, url: string, config: RequestConfig<T>)=>{
        return new Promise((resolve:(value:any)=>void,reject)=>{
            let payload: string | FormData = ''
            let contentType: string|false = false
            let processData: boolean = true
            if (config.__data!==undefined) {
                if (config.__data instanceof FormData) {
                    payload = config.__data
                    contentType = false
                    processData = false
                } else {
                    payload = JSON.stringify(config.__data)
                    contentType = 'application/json'
                    processData = true
                }
            }

            const headers = {}
            const doNotPassRequesterToken = config.__doNotPassRequesterToken ?? false

            if (!doNotPassRequesterToken) {
                const appkey = getParamValue('app_key')
                const storedSession = localStorage.getItem(`${appkey}.token`)
                if (storedSession===null) {
                    /**
                     * By default, all that goes through the HttpRequestHelper will pass requester token 
                     * via the X-Requester-Token field in the header, unless you pass `false` value to
                     * the `doNotPassRequesterToken` field in the config. 
                     * 
                     * That said, all API request that does not require the token should explicitly 
                     * set this field to `true`, to avoid making issues with Public Requester (no stored
                     * session).
                     */
                    reject(new Error('HttpRequestHelper::ERR100'))
                    return
                }
                headers['X-Requester-Token'] = storedSession
            }

            $.ajax({
                method: method,
                url: url,
                processData: processData,
                contentType: contentType as string|false,
                data: payload,
                headers: headers,
            }).then(response=>{
                const expectJsonResponse = config.__expectJsonResponse ?? true
                if (expectJsonResponse) {
                    if (typeof response=='string') {
                        resolve(JSON.parse(response))
                        return
                    }
                    else if (typeof response=='object') {
                        resolve(response)
                        return
                    } else {
                        /**
                         * The error message indicates that there was an issue with parsing the API response as JSON. 
                         * This can happen if the expectJsonResponse field was set to true in the configuration of the 
                         * API request, indicating that the client expected a JSON response, but the actual response 
                         * from the API was either not parsable as JSON or was invalid JSON format.
                         */
                        reject(new Error(`HttpRequestHelper::ERR101`))
                        return
                    }
                }
                resolve(response)
            }).catch(error=>reject(error))
        })
    }

    const PopulatePathPlaceholders = <T extends Route.Endpoint.Schema>(config:RequestConfig<T>) => {
        const params = config.__params
        let path = config.__path
        for (const key in params) {
            const placeholder = `:${key}`
            if (path.includes(placeholder)) {
                path = path.split(placeholder).join(params[key])
            }
        }
        return path
    }

    const getParamValue = (key: string) => {
        const params = new URLSearchParams(window.location.search)
        const value = params.get(key)
        return value !== null ? value : null
    }


    const ProcessMethod = <T extends Route.Endpoint.Schema>(method: Route.Http.Method, config: RequestConfig<T>) => {
        const populatedUrl = config.__host+PopulatePathPlaceholders(config)
        return new Promise((resolve,reject)=>{
            RunAjax(method,populatedUrl,config).then(resolve).catch(reject)
        })
    }

    return {
        __get:(config)=>{
            return ProcessMethod('GET',config)
        },
        __post:(config)=>{
            return ProcessMethod('POST',config)
        },
        __put:(config)=>{
            return ProcessMethod('PUT',config)
        },
        __patch:(config)=>{
            return ProcessMethod('PATCH',config)
        },
        __delete:(config)=>{
            return ProcessMethod('DELETE',config)
        }
    }
})


export type RequestConfig<T extends Route.Endpoint.Schema> = {
    __host: string,
    __path: T['request']['path'],
    __params: ExtractParams<T['request']['path']>,
    __data?: T['request']['data'] | FormData,
    __expectJsonResponse?: boolean,
    __doNotPassRequesterToken?: boolean
}