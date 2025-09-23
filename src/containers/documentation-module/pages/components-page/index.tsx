import { useContext } from "react"
import Button from "src/components/ui/button"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import { baseUrl, componentList } from "../../constant"
import { useNavigate } from "react-router"
import IconButton from "src/components/ui/icon-button"
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi"

const ComponentsPage = () =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    const navigate = useNavigate()

    return(
        <div
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
                    <div style={{display:'flex', gap:'var(--space-25)'}}>
                        <IconButton
                            icon={<PiArrowLeftBold className="global-icon"/>}
                            txtLabel="to Get Started"
                            onClick={()=>{navigate(`${baseUrl}`)}}
                        />
                        <IconButton
                            icon={<PiArrowRightBold className="global-icon"/>}
                            txtLabel="to Colors"
                            onClick={()=>{navigate(`${baseUrl}/colors`)}}
                        />
                    </div>
                </div>
                <p>The collection currently includes the following components and is actively being expanded.</p>
            </div>
            
            <div
                style={{
                    display:'grid',
                    gridTemplateColumns:(screenSize==='laptop')?('1fr 1fr 1fr'):(screenSize==='tablet')?('1fr 1fr'):('1fr'),
                }}
            >
                {
                    componentList.map((menu)=>(
                        <Button
                            appearance='subtle'
                            key={menu.id}
                            txtLabel={menu.txtLable}
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
        </div>
    )
}

export default ComponentsPage