import InputCode from "src/components/ui/input-code"
import Switch from "src/components/ui/switch-button/switch"
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
                <p className="text-title-lg">Switch as an indicator only</p>
                <p>Use the <span className="text-code">switch</span> purely as a visual indicator.</p>
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
                            <Switch
                                isSelected={false}
                            />
                            <Switch
                                isSelected={true}
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
</>`