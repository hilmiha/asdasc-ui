import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import React, { useContext, useState, type JSX } from 'react';
import type { buttonStyleType } from "../button";
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import { autoUpdate, flip, FloatingFocusManager, FloatingOverlay, FloatingPortal, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useRole, type Placement } from '@floating-ui/react';
import type { globalShapeType } from '../_types';
import { PiCaretRightBold, PiCheckBold, PiCircleBold } from 'react-icons/pi';
import Button from '../button';

const DropdownMenu = ({
    className,
    trigger,
    style = undefined,
    shape = undefined,
    options = [],
    optionSelected = undefined,
    isDisabled = false,
    onClick,
    onOptionClose,
    onOptionOpen,

    elementHeader = undefined,
    elementFooter = undefined,
    
    floatingConfig = undefined
}:_DropdownMenu) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isShowOption, setIsShowOption] = useState<boolean>(false)
    //States end ====
    
    //FloatingUi Config ====
    const {refs, floatingStyles, context} = useFloating({
        open: isShowOption,
        onOpenChange: (open)=>{
            setIsShowOption(open)
            
            if(onOptionOpen && open){
                onOptionOpen(refs.domReference)
            }

            if(onOptionClose && !open){
                onOptionClose(refs.domReference)
            }
        },
        placement: (floatingConfig?.placement)??('bottom-start'),
        middleware: [
            offset((floatingConfig?.level)?8:4),
            shift(),
            flip({
                padding: 10,
                fallbackPlacements:['bottom', 'top']
            }),
            size({
                apply({availableHeight, elements, rects}) {
                    const value = `${(Math.max(0, availableHeight) - 50)}px`;
                    elements.floating.style.maxHeight = value;
                    if(floatingConfig?.isContainerWidthSameAsTrigger){
                        elements.floating.style.width = `${rects.reference.width}px`
                        elements.floating.style.minWidth = `${Math.max(310, rects.reference.width)}px`
                        elements.floating.style.maxWidth = `${rects.reference.width}px`
                    }else{
                        elements.floating.style.width = `310x`
                        elements.floating.style.minWidth = `310px`
                        elements.floating.style.maxWidth = `310px`
                    }
                },
            }),
        ],
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context,{
        enabled: !isDisabled
    });
    const dismiss = useDismiss(context,{
        outsidePressEvent: 'click',
        ancestorScroll: false,
    });
    const role = useRole(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);
    //FloatingUi Config ====

    return(
        <>
            <>
                {typeof trigger === 'function' 
                    ? trigger(
                        refs.setReference, 
                        getReferenceProps,
                        isShowOption, 
                        refs.domReference,
                    )
                    : trigger && (
                        <div 
                            className={clsx(
                                'dropdown-menu-trigger-box',
                            )}
                            {...getReferenceProps()}
                            style={style?.triggerBox}
                        >
                            {React.cloneElement(trigger, { ref: refs.setReference, isSelected:isShowOption })}
                        </div>
                    )
                }
            </>
            {
                (isShowOption && floatingConfig?.isShowDropdown !== false)&&(
                    <FloatingPortal>
                        <FloatingOverlay
                            lockScroll={floatingConfig?.isLockScroll}
                        >
                            <FloatingFocusManager 
                                context={context} 
                                order={['reference', 'content']}
                                modal={true}
                            >
                                <div
                                    className={clsx(
                                        'dropdown-menu-box',
                                        className
                                    )}
                                    ref={refs.setFloating}
                                    style={floatingStyles}
                                    {...getFloatingProps()}
                                >
                                    <div 
                                        className={clsx(
                                            'dropdown-menu-container',
                                            (shape)?(shape):(globalShape),
                                        )}
                                        style={style?.container}
                                    >
                                        {
                                            elementHeader&&(
                                                <div className='element-header-box'>
                                                    {
                                                        elementHeader
                                                    }
                                                </div>
                                            )
                                        }
                                        <div className='dropdown-body-box'>
                                            {
                                                options.map((option)=>{
                                                    if(option.type!=='separator'){
                                                        if(option.childMenu===undefined){
                                                            return (
                                                                <Button
                                                                    key={option.id}
                                                                    id={option.id}
                                                                    className={clsx('dropdown-item')}
                                                                    style={style?.optionButton}
                                                                    shape={shape}
                                                                    txtLabel={option.txtLabel??''}
                                                                    iconBefore={
                                                                        (optionSelected)?(
                                                                            <div className='check-icon-container'>
                                                                                {
                                                                                    (!(floatingConfig?.isWithCheckmark))?(
                                                                                        <></>
                                                                                    ):(optionSelected?.includes(option.id))?(
                                                                                        <PiCheckBold className='global-icon'/>
                                                                                    ):(
                                                                                        <PiCircleBold className='global-icon' style={{color:'transparent'}}/>
                                                                                    )
                                                                                }
                                                                                {option.icon}
                                                                            </div>
                                                                        ):(
                                                                            option.icon
                                                                        )
                                                                    }
                                                                    iconAfter={
                                                                        <div className='check-icon-container'>
                                                                            {option.iconAfter}
                                                                        </div>
                                                                    }
                                                                    isSelected={optionSelected?.includes(option.id)}
                                                                    appearance={'subtle'}
                                                                    onClick={(e)=>{ctrl.onOptionClick(option, e, onClick)}}
                                                                    isDisabled={option.isDisabled}
                                                                />
                                                            )
                                                        }else{
                                                            return(
                                                                <DropdownMenu
                                                                    key={option.id}
                                                                    options={option.childMenu}
                                                                    optionSelected={optionSelected}
                                                                    style={{
                                                                        ...style,
                                                                        triggerBox:{
                                                                            width:'unset'
                                                                        }
                                                                    }}
                                                                    shape={(shape)?(shape):(globalShape)}
                                                                    onClick={(_, option, e)=>{ctrl.onOptionClick(option, e, onClick)}}
                                                                    floatingConfig={{
                                                                        placement:'right-start',
                                                                        level:((floatingConfig?.level)??0)+1
                                                                    }}
                                                                    trigger={
                                                                        (triggerRef, getReferenceProps, isDropdownOpen, )=>(
                                                                            <div style={{display:'flex'}} {...getReferenceProps()}>
                                                                                <Button
                                                                                    ref={triggerRef}
                                                                                    key={option.id}
                                                                                    id={option.id}
                                                                                    className={
                                                                                        clsx(
                                                                                            'dropdown-item',
                                                                                        )
                                                                                    }
                                                                                    style={style?.optionButton}
                                                                                    shape={shape}
                                                                                    txtLabel={option.txtLabel??''}
                                                                                    iconBefore={
                                                                                        (optionSelected)?(
                                                                                            <div className='check-icon-container'>
                                                                                                <PiCircleBold className='global-icon' style={{color:'transparent'}}/>
                                                                                                {option.icon}
                                                                                            </div>
                                                                                        ):(
                                                                                            option.icon
                                                                                        )
                                                                                    }
                                                                                    iconAfter={
                                                                                        <div className='check-icon-container'>
                                                                                            {option.iconAfter}
                                                                                            <PiCaretRightBold className='global-icon' style={{color:`var(--clr-surface${isDropdownOpen?'-primary':''}-4)`}}/>
                                                                                        </div>
                                                                                    }
                                                                                    isSelected={isDropdownOpen}
                                                                                    appearance={'subtle'}
                                                                                    isDisabled={option.isDisabled}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }
                                                                />
                                                            )
                                                        }
                                                    }else{
                                                        return(
                                                            <div className='separator'>
                                                                {
                                                                    (option.txtLabel)&&(
                                                                        <span className='section-title'>{option.txtLabel}</span>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        
                                        {
                                            elementFooter&&(
                                                <div className='element-footer-box'>
                                                    {
                                                        elementFooter
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </FloatingFocusManager>
                        </FloatingOverlay>
                    </FloatingPortal>
                )
            }
        </>
    )
}

export default DropdownMenu

interface _DropdownMenu {
    className?:string
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement>, 
        getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    options:dropdownMenuOptionType[]
    optionSelected?:string[]
    isDisabled?:boolean
    onClick?:(idOption:string, option:dropdownMenuOptionType, e:React.MouseEvent<HTMLButtonElement>)=>void;
    onOptionOpen?: (ref: React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>) => void;
    onOptionClose?: (ref: React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>) => void;

    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    floatingConfig?:{
        placement?:Placement,
        isContainerWidthSameAsTrigger?:boolean
        isWithCheckmark?:boolean
        isLockScroll?:boolean
        isShowDropdown?:boolean
        level?:number
    }
}

export type dropdownMenuStyleType = {
    triggerBox?:React.CSSProperties,
    triggerButton?:buttonStyleType,
    container?:React.CSSProperties,
    optionButton?:buttonStyleType,
}

export type dropdownMenuOptionType = {
    id:string,
    type?: 'option' | 'separator',
    txtLabel:string,
    alias?:string, 
    icon?:JSX.Element,
    iconAfter?:JSX.Element,
    isDisabled?:boolean,
    childMenu?:dropdownMenuOptionType[]
};