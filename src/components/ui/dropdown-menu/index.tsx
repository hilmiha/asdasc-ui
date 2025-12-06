import './styles.scss';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import type { buttonStyleType } from "../button";
import { type Placement } from '@floating-ui/react';
import type { globalShapeType, optionItemType } from 'src/components/_types';
import BottomSheet from '../bottom-sheet';
import OptionsComponent from './options-component';
import Dropdown from '../dropdown';
import clsx from 'clsx';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import type { checkboxButtonAppearance } from '../checkbox-button';
import Skeleton from '../skeleton';

const DropdownMenu = ({
    className,
    trigger,
    style = undefined,
    shape = undefined,
    options = [],
    optionSelected = undefined,
    optionSelectedAppearance = 'subtle-selected',
    isDisabled = false,
    isLoading = false,
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

    const [triggerDropdownRef, setTriggerDropdown] = useState<0|1>(0)

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
                    optionSelectedAppearance={optionSelectedAppearance}
                    onClick={(idOption, option, e)=>{
                        if(onClick){
                            onClick(idOption, option, e)
                        }
                        if(floatingConfig?.isCloseOnItemClicked){
                            setTriggerDropdown(1)
                            setTimeout(() => {
                                setTriggerDropdown(0)
                            }, 200);
                        }
                    }}
                    floatingConfig={floatingConfig}
                />
                {
                    (isLoading)&&(
                        <div style={{display:'grid', gap:'var(--space-100)', margin:'var(--space-50) var(--space-0)'}}>
                            <Skeleton style={{margin:'0px'}}/>
                            <Skeleton style={{margin:'0px'}}/>
                            <Skeleton style={{margin:'0px'}}/>
                            <Skeleton style={{margin:'0px'}}/>
                            <Skeleton style={{margin:'0px'}}/>
                        </div>
                    )
                }
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
                        optionSelectedAppearance={optionSelectedAppearance}
                        onClick={(idOption, option, e)=>{
                            setTimeout(() => {
                                if(onClick){
                                    onClick(idOption, option, e)
                                }
                                if(floatingConfig?.isCloseOnItemClicked){
                                    setBottomSheetOpen(false)
                                } 
                            }, isChildOpen?(400):(0));
                        }}
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
    className?:string;
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement> | undefined, 
        getReferenceProps: ((userProps?: React.HTMLProps<Element>) => Record<string, unknown>) | undefined,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    options:optionItemType[];
    optionSelected?:string[];
    optionSelectedAppearance?:checkboxButtonAppearance;
    isDisabled?:boolean;
    isLoading?:boolean;
    onClick?:(idOption:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement>)=>void;
    onOpen?: () => void;
    onClose?: () => void;
    elementHeader?:JSX.Element;
    elementFooter?:JSX.Element;
    floatingConfig?:dropdownFloatingConfigType;
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
    width?:number
}

type dropdownMenuModeType = 'bottom-sheet' | 'dropdown'

export type dropdownMenuStyleType = {
    triggerBox?:React.CSSProperties,
    triggerButton?:buttonStyleType,
    container?:React.CSSProperties,
    optionButton?:buttonStyleType,
}
