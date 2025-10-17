import { useEffect } from "react"
import { useDocModule } from "../../context"
import { PiBarricadeBold, PiCraneBold } from "react-icons/pi"

const UnterConstruction = () =>{
    const {
        setPageOn,
        setSectionList
    } = useDocModule()

    useEffect(()=>{
        setPageOn('')
        setSectionList([])
    },[])

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
                    gap:'var(--space-200)'
                }}
            >
                <PiBarricadeBold size={20}/> 
                <p className="text-title-lg">Under Construction</p>
                <PiBarricadeBold size={20}/>
            </div>
        </div>
    )
}

export default UnterConstruction