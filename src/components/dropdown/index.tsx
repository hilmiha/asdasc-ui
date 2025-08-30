import './styles.scss';
import clsx from 'clsx';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import { autoUpdate, flip, FloatingFocusManager, FloatingOverlay, FloatingPortal, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles, type Placement } from '@floating-ui/react';
import type { globalShapeType } from '../_types';

const Dropdown = ({
    className,
    trigger,
    style = undefined,
    shape = undefined,
    isDisabled = false,
    onClose = undefined,
    onOpen = undefined,

    elementHeader = undefined,
    elementFooter = undefined,
    children = undefined,
    
    triggerClose = undefined,
    floatingConfig = undefined
}:_Dropdown) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const mountedOnce = useRef(false);
    const [isShowOption, setIsShowOption] = useState<boolean>(false)
    const modalGridStyle = useMemo(()=>{
        const gridTamp:string[] = [] //initial for title box
        if(elementHeader){
            gridTamp.push('min-content')
        }
        if(children){
            gridTamp.push('1fr')
        }
        if(elementFooter){
            gridTamp.push('min-content')
        }

        return gridTamp.join(' ')
    },[])
    //States end ====
    
    //FloatingUi Config ====
    const {refs, floatingStyles, context} = useFloating({
        open: isShowOption,
        onOpenChange: (open)=>{
            setIsShowOption(open)
        },
        placement: (floatingConfig?.placement)??('bottom-start'),
        middleware: [
            offset((floatingConfig?.level)?8:4),
            shift(),
            flip({
                padding: 10,
                fallbackPlacements:floatingConfig?.fallbackPlacement??['bottom-start','bottom','bottom-end','top-start','top','top-end']
            }),
            size({
                apply({availableHeight, elements, rects}) {
                    const value = `${(Math.max(0, availableHeight) - 50)}px`;
                    elements.floating.style.maxHeight = value;
                    if(floatingConfig?.isContainerWidthSameAsTrigger){
                        elements.floating.style.width = `${rects.reference.width}px`
                        elements.floating.style.minWidth = `${Math.max(180, rects.reference.width)}px`
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
    const {isMounted} = useTransitionStyles(context,{
        duration: {
            open: 0,
            close: 300,
        },
    });
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);
    //FloatingUi Config ====

    //run onOpen and onClose props function
    useEffect(()=>{
        if(isMounted){
            mountedOnce.current = true
            if(onOpen){
                onOpen()
            }
        }
        if(!isMounted && onClose && mountedOnce.current){
            onClose()
        }
    },[isMounted])

    //Build trigger component ====
    const triggerComponent = useMemo(()=>{
        if(typeof trigger === 'function'){
            return(trigger(
                refs.setReference, 
                getReferenceProps,
                isShowOption, 
                refs.domReference,
            ))
        }else{
            return(
                <div 
                    className={clsx(
                        'dropdown-trigger-box',
                    )}
                    {...getReferenceProps()}
                    style={style?.triggerBox}
                >
                    {React.cloneElement(trigger, { ref: refs.setReference, isSelected:isShowOption })}
                </div>
            )
        }
    },[trigger, isShowOption])

    useEffect(()=>{
        if(triggerClose===1){
            const trigger = refs.domReference.current as HTMLButtonElement
            trigger.click()
        }
    },[triggerClose])

    return(
        <>
            {
                triggerComponent
            }
            {
                (isMounted)&&(
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
                                        'dropdown-box',
                                        className
                                    )}
                                    ref={refs.setFloating}
                                    style={floatingStyles}
                                    {...getFloatingProps()}
                                >
                                    <div 
                                        className={clsx(
                                            'dropdown-container',
                                            (shape)?(shape):(globalShape),
                                            {
                                                ['closing']:(!isShowOption)
                                            }
                                        )}
                                        style={style?.container}
                                    >
                                        <div 
                                            className='content-box'
                                            style={{
                                                gridTemplateRows:modalGridStyle,
                                            }}
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
                                                {children}
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
                                </div>
                            </FloatingFocusManager>
                        </FloatingOverlay>
                    </FloatingPortal>
                )
            }
        </>
    )
}

export default Dropdown

interface _Dropdown {
    className?:string
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement>, 
        getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    style?:dropdownStyleType;
    shape?:globalShapeType;
    isDisabled?:boolean
    onOpen?: () => void;
    onClose?: () => void;

    elementHeader?:JSX.Element
    elementFooter?:JSX.Element
    children?:JSX.Element | JSX.Element[]

    triggerClose?:1|0,
    floatingConfig?:dropdownFloatingConfigType
}

export type dropdownFloatingConfigType = {
    placement?:Placement,
    fallbackPlacement?:Placement[]
    isContainerWidthSameAsTrigger?:boolean
    isWithCheckmark?:boolean
    isLockScroll?:boolean
    isShowDropdown?:boolean
    level?:number,
}

export type dropdownStyleType = {
    triggerBox?:React.CSSProperties,
    container?:React.CSSProperties,
}