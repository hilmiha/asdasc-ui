import { PiArrowRightBold, PiImageBold } from "react-icons/pi"
import Dropdown from "../../dropdown"
import IconButton from "../../icon-button"
import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import BottomSheet from "../../bottom-sheet"
import InputText from "../../input-text"
import Button from "../../button"
import type Quill from "quill"

const InsertImageModule = ({
    quill,
    onInsert,
    isDisabled
}:{
    quill: Quill | null,
    onInsert:(selection:{index:number, length:number}, link:string, height:string, width:string)=>void
    isDisabled:boolean
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const [isOpen, setIsOpen] = useState(false)
    const [link, setLink] = useState('')
    const [height, setHeight] = useState('')
    const [width, setWidth] = useState('')
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
                            icon={<PiImageBold className="global-icon"/>}
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
                                setHeight('')
                                setWidth('')
                            }}
                        >
                            <InputText
                                type="text-no-space"
                                txtPlaceholder="Enter image source..."
                                value={link}
                                onChange={(newValue)=>{setLink(newValue)}}
                            />
                            <InputText
                                type="number"
                                txtPlaceholder="Enter height..."
                                value={height}
                                onChange={(newValue)=>{setHeight(newValue)}}
                                config={{
                                    sufixElement:'px',
                                    isHideClear:true
                                }}
                            />
                            <InputText
                                type="number"
                                txtPlaceholder="Enter width..."
                                value={width}
                                onChange={(newValue)=>{setWidth(newValue)}}
                                config={{
                                    sufixElement:'px',
                                    isHideClear:true
                                }}
                            />
                            <div style={{display:'flex', justifyContent:'end'}}>
                                <Button
                                    iconAfter={<PiArrowRightBold className="global-icon"/>}
                                    txtLabel={'Insert'}
                                    appearance="primary"
                                    isDisabled={!link && !height && !width}
                                    onClick={()=>{
                                        setIsOpen(false)
                                        onInsert(selection, link, height, width)
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
                                        icon={<PiImageBold className="global-icon"/>}
                                        txtLabel={'Insert Link'}
                                        appearance="subtle"
                                        isSelected={isDropdownOpen}
                                        isDisabled={isDisabled}
                                    />
                                )
                            }
                        }
                        onOpen={()=>{
                            setSelection(quill?.getSelection()||{index: 0, length: 0})
                        }}
                        onClose={()=>{
                            setLink('')
                            setHeight('')
                            setWidth('')
                        }}
                    >
                        <InputText
                            type="text-no-space"
                            txtPlaceholder="Enter image source..."
                            value={link}
                            onChange={(newValue)=>{setLink(newValue)}}
                        />
                        <InputText
                            type="number"
                            txtPlaceholder="Enter height..."
                            value={height}
                            onChange={(newValue)=>{setHeight(newValue)}}
                            config={{
                                sufixElement:'px',
                                isHideClear:true
                            }}
                        />
                        <InputText
                            type="number"
                            txtPlaceholder="Enter width..."
                            value={width}
                            onChange={(newValue)=>{setWidth(newValue)}}
                            config={{
                                sufixElement:'px',
                                isHideClear:true
                            }}
                        />
                        <div style={{display:'flex', justifyContent:'end'}}>
                            <Button
                                iconAfter={<PiArrowRightBold className="global-icon"/>}
                                txtLabel={'Insert'}
                                appearance="primary"
                                isDisabled={!link && !height && !width}
                                onClick={()=>{
                                    if(triggerButtonRef.current){
                                        triggerButtonRef.current.click()
                                    }
                                    onInsert(selection, link, height, width)
                                }}
                            />
                        </div>
                    </Dropdown>
                )
            }
        </>
    )
}

export default InsertImageModule