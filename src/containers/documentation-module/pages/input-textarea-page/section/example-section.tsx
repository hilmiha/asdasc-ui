import { useMemo, useState } from "react"
import type { fieldErrorType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import InputTextarea from "src/components/ui/input-textarea"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const valueConst = useMemo(()=>{
        return "Hello world"
    },[])
    const [valueLine, setValueLine] = useState('')
    const [valueSpace, setValueSpace] = useState('')
    const [valueNum, setValueNum] = useState('')
    const [valueNumSep, setValueNumSep] = useState('')
    const [value, setValue] = useState<string>('')
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
                        <InputTextarea
                            type="text"
                            txtPlaceholder="Enter text..."
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
                id="example_01" 
                ref={setSectionRef('example_01')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Set initial and max line text area</p>
                <p>Initial and max line of the textarea fall to scroll when overflow can be set on <span className="text-code">config</span> props.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTextarea
                            type="text"
                            txtPlaceholder="Enter text..."
                            value={valueLine}
                            onChange={(newValue)=>{setValueLine(newValue)}}
                            config={{
                                initialLines:4,
                                maxLines:10
                            }}
                        />
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_01_code}
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
                <p className="text-title-lg">Text without space</p>
                <p>To disabled space on typing.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTextarea
                            type="text-no-space"
                            txtPlaceholder="Enter text..."
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
                <p className="text-title-lg">Text number</p>
                <p>To typing number only value.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTextarea
                            type="number-text"
                            txtPlaceholder="Enter text..."
                            value={valueNum}
                            onChange={(newValue)=>{setValueNum(newValue)}}
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
                <p className="text-title-lg">Text number with separator</p>
                <p>To typing number only value with separator.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputTextarea
                            type="number"
                            txtPlaceholder="Enter text..."
                            value={valueNumSep}
                            onChange={(newValue)=>{setValueNumSep(newValue)}}
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
            <div
                id="example_4" 
                ref={setSectionRef('example_4')}
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
                        <InputTextarea
                            type="text"
                            txtPlaceholder="Enter text..."
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            onValidate={(error)=>{setValueError(error)}}
                            error={valueError}
                            config={{
                                isRequired:true,
                                minLength:5,
                                maxLength:50,
                            }}
                        />
                    </PreviewBox>
                    <InputCode
                        lang="tsx"
                        isDisabled={true}
                        value={example_4_code}
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

const example_0_code = `<InputTextarea
    type="text"
    txtPlaceholder="Enter text..."
    value={value}
    isDisabled={true}
/>`

const example_01_code = `<InputTextarea
    type="text"
    txtPlaceholder="Enter text..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
    config={{
        initialLines:4,
        maxLines:10
    }}
/>`

const example_1_code = `<InputTextarea
    type="text-no-space"
    txtPlaceholder="Enter text..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`

const example_2_code = `<InputTextarea
    type="number-text"
    txtPlaceholder="Enter text..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`

const example_3_code = `<InputTextarea
    type="number"
    txtPlaceholder="Enter text..."
    value={value}
    onChange={(newValue)=>{setValue(newValue)}}
/>`

const example_4_code = `import { useState } from "react"
import InputTextarea from "src/components/ui/input-textarea"
import type { fieldErrorType } from "src/components/_types"

const InputTextareaDemo = () =>{

    const [value, setValue] = useState<string>('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <>
            <InputTextarea
                type="text"
                txtPlaceholder="Enter text..."
                value={value}
                onChange={(newValue)=>{setValue(newValue)}}
                onValidate={(error)=>{setValueError(error)}}
                error={valueError}
                config={{
                    isRequired:true,
                    minLength:5,
                    maxLength:50,
                }}
            />
        </>
    )
}`