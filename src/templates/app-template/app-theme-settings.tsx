import { PiCircleBold, PiCircleFill, PiMoonBold, PiSunBold, PiTextTBold } from "react-icons/pi"
import { useContext } from "react"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import { BiSquare, BiSquareRounded } from "react-icons/bi"
import IconButton from "src/components/ui/icon-button"
import RadioToggle from "src/components/composite/radio-toggle"

const AppThemeSetting = () =>{
    const {
        globalColors,
        appTheme,
        toggleGlobalPrimary,
        toggleGlobalTheme,
        toggleGlobalTone,
        toggleGlobalShape,
        toggleGlobalFontSize,
    } = useContext(GlobalContext) as _GlobalContextType

    return(
        <div style={{
            display:'grid',
            gap:'var(--space-250)'
        }}>
            <div>
                <p className="text-title" style={{marginBottom:'var(--space-100)'}}>Global Theme</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                    <RadioToggle
                        type="vertical"
                        icon={<PiSunBold className="global-icon"/>}
                        txtLabel='Light Mode'
                        isSelected={appTheme.globalTheme==='light'}
                        onClick={()=>{toggleGlobalTheme('light')}}
                    />
                    <RadioToggle
                        type="vertical"
                        icon={<PiMoonBold className="global-icon"/>}
                        txtLabel='Dark Mode'
                        isSelected={appTheme.globalTheme==='dark'}
                        onClick={()=>{toggleGlobalTheme('dark')}}
                    />
                </div>
            </div>
            <div style={{borderTop:'1px solid var(--clr-border)'}}/>
            <div>
                <p className="text-title" style={{marginBottom:'var(--space-100)'}}>Tone Color</p>
                <div style={{display:"flex", flexWrap:'wrap', gap:'var(--space-0)', justifyContent:'center'}}>
                    {
                        globalColors.map((clr)=>(
                            <IconButton
                                key={clr}
                                txtLabel={clr}
                                isShowtooltip={false}
                                onClick={()=>{toggleGlobalTone(clr)}}
                                isSelected={appTheme.globalTone===`tonal_${clr}`}
                                icon={
                                    <div
                                        style={{
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            height:'var(--space-250)',
                                            width:'var(--space-250)',
                                            borderRadius:'var(--space-250)',
                                            background:`var(--clr-${clr}-500)`,
                                            color:`${appTheme.globalTone===`tonal_${clr}`?`var(--clr-${clr}-100)`:'transparent'}`
                                        }}
                                    >
                                        <PiCircleFill size={10}/>
                                    </div>
                                }
                            />
                        ))
                    }
                </div>
            </div>
            <div style={{borderTop:'1px solid var(--clr-border)'}}/>
            <div>
                <p className="text-title" style={{marginBottom:'var(--space-100)'}}>Primary Color</p>
                <div style={{display:"flex", flexWrap:'wrap', gap:'var(--space-0)', justifyContent:'center'}}>
                    {
                        globalColors.map((clr)=>(
                            <IconButton
                                key={clr}
                                txtLabel={clr}
                                isShowtooltip={false}
                                onClick={()=>{toggleGlobalPrimary(clr)}}
                                isSelected={appTheme.globalPrimary===`primary_${clr}`}
                                icon={
                                    <div
                                        style={{
                                            display:'flex',
                                            alignItems:'center',
                                            justifyContent:'center',
                                            height:'var(--space-250)',
                                            width:'var(--space-250)',
                                            borderRadius:'var(--space-250)',
                                            background:`var(--clr-${clr}-500)`,
                                            color:`${appTheme.globalPrimary===`primary_${clr}`?`var(--clr-${clr}-100)`:'transparent'}`
                                        }}
                                    >
                                        <PiCircleFill size={10}/>
                                    </div>
                                }
                            />
                        ))
                    }
                </div>
            </div>
            <div style={{borderTop:'1px solid var(--clr-border)'}}/>
            <div>
                <p className="text-title" style={{marginBottom:'var(--space-100)'}}>Design System</p>
                <div style={{display:'grid'}}>
                    <RadioToggle
                        type="horizontal"
                        icon={<PiCircleBold className="global-icon"/>}
                        txtLabel='Cicle'
                        onClick={()=>{toggleGlobalShape('circle')}}
                        isSelected={appTheme.globalShape==='circle'}
                    />
                    <RadioToggle
                        type="horizontal"
                        icon={<BiSquareRounded className="global-icon"/>}
                        txtLabel='Rounded'
                        onClick={()=>{toggleGlobalShape('rounded')}}
                        isSelected={appTheme.globalShape==='rounded'}
                    />
                    <RadioToggle
                        type="horizontal"
                        icon={<BiSquare className="global-icon"/>}
                        txtLabel='Square'
                        onClick={()=>{toggleGlobalShape('box')}}
                        isSelected={appTheme.globalShape==='box'}
                    />
                </div>
            </div>
            <div style={{borderTop:'1px solid var(--clr-border)'}}/>
            <div>
                <p className="text-title" style={{marginBottom:'var(--space-100)'}}>Font Size</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
                    <RadioToggle
                        type="vertical"
                        icon={<PiTextTBold style={{fontSize:'var(--font-size-sm)'}}/>}
                        txtLabel='Small'
                        onClick={()=>{toggleGlobalFontSize('small')}}
                        isSelected={appTheme.globalFontSize==='small'}
                    />
                    <RadioToggle
                        type="vertical"
                        icon={<PiTextTBold style={{fontSize:'var(--font-size)'}}/>}
                        txtLabel='Medium'
                        onClick={()=>{toggleGlobalFontSize('medium')}}
                        isSelected={appTheme.globalFontSize==='medium'}
                    />
                    <RadioToggle
                        type="vertical"
                        icon={<PiTextTBold style={{fontSize:'var(--font-size-lg)'}}/>}
                        txtLabel='Large'
                        onClick={()=>{toggleGlobalFontSize('large')}}
                        isSelected={appTheme.globalFontSize==='large'}
                    />
                </div>
            </div>
        </div>
    )
}
export default AppThemeSetting