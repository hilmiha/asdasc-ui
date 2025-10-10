import { useState } from "react"
import { PiStarFourBold } from "react-icons/pi"
import IconButton from "src/components/ui/icon-button"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [count, setCount] = useState(0)
    
    return(
        <div 
            style={{
                display:'grid',
                gap:'var(--space-100)',
                marginTop:"var(--space-300)",
                alignItems:'center',
            }}
        >
            <PreviewBox>
                <div style={{display:"flex", flexDirection:'column', alignItems:'center'}}>
                    <IconButton 
                        icon={<PiStarFourBold className="global-icon"/>}
                        txtLabel={'Button'}
                        onClick={()=>{setCount(count+1)}}
                    />
                    <p style={{textAlign:'center'}}>{`Count: ${count}`}</p>
                </div>
            </PreviewBox>
            <InputCode
                lang="tsx"
                isDisabled={true}
                value={sampleCode}
                style={{
                    inputCode:{
                        maxHeight:'50vh'
                    }
                }}
            />
        </div>
    )
}

export default PreviewSection


const sampleCode = `import { useState } from "react"
import { PiStarFourBold } from "react-icons/pi"
import IconButton from "src/components/ui/icon-button"

const IconButtonDemo = () =>{

    const [count, setCount] = useState(0)

    return(
        <>
            <IconButton 
                icon={<PiStarFourBold className="global-icon"/>}
                txtLabel={'Button'}
                onClick={()=>{setCount(count+1)}}
            />
            <p style={{textAlign:'center'}}>{\`Count: \${count}\`}</p>
        </>
    )
}`