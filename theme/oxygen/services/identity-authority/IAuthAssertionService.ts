import { app } from "../../interfaces/app";
import { IdentityAuthority } from "../../interfaces/identity-authority/interface";

export interface IAuthAssertionService {
    isValidEmail: (emailAddress: string)=>Promise<boolean>
    isUniqueEmail: (emailAddress: string)=>Promise<boolean>
}

app.service<IAuthAssertionService>('IAuthAssertionService', ()=>{
    function assertValidEmail(email:any): asserts email is IdentityAuthority.Users.Types.EmailAddress {
        if (email === null || email.length < 5 || email.length > 64) {
            throw new Error()
        }
        if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
            throw new Error()
        }
    }
    return {
        isValidEmail: (email)=>{
            return new Promise(async (resolve, reject)=>{
                try {
                    assertValidEmail(email)
                    resolve(true)
                } catch (error) {
                    console.error('email address did not pass validation')
                    resolve(false)
                }
            })
        },
        isUniqueEmail: (email)=>{
            return new Promise(async (resolve, reject)=>{
                try {
                    assertValidEmail(email)
                    resolve(true)
                } catch (error) {
                    console.error('email address did not pass validation')
                    resolve(false)
                }
            })
        }
    }
})