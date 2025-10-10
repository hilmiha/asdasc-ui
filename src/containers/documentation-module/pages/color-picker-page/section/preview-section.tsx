import { useState } from "react"
import ColorPicker from "src/components/ui/color-picker"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

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
                <div style={{display:'flex', justifyContent:'center'}}>
                    <ColorPicker
                        value={value}
                        onChange={(newValue)=>{setValue(newValue)}}
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
import ColorPicker from "src/components/ui/color-picker"

const ColorPickerDemo = () =>{

    const [value, setValue] = useState<string>('#09976A')

    return(
        <ColorPicker
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`