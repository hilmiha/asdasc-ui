import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import RadioButton from "src/components/ui/radio-button"
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
                    <RadioButton
                        isSelected={isSelected}
                        txtLabel="Radio Item"
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
import RadioButton from "src/components/ui/radio-button"

const RadioButtonDemo = () =>{

    const [isSelected, setIsSelected] = useState(false)

    return(
        <RadioButton
            isSelected={isSelected}
            txtLabel="Radio Item"
            txtSublabel="Lorem ipsum dolor sit amet"
            onClick={(newValue)=>{setIsSelected(newValue)}}
        />
    )
}`