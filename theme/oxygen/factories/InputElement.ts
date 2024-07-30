import { BlockAPI, PluncElementInterface, app } from "../interfaces/app"
import { SlateThemeColorPicker } from "../services/slate-theme/SlateThemeColorPicker"


type InputElementHandlerInterface = {
    __showError:(errorMessage:string,showErrorMessage?:boolean)=>void,
    __showLoading:()=>void,
    __showSuccess:()=>void,
    __removeError:()=>void
    __freeze:()=>void
}

export type InputElement = new (blockName:string, $block:BlockAPI) => InputElementHandlerInterface 

app.factory('InputElement',(
    SlateThemeColorPicker: SlateThemeColorPicker
)=>{
    const errorClass         = SlateThemeColorPicker.__pick('color-error')
    const successClass       = SlateThemeColorPicker.__pick('color-success')
    const borderErrorClass   = SlateThemeColorPicker.__pick('border-color-error')
    const borderSuccessClass = SlateThemeColorPicker.__pick('border-color-success')
    
    const clearState=(blockName:string, $block: BlockAPI, clearErrorMessage=true)=>{
        $block(blockName,(BlockWrapper: PluncElementInterface<HTMLFieldSetElement>)=>{
            BlockWrapper.$element.disabled = false
            BlockWrapper.$element.querySelectorAll('[slate-input-icon-block]').forEach(element=>{
                element.setAttribute('style','display:none');
            })
        })
        $block(blockName,(element)=>{
            element.removeClass(borderErrorClass)
            element.removeClass(borderSuccessClass)
        })
        if (clearErrorMessage) {
            $block(blockName+'/Message',(element:PluncElementInterface<HTMLDivElement>)=>{
                element.removeClass(errorClass)
                element.removeClass(successClass)
                element.$element.innerText = '';
            })
        }
    }
    class InputElementHandler implements InputElementHandlerInterface {
        blockName: string;
        $block: BlockAPI;
        state: "error" | "success" | "default";
        constructor(blockName:string, $block:BlockAPI){
            this.blockName = blockName
            this.$block = $block
            this.state = 'default'
        }
        __showError(errorMessage:string,showErrorMessage=true){
            clearState(this.blockName,this.$block,showErrorMessage)
            this.$block(this.blockName, (BlockWrapper)=>{
                BlockWrapper.addClass(borderErrorClass)
                const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="error"]')
                if (RightIcon !== null) {
                    RightIcon.setAttribute('style','display:flex');
                }
            })
            if (showErrorMessage) {
                this.$block(this.blockName+'/Message',(element:PluncElementInterface<HTMLDivElement>)=>{
                    element.addClass(errorClass)
                    element.$element.innerText = errorMessage;
                })
            }
        }
        __showLoading(){
            clearState(this.blockName, this.$block)
            this.$block(this.blockName, (BlockWrapper: PluncElementInterface<HTMLFieldSetElement>)=>{
                BlockWrapper.$element.disabled = true
                const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="loading"]')
                if (RightIcon !== null) {
                    RightIcon.setAttribute('style','display:flex');
                }
            })
        }
        __showSuccess(){
            clearState(this.blockName, this.$block)
            this.$block(this.blockName, (BlockWrapper: PluncElementInterface<HTMLFieldSetElement>)=>{
                const RightIcon = BlockWrapper.$element.querySelector('[slate-input-icon-block="success"]')
                if (RightIcon !== null) {
                    RightIcon.setAttribute('style','display:flex');
                }
            })
        }
        __removeError(){
            clearState(this.blockName,this.$block)
        }
        __freeze(){
            this.$block(this.blockName,(fieldset:PluncElementInterface<HTMLFieldSetElement>)=>{
                fieldset.$element.disabled = true
            })
        }
    }
    return InputElementHandler
})