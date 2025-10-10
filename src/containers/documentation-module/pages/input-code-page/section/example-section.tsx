import { useMemo, useState } from "react"
import type { fieldErrorType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const valueConst = useMemo(()=>{
        return valueExample
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
                        <InputCode
                            lang="html"
                            txtPlaceholder="Enter code..."
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
                id="example_2" 
                ref={setSectionRef('example_2')}
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
                        <InputCode
                            lang="html"
                            txtPlaceholder="Enter code..."
                            value={value}
                            onChange={(newValue)=>{setValue(newValue)}}
                            onValidate={(error)=>{setValueError(error)}}
                            error={valueError}
                            config={{
                                isRequired:true,
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
        </>
    )
}

export default ExampleSection

const valueExample = `<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>This is a Heading</h1>
        <p>This is a paragraph.</p>
    </body>
</html>`

const example_0_code = `<InputCode
    lang="html"
    txtPlaceholder="Enter code..."
    value={value}
    isDisabled={true}
/>`

const example_2_code = `import { useState } from "react"
import InputCode from "src/components/ui/input-code"
import type { fieldErrorType } from "src/components/_types"

const InputPasswordDemo = () =>{

    const [value, setValue] = useState< string >('')
    const [valueError, setValueError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    return(
        <InputCode
            lang="html"
            txtPlaceholder="Enter code..."
            value={value}
            onChange={(newValue)=>{setValue(newValue)}}
            onValidate={(error)=>{setValueError(error)}}
            error={valueError}
            config={{
                isRequired:true,
            }}
        />
    )
}`
