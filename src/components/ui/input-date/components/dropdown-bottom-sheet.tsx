import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import type { buttonStyleType } from "../../button";
import { type Placement } from '@floating-ui/react';
import type { globalShapeType } from 'src/components/_types';
import Dropdown from '../../dropdown';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import BottomSheet from '../../bottom-sheet';
import Calendar, { type calendarType, type validCalendarValue } from '../../calendar';
import type { inputDateTimeConfigType } from '..';

const DropdownBottomSheet = ({
    type,
    className,
    trigger,
    style = undefined,
    shape = undefined,
    isDisabled = false,
    value, 
    config,
    onCalendarChange,
    onClose,
    onOpen,

    elementHeader = undefined,
    elementFooter = undefined,
    
    floatingConfig = undefined
}:_DropdownMenu) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
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
                    'input-date-dropdown',
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
                <Calendar
                    type={type}
                    value={value}
                    onChange={(newValue)=>{
                        if(onCalendarChange){
                            onCalendarChange(newValue)
                        }
                    }}
                    calendarStart={config?.calendarStart}
                    calendarEnd={config?.calendarEnd}
                    disabledDates={config?.disabledDates}
                    isDisabled={isDisabled}
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
                        'input-date-bottom-sheet',
                        className
                    )}
                    elementHeader={elementHeader}
                    elementFooter={elementFooter}
                    onClose={onClose}
                    onOpen={onOpen}
                    floatingConfig={{
                        ...floatingConfig,
                        snapPointSize:type==='single-with-time'?(
                            {
                                HIDDEN:0,
                                HALF:65,
                                FULL:80
                            }
                        ):(
                            {
                                HIDDEN:0,
                                HALF:55,
                                FULL:80
                            }
                        )
                    }}
                    shape={shape}
                    style={{
                        container:style?.container,
                        triggerBox:style?.triggerBox
                    }}
                >
                    <Calendar
                        type={type}
                        value={value}
                        onChange={(newValue)=>{
                            if(onCalendarChange){
                                onCalendarChange(newValue)
                            }
                        }}
                        calendarStart={config?.calendarStart}
                        calendarEnd={config?.calendarEnd}
                        disabledDates={config?.disabledDates}
                        isDisabled={isDisabled}
                    />
                </BottomSheet>
            </>
        )
    }
}

export default DropdownBottomSheet

interface _DropdownMenu {
    type:calendarType
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
    value?:validCalendarValue
    config?:inputDateTimeConfigType
    onCalendarChange?:(newValue:validCalendarValue)=>void;
    onOpen?: () => void;
    onClose?: () => void;

    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    floatingConfig?:dropdownFloatingConfigType
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