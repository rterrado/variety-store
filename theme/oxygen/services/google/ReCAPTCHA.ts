import { app } from "../../interfaces/app"
import { GlobalWindowObject } from "../../interfaces/window"

export interface ReCAPTCHA {
    __render:(wrapperId:string) => void
    __reset:(wrapperId:string) => void
    __addOnSuccessListener:(listener:(token:string)=>void) => void
}

// grecaptcha.enterprise.reset()


app.service<ReCAPTCHA>('ReCAPTCHA',()=>{
    const render = () => {
    }
    const GlobalWindow = window as GlobalWindowObject
    GlobalWindow.recaponload = () => {}
    setTimeout(()=>{
        const scriptel = document.createElement('script')
        scriptel.type  = 'text/javascript'
        scriptel.async = true
        scriptel.src   = 'https://www.google.com/recaptcha/enterprise.js?onload=recaponload&render=explicit'
        const tElement = document.getElementsByTagName('script')[0]
        tElement.parentNode.insertBefore(scriptel,tElement)
    },500)
    const ChallengeCtrl = {
        __display: (wrapperId:string) => {
            document.getElementById(wrapperId).setAttribute('style','display:block;')
        },
        __hide: (wrapperId:string) => {
            document.getElementById(wrapperId).setAttribute('style','display:none;')
        }
    }
    let onSuccessListener = (token:string) => {
        console.log('no listener registered')
    }
    return {
        __render:(wrapperId)=>{
            ChallengeCtrl.__display(wrapperId)
            // @ts-ignore
            grecaptcha.enterprise.render(wrapperId, {
                'sitekey' : '6LegqQYqAAAAAA18VSfBvi5O3xCisZBw-iPRicCB',
                'action': 'LOGIN',
                'callback': (token:string)=>{
                    onSuccessListener(token)
                }
            });
        },
        __reset:(wrapperId)=>{
            ChallengeCtrl.__hide(wrapperId)
            // @ts-ignore
            grecaptcha.enterprise.reset()
        },
        __addOnSuccessListener:(listener)=>{
            onSuccessListener = listener
        }
    }
})