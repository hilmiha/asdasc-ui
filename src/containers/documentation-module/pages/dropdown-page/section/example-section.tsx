import Button from "src/components/ui/button"
import Dropdown from "src/components/ui/dropdown"
import InputCode from "src/components/ui/input-code"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    

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
                <p className="text-title-lg">Custom trigger</p>
                <p>Use functional component to cerate a trigger for <span className="text-code">Dropdown</span>.</p>
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
                            <Dropdown
                                trigger={
                                    (triggerRef, getReferenceProps, isDropdownOpen)=>{
                                        return(
                                            <div>
                                                <p>{`isDropdownOpen: ${isDropdownOpen}`}</p>
                                                <input
                                                    ref={triggerRef}
                                                    {...getReferenceProps()}
                                                    placeholder="Click to show dropdown..."
                                                />
                                            </div>
                                        )
                                    }
                                }
                                elementHeader={(
                                    <p className="text-title-lg">Header</p>
                                )}
                                elementFooter={(
                                    <div style={{display:'flex', justifyContent:'end'}}>
                                        <Button txtLabel={'Button'}/>
                                        <Button txtLabel={'Button'} appearance="primary"/>
                                    </div>
                                )}
                            >
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, eius recusandae nam aliquid repudiandae accusantium? Dolor cupiditate autem voluptatum praesentium consectetur quisquam. Voluptates, tenetur? Maxime cum voluptatibus totam fugit natus!</p>
                            </Dropdown>
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
        </>
    )
}

export default ExampleSection

const example_1_code = `<Dropdown
    trigger={
        (triggerRef, getReferenceProps, isDropdownOpen)=>{
            return(
                <div>
                    <p>{\`isDropdownOpen: \${isDropdownOpen}\`}</p>
                    <input
                        ref={triggerRef}
                        {...getReferenceProps()}
                        placeholder="Click to open dropdown..."
                    />
                </div>
            )
        }
    }
    elementHeader={(
        <p className="text-title-lg">Header</p>
    )}
    elementFooter={(
        <div style={{display:'flex', justifyContent:'end'}}>
            <Button txtLabel={'Button'}/>
            <Button txtLabel={'Button'} appearance="primary"/>
        </div>
    )}
>
    <p>Lorem ipsum dolor sit amet...</p>
</Dropdown>`