import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"
import InputColor from "src/components/ui/input-color"

const PreviewSection = () =>{

    const [value, setValue] = useState<string>('#09976A')

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
                <InputColor
                    txtPlaceholder="Select color..."
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
import InputColor from "src/components/ui/input-color"

const InputColorDemo = () =>{

    const [value, setValue] = useState<string>('#09976A')

    return(
        <InputColor
            txtPlaceholder="Select color..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`