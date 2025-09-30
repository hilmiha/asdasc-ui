import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import type { buttonStyleType } from "../../button";
import { type Placement } from '@floating-ui/react';
import type { globalShapeType } from 'src/components/_types';
import Dropdown from '../../dropdown';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import BottomSheet from '../../bottom-sheet';
import type { inputColorConfigType } from '..';
import type { colorPickerModeType } from '../../color-picker';
import ColorPicker from '../../color-picker';

const DropdownBottomSheet = ({
    mode,
    setMode,
    className,
    trigger,
    style = undefined,
    shape = undefined,
    isDisabled = false,
    value, 
    config,
    onColorChange,
    onClose,
    onOpen,

    elementHeader = undefined,
    elementFooter = undefined,
    
    floatingConfig = undefined,
    bottomSheetOpen,
    setBottomSheetOpen
}:_DropdownMenu) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    
    const bottomSheetTriggerRef = useRef(null)
    const triggerBottomSheet = useMemo(()=>{
        if(trigger){
            if(typeof trigger === 'function'){
                return(
                    <>
                        {React.cloneElement(trigger(
                            undefined,
                            undefined,
                            bottomSheetOpen,
                            bottomSheetTriggerRef
                        ), { 
                            ref: bottomSheetTriggerRef, 
                            onClick:(()=>{
                                if(!isDisabled){
                                    setBottomSheetOpen(!bottomSheetOpen)
                                }
                            }),
                            disabled:isDisabled
                        })}
                    </>
                )
            }else{
                return(
                    <div 
                        className={clsx(
                            'bottom-sheet-trigger-box',
                        )}
                        style={style?.triggerBox}
                    >
                        {React.cloneElement(trigger, { 
                            ref: bottomSheetTriggerRef, 
                            onClick:(()=>{
                                if(!isDisabled){
                                    setBottomSheetOpen(!bottomSheetOpen)
                                }
                            }),
                            disabled:isDisabled
                        })}
                    </div>
                )
            }
        }else{
            return(<></>)
        }
    },[trigger, isDisabled, bottomSheetOpen])

    const [triggerDropdownRef, _] = useState<0|1>(0)

    useEffect(()=>{
        setBottomSheetOpen(false)
    },[screenSize])
    
    if((screenSize!=='mobile') || (floatingConfig?.mode?.length===1 && floatingConfig.mode.includes('dropdown'))){
        return(
            <Dropdown
                className={clsx(
                    'input-color-dropdown',
                    className
                )}
                trigger={trigger}
                elementHeader={elementHeader}
                elementFooter={elementFooter}
                onClose={onClose}
                onOpen={onOpen}
                isDisabled={isDisabled}
                triggerClose={triggerDropdownRef}
                floatingConfig={floatingConfig}
                shape={shape}
                style={{
                    container:style?.container,
                    triggerBox:style?.triggerBox
                }}
            >
                <ColorPicker
                    className='drodown-color-picker'
                    initMode={mode}
                    isAllowAlpha={config?.isAllowAlpha}
                    value={value}
                    onChange={(newValue)=>{
                        if(onColorChange){
                            onColorChange(newValue)
                        }
                    }}
                    onModeChange={(newMode)=>{
                        setMode(newMode)
                    }}
                    shape={shape}
                />
            </Dropdown>
        )
    }else{
        return(
            <>
                {
                    triggerBottomSheet
                }
                <BottomSheet
                    isOpen={bottomSheetOpen}
                    setIsOpen={setBottomSheetOpen}
                    className={clsx(
                        'input-color-bottom-sheet',
                        className
                    )}
                    elementHeader={elementHeader}
                    elementFooter={elementFooter}
                    onClose={onClose}
                    onOpen={onOpen}
                    floatingConfig={{
                        ...floatingConfig,
                        defaultSnapPoint:'FULL'
                    }}
                    shape={shape}
                    style={{
                        container:style?.container,
                        triggerBox:style?.triggerBox
                    }}
                >
                    <ColorPicker
                        initMode={mode}
                        isAllowAlpha={config?.isAllowAlpha}
                        value={value}
                        onChange={(newValue)=>{
                            if(onColorChange){
                                onColorChange(newValue)
                            }
                        }}
                        onModeChange={(newMode)=>{
                            setMode(newMode)
                        }}
                        shape={shape}
                    />
                </BottomSheet>
            </>
        )
    }
}

export default DropdownBottomSheet

interface _DropdownMenu {
    mode:colorPickerModeType
    setMode:React.Dispatch<React.SetStateAction<colorPickerModeType>>
    className?:string
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement> | undefined, 
        getReferenceProps: ((userProps?: React.HTMLProps<Element>) => Record<string, unknown>) | undefined,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    isDisabled?:boolean
    value?:string
    config?:inputColorConfigType
    onColorChange?:(newValue:string)=>void;
    onOpen?: () => void;
    onClose?: () => void;

    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    floatingConfig?:dropdownFloatingConfigType

    bottomSheetOpen:boolean
    setBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type dropdownFloatingConfigType = {
    placement?:Placement,
    isContainerWidthSameAsTrigger?:boolean
    isWithCheckmark?:boolean
    isLockScroll?:boolean
    isShowDropdown?:boolean
    isCloseOnItemClicked?:boolean
    level?:number,
    mode?:dropdownMenuModeType[]
}

type dropdownMenuModeType = 'bottom-sheet' | 'dropdown'

export type dropdownMenuStyleType = {
    triggerBox?:React.CSSProperties,
    triggerButton?:buttonStyleType,
    container?:React.CSSProperties,
    optionButton?:buttonStyleType,
}