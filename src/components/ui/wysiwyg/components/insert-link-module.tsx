import { PiArrowRightBold, PiLinkBold } from "react-icons/pi"
import IconButton from "../../icon-button"
import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"
import BottomSheet from "../../bottom-sheet"
import InputText from "../../input-text"
import Button from "../../button"
import Quill from "quill"
import Modal from "../../modal"

const InsertLinkModule = ({
    quill,
    onInsert,
    isDisabled = false
}:{
    quill: Quill | null,
    onInsert:(selection:{index:number, length:number}, link:string, text:string)=>void,
    isDisabled:boolean
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const [isOpen, setIsOpen] = useState(false)
    const [linkTxt, setLinkTxt] = useState('')
    const [link, setLink] = useState('')
    const [selection, setSelection] = useState({index: 0, length: 0})

    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    
    //close when screen change size
    useEffect(()=>{
        if(isOpen){
            setIsOpen(false)
        }
    },[screenSize])
    return(
        <>
            {
                (screenSize==='mobile')?(
                    <>
                        <IconButton 
                            icon={<PiLinkBold className="global-icon"/>}
                            txtLabel={'Insert Link'}
                            appearance="subtle"
                            onClick={()=>{setIsOpen(true)}}
                            isSelected={isOpen}
                            isDisabled={isDisabled}
                        />
                        <BottomSheet
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            onOpen={()=>{
                                setSelection(quill?.getSelection()||{index: 0, length: 0})
                            }}
                            onClose={()=>{
                                setLink('')
                                setLinkTxt('')
                            }}
                        >
                            <InputText
                                type="text-no-space"
                                txtPlaceholder="Enter link..."
                                value={link}
                                onChange={(newValue)=>{setLink(newValue)}}
                            />
                            <InputText
                                type="text-no-space"
                                txtPlaceholder="Enter link text..."
                                value={linkTxt}
                                onChange={(newValue)=>{setLinkTxt(newValue)}}
                            />
                            <div style={{display:'flex', justifyContent:'end'}}>
                                <Button
                                    iconAfter={<PiArrowRightBold className="global-icon"/>}
                                    txtLabel={'Insert'}
                                    appearance="primary"
                                    isDisabled={!linkTxt && !link}
                                    onClick={()=>{
                                        setIsOpen(false)
                                        onInsert(selection, link, linkTxt)
                                    }}
                                />
                            </div>
                        </BottomSheet>
                    </>
                ):(
                    <>
                        <IconButton 
                            icon={<PiLinkBold className="global-icon"/>}
                            txtLabel={'Insert Link'}
                            appearance="subtle"
                            isSelected={isOpen}
                            onClick={()=>{setIsOpen(true)}}
                            isDisabled={isDisabled}
                        />
                        <Modal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            onOpen={()=>{
                                setSelection(quill?.getSelection()||{index: 0, length: 0})
                            }}
                            onClose={()=>{
                                setLink('')
                                setLinkTxt('')
                            }}
                        >
                            <div style={{display:"grid", gap:"var(--space-100)"}}>
                                <InputText
                                    type="text-no-space"
                                    txtPlaceholder="Enter link..."
                                    value={link}
                                    onChange={(newValue)=>{setLink(newValue)}}
                                />
                                <InputText
                                    type="text"
                                    txtPlaceholder="Enter link text..."
                                    value={linkTxt}
                                    onChange={(newValue)=>{setLinkTxt(newValue)}}
                                />
                                <div style={{display:'flex', justifyContent:'end'}}>
                                    <Button
                                        iconAfter={<PiArrowRightBold className="global-icon"/>}
                                        txtLabel={'Insert'}
                                        appearance="primary"
                                        isDisabled={!linkTxt && !link}
                                        onClick={()=>{
                                            if(triggerButtonRef.current){
                                                triggerButtonRef.current.click()
                                            }
                                            onInsert(selection, link, linkTxt)
                                            setIsOpen(false)
                                        }}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </>
                )
            }
        </>
    )
}

export default InsertLinkModule
