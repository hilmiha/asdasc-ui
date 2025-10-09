import { useMemo, useState } from "react"
import type { fieldErrorType, optionItemType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import InputTag from "src/components/ui/input-tag"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const valueConst = useMemo(()=>{
        return ['option-1', 'option-2', 'option-4']
    },[])
    const [valueSpace, setValueSpace] = useState<string[]>([])
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
                        <InputTag
                            type="text-no-space"
                            txtPlaceholder="Enter tag..."
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
                <p className="text-title-lg">Allow space on tag</p>
                <p>Insome usecase, tag need to be readable and writen as regular text with spaces.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTag
                            type="text"
                            txtPlaceholder="Enter tag..."
                            value={valueSpace}
                            onChange={(newValue)=>{setValueSpace(newValue)}}
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
                <p className="text-title-lg">Show sugestion or options</p>
                <p>Add sugestion option feature when typing tag.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTag
                            type="text-no-space"
                            txtPlaceholder="Enter tag..."
                            options={option}
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
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
                <p>Validation can be configure inside <span>config</span> props.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <p>Please enter at least 3 item</p>
                        <InputTag
                            type="text-no-space"
                            txtPlaceholder="Enter tag..."
                            options={option}
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            onValidate={(error)=>{setValueError(error)}}
                            error={valueError}
                            config={{
                                isRequired:true,
                                maxValue:3,
                                minValue:2
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

const example_0_code = `<InputTag
    type="text-no-space"
    txtPlaceholder="Enter tag..."
    value={value}
    isDisabled={true}
/>`

const example_1_code = `<InputTag
    type="text"
    txtPlaceholder="Enter tag..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`

const example_2_code = `import { useState } from "react"
import InputTag from "src/components/ui/input-tag"
import type { optionItemType } from "src/components/_types"

const InputTagDemo = () =>{

    const [value, setValue] = useState<string>('')
    const option:optionItemType[] = [
        {id:'html', txtLabel:'html', type:'option'},
        {id:'css', txtLabel:'css', type:'option'},
        {id:'javascript', txtLabel:'javascript', type:'option'},
        {id:'react', txtLabel:'react', type:'option'},
    ]

    return(
        <>
            <InputTag
                type="text-no-space"
                txtPlaceholder="Enter tag..."
                options={option}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
            />
        </>
    )
}`

const example_3_code = `import { useState } from "react"
import InputTag from "src/components/ui/input-tag"
import type { fieldErrorType } from "src/components/_types"

const InputTagDemo = () =>{

    const [value, setValue] = useState<string>('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})
    const option:optionItemType[] = [
        {id:'html', txtLabel:'html', type:'option'},
        {id:'css', txtLabel:'css', type:'option'},
        {id:'javascript', txtLabel:'javascript', type:'option'},
        {id:'react', txtLabel:'react', type:'option'},
    ]

    return(
        <>
            <p>Please enter at least 3 item</p>
            <InputTag
                type="text-no-space"
                txtPlaceholder="Enter tag..."
                options={option}
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
                onValidate={(error)=>{setValueError(error)}}
                error={valueError}
                config={{
                    isRequired:true,
                    maxValue:3,
                    minValue:2
                }}
            />
        </>
    )
}`

const option:optionItemType[] = [
    {id:'html', txtLabel:'html', type:'option'},
    {id:'css', txtLabel:'css', type:'option'},
    {id:'javascript', txtLabel:'javascript', type:'option'},
    {id:'react', txtLabel:'react', type:'option'},
]