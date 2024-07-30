import { app } from "../../interfaces/app"

export interface SlateThemeColorPicker {
    __pick:(name:string)=>string|null
}

app.service<SlateThemeColorPicker>('SlateThemeColorPicker',()=>{
    const colorPaletteElementId = 'slate_color_palette'
    return {
        __pick:(name)=>{
            const palette = document.getElementById(colorPaletteElementId)
            if (palette===null) return null 
            const colorItem = palette.querySelector(`[data-color-id="${name}"]`)
            if (colorItem===null) return null 
            const className = colorItem.getAttribute('class')
            return className.trim()
        }
    }
})