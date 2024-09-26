import { app } from "../interfaces/app";
import { AppEnvironment, AppEnvironmentInterface } from "./AppEnvironment";

export interface AppConfigInterface {
    __getTenantId:()=> 'unset' | 'gl6d8zrgp64c03xxmindatalkstaging'
    __getServiceHost:() => ServiceHostResolvers
}

type ServiceHostResolvers = {
    __IdentityAuthority: () => 'unset' | 'http://localhost:8233',
    __IndexerService:() => 'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com',
    __FileUploadService:() => 'http://localhost:8233',
    __FileStorageService:() => 'https://jackfruit-cdn.s3.ap-southeast-1.amazonaws.com',
    __MailmanService:()=>'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com',
    __Mindanode:() => 'unset' | 'http://localhost:8233',
    __Feedle:() => 'unset' | 'http://localhost:8233',
    __Rehearsal:() => 'unset' | 'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com'
    // __Rehearsal:() => 'unset' | 'http://localhost:5389'
}

export type AppConfig = new (...args: any[]) => AppConfigInterface

app.factory('AppConfig',(
    AppEnvironment: AppEnvironment
)=>{
    class AppConfigObject implements AppConfigInterface {
        env:AppEnvironmentInterface
        __getTenantId(){
            if (this.env.getDeploymentName()==='production') {
                return 'unset'
            }
            return 'gl6d8zrgp64c03xxmindatalkstaging'
        }
        __getServiceHost(): ServiceHostResolvers {
            return {
                __IdentityAuthority:()=>{
                    if (this.env.getDeploymentName()==='production') {
                        return 'unset'
                    }
                    return 'http://localhost:8233'
                },
                __IndexerService:()=> {
                    return 'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com'
                },
                __FileUploadService:()=>{
                    return 'http://localhost:8233'
                },
                __FileStorageService:()=>{
                    return 'https://jackfruit-cdn.s3.ap-southeast-1.amazonaws.com'
                },
                __MailmanService:()=>{
                    return 'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com'
                },
                __Mindanode:()=>{
                    if (this.env.getDeploymentName()==='production') {
                        return 'unset'
                    }
                    return 'http://localhost:8233'
                },
                __Feedle:()=>{
                    if (this.env.getDeploymentName()==='production') {
                        return 'unset'
                    }
                    return 'http://localhost:8233'
                },
                __Rehearsal:()=>{
                    if (this.env.getDeploymentName()==='production') {
                        return 'unset'
                    }
                    return 'https://4iehar5trf.execute-api.ap-southeast-1.amazonaws.com'
                }
            }
        }
        constructor(){
            this.env = new AppEnvironment()
        }
    }
    return AppConfigObject
})