import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{

    const [value, setValue] = useState< string >('')

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
                <InputCode
                    txtPlaceholder="Enter code..."
                    value={value}
                    onChange={(newValue)=>{setValue(newValue)}}
                    style={{
                        codeEditorBox:{
                            maxHeight:'240px'
                        }
                    }}
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
import InputPassword from "src/components/ui/input-password"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState< string >('')

    return(
        <InputCode
            txtPlaceholder="Enter code..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
            style={{
                codeEditorBox:{
                    maxHeight:'240px'
                }
            }}
        />
    )
}`