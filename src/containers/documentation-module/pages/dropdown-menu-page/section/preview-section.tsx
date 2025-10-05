import type { optionItemType } from "src/components/_types"
import Button from "src/components/ui/button"
import DropdownMenu from "src/components/ui/dropdown-menu"
import InputCode from "src/components/ui/input-code"
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
                    <DropdownMenu
                        trigger={
                            <Button txtLabel={'Dropdown Menu'}/>
                        }
                        options={option}
                        onClick={(id)=>{
                            alert(`${id} clicked`)
                        }}
                        floatingConfig={{
                            isCloseOnItemClicked:true
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
import Button from "src/components/ui/button"
import DropdownMenu from "src/components/ui/dropdown-menu"

const DropdownDemo = () =>{

    const option:optionItemType[] = [
        {id:'option-one', txtLabel:'Option One'},
        {id:'option-two', txtLabel:'Option Two'},
        {
            id:'option-three', 
            txtLabel:'Option Three',
            childOption:[
                {id:'option-three-1', txtLabel:'Option Three-1'},
                {id:'option-three-2', txtLabel:'Option Three-2'},
                {id:'option-three-3', txtLabel:'Option Three-3'}
            ]
        }
    ]

    return(
        <DropdownMenu
            trigger={
                <Button txtLabel={'Dropdown Menu'}/>
            }
            options={option}
            onClick={(id)=>{
                alert(\`\${id} clicked\`)
            }}
            floatingConfig={{
                isCloseOnItemClicked:true //close dropdown after menu item clicked
            }}
        />
    )
}`

const option:optionItemType[] = [
    {id:'option-one', txtLabel:'Option One'},
    {id:'option-two', txtLabel:'Option Two'},
    {
        id:'option-three', 
        txtLabel:'Option Three',
        childOption:[
            {id:'option-three-1', txtLabel:'Option Three-1'},
            {id:'option-three-2', txtLabel:'Option Three-2'},
            {id:'option-three-3', txtLabel:'Option Three-3'}
        ]
    }
]