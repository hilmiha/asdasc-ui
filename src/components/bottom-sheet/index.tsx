import clsx from 'clsx';
import './styles.scss';
import * as ctrl from './controller';
import React, { useState, useEffect, useRef, type JSX, useMemo, useContext } from 'react';
import { autoUpdate, FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useRole, useTransitionStyles } from '@floating-ui/react';
import type { globalShapeType } from '../_types';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';

const BottomSheet = ({
    className,
    trigger,
    titleIcon,
    title,
    children,
    isDisabled,
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
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States and refs start ======
    const snapPointConfig = useMemo<Record<snapPointType, number>>(()=>{
        return{
            HIDDEN: 0,
            HALF: 45,
            FULL: 90
        }
    },[]);

    const [snapPoint, setSnapPoint] = useState<snapPointType>('HIDDEN');
    const [currentHeight, setCurrentHeight] = useState(0);

    const handleRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ y: 0, height: 0 });
    
    const [touchStart, setTouchStart] = useState<{ y: number; scrollTop: number } | null>(null);
    //States and refs end ======


    // Update height when snap point changes
    useEffect(() => {
        if (!isDragging) {
            if(snapPoint==='HALF'){
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
                ctrl.handlePointerUp(e, snapPoint, setSnapPoint, snapPointConfig, isDragging, setIsDragging, dragStart, onClose, floatingConfig)
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
                ctrl.doChangeSnappoint('HALF', snapPoint, setSnapPoint, floatingConfig, onClose);
            }else{
                ctrl.handleBackdropClick(snapPoint, setSnapPoint, floatingConfig, onClose)
            }
            
            if(onOpen && open){
                onOpen()
            }
        },
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
            open: 300,
            close: 300,
        },
    });
    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);
    //FloatingUi Config ====
    

    //Build trigger component ====
    const triggerComponent = useMemo(()=>{
        if(typeof trigger === 'function'){
            return(trigger(
                refs.setReference, 
                getReferenceProps,
                (snapPoint!=='HIDDEN'), 
                refs.domReference,
            ))
        }else{
            return(
                <div 
                    className={clsx(
                        'dropdown-menu-trigger-box',
                    )}
                    {...getReferenceProps()}
                    style={style?.triggerBox}
                >
                    {React.cloneElement(trigger, { ref: refs.setReference, isSelected:(snapPoint!=='HIDDEN') })}
                </div>
            )
        }
    },[trigger, snapPoint])

    return (
        <>
            {/* trigger */}
            {
                triggerComponent
            }

            {
                (isMounted)&&(
                    <FloatingPortal>
                        <FloatingOverlay lockScroll={true} style={{overflow:'hidden'}}>
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
                                                onPointerDown={(e)=>{ctrl.handlePointerDown(e, currentHeight, setIsDragging, setDragStart)}}
                                                className={clsx(
                                                    'drag-handle-area',
                                                    {
                                                        ['dragging']:(isDragging)
                                                    }
                                                )}
                                            >
                                                <div className='drag-handle'/>
                                                {
                                                    (titleIcon || title)&&(
                                                        <div className='header-box'>
                                                            {
                                                                (titleIcon)&&(
                                                                    <div className='title-icon'>{titleIcon}</div>
                                                                )
                                                            }
                                                            {
                                                                (title)&&(
                                                                    <p className='title-box'>{title}</p>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        
                                            {/* Content */}
                                            <div className='content-box'>
                                                {
                                                    elementHeader&&(
                                                        <div className='element-header-box'>
                                                            {
                                                                elementHeader
                                                            }
                                                        </div>
                                                    )
                                                }
                                                <div 
                                                    className='bottom-sheet-body-box'
                                                    onTouchStart={(e)=>{
                                                        ctrl.handleTouchStart(e, setTouchStart)
                                                    }}
                                                    onTouchMove={(e)=>{
                                                        ctrl.onTouchMove(e, touchStart, setTouchStart, snapPoint, setSnapPoint, floatingConfig, onClose)
                                                    }}
                                                >
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
                                </div>
                            </FloatingFocusManager>
                        </FloatingOverlay>
                    </FloatingPortal>
                )
            }
            
        </>
    );
}

export default BottomSheet;

interface _BottomSheet{
    className?:string
    
    trigger:JSX.Element | ((
        triggerRef: React.RefCallback<HTMLElement>, 
        getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
        isDropdownOpen:boolean, 
        trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
    ) => JSX.Element);
    titleIcon?:JSX.Element,
    title?:string,
    children: JSX.Element,
    isDisabled?:boolean

    onOpen?: () => void;
    onClose?: () => void;
    
    elementHeader?:JSX.Element
    elementFooter?:JSX.Element

    shape?:globalShapeType;
    style?:bottomSheetStyleType;

    floatingConfig?:bottomSheetFloatingConfig
}

export type bottomSheetFloatingConfig = {
    isLockScroll?:boolean
    isShowDropdown?:boolean
    isChildOpen?:boolean,
    level?:number
}
type bottomSheetStyleType = {
    triggerBox?:React.CSSProperties,
    container?:React.CSSProperties,
}

export type snapPointType = 'HIDDEN'|'HALF'|'FULL'
