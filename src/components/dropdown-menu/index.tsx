import './styles.scss';
import React, { useContext, useState, type JSX } from 'react';
import type { buttonStyleType } from "../button";
import { type Placement } from '@floating-ui/react';
import type { globalShapeType } from '../_types';
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
    if((screenSize==='laptop') || (floatingConfig?.mode?.length===1 && floatingConfig.mode.includes('dropdown'))){
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
                floatingConfig={floatingConfig}
            >
                <OptionsComponent
                    style={style}
                    shape={shape}
                    options={options}
                    optionSelected={optionSelected}
                    onClick={onClick}
                    floatingConfig={floatingConfig}
                />
            </Dropdown>
        )
    }else{
        return(
            <BottomSheet
                className={clsx(
                    'dropdown-menu-bottom-sheet',
                    className
                )}
                trigger={trigger}
                elementHeader={elementHeader}
                elementFooter={elementFooter}
                onClose={onClose}
                onOpen={onOpen}
                isDisabled={isDisabled}
                floatingConfig={{
                    ...floatingConfig,
                    isChildOpen:isChildOpen
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
        )
    }
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

export type dropdownMenuOptionType = {
    id:string,
    type?: 'option' | 'separator',
    txtLabel:string,
    txtSublabel?:string,
    alias?:string, 
    icon?:JSX.Element,
    iconAfter?:JSX.Element,
    isDisabled?:boolean,
    childMenu?:dropdownMenuOptionType[]
};