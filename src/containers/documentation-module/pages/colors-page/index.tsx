import { useContext, useEffect, useMemo } from "react"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import { baseUrl } from "../../constant"
import { useNavigate } from "react-router"
import IconButton from "src/components/ui/icon-button"
import { PiArrowLeftBold, PiArrowRightBold, PiPaintBrushBold } from "react-icons/pi"
import { toTitleCase } from "src/helper/helper"
import Button from "src/components/ui/button"
import { useDocModule } from "src/containers/documentation-module/context"
import { nextComp, prevComp, sections } from "./constant"

const ColorsPage = () =>{
    const {
        screenSize,
        appTheme,
        globalColors
    } = useContext(GlobalContext) as _GlobalContextType
    const {
        setSectionList,
        setSectionRef
    } = useDocModule()


    useEffect(() => {
        setSectionList(sections)
    }, [])
    
    const semanticColors = useMemo(()=>{
        return(['primary', 'success', 'warning', 'danger'])
    },[])
    const colorShade = useMemo(()=>{
        return([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000])
    },[])
    const surfaceColorShade = useMemo(()=>{
        return([1, 2, 3, 4, 5, 6])
    },[])

    const navigate = useNavigate()

    return(
        <div
            style={{
                display:'grid',
                gap:'var(--space-400)'
            }}
        >
            <div
                id="colors"
                ref={setSectionRef('colors')} 
                style={{
                    display:'grid',
                    gap:'var(--space-100)',
                    alignItems:'center'
                }}
            >
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <p className="text-title-xl">Colors</p>
                    <div style={{display:'flex', gap:'var(--space-25)'}}>
                        <IconButton
                            icon={<PiArrowLeftBold className="global-icon"/>}
                            txtLabel={`to ${prevComp.name}`}
                            onClick={()=>{navigate(`${baseUrl}${prevComp.path}`)}}
                        />
                        <IconButton
                            icon={<PiArrowRightBold className="global-icon"/>}
                            txtLabel={`to ${nextComp.name}`}
                            onClick={()=>{navigate(`${baseUrl}${nextComp.path}`)}}
                        />
                    </div>
                </div>
                <p>The used color system provides a consistent palette for building accessible, expressive interfaces. It's designed to work across light, dark, and high-contrast themes, with enough flexibility to support custom branding.</p>
                <Button
                    isSelected
                    iconBefore={<PiPaintBrushBold className="global-icon" size={32}/>}
                    iconAfter={screenSize!=='mobile'?(<PiArrowRightBold className="global-icon"/>):(undefined)}
                    txtLabel={
                        <div style={{padding:'var(--space-100)', flexGrow:'1', display:'flex', flexDirection:'column', alignItems:'start', gap:"var(--space-50)"}}>
                            <p style={{textAlign:'start', display:'flex', gap:'var(--space-200)', alignItems:'center', justifyContent:'space-between', width:'100%'}}>Generate your own colors palate to use {screenSize==='mobile'?(<PiArrowRightBold className="global-icon"/>):(undefined)}</p>
                            <p className="text-sub" style={{fontWeight:'var(--font-weight-normal)', textAlign:'start', fontSize:'var(--font-size-sm)'}}>Pick dark and light shade of a collor you chose to generate swatches of colors</p>
                        </div>
                    }
                    style={{
                        button:{
                            justifyContent:'start',
                        },
                    }}
                    onClick={()=>{navigate('/generate-colors')}}
                />
            </div>
            <div
                id="primary"
                ref={setSectionRef('primary')}
                style={{
                    display:'grid',
                    gap:'var(--space-400)'
                }}
            >
                <div
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        alignItems:'center'
                    }}
                >
                    <p className="text-title-lg">Primary Colors</p>
                    <p>Used as primary color and as basis of other colors.</p>
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    {
                        globalColors.map((color)=>(
                            <div key={color} style={{display:'grid', gap:'var(--space-50)'}}>
                                {
                                    colorShade.map((shade)=>(
                                        <div
                                            key={`${shade}`}
                                            className="global-radius"
                                            style={{
                                                fontSize:'var(--font-size-sm)',
                                                backgroundColor:`var(--clr-${color}-${shade})`,
                                                padding:"var(--space-100) var(--space-200)",
                                                color:(appTheme.globalTheme.includes('light')?((shade<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((shade<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))
                                            }}
                                        >
                                            {`${toTitleCase(color)} ${shade}`}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div
                id="semantic"
                ref={setSectionRef('semantic')}
                style={{
                    display:'grid',
                    gap:'var(--space-400)'
                }}
            >
                <div
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        alignItems:'center'
                    }}
                >
                    <p className="text-title-lg">Semantic Colors</p>
                    <p>Colors that provide visual feedback for things like form validation, toast notifications, or button states</p>
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    {
                        semanticColors.map((color)=>(
                            <div key={color} style={{display:'grid', gap:'var(--space-50)'}}>
                                {
                                    colorShade.map((shade)=>(
                                        <div
                                            key={`${shade}`}
                                            className="global-radius"
                                            style={{
                                                fontSize:'var(--font-size-sm)',
                                                backgroundColor:`var(--clr-${color}-${shade})`,
                                                padding:"var(--space-100) var(--space-200)",
                                                color:(appTheme.globalTheme.includes('light')?((shade<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((shade<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))
                                            }}
                                        >
                                            {`${toTitleCase(color)} ${shade}`}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div
                id="surface"
                ref={setSectionRef('surface')}
                style={{
                    display:'grid',
                    gap:'var(--space-400)'
                }}
            >
                <div
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        alignItems:'center'
                    }}
                >
                    <p className="text-title-lg">Surface Colors</p>
                    <p>Used as tonal color like background color.</p>
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    {
                        globalColors.map((color)=>(
                            <div key={color} style={{display:'grid', gap:'var(--space-50)'}}>
                                {
                                    surfaceColorShade.map((shade)=>(
                                        <div
                                            key={`${shade}`}
                                            className="global-radius"
                                            style={{
                                                fontSize:'var(--font-size-sm)',
                                                backgroundColor:`var(--clr-surface-${color}-${shade})`,
                                                padding:"var(--space-100) var(--space-200)",
                                                color:(appTheme.globalTheme.includes('light')?((shade<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((shade<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))
                                            }}
                                        >
                                            {`${toTitleCase(color)} surface ${shade}`}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
            <div
                id="border"
                ref={setSectionRef('border')}
                style={{
                    display:'grid',
                    gap:'var(--space-400)'
                }}
            >
                <div
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        alignItems:'center'
                    }}
                >
                    <p className="text-title-lg">Border Colors</p>
                    <p>Used as border of components.</p>
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    <div
                        className="global-radius"
                        style={{
                            fontSize:'var(--font-size-sm)',
                            backgroundColor:`var(--clr-border)`,
                            padding:"var(--space-100) var(--space-200)",
                        }}
                    >
                        {`Border`}
                    </div>
                    
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    {
                        semanticColors.map((color)=>(
                            <div key={color} style={{display:'grid', gap:'var(--space-50)'}}>
                                <div
                                    className="global-radius"
                                    style={{
                                        fontSize:'var(--font-size-sm)',
                                        backgroundColor:`var(--clr-border-${color})`,
                                        padding:"var(--space-100) var(--space-200)",
                                    }}
                                >
                                    {`${toTitleCase(color)} border`}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div
                    style={{
                        display:'grid',
                        gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                        gap:'var(--space-200)'
                    }}
                >
                    
                    {
                        globalColors.map((color)=>(
                            <div key={color} style={{display:'grid', gap:'var(--space-50)'}}>
                                <div
                                    className="global-radius"
                                    style={{
                                        fontSize:'var(--font-size-sm)',
                                        backgroundColor:`var(--clr-border-${color})`,
                                        padding:"var(--space-100) var(--space-200)",
                                    }}
                                >
                                    {`${toTitleCase(color)} border`}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{display:'flex', gap:'var(--space-25)', justifyContent:'space-between', marginTop:'var(--space-500)'}}>
                <Button
                    iconBefore={<PiArrowLeftBold className="global-icon"/>}
                    txtLabel={`${prevComp.name}`}
                    onClick={()=>{navigate(`${baseUrl}${prevComp.path}`)}}
                />
                <Button
                    iconAfter={<PiArrowRightBold className="global-icon"/>}
                    txtLabel={`${nextComp.name}`}
                    onClick={()=>{navigate(`${baseUrl}${nextComp.path}`)}}
                />
            </div>
        </div>
    )
}

export default ColorsPage