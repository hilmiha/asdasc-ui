import { useEffect } from "react"
import { type _GlobalContextType } from "src/context/global-context"
import { baseUrl } from "../../constant"
import { useNavigate } from "react-router"
import IconButton from "src/components/ui/icon-button"
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi"
import { nextComp, prevComp, sections } from "./constant"
import PreviewSection from './section/preview-section'
import ApiReferenceSection from './section/api-reference-section'
import ExampleSection from './section/example-section'
import KeyboardInteractionsSection from "./section/keyboard-interactions-section"
import Button from "src/components/ui/button"
import { useDocModule } from "src/containers/documentation-module/context"

const DropdownPage = () =>{
    const {
        setSectionList,
        setSectionRef
    } = useDocModule()

    const navigate = useNavigate()

    useEffect(()=>{
        setSectionList(sections)
    },[])

    return(
        <div
            style={{
                display:'grid',
                gap:'var(--space-400)'
            }}
        >
            <div
                id="preview"
                ref={setSectionRef('preview')} 
                style={{
                    display:'grid',
                    gap:'var(--space-100)',
                    alignItems:'center',
                }}
            >
                <div style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>
                    <p className="text-title-xl">Dropdown</p>
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
                <p>
                    A dropdown that opens within a portal, triggered and anchored by its associated button.
                </p>
                <PreviewSection/>
            </div>
            <ApiReferenceSection/>
            <ExampleSection/>
            <KeyboardInteractionsSection/>
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

export default DropdownPage