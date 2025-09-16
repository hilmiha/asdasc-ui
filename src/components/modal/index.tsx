// import clsx from 'clsx';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import './styles.scss';
import { autoUpdate, FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from "@floating-ui/react";
import clsx from 'clsx';
import { PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';

const Modal = ({
    isOpen = undefined,
    setIsOpen = undefined,

    txtTitle,
    iconTitle,
    
    className = undefined,
    style = undefined,
    shape = undefined,
    size = 'small',
    onOpen = undefined,
    onClose = undefined,

    elementHeader = undefined,
    elementFooter = undefined,
    children = <></>,

    floatingConfig = undefined,
}:_Modal) =>{
    //Context start ====
    const {
        globalShape,
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //state start =====
    const mountedOnce = useRef(false);
    const [isModalShow, setIsModalShow] = useState(false)
    //state end ====

    //States, memo, ref start =====
    const modalGridStyle = useMemo(()=>{
        const gridTamp:string[] = [] //initial for title box
        if(txtTitle || iconTitle){
            gridTamp.push('min-content')
        }
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
    },[txtTitle])
    //States, memo, ref end =====

    //FloatingUi Config ====
    const {refs, context} = useFloating({
        open: isModalShow,
        onOpenChange: (open)=>{
            setIsModalShow(open)
        },
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
    });
    const dismiss = useDismiss(context,{
        enabled:(floatingConfig?.isDisableDismiss!==undefined)?(!floatingConfig.isDisableDismiss):(true),
        outsidePressEvent: 'pointerdown',
        ancestorScroll: false,
    });
    const role = useRole(context);
    const {isMounted} = useTransitionStyles(context,{
        duration: {
            open: 0,
            close: 300,
        },
    });
    const { getFloatingProps } = useInteractions([
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

        if(!isMounted && setIsOpen){
            setIsOpen(false)
        }
    },[isMounted])

    //open and close modal using controlled state
    useEffect(()=>{
        if(isOpen){
            setIsModalShow(true)
        }
        if(!isOpen){
            setIsModalShow(false)
        }
    },[isOpen])

    if(isMounted){
        return(
            <FloatingPortal>
                <FloatingOverlay lockScroll={true} style={{overflow:'hidden'}}>
                    <FloatingFocusManager
                        context={context} 
                        order={['floating']}
                        modal={true}
                    >
                        <div
                            className={clsx(
                                'modal',
                                className
                            )}
                        >
                            <div className='modal-overlay'
                                style={{
                                    opacity: (floatingConfig?.isChildOpen)?(0):(0.8),
                                }}
                            />
                            <div
                                className={clsx(
                                    'modal-container',
                                    (size==='full')?('full'):(screenSize==='mobile')?('mobile'):(size)?(size):('small'),
                                    (shape)?(shape):(globalShape),
                                    {
                                        ['closing']:(!isModalShow)
                                    }
                                )}
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                                style={{
                                    ...style?.container,
                                    gridTemplateRows:modalGridStyle,
                                }}
                            >
                                {
                                    (txtTitle || iconTitle)&&(
                                        <div className='modal-title-box'>
                                            <div className='title'>
                                                {
                                                    (iconTitle)&&(
                                                        <div className='title-icon'>
                                                            {iconTitle}
                                                        </div>
                                                    )
                                                }
                                                {
                                                    (txtTitle)&&(
                                                        <p className='title-text'>
                                                            {txtTitle}
                                                        </p>
                                                    )
                                                }
                                            </div>
                                            {
                                                (!floatingConfig?.isDisableDismiss)&&(
                                                    <IconButton
                                                        className='x-button'
                                                        icon={<PiXBold className='global-icon'/>}
                                                        txtLabel='Close Modal'
                                                        appearance='subtle'
                                                        isShowtooltip={false}
                                                        onClick={()=>{setIsModalShow(false)}}
                                                    />
                                                )
                                            }
                                        </div>
                                    )
                                }
                                
                                {
                                    (elementHeader)&&(
                                        <div
                                            className='modal-header-box'
                                        >
                                            {elementHeader}
                                        </div>
                                    )
                                }
                                <div
                                    className='modal-body-box'
                                >
                                    {children}
                                </div>
                                {
                                    (elementFooter)&&(
                                        <div
                                            className='modal-footer-box'
                                        >
                                            {elementFooter}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </FloatingFocusManager>
                </FloatingOverlay>
            </FloatingPortal>
        )
    }else{
        return null
    }
}

export default Modal

interface _Modal {
    isOpen?:boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;

    txtTitle?:string;
    iconTitle?:JSX.Element;
    className?:string;
    style?:modalStyleType
    shape?:globalShapeType;
    size?:modalSizeType
    onOpen?:()=>void;
    onClose?:()=>void;
    elementHeader?:JSX.Element
    elementFooter?:JSX.Element
    children:JSX.Element
    floatingConfig?:modalFloatingConfigType
}

type modalSizeType = 'small' | 'medium' | 'large' | 'full'
type modalStyleType = {
    container:React.CSSProperties,
}
type modalFloatingConfigType = {
    isChildOpen?:boolean,
    isDisableDismiss?:boolean
    level?:number
}