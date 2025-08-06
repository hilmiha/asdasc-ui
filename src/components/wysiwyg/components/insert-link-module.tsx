import { PiArrowRightBold, PiLinkBold } from "react-icons/pi"
import Dropdown from "../../dropdown"
import IconButton from "../../icon-button"
import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import BottomSheet from "../../bottom-sheet"
import InputText from "../../input-text"
import Button from "../../button"
import Quill from "quill"

const InsertLinkModule = ({
    quill,
    onInsert
}:{
    quill: Quill | null,
    onInsert:(selection:{index:number, length:number}, link:string, text:string)=>void
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
                    <Dropdown
                        trigger={
                            (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                                if(trigger.current){
                                    triggerButtonRef.current = trigger.current as HTMLButtonElement
                                }
                                return(
                                    <IconButton 
                                        ref={triggerRef}
                                        {...(getReferenceProps?.() ?? {})}
                                        icon={<PiLinkBold className="global-icon"/>}
                                        txtLabel={'Insert Link'}
                                        appearance="subtle"
                                        isSelected={isDropdownOpen}
                                    />
                                )
                            }
                        }
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
                                    if(triggerButtonRef.current){
                                        triggerButtonRef.current.click()
                                    }
                                    onInsert(selection, link, linkTxt)
                                }}
                            />
                        </div>
                    </Dropdown>
                )
            }
        </>
    )
}

export default InsertLinkModule