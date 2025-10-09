import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"
import InputTag from "src/components/ui/input-tag"

const PreviewSection = () =>{

    const [value, setValue] = useState<string[]>([])

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
                <InputTag
                    type="text-no-space"
                    txtPlaceholder="Enter tag..."
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
import InputCode from "src/components/ui/input-code"

const InputSelectionDemo = () =>{

    const [value, setValue] = useState<string[]>([])

    return(
        <InputTag
            type="text-no-space"
            txtPlaceholder="Enter tag..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`

