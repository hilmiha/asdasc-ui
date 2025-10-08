import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"
import type { optionItemType } from "src/components/_types"
import InputSelection from "src/components/ui/input-selection"

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
                <InputSelection
                    type="single"
                    txtPlaceholder="Select option..."
                    option={option}
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
import type { optionItemType } from "src/components/_types"
import InputSelection from "src/components/ui/input-selection"

const InputSelectionDemo = () =>{

    const [value, setValue] = useState<string[]>([])
    const option:optionItemType[] = [
        {id:'option-1', txtLabel:'Option one', type:'option'},
        {id:'option-2', txtLabel:'Option two', type:'option'},
        {id:'option-3', txtLabel:'Option three', type:'option'},
        {id:'option-4', txtLabel:'Option four', type:'option'},
    ]

    return(
        <InputSelection
            type="single"
            txtPlaceholder="Select option..."
            option={option}
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
        />
    )
}`

const option:optionItemType[] = [
    {id:'option-1', txtLabel:'Option one', type:'option'},
    {id:'option-2', txtLabel:'Option two', type:'option'},
    {id:'option-3', txtLabel:'Option three', type:'option'},
    {id:'option-4', txtLabel:'Option four', type:'option'},
]