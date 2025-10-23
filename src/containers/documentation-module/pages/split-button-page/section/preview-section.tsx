import type { optionItemType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import SplitButton from "src/components/ui/split-button"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    
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
                    <SplitButton
                        txtLabel="Main Action"
                        options={option}
                        onClick={()=>{
                            alert(`Main Action clicked`)
                        }}
                        onOptionClick={(id)=>{
                            alert(`${id} option clicked`)
                        }}
                        floatingConfig={{
                            isCloseOnItemClicked:true,
                            width:140,
                        }}
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


const sampleCode = `import type { optionItemType } from "src/components/_types"
import SplitButton from "src/components/ui/split-button"

const SplitButtonDemo = () =>{

    const option:optionItemType[] = [
        {id:'action-one', txtLabel:'Action One'},
        {id:'action-two', txtLabel:'Action Two'},
    ]

    return(
        <SplitButton
            txtLabel="Main Action"
            options={option}
            onClick={()=>{
                alert(\`Main clicked\`)
            }}
            onOptionClick={(id)=>{
                alert(\`\${id} option clicked\`)
            }}

            //optional configuration for dropdown menu
            dropdownFloatingConfigType={{ 
                isCloseOnItemClicked:true,
                width:140,
            }}
        />
    )
}`

const option:optionItemType[] = [
    {id:'action-one', txtLabel:'Action One'},
    {id:'action-two', txtLabel:'Action Two'},
]