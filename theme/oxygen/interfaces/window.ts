import { FireAuthSignInRespose } from "./fireauth"

export type GlobalWindowObject = Window & typeof globalThis & {
    deployment: {
        name: 'production' | 'default'
    },
    slate: {
        theme: {
            name: 'light' | 'dark'
        }
    }
    FIREBASE: {
        apiKey: string,
        analytics: FirebaseGetAnalyticsReturnType,
        auth: FirebaseGetAuthReturnType,
        signInWith: {
            emailAndPassword: (auth:FirebaseGetAuthReturnType,email:string,password:string)=> Promise<FireAuthSignInRespose>
        }
        registerWith: {
            emailAndPassword: (auth:FirebaseGetAuthReturnType,email:string,password:string)=> Promise<FireAuthSignInRespose>
        },
        actions: {
            sendPasswordResetEmail:  (auth:FirebaseGetAuthReturnType,email:string)=> Promise<{}>
        }
    }
    recaponload: () => void
    gtag:(
        type: string,
        name: string,
        params: {[key:string]:any}
    )=>void
}

type FirebaseGetAuthReturnType = {
    clientVersion: string,
    currentUser: null,
    emulatorConfig: null
}

type FirebaseGetAnalyticsReturnType = {
    config:()=>{
        automaticDataCollectionEnabled: boolean
    }
}