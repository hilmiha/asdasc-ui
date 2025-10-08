import { useMemo, useState } from "react"
import type { fieldErrorType, optionItemType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import InputSelection from "src/components/ui/input-selection"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const valueConst = useMemo(()=>{
        return ['option-1', 'option-2', 'option-4']
    },[])
    const [value, setValue] = useState<string[]>([])
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})
    
    return(
        <>
            <div 
                id="example" 
                ref={setSectionRef('example')}
            >
                <p className="text-title-xl">Example</p>
            </div>
            <div
                id="example_0" 
                ref={setSectionRef('example_0')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Disabled field</p>
                <p>Input field can be disabled with <span className="text-code">isDisabled</span> props.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputSelection
                            type="single"
                            txtPlaceholder="Select option..."
                            option={option}
                            value={valueConst}
                            isDisabled={true}
                        />
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_0_code}
                        style={{
                            inputCode:{
                                maxHeight:'50vh'
                            }
                        }}
                    />
                </div>
            </div>
            <div
                id="example_1" 
                ref={setSectionRef('example_1')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Multiple selection</p>
                <p><span className="text-code">InputSelection</span> can also allow multiple selection for the value using value <span className="text-code">multiple</span> on <span className="text-code">type</span> props.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputSelection
                            type="multiple"
                            txtPlaceholder="Select option..."
                            option={option}
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                        />
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
                <p className="text-title-lg">Combobox</p>
                <p>Add search option feature.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputSelection
                            type="multiple"
                            txtPlaceholder="Select option..."
                            option={optionMany}
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            config={{
                                isCombobox:true
                            }}
                        />
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
            <div
                id="example_3" 
                ref={setSectionRef('example_3')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Validating value</p>
                <p>Validation can be config inside <span>confi</span> props.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <p>Please select at least 3 item</p>
                        <InputSelection
                            type="multiple"
                            txtPlaceholder="Select option..."
                            option={optionMany}
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            onValidate={(error)=>{setValueError(error)}}
                            error={valueError}
                            config={{
                                isCombobox:true,
                                isRequired:true,
                                minValue:3,
                                maxValue:5,
                            }}
                        />
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_3_code}
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

const example_0_code = `<InputSelection
    type="single"
    txtPlaceholder="Select option..."
    option={option}
    value={valueConst}
    isDisabled={true}
/>`

const example_1_code = `<InputSelection
    type="multiple"
    txtPlaceholder="Select option..."
    option={optionMany}
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`

const example_2_code = `<InputSelection
    type="multiple"
    txtPlaceholder="Select option..."
    option={option}
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
    config={{
        isCombobox:true // to add search option feature
    }}
/>`

const example_3_code = `import { useState } from "react"
import InputPassword from "src/components/ui/input-password"
import type { fieldErrorType } from "src/components/_types"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState< string >('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <>
            <p>Please select at least 3 item</p>
            <InputSelection
                type="multiple"
                txtPlaceholder="Select option..."
                option={optionMany}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
                onValidate={(error)=>{setValueError(error)}}
                error={valueError}
                config={{
                    isCombobox:true,
                    isRequired:true,
                    minValue:3,
                    maxValue:5,
                }}
            />
        </>
    )
}`

const option:optionItemType[] = [
    {id:'option-1', txtLabel:'Option one', type:'option'},
    {id:'option-2', txtLabel:'Option two', type:'option'},
    {id:'option-3', txtLabel:'Option three', type:'option'},
    {id:'option-4', txtLabel:'Option four', type:'option'},
]

const optionMany:optionItemType[] = [
    {id:'option-1', txtLabel:'Option one', type:'option'},
    {id:'option-2', txtLabel:'Option two', type:'option'},
    {id:'option-3', txtLabel:'Option three', type:'option'},
    {id:'option-4', txtLabel:'Option four', type:'option'},
    {id:'option-5', txtLabel:'Option five', type:'option'},
    {id:'option-6', txtLabel:'Option six', type:'option'},
    {id:'option-7', txtLabel:'Option seven', type:'option'},
    {id:'option-8', txtLabel:'Option eight', type:'option'},
    {id:'option-9', txtLabel:'Option nine', type:'option'},
    {id:'option-10', txtLabel:'Option ten', type:'option'},

]
