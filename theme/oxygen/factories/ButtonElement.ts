import { PluncAppInstance, PluncElementInterface, app } from "../interfaces/app"

type ButtonElementStates = 'disabled' | 'spinner' | 'active'

type ButtonElementHandlerInterface = {
    state: ButtonElementStates
    buttonElement: PluncElementInterface<HTMLButtonElement>
    /**
     * Activates the button spinner, making the button unusuable
     */
    __freeze:()=>void

    /**
     * Deactivates the button spinner, making the button clickable again
     */
    __defrost:()=>void
}

export type ButtonElement = new (button:PluncElementInterface<HTMLButtonElement>) => ButtonElementHandlerInterface

app.factory('ButtonElement',()=>{
    class ButtonElementHandler implements ButtonElementHandlerInterface {
        buttonElement: PluncElementInterface<HTMLButtonElement>;
        state: ButtonElementStates = 'active'
        constructor(button:PluncElementInterface<HTMLButtonElement>) {
            this.buttonElement = button
        }
        __freeze(){
            this.buttonElement.$element.disabled = true 
            this.buttonElement.addClass('--slate-spinning-button')
        }
        __defrost(){
            this.buttonElement.$element.disabled = false 
            this.buttonElement.removeClass('--slate-spinning-button')
        }
    }
    return ButtonElementHandler
})