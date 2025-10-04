import { useMemo } from "react"
import { useNavigate } from "react-router"
import { baseUrl, sideNavMenues } from "../constant"
import Button from "src/components/ui/button"
import { useThreeColumnTemplate } from "src/templates/three-column-template"

const LeftSideContent = () =>{
    const navigate = useNavigate()
    
    const menuComponent = useMemo(()=>{
        return([...sideNavMenues])
    },[])

    const { setIsShowLeftContent } = useThreeColumnTemplate(); 
    
    return(
        <>
            {
                menuComponent.map((section)=>(
                    <div key={section.id} style={{ marginBottom:'var(--space-400)'}}>
                        {
                            (section.txtLable)&&(
                                <p className='text-sub' style={{marginBottom:'var(--space-100)', marginLeft:"var(--space-100)"}}>{section.txtLable}</p>
                            )
                        }
                        <div style={{display:'grid', gap:'var(--space-50)'}}>
                            {
                                (section.menu).map((menu)=>(
                                    <Button
                                        className='side-nav-button'
                                        appearance='subtle'
                                        key={menu.id}
                                        txtLabel={<div style={{flexGrow:'1', textAlign:'start'}}>{menu.txtLable}</div>}
                                        onClick={()=>{
                                            navigate(`${baseUrl}${menu.to}`)
                                            setIsShowLeftContent(false)
                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default LeftSideContent