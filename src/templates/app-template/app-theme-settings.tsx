import { PiCircleBold, PiCircleFill, PiMoonBold, PiSunBold, PiTextTBold } from "react-icons/pi"
import Button from "../../components/button"
import { useContext, useMemo } from "react"
import { GlobalContext, type _GlobalContextType } from "../../context/global-context"
import { BiSquare, BiSquareRounded } from "react-icons/bi"
import IconButton from "../../components/icon-button"
import Radio from "../../components/radio-button/radio"

const AppThemeSetting = () =>{

    const {
        appTheme,
        toggleGlobalPrimary,
        toggleGlobalTheme,
        toggleGlobalTone,
        toggleGlobalShape,
        toggleGlobalFontSize,
    } = useContext(GlobalContext) as _GlobalContextType

    const colors = useMemo(()=>{
        return ['rose', 'red', 'orange', 'yellow', 'lime', 'green', 'emerald', 'teal', 'blue', 'purple', 'magenta', 'grey', 'stone', 'black']
    },[])

    return(
        <div>
            <div style={{borderBottom:'1px solid var(--clr-border)', paddingBottom:'var(--space-150)'}}>
                <p style={{fontWeight:'var(--font-weight-bold)', marginBottom:'var(--space-50)'}}>Global Theme</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                    <Button
                        className="font-toggle-button"
                        iconBefore={<PiSunBold className="global-icon"/>}
                        iconAfter={<Radio isSelected={appTheme.globalTheme==='light'}/>}
                        txtLabel={'Light Mode'}
                        onClick={()=>{toggleGlobalTheme('light')}}
                        isSelected={appTheme.globalTheme==='light'}
                    />
                    <Button
                        className="font-toggle-button"
                        iconBefore={<PiMoonBold className="global-icon"/>}
                        iconAfter={<Radio isSelected={appTheme.globalTheme==='dark'}/>}
                        txtLabel={'Dark Mode'}
                        onClick={()=>{toggleGlobalTheme('dark')}}
                        isSelected={appTheme.globalTheme==='dark'}
                    />
                </div>
            </div>
            <div style={{borderBottom:'1px solid var(--clr-border)', paddingBottom:'var(--space-150)', marginTop:'var(--space-150)'}}>
                <p style={{fontWeight:'var(--font-weight-bold)', marginBottom:'var(--space-50)'}}>Tone Color</p>
                <div style={{display:"flex", flexWrap:'wrap', gap:'var(--space-50)', justifyContent:'center'}}>
                    {
                        colors.map((clr)=>(
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
            <div style={{borderBottom:'1px solid var(--clr-border)', paddingBottom:'var(--space-150)', marginTop:'var(--space-150)'}}>
                <p style={{fontWeight:'var(--font-weight-bold)', marginBottom:'var(--space-50)'}}>Primary Color</p>
                <div style={{display:"flex", flexWrap:'wrap', gap:'var(--space-50)', justifyContent:'center'}}>
                    {
                        colors.map((clr)=>(
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
            <div style={{borderBottom:'1px solid var(--clr-border)', paddingBottom:'var(--space-150)', marginTop:'var(--space-150)'}}>
                <p style={{fontWeight:'var(--font-weight-bold)', marginBottom:'var(--space-50)'}}>Design System</p>
                <div style={{display:'grid'}}>
                    <Button
                        className="shape-toggle-button"
                        iconBefore={<PiCircleBold className="global-icon"/>}
                        iconAfter={<Radio isSelected={appTheme.globalShape==='circle'}/>}
                        txtLabel={'Cicle'}
                        onClick={()=>{toggleGlobalShape('circle')}}
                        isSelected={appTheme.globalShape==='circle'}
                        style={{
                            button:{
                                justifyContent:'start'
                            }
                        }}
                    />
                    <Button
                        className="shape-toggle-button"
                        iconBefore={<BiSquareRounded className="global-icon"/>}
                        iconAfter={<Radio isSelected={appTheme.globalShape==='rounded'}/>}
                        txtLabel={'Rounded'}
                        onClick={()=>{toggleGlobalShape('rounded')}}
                        isSelected={appTheme.globalShape==='rounded'}
                        style={{
                            button:{
                                justifyContent:'start'
                            }
                        }}
                    />
                    <Button
                        className="shape-toggle-button"
                        iconBefore={<BiSquare className="global-icon"/>}
                        iconAfter={<Radio isSelected={appTheme.globalShape==='box'}/>}
                        txtLabel={'Square'}
                        onClick={()=>{toggleGlobalShape('box')}}
                        isSelected={appTheme.globalShape==='box'}
                        style={{
                            button:{
                                justifyContent:'start'
                            }
                        }}
                    />
                </div>
            </div>
            <div style={{marginTop:'var(--space-150)'}}>
                <p style={{fontWeight:'var(--font-weight-bold)', marginBottom:'var(--space-50)'}}>Font Size</p>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
                    <Button
                        className="font-toggle-button"
                        iconBefore={<PiTextTBold style={{fontSize:'var(--font-size-sm)'}}/>}
                        iconAfter={<Radio isSelected={appTheme.globalFontSize==='small'}/>}
                        txtLabel={'Small'}
                        onClick={()=>{toggleGlobalFontSize('small')}}
                        isSelected={appTheme.globalFontSize==='small'}
                    />
                    <Button
                        className="font-toggle-button"
                        iconBefore={<PiTextTBold style={{fontSize:'var(--font-size)'}}/>}
                        iconAfter={<Radio isSelected={appTheme.globalFontSize==='medium'}/>}
                        txtLabel={'Medium'}
                        onClick={()=>{toggleGlobalFontSize('medium')}}
                        isSelected={appTheme.globalFontSize==='medium'}
                    />
                    <Button
                        className="font-toggle-button"
                        iconBefore={<PiTextTBold style={{fontSize:'var(--font-size-lg)'}}/>}
                        iconAfter={<Radio isSelected={appTheme.globalFontSize==='large'}/>}
                        txtLabel={'Large'}
                        onClick={()=>{toggleGlobalFontSize('large')}}
                        isSelected={appTheme.globalFontSize==='large'}
                    />
                </div>
            </div>
        </div>
    )
}
export default AppThemeSetting