import { useContext, useEffect } from "react"
import Button from "src/components/ui/button"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import { baseUrl, componentList } from "../../constant"
import { useNavigate } from "react-router"
import IconButton from "src/components/ui/icon-button"
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi"
import { useDocModule } from "src/containers/documentation-module/context"
import { nextComp, pageId, prevComp, sections } from "./constant"

const ComponentsPage = () =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    
    const {
        setSectionList,
        setSectionRef,
        setPageOn,
    } = useDocModule()
    const navigate = useNavigate()

    useEffect(()=>{
        setPageOn(pageId)
        setSectionList(sections)
    },[])

    return(
        <div
            id="components"
            ref={setSectionRef('components')} 
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
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <p className="text-title-xl">Components</p>
                    <div style={{display:'flex', gap:'var(--space-100)'}}>
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
                <p>The collection currently includes the following components and is actively being expanded.</p>
            </div>
            
            <div
                style={{
                    display:'grid',
                    gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                    gap:'var(--space-100)'
                }}
            >
                {
                    componentList.map((menu)=>(
                        <Button
                            appearance='subtle'
                            key={menu.id}
                            txtLabel={menu.txtLabel}
                            onClick={()=>{navigate(`${baseUrl}${menu.to}`)}}
                            style={{
                                button:{
                                    padding:'var(--space-150) var(--space-50)',
                                    border:'1px solid var(--clr-border)'
                                },
                            }}
                        />
                    ))
                }
                
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

export default ComponentsPage