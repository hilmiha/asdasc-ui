import clsx from 'clsx';
import './styles.scss';
import * as ctrl from './controller';
import React, { useState, useEffect, useRef, type JSX, useMemo, useContext } from 'react';
import { autoUpdate, FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from '@floating-ui/react';
import type { globalShapeType } from 'src/components/_types';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import IconButton from '../icon-button';
import { PiXBold } from 'react-icons/pi';
import { useDeepCompareMemo } from 'src/hook/useDeepCompareMemo';

const BottomSheet = ({
    isOpen, 
    setIsOpen,
    className,
    iconTitle,
    txtTitle,
    children,
    onOpen = undefined,
    onClose = undefined,
    elementHeader = undefined,
    elementFooter = undefined,
    style = undefined,
    shape = undefined,
    floatingConfig = undefined
}:_BottomSheet) =>{
    
    //Context start ====
    const {
        globalShape,
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States and refs start ======
    const mountedOnce = useRef(false);
    const snapPointConfig = useDeepCompareMemo<snapPointSizeType>(()=>{
        if(floatingConfig?.snapPointSize){
            return floatingConfig.snapPointSize
        }else if(screenSize==='mobile'){
            return{
                HIDDEN: 0,
                HALF: 45,
                FULL: 80
            }
        }else{
            return{
                HIDDEN: 0,
                HALF: 45,
                FULL: 95
            }
        }
    },[screenSize, floatingConfig?.snapPointSize]);

    const [snapPoint, setSnapPoint] = useState<snapPointType>('HIDDEN');
    const [currentHeight, setCurrentHeight] = useState(0);

    const handleRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ y: 0, height: 0 });
    
    const [touchStart, setTouchStart] = useState<{ y: number; scrollTop: number } | null>(null);

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
    //States and refs end ======

    // Update height when snap point changes
    useEffect(() => {
        if (!isDragging) {
            if(snapPoint==='HALF'||snapPoint==='FULL'){
                setTimeout(() => {
                    setCurrentHeight(snapPointConfig[snapPoint]);
                }, 100);
            }else{
                setCurrentHeight(snapPointConfig[snapPoint]);
            }
        }
    }, [snapPoint, isDragging]);

    // Add global event listeners for drag handle dragged
    useEffect(() => {
        if (isDragging) {
            const pointerMove = (e: PointerEvent)=>{
                ctrl.handlePointerMove(e, isDragging, dragStart, setCurrentHeight)
            }
            const pointerUp = (e: PointerEvent)=>{
                ctrl.handlePointerUp(e, setSnapPoint, snapPointConfig, isDragging, setIsDragging, dragStart, floatingConfig, setIsOpen)
            }

            document.addEventListener('pointermove', pointerMove);
            document.addEventListener('pointerup', pointerUp);
            return () => {
                document.removeEventListener('pointermove', pointerMove);
                document.removeEventListener('pointerup', pointerUp);
            };
        }
    }, [isDragging, dragStart]);


    //FloatingUi Config ====
    const {refs, context} = useFloating({
        open: snapPoint!=='HIDDEN',
        onOpenChange: (open)=>{
            if(open){
                ctrl.doChangeSnappoint('HALF', setSnapPoint, floatingConfig);
            }else{
                ctrl.handleBackdropClick(snapPoint, setSnapPoint, floatingConfig, setIsOpen)
            }
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
            open: 300,
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
            mountedOnce.current = true;
            if(onOpen){
                onOpen()
            }
        }

        if(!isMounted && onClose && mountedOnce.current){
            onClose()
        }

        if(!isMounted && setIsOpen && isOpen){
            setIsOpen(false)
        }
    },[isMounted])

    useEffect(()=>{
        if(isOpen){
            if(floatingConfig?.defaultSnapPoint==='FULL'){
                ctrl.doChangeSnappoint('FULL', setSnapPoint, floatingConfig);
            }else{
                ctrl.doChangeSnappoint('HALF', setSnapPoint, floatingConfig);
            }
        }else{
            ctrl.doChangeSnappoint('HIDDEN', setSnapPoint, floatingConfig);
        }
    },[isOpen])

    if(isMounted){
        return(
            <FloatingPortal>
                <FloatingOverlay lockScroll={true} style={{overflow:'hidden', zIndex:"1"}}>
                    <FloatingFocusManager 
                        context={context} 
                        order={['floating']}
                        modal={true}
                    >
                        <div
                            className={clsx(
                                "bottom-sheet",
                                className
                            )}
                        >
                            {/* Backdrop */}
                            <div className='bottom-sheet-overlay'
                                style={{
                                    opacity: (floatingConfig?.isChildOpen)?(0):((currentHeight*1)/100),
                                }}
                            />

                            {/* Bottom Sheet */}
                            <div
                                ref={refs.setFloating}
                                className={clsx(
                                    'bottom-sheet-box',
                                    screenSize,
                                    {
                                        ['dragging']:(isDragging)
                                    }
                                )}
                                style={{
                                    height: `${currentHeight}vh`,
                                }}
                                {...getFloatingProps()}
                            >
                                <div 
                                    className={clsx(
                                        'bottom-sheet-container',
                                        (shape)?(shape):(globalShape),
                                    )}
                                    style={style?.container}
                                >
                                    {/* Drag handle */}
                                    <div
                                        ref={handleRef}
                                        onPointerDown={(e)=>{
                                            ctrl.handlePointerDown(e, currentHeight, setIsDragging, setDragStart)
                                        }}
                                        className={clsx(
                                            'drag-handle-area',
                                            {
                                                ['dragging']:(isDragging)
                                            }
                                        )}
                                    >
                                        <div className='drag-handle'/>
                                        {
                                            (iconTitle || txtTitle)&&(
                                                <div className='bottom-sheet-title-box'>
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
                                                                icon={<PiXBold className='global-icon x-icon'/>}
                                                                txtLabel='Close Modal'
                                                                appearance='subtle'
                                                                isShowtooltip={false}
                                                                onClick={()=>{ctrl.doChangeSnappoint('HIDDEN', setSnapPoint, floatingConfig)}}
                                                            />
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                
                                    {/* Content */}
                                    <div 
                                        className='content-box'
                                        style={{
                                            gridTemplateRows:modalGridStyle
                                        }}
                                    >
                                        {
                                            elementHeader&&(
                                                <div 
                                                    className='element-header-box'
                                                    onTouchStart={(e)=>{
                                                        ctrl.handleTouchStart(e, setTouchStart)
                                                    }}
                                                    onTouchMove={(e)=>{
                                                        ctrl.onTouchMove(e, touchStart, setTouchStart, snapPoint, setSnapPoint, floatingConfig, setIsOpen)
                                                    }}
                                                >
                                                    {
                                                        elementHeader
                                                    }
                                                </div>
                                            )
                                        }
                                        <div 
                                            className='bottom-sheet-body-box'
                                            onScroll={(e)=>{
                                                ctrl.contentScrollUp(e, snapPoint, setSnapPoint)
                                            }}
                                        >
                                            {children}
                                        </div>
                                        {
                                            elementFooter&&(
                                                <div 
                                                    className='element-footer-box'
                                                    onTouchStart={(e)=>{
                                                        ctrl.handleTouchStart(e, setTouchStart)
                                                    }}
                                                    onTouchMove={(e)=>{
                                                        ctrl.onTouchMove(e, touchStart, setTouchStart, snapPoint, setSnapPoint, floatingConfig, setIsOpen)
                                                    }}
                                                >
                                                    {
                                                        elementFooter
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
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

export default BottomSheet;

interface _BottomSheet{
    isOpen?:boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;

    className?:string
    
    iconTitle?:JSX.Element,
    txtTitle?:string,
    children?: JSX.Element | JSX.Element[],

    onOpen?: () => void;
    onClose?: () => void;
    
    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    shape?:globalShapeType;
    style?:bottomSheetStyleType;

    floatingConfig?:bottomSheetFloatingConfig
}

export type bottomSheetFloatingConfig = {
    defaultSnapPoint?:'FULL'|'HALF'
    snapPointSize?:snapPointSizeType
    isDisableDismiss?:boolean
    isChildOpen?:boolean
    level?:number
}
type bottomSheetStyleType = {
    triggerBox?:React.CSSProperties,
    container?:React.CSSProperties,
}

export type snapPointSizeType = {
    HIDDEN: number,
    HALF: number,
    FULL: number
}
export type snapPointType = 'HIDDEN'|'HALF'|'FULL'
