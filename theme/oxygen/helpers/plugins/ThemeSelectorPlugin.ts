import { BlockAPI, PatchAPI, ScopeObject, app } from "../../interfaces/app"
import { GlobalWindowObject } from "../../interfaces/window"

export interface ThemeSelectorPlugin {
    
}
app.helper<ThemeSelectorPlugin>('ThemeSelectorPlugin',(
    $scope: ScopeObject<ThemeSelectorPluginScope>,
    $block: BlockAPI,
    $patch: PatchAPI
)=>{
    const themeNames:Array<SlateThemeVariant> = ['light','dark']
    const namespace = '/Plugins/ThemeSelector/'
    const GlobalWindowObject = window as GlobalWindowObject
    const switchThemeTo = async (theme:SlateThemeVariant)=>{
        $scope.ThemeSelector.isDarkTheme = (theme==='dark')
        const nonSelectedThemes:Array<string> = themeNames.filter(themeName => themeName !== theme)
        const bodyElement = document.querySelector('body')
        nonSelectedThemes.forEach(removableTheme=>{
            bodyElement.classList.remove(removableTheme)
        })
        bodyElement.classList.add(theme)
        localStorage.setItem('slate-theme',theme)
        GlobalWindowObject.slate.theme.name = theme
        await $patch(namespace)
    }
    $scope.ThemeSelector = {
        isDarkTheme: (GlobalWindowObject.slate.theme.name === 'dark'),
        switchTheme: () => {
            if ($scope.ThemeSelector.isDarkTheme) {
                switchThemeTo('dark')
                return
            } 
            switchThemeTo('light')
        }
    }
    return {}
})

type SlateThemeVariant = 'dark' | 'light'

type ThemeSelectorPluginScope = {
    ThemeSelector: {
        isDarkTheme: boolean,
        switchTheme:()=>void
    }
}