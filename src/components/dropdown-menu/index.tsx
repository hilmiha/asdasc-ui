import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import React, { useContext, useState, type JSX } from 'react';
import type { buttonStyleType } from "../button";
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import { autoUpdate, flip, FloatingFocusManager, FloatingPortal, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useRole, type Placement } from '@floating-ui/react';
import type { globalShapeType } from '../_types';
import { PiCaretRightBold, PiCheckBold, PiCircleBold } from 'react-icons/pi';
import Button from '../button';

const DropdownMenu = ({
    trigger,
    style = undefined,
    shape = undefined,
    options = [],
    optionSelected = undefined,
    placement,
    level = 0,
    onClick
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
        onOpenChange: setIsShowOption,
        placement: placement??'bottom-start',
        middleware: [
            offset(level ? 8 : 4),
            shift(),
            flip({
                padding: 10,
            }),
            size({
                apply({availableHeight, elements}) {
                    const value = `${Math.max(0, availableHeight) - 20}px`;
                    elements.floating.style.maxHeight = value;
                },
            }),
        ],
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
    });
    const click = useClick(context);
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
            <div 
                className='dropdown-menu-trigger-box'
                {...getReferenceProps()}
                style={style?.triggerBox}
            >
                {typeof trigger === 'function' 
                    ? trigger(refs.setReference, isShowOption)
                    : trigger && React.cloneElement(trigger, { ref: refs.setReference, isSelected:isShowOption })
                }
            </div>
            {
                (isShowOption)&&(
                    <FloatingPortal>
                        <FloatingFocusManager 
                            context={context} 
                            order={['reference', 'content']}
                            modal={true}
                        >
                            <div
                                className={clsx(
                                    'dropdown-menu-box',
                                    (shape)?(shape):(globalShape),
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
                                        options.map((option)=>{
                                            if(option.type!=='separator'){
                                                if(option.childMenu===undefined){
                                                    return (
                                                        <Button
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
                                                                        {
                                                                            (optionSelected?.includes(option.id))?(
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
                                                            onClick={(e)=>{ctrl.thisOnClick(option.id, e, onClick)}}
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
                                                            onClick={(idButton, e)=>{ctrl.thisOnClick(idButton, e, onClick)}}
                                                            placement='right-start'
                                                            level={level + 1}
                                                            trigger={
                                                                (triggerRef, isDropdownOpen)=>(
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
                            </div>
                        </FloatingFocusManager>
                    </FloatingPortal>
                )
            }
        </>
    )
}

export default DropdownMenu

interface _DropdownMenu {
    trigger:JSX.Element | ((triggerRef: React.RefCallback<HTMLElement>, isDropdownOpen:boolean) => JSX.Element);
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    options:dropdownMenuOptionType[]
    optionSelected?:string[]
    placement?:Placement,
    level?:number
    onClick?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void;
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
    txtLabel?:JSX.Element | string,
    icon?:JSX.Element,
    iconAfter?:JSX.Element,
    isDisabled?:boolean,
    childMenu?:dropdownMenuOptionType[]
};