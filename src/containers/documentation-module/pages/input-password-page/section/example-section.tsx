import { useMemo, useState } from "react"
import type { fieldErrorType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import InputPassword from "src/components/ui/input-password"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const valueConst = useMemo(()=>{
        return 'hello-world'
    },[])
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
                        <InputPassword
                            txtPlaceholder="Enter password..."
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
                <p className="text-title-lg">Strong password validation</p>
                <p>Validating the password entered is a strong one.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <InputPassword
                            txtPlaceholder="Enter password..."
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            onValidate={(error)=>{setValueError(error)}}
                            error={valueError}
                            config={{
                                isRequired:true,
                                validRegex: [
                                    [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters with one uppercase, one lowercase, one number, and one special character (@$!%*?&)']
                                ]
                            }}
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
        </>
    )
}

export default ExampleSection

const example_0_code = `<InputPassword
    txtPlaceholder="Enter password..."
    value={valueConst}
    isDisabled={true}
/>`

const example_1_code = `import { useState } from "react"
import InputPassword from "src/components/ui/input-password"
import type { fieldErrorType } from "src/components/_types"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState< string >('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <InputPassword
            txtPlaceholder="Enter password..."
            onChange={(newValue)=>{setValue(newValue)}}
            onValidate={(error)=>{setValueError(error)}}
            error={valueError}
            config={{
                isRequired:true,
                validRegex: [
                    [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters with one uppercase, one lowercase, one number, and one special character (@$!%*?&)']
                ]
            }}
        />
    )
}`
