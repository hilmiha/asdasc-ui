import Button from "src/components/ui/button"
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
                <p className="text-title-lg">Appearances</p>
                <p><span className="text-code">Button</span> have several appearances can be used for difrent type of context and function.</p>
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
                            <Button 
                                txtLabel={'Neutral'}
                                appearance="neutral"
                            />
                            <Button 
                                txtLabel={'Primary'}
                                appearance="primary"
                            />
                            <Button 
                                txtLabel={'Danger'}
                                appearance="danger"
                            />
                            <Button 
                                txtLabel={'Warning'}
                                appearance="warning"
                            />
                            <Button 
                                txtLabel={'Success'}
                                appearance="success"
                            />
                            <Button 
                                txtLabel={'Subtle'}
                                appearance="subtle"
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
                <p className="text-title-lg">States</p>
                <p><span className="text-code">Button</span> alse have several states.</p>
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
                            <Button 
                                txtLabel={'Loading'}
                                isLoading={true}
                            />
                            <Button 
                                txtLabel={'Disabled'}
                                isDisabled={true}
                            />
                            <Button 
                                txtLabel={'Selected'}
                                isSelected={true}
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

const example_1_code = `<Button 
    txtLabel={'Neutral'}
    appearance="neutral"
/>
<Button 
    txtLabel={'Primary'}
    appearance="primary"
/>
<Button 
    txtLabel={'Danger'}
    appearance="danger"
/>
<Button 
    txtLabel={'Warning'}
    appearance="warning"
/>
<Button 
    txtLabel={'Success'}
    appearance="success"
/>
<Button 
    txtLabel={'Subtle'}
    appearance="subtle"
/>`

const example_2_code = `<Button 
    txtLabel={'Loading'}
    isLoading={true}
/>
<Button 
    txtLabel={'Disabled'}
    isDisabled={true}
/>
<Button 
    txtLabel={'Selected'}
    isSelected={true}
/>`