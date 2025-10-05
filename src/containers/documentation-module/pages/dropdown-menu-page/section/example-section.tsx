import type { optionItemType } from "src/components/_types"
import DropdownMenu from "src/components/ui/dropdown-menu"
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
                            <DropdownMenu
                                trigger={
                                    (triggerRef, getReferenceProps, isDropdownOpen)=>{
                                        return(
                                            <div>
                                                <p>{`isDropdownOpen: ${isDropdownOpen}`}</p>
                                                <input
                                                    ref={triggerRef}
                                                    {...(getReferenceProps?(getReferenceProps()):({}))}
                                                    placeholder="Click to show dropdown..."
                                                />
                                            </div>
                                        )
                                    }
                                }
                                options={option}
                                onClick={(id)=>{
                                    alert(`${id} clicked`)
                                }}
                                floatingConfig={{
                                    isCloseOnItemClicked:true
                                }}
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

const example_1_code = `<DropdownMenu
    trigger={
        (triggerRef, getReferenceProps, isDropdownOpen)=>{
            return(
                <div>
                    <p>{\`isDropdownOpen: \${isDropdownOpen}\`}</p>
                    <input
                        ref={triggerRef}
                        {...(getReferenceProps?(getReferenceProps()):({}))}
                        placeholder="Click to show dropdown..."
                    />
                </div>
            )
        }
    }
    options={option}
    onClick={(id)=>{
        alert(\`\${id} clicked\`)
    }}
    floatingConfig={{
        isCloseOnItemClicked:true //close dropdown after menu item clicked
    }}
/>`

const option:optionItemType[] = [
    {id:'option-one', txtLabel:'Option One'},
    {id:'option-two', txtLabel:'Option Two'},
    {
        id:'option-three', 
        txtLabel:'Option Three',
        childOption:[
            {id:'option-three-1', txtLabel:'Option Three-1'},
            {id:'option-three-2', txtLabel:'Option Three-2'},
            {id:'option-three-3', txtLabel:'Option Three-3'}
        ]
    }
]