import { AppConfig } from "../../factories/AppConfig"
import { app } from "../../interfaces/app"
import { IdentityAuthority } from "../../interfaces/identity-authority/interface"
import { HttpRequestHelper } from "../HttpRequestHelper"

export interface IAuthTokenManager {
    __setTenantId:(tenantId:string)=>void
    __getTokenUsingEmailAndPassword:(
        email:string,
        password:string,
        recaptcha_token: string
    )=>Promise<IdentityAuthority.Users.ApplicationAccess.Response>
    __refreshIdAuthToken:(existingToken:string)=>Promise<string>
}

app.service<IAuthTokenManager>('IAuthTokenManager',(
    AppConfig: AppConfig,
    HttpRequestHelper: HttpRequestHelper
)=>{
    const APP_CONFIG = new AppConfig
    let TENANT_ID: string | null = null
    return {
        __setTenantId:(tenantId)=>{
            TENANT_ID = tenantId
        },
        __getTokenUsingEmailAndPassword:(email,password,recaptcha_token)=>{
            return new Promise(async (resolve,reject)=>{
                try {
                    const tenantId = TENANT_ID ?? APP_CONFIG.__getTenantId()
                    const response = await HttpRequestHelper.__post<IdentityAuthority.Users.Endpoints.Get.Token.Generate>({
                        __host: APP_CONFIG.__getServiceHost().__IdentityAuthority(),
                        __path: '/:tenantId/identity-authority/user/token/generate',
                        __params: { tenantId: tenantId },
                        __data: {
                            email_address: email,
                            password: password,
                            captcha_token: recaptcha_token
                        },
                        __doNotPassRequesterToken: true
                    })
                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            })
        },
        __refreshIdAuthToken:(existingToken)=>{
            return new Promise(async (resolve,reject)=>{
                try {
                    resolve('')
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
})