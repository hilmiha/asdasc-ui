import './styles.scss';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import type { buttonStyleType } from "../button";
import { type Placement } from '@floating-ui/react';
import type { globalShapeType, optionItemType } from '../_types';
import BottomSheet from '../bottom-sheet';
import OptionsComponent from './options-component';
import Dropdown from '../dropdown';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';

const DropdownMenu = ({
    className,
    trigger,
    style = undefined,
    shape = undefined,
    options = [],
    optionSelected = undefined,
    isDisabled = false,
    onClick,
    onClose,
    onOpen,

    elementHeader = undefined,
    elementFooter = undefined,
    
    floatingConfig = undefined
}:_DropdownMenu) =>{
    const [isChildOpen, setIsChildOpen] = useState(false)
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

    const triggerDropdownRef = useRef< 1 | 0 | null>(0)

    useEffect(()=>{
        setBottomSheetOpen(false)
    },[screenSize])
    
    if((screenSize!=='mobile') || (floatingConfig?.mode?.length===1 && floatingConfig.mode.includes('dropdown'))){
        return(
            <Dropdown
                className={clsx(
                    'dropdown-menu-dropdown',
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
                style={{
                    container:style?.container,
                    triggerBox:style?.triggerBox
                }}
            >
                <OptionsComponent
                    style={style}
                    shape={shape}
                    options={options}
                    optionSelected={optionSelected}
                    onClick={(idOption, option, e)=>{
                        if(onClick){
                            onClick(idOption, option, e)
                        }
                        if(floatingConfig?.isCloseOnItemClicked){
                            triggerDropdownRef.current = 1
                        }
                    }}
                    floatingConfig={floatingConfig}
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
                        'dropdown-menu-bottom-sheet',
                        className
                    )}
                    elementHeader={elementHeader}
                    elementFooter={elementFooter}
                    onClose={onClose}
                    onOpen={onOpen}
                    floatingConfig={{
                        ...floatingConfig,
                        isChildOpen:isChildOpen
                    }}
                    style={{
                        container:style?.container,
                        triggerBox:style?.triggerBox
                    }}
                >
                    <OptionsComponent
                        style={style}
                        shape={shape}
                        options={options}
                        optionSelected={optionSelected}
                        onClick={onClick}
                        setIsChildOpen={setIsChildOpen}
                        floatingConfig={floatingConfig}
                    />
                </BottomSheet>
            </>
        )
    }
}

export default DropdownMenu

interface _DropdownMenu {
    className?:string
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement> | undefined, 
        getReferenceProps: ((userProps?: React.HTMLProps<Element>) => Record<string, unknown>) | undefined,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    options:optionItemType[]
    optionSelected?:string[]
    isDisabled?:boolean
    onClick?:(idOption:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement>)=>void;
    onOpen?: () => void;
    onClose?: () => void;

    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    floatingConfig?:dropdownFloatingConfigType
}

export type dropdownFloatingConfigType = {
    placement?:Placement,
    fallbackPlacement?:Placement[]
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