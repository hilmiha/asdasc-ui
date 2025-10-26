import { PiBarricadeBold, PiCraneBold } from "react-icons/pi"
import { useNavigate } from "react-router"
import Button from "src/components/ui/button"

const GenerateColorsModule = () =>{
    const navigate = useNavigate()
    return(
        <div 
            // className="global-radius"
            style={{
                height:'40vh',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                color:"var(--clr-surface-4)",
                border:'1px dashed var(--clr-border)',
                borderRadius:'var(--global-radius)',
                backgroundImage:'var(--global-disbaled-bg)'
            }}
        >
            <PiCraneBold className="global-icon" size={48}/>
            <div
                style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'var(--space-200)',
                }}
            >
                <PiBarricadeBold size={20}/> 
                <p className="text-title-lg">Under Construction</p>
                <PiBarricadeBold size={20}/>
                
            </div>
            <p className="text" style={{marginBottom:'var(--space-300)'}}>This page is currently under development. Please check back soon.</p>
            <Button 
                txtLabel={'Back to Colors'}
                onClick={()=>{navigate('/docs/colors')}}
            />
        </div>
    )
}

export default GenerateColorsModule