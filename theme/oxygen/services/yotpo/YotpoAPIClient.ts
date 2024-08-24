import { app } from "../../interfaces/app";
import { YotpoAPI } from "../../interfaces/yotpo/interface";
import { HttpRequestHelper } from "../HttpRequestHelper";

export interface YotpoAPIClient {
    __getProductBottomline: (appkey:string, productId: string)=>Promise<YotpoAPI.Products.Endpoints.Get.Bottomline['response']>
    __getAccountDetails: (appkey:string) => Promise<YotpoAPI.Account.Endpoints.Get.Details['response']>
}

app.service<YotpoAPIClient>('YotpoAPIClient',(
    HttpRequestHelper: HttpRequestHelper
)=>{
    class __Service implements YotpoAPIClient {
        __getProductBottomline(appkey:string, productId: string):Promise<YotpoAPI.Products.Endpoints.Get.Bottomline['response']>{
            return new Promise(async (resolve,reject)=>{
                HttpRequestHelper.__get<YotpoAPI.Products.Endpoints.Get.Bottomline>({
                    __host: 'https://api-cdn.yotpo.com',
                    __path: '/products/:appkey/:productId/bottomline',
                    __params: {appkey: appkey, productId: productId},
                    __doNotPassRequesterToken: true
                }).then(response => {
                    resolve(response)
                })
                .catch(error=>{
                    console.error(error)
                    reject(error)
                })
            })
        }
        __getAccountDetails(appkey: string): Promise<YotpoAPI.Account.Endpoints.Get.Details['response']>{
            return new Promise(async (resolve, reject)=>{
                HttpRequestHelper.__get<YotpoAPI.Account.Endpoints.Get.Details>({
                    __host: 'https://api.yotpo.com',
                    __path: '/v1/lp/apps/:appkey/account_settings',
                    __params: {appkey: appkey},
                    __doNotPassRequesterToken: true
                }).then(response => {
                    resolve(response)
                })
                .catch(error=>{
                    console.error(error)
                    reject(error)
                })
            })
        }
    }
    return new __Service
})

