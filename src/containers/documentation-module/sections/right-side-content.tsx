import Button from "src/components/ui/button"
import type { DocModuleContextValue } from "../context"
import { useThreeColumnTemplate } from "src/templates/three-column-template/context"

const RightSideContent = ({
    ctxValue
}:{
    ctxValue:DocModuleContextValue
}) =>{
    const {
        sectionList,
        sectionOn,
        scrollToSection
    } = ctxValue

    const { 
        isShowRightContent,
        setIsShowRightContent 
    } = useThreeColumnTemplate(); 
    
    return(
        <div className="section-list-box">
            {
                sectionList.map((itm)=>(
                    <Button
                        key={itm.id}
                        className={`section-list-button ${itm.isSub?'sub':''} ${sectionOn===itm.id?'is-on':''}`}
                        appearance="subtle"
                        txtLabel={
                            <div style={{flexGrow:'1', textAlign:'start'}}><p>{itm.txtLabel}</p></div>
                        }
                        onClick={()=>{
                            scrollToSection(itm.id)
                            if(isShowRightContent){
                                setIsShowRightContent(false)
                            }
                        }}
                    />
                ))
            }
        </div>
    )
}

export default RightSideContent