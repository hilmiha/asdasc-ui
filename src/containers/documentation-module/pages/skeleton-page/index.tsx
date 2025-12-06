import { useEffect } from "react"
import { type _GlobalContextType } from "src/context/global-context"
import { baseUrl } from "../../constant"
import { useNavigate } from "react-router"
import IconButton from "src/components/ui/icon-button"
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi"
import { nextComp, pageId, prevComp, sections } from "./constant"
import PreviewSection from './section/preview-section'
import ApiReferenceSection from './section/api-reference-section'
import { useDocModule } from "src/containers/documentation-module/context"

const SkeletonPage = () =>{
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
                    <p className="text-title-xl">Skeleton</p>
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
                <p>
                    Skeleton component to show loading of components or page.
                </p>
                <PreviewSection/>
            </div>
            <ApiReferenceSection/>
        </div>
    )
}

export default SkeletonPage