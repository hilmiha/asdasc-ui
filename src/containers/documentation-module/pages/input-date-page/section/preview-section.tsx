import { useState } from "react"
import type { validCalendarValue } from "src/components/ui/calendar"
import InputCode from "src/components/ui/input-code"
import InputDate from "src/components/ui/input-date"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{

    const [value, setValue] = useState< validCalendarValue >(undefined)

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
                <InputDate
                    type="single"
                    txtPlaceholder="Select date..."
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
import type { validCalendarValue } from "src/components/ui/calendar"
import InputDate from "src/components/ui/input-date"

const InputDateDemo = () =>{

    const [value, setValue] = useState<validCalendarValue>(undefined)

    return(
        <InputDateTime
            type="single"
            txtPlaceholder="Select date..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`