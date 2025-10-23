import type { optionItemType } from "src/components/_types"
import InputCode from "src/components/ui/input-code"
import SplitButton from "src/components/ui/split-button"
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
                <p className="text-title-lg">Disabled state</p>
                <p><span className="text-code">Split Button</span> can be disabled using <span className="text-code">idDisabled</span> prop.</p>
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
                            <SplitButton
                                txtLabel="Main Action"
                                isDisabled={true}
                                options={option}
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
            <div
                id="example_2" 
                ref={setSectionRef('example_2')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg">Appearances</p>
                <p><span className="text-code">Split Button</span> have several appearances can be used for difrent type of context and function.</p>
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
                            <SplitButton
                                txtLabel="Neutral Looks Action"
                                appearance="neutral"
                                options={option}
                            />
                            <SplitButton
                                txtLabel="Primary Looks Action"
                                appearance="primary"
                                options={option}
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
            
        </>
    )
}

export default ExampleSection

const example_1_code = `<>
    <SplitButton
        txtLabel="Neutral Looks Action"
        appearance="neutral"
        options={option}
    />
    <SplitButton
        txtLabel="Primary Looks Action"
        appearance="primary"
        options={option}
    />
</>`

const example_2_code = `<SplitButton
    txtLabel="Main Action"
    isDisabled={true}
    options={option}
/>`

const option:optionItemType[] = [
    {id:'option-one', txtLabel:'Option One'},
    {id:'option-two', txtLabel:'Option Two'},
]