import { useState } from "react"
import type { optionItemType } from "src/components/_types"
import Checkbox from "src/components/ui/checkbox-button/checkbox"
import CheckboxGroup from "src/components/ui/checkbox-group"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const [valueCheckbox, setValueCheckbox] = useState<string[]>([])

    return(
        <>
            <div 
                id="example" 
                ref={setSectionRef('example')}
            >
                <p className="text-title-xl">Example</p>
            </div>
            <div
                id="example_1" 
                ref={setSectionRef('example_1')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Checkbox as an indicator only</p>
                <p>Use the <span className="text-code">checkbox</span> purely as a visual indicator.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', gap:"var(--space-500)", flexWrap:'wrap', justifyContent:'center'}}>
                            <Checkbox
                                isSelected={false}
                                isIndeterminate={false}
                            />
                            <Checkbox
                                isSelected={false}
                                isIndeterminate={true}
                            />
                            <Checkbox
                                isSelected={true}
                                isIndeterminate={false}
                            />
                        </div>
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_1_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
            <div
                id="example_2" 
                ref={setSectionRef('example_2')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Controlled group of checkboxes</p>
                <p>Create group checkboxes with controlled value.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:'flex', gap:"var(--space-100)", flexWrap:'wrap', justifyContent:'center'}}>
                            <CheckboxGroup
                                isDisabled={false}
                                options={options}
                                selectedList={valueCheckbox}
                                isDefaultCollapse={false}
                                onChange={(newValue) => setValueCheckbox(newValue)}
                            />
                        </div>
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_2_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default ExampleSection

const example_1_code = `<Checkbox
    isSelected={false}
    isIndeterminate={false}
/>
<Checkbox
    isSelected={false}
    isIndeterminate={true}
/>
<Checkbox
    isSelected={true}
    isIndeterminate={false}
/>`

const example_2_code = `import type { optionItemType } from "src/components/_types"
import CheckboxGroup from "src/components/ui/checkbox-group"

const CheckboxButtonDemo = () =>{

    const [value, setValue] = useState<string[]>([])

    return(
        <CheckboxGroup
            isDisabled={false}
            options={options}
            selectedList={value}
            isDefaultCollapse={false}
            onChange={(newValue) => setValue(newValue)}
        />
    )
}

const options:optionItemType[] =  [
    {
        id:'citrus', 
        txtLabel:'Citrus',
        childOption:[
            {id:'orange', txtLabel:'Orange'},
            {id:'lemon', txtLabel:'Lemon'},
            {id:'lime', txtLabel:'Lime'},
        ]
    },
    {
        id:'berries', 
        txtLabel:'Berries',
        childOption:[
            {id:'strawberry', txtLabel:'Strawberry'},
            {id:'blueberry', txtLabel:'Blueberry'},
            {id:'raspberry', txtLabel:'Raspberry'},
        ]
    },
    {
        id:'mix',
        txtLabel:'Mix'
    }
]`

const options:optionItemType[] =  [
    {
        id:'citrus', 
        txtLabel:'Citrus',
        childOption:[
            {id:'orange', txtLabel:'Orange'},
            {id:'lemon', txtLabel:'Lemon'},
            {id:'lime', txtLabel:'Lime'},
        ]
    },
    {
        id:'berries', 
        txtLabel:'Berries',
        childOption:[
            {id:'strawberry', txtLabel:'Strawberry'},
            {id:'blueberry', txtLabel:'Blueberry'},
            {id:'raspberry', txtLabel:'Raspberry'},
        ]
    },
    {
        id:'mix',
        txtLabel:'Mix'
    }
]