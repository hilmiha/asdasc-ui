import { useState } from "react"
import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
import Modal from "src/components/ui/modal"
import { useDocModule } from "src/containers/documentation-module/context"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const ExampleSection = () =>{
    const {
        setSectionRef
    } = useDocModule()
    
    const [isOpen, setIsOpen] = useState(false);

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
                <p className="text-title-lg">Disabling dismis by click outside, x close button, and Esc key</p>
                <p>Using <span className="text-code">modalFloatingConfig</span> to disabling default dismis behaviour. Give alternative way for user to dismis the <span className="text-code">Modal</span> using button or other action inside the content.</p>
                <div 
                    style={{
                        display:'grid',
                        gap:'var(--space-100)',
                        marginTop:"var(--space-100)",
                        alignItems:'center',
                    }}
                >
                    <PreviewBox>
                        <div style={{display:"flex", justifyContent:'center'}}>
                            <Button 
                                txtLabel={'Click To Open'}
                                onClick={()=>{setIsOpen(true)}}
                            />
                            <Modal
                                isOpen={isOpen}
                                txtTitle="Modal Title"
                                floatingConfig={{
                                    disabledDismiss:'all'
                                }}
                                elementFooter={
                                    <div style={{display:"flex", justifyContent:'end', gap:'var(--space-100)'}}>
                                        <Button txtLabel={'Reject'} onClick={()=>{setIsOpen(false)}}/>
                                        <Button txtLabel={'Accept'} onClick={()=>{setIsOpen(false)}} appearance="primary"/>
                                    </div>
                                }
                            >
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </Modal>
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

const example_1_code = `<Button 
    txtLabel={"Click To Open"}
    onClick={()=>{setIsOpen(true)}}
/>
<Modal
    isOpen={isOpen}
    txtTitle={"Bottom Sheet Header"}
    floatingConfig={{
        disabledDismiss:'all' // Disabled dismiss with click outside, and Esc key. Other option are 'esc' and 'outside'
    }}
    elementFooter={(
        <div style={{display:"flex", justifyContent:'end', gap:'var(--space-100)'}}>
            <Button 
                txtLabel={'Reject'} 
                onClick={()=>{setIsOpen(false)}} // Give access for user to dismis
            />
            <Button 
                txtLabel={'Accept'} 
                onClick={()=>{setIsOpen(false)}} // Give access for user to dismis
                appearance={"primary"}
            />
        </div>
    )}
>
    <p>Lorem ipsum dolor sit amet...</p>
</Modal>`