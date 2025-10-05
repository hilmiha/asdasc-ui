import { useState } from "react"
import Calendar, { type validCalendarValue } from "src/components/ui/calendar"
import InputCode from "src/components/ui/input-code"
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
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Calendar
                        type='single'
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
import Calendar, { type validCalendarValue } from "src/components/ui/calendar"


const CalendarDemo = () =>{

    const [value, setValue] = useState<validCalendarValue>(undefined)

    return(
        <Calendar
            type='single'
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`