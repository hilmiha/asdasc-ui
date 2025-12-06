import { useState } from "react"
import Button from "src/components/ui/button"
import InputCode from "src/components/ui/input-code"
import Modal from "src/components/ui/modal"
import PreviewBox from "src/containers/documentation-module/sections/preview-box"

const PreviewSection = () =>{
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return(
        <div 
            style={{
                display:'grid',
                gap:'var(--space-100)',
                marginTop:"var(--space-300)",
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
                        setIsOpen={setIsOpen}
                        txtTitle="Modal Title"
                        elementFooter={
                            <div style={{display:"flex", justifyContent:'end', gap:'var(--space-100)'}}>
                                <Button txtLabel={'Reject'} onClick={()=>{setIsOpen(false)}} />
                                <Button txtLabel={'Accept'}  onClick={()=>{setIsOpen(false)}} appearance="primary"/>
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
                value={sampleCode}
                style={{
                    inputCode:{
                        maxHeight:'50vh'
                    }
                }}
            />
        </div>
    )
}

export default PreviewSection


const sampleCode = `import { useState } from "react"
import Modal from "src/components/ui/modal"
import Button from "src/components/ui/button"

const ModalDemo = () =>{

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return(
        <>
            <Button 
                txtLabel={'Click To Open'}
                onClick={()=>{setIsOpen(true)}}
            />
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                txtTitle="Bottom Sheet Header"
                elementFooter={
                    <div style={{display:"flex", justifyContent:'end', gap:'var(--space-50)'}}>
                        <Button txtLabel={'Reject'} onClick={()=>{setIsOpen(false)}} />
                        <Button txtLabel={'Accept'}  onClick={()=>{setIsOpen(false)}} appearance="primary"/>
                    </div>
                }
            >
                <p>Lorem ipsum dolor sit amet...</P>
            </Modal>
        </>
    )
}`