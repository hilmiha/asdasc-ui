import Button from "src/components/ui/button"
import { useThreeColumnTemplate } from "src/templates/three-column-template/context"
import type { rightSideSectionType } from ".."

const RightSideContent = ({
    sectionOn,
    sectionList,
    scrollToSection,
}:{
    sectionOn:string,
    sectionList: rightSideSectionType[]
    scrollToSection: (id: string) => void
}) =>{
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