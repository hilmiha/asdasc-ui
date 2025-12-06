import { PiMoonBold, PiSunBold } from 'react-icons/pi'
import './styles.scss'
import { useContext } from "react"
import IconButton from "src/components/ui/icon-button"
import Switch from "src/components/ui/switch-button/switch"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"


const ThemeSwitchSection =  () =>{
    const {
        appTheme,
        toggleGlobalTheme,
    } = useContext(GlobalContext) as _GlobalContextType

    return(
        <div>
            <IconButton 
                className='theme-button'
                icon={
                    <>
                        <PiMoonBold className='global-icon theme-icon-dark'/>
                        <PiSunBold className='global-icon theme-icon-light'/>
                        <Switch isSelected={appTheme['globalTheme']==='dark'}/>
                    </>
                } 
                onClick={()=>{toggleGlobalTheme()}} 
                txtLabel="Theme" 
                appearance="subtle" 
            />
        </div>
    )
}

export default ThemeSwitchSection