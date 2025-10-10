import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"
import InputText from "src/components/ui/input-text"

const PreviewSection = () =>{

    const [value, setValue] = useState<string>('')

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
                <InputText
                    type="text"
                    txtPlaceholder="Enter text..."
                    value={value}
                    onChange={(newValue)=>{setValue(newValue)}}
                />
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
import InputText from "src/components/ui/input-text"

const InputSelectionDemo = () =>{

    const [value, setValue] = useState<string>('')

    return(
        <InputText
            type="text"
            txtPlaceholder="Enter text..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`