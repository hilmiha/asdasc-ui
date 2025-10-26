import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import SwitchButton from "src/components/ui/switch-button"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [isSelected, setIsSelected] = useState(false)

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
                    <SwitchButton
                        isSelected={isSelected}
                        txtLabel="Switch Item"
                        txtSublabel="Lorem ipsum dolor sit amet"
                        onClick={(newValue)=>{setIsSelected(newValue)}}
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


const sampleCode = `import { useState } from "react"
import SwitchButton from "src/components/ui/radio-button"

const SwitchButtonDemo = () =>{

    const [isSelected, setIsSelected] = useState(false)

    return(
        <SwitchButton
            isSelected={isSelected}
            txtLabel="Switch Item"
            txtSublabel="Lorem ipsum dolor sit amet"
            onClick={(newValue)=>{setIsSelected(newValue)}}
        />
    )
}`