import { AppConfig } from "../../factories/AppConfig"
import { app } from "../../interfaces/app"
import { IdentityAuthority } from "../../interfaces/identity-authority/interface"
import { EventManagerInterface } from "../EventManager"
import { IAuthTokenManager } from "../identity-authority/IAuthTokenManager"

export type RequesterIdentityProvider = IdentityAuthority.Providers.Identity
type CreateRequesterSessionParameters = {
    provider: IdentityAuthority.Providers.Pick<'idauth'>,
    emailAddress: string,
    password: string,
    recaptchaToken: string
}

export type RequesterSession = {
    /** The userid */
    uid: string,
    /** The user status */
    ust: IdentityAuthority.Users.Status.Type,
    /** The requester token */
    tkn: string
    /** created at */
    cat: number
    /** updated at */
    upt: number
}

type RequesterEngineEvents = {
    __subscribe:{
        __endSession:(callback:()=>void)=>void
    }
}

export interface RequesterEngine {
    __setTenantId:(tenantId:string)=>void,
    __createRequesterSession:(params:CreateRequesterSessionParameters)=>Promise<{}>
    __getValidRequesterSession:()=>Promise<RequesterSession>,
    __setRequesterStatus:(status:IdentityAuthority.Users.Status.Type)=>Promise<{success:true}>,
    __endRequesterSession:()=>void
    __events:()=>RequesterEngineEvents
}

app.service<RequesterEngine>('RequesterEngine',(
    AppConfig: AppConfig,
    IAuthTokenManager: IAuthTokenManager,
    EventManager: EventManagerInterface
)=>{

    const EndRequesterSessionEvent = 'ERSSEV'

    class Requester {
        private __token: string 
        private __userId: string
        private __createdAt: number
        private __updatedAt: number
        private __userStatus: IdentityAuthority.Users.Status.Type
        constructor(token:string,userId:string,userStatus:IdentityAuthority.Users.Status.Type){
            this.__token = token 
            this.__userId = userId
            this.__userStatus = userStatus
            this.__createdAt = Date.now()
            this.__updatedAt = Date.now()
        }
        export(): RequesterSession {
            return {
                tkn: this.__token,
                uid: this.__userId,
                ust: this.__userStatus,
                cat: this.__createdAt,
                upt: this.__updatedAt
            }
        }
    }


    EventManager.__register(EndRequesterSessionEvent)

    const APP_CONFIG = new AppConfig
    let TENANT_ID: string|null = null
    const storageKey = 'requester_session'

    /**
     * To allow invoking the getValidRequesterSession anywhere, we cached the data
     * to avoid calling the refresh token again. As this data is saved on closure, 
     * it's valid only as soon as the page is active
     */
    let CachedRequesterSession:RequesterSession|null = null

    const getValidSession = (): Promise<RequesterSession> => {
        return new Promise(async (resolve,reject)=>{
            try {
                if (CachedRequesterSession!==null) {
                    resolve(CachedRequesterSession)
                    return
                }
                const storedSession = localStorage.getItem(storageKey)
                if (storedSession===null) {
                    throw new Error('No stored requester session')
                }
                if (storedSession!==null) {
                    const requesterSession: RequesterSession = JSON.parse(storedSession)
                    const token = requesterSession.tkn ?? null
                    if (token===null) {
                        throw new Error('Invalid requester token')
                    }
                    const userId = requesterSession.uid ?? null
                    if (userId===null) {
                        throw new Error('Invalid requester userid')
                    }
                    const userStatus = requesterSession.ust ?? null
                    if (userStatus===null) {
                        throw new Error('Invalid requester status')
                    }
                    const existingToken = requesterSession.tkn 
                    IAuthTokenManager.__setTenantId(TENANT_ID ?? APP_CONFIG.__getTenantId())
                    const refreshedToken = await IAuthTokenManager.__refreshIdAuthToken(existingToken)
                    requesterSession.tkn = refreshedToken
                    localStorage.setItem(storageKey,JSON.stringify(requesterSession))
                    CachedRequesterSession = {
                        tkn: refreshedToken,
                        uid: requesterSession.uid,
                        ust: requesterSession.ust,
                        cat: requesterSession.cat,
                        upt: Date.now()
                    }
                    resolve(CachedRequesterSession)
                }
            } catch (error) {
                localStorage.removeItem('arse')
                localStorage.removeItem('requester_snippet')
                localStorage.removeItem(storageKey)
                reject(error)
            }
        })
    }

    return {
        __setTenantId:(tenantId)=>{
            TENANT_ID = tenantId
        },
        __createRequesterSession(params) {
            return new Promise(async (resolve,reject)=>{
                try {
                    if (params.provider==='idauth') {
                        IAuthTokenManager.__setTenantId(TENANT_ID ?? APP_CONFIG.__getTenantId())
                        const response = await IAuthTokenManager.__getTokenUsingEmailAndPassword(
                            params.emailAddress,
                            params.password,
                            params.recaptchaToken
                        )
                        if (!response.is_user_registered) {
                            localStorage.removeItem(storageKey)
                            throw new Error('User is not registered')
                        }
                        if (response.access_type==='prohibited') {
                            localStorage.removeItem(storageKey)
                            location.href = '/restricted?status='+response.user_status
                            return
                        }
                        if (response.access_type==='allowed'||response.access_type==='limited') {
                            const requester = new Requester(response.token,response.user_id,response.user_status)
                            localStorage.setItem(storageKey,JSON.stringify(requester.export()))
                        }
                        resolve({})
                        return
                    } 
                    const never: never = params.provider
                    throw new Error('Identity provider not yet implemented '+params.provider)
                } catch (error) {
                    reject(error)
                }
            })
        },
        __getValidRequesterSession:()=>{
            return getValidSession()
        },
        __setRequesterStatus(status){
            return new Promise(async (reject,resolve)=>{
                try {
                    const requesterSession = await getValidSession()
                    requesterSession.ust = status
                    requesterSession.upt = Date.now()
                    localStorage.setItem(storageKey,JSON.stringify(requesterSession))
                    resolve({})
                } catch (error) {
                    reject(error)
                }
            })
        },
        __endRequesterSession:()=>{
            EventManager.__dispatch(EndRequesterSessionEvent)
            localStorage.removeItem('arse')
            localStorage.removeItem('requester_snippet')
            localStorage.removeItem(storageKey)
        },
        __events:()=>{
            return {
                __subscribe: {
                    __endSession: (callback)=>{
                        EventManager.__subscribe(EndRequesterSessionEvent,callback)
                    }
                }
            }
        }
    }
})