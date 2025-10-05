import { PiStarFourBold } from "react-icons/pi"
import IconButton from "src/components/ui/icon-button"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
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
                <div style={{display:"flex", justifyContent:'center'}}>
                    <IconButton 
                        icon={<PiStarFourBold className="global-icon"/>}
                        txtLabel={'Button'}
                        onClick={()=>{alert("Button Clicked");}}
                    />
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


const sampleCode = `import { PiStarFourBold } from "react-icons/pi"
import IconButton from "src/components/ui/icon-button"

const IconButtonDemo = () =>{

    return(
        <IconButton 
            icon={<PiStarFourBold className="global-icon"/>}
            txtLabel={'Button'}
            onClick={()=>{alert("Button Clicked");}}
        />
    )
}`