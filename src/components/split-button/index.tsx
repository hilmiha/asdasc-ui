import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext, type JSX } from "react";
import Button, { type buttonStyleType } from "../button";
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import IconButton, { type iconButtonStyleType } from '../icon-button';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import type { globalShapeType, optionItemType } from '../_types';
import DropdownMenu, { type dropdownMenuStyleType } from '../dropdown-menu';

const SplitButton = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    appearance = 'neutral',
    shape = undefined,
    txtLabel = '',
    options = [],
    optionSelected = undefined,
    isDisabled = false,
    onClick = undefined,
    onOptionClick = undefined
}:_SplitButton) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    return(
        <div
            ref={ref}
            id={id}
            className={
                clsx(
                    'split-button',
                    className
                )
            }
            style={style?.group}
        >
            <Button
                className='button-one'
                txtLabel={txtLabel}
                appearance={appearance}
                shape={(shape)?(shape):(globalShape)}
                isDisabled={isDisabled}
                onClick={(e)=>{ctrl.doOnClick(e, onClick)}}
                style={style?.mainButton}
            />
            <DropdownMenu
                options={options}
                optionSelected={optionSelected}
                onClick={(idButton, _, e)=>{ctrl.doOptionClick(idButton, e, onOptionClick)}}
                style={style?.dropdownMenu}
                shape={(shape)?(shape):(globalShape)}
                trigger={(triggerRef, getReferenceProps, isDropdownOpen)=>(
                    <div {...(getReferenceProps?.() ?? {})}>
                        <IconButton
                            ref={triggerRef} 
                            className='button-more'
                            txtLabel={`${txtLabel} More`}
                            icon={(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
                            appearance={appearance}
                            shape={(shape)?(shape):(globalShape)}
                            isDisabled={isDisabled}
                            isShowtooltip={false}
                            style={style?.secondaryButton}
                            isSelected={isDropdownOpen}
                        />
                    </div>
                    
                )}
            />
        </div>
    )
}

export default SplitButton

interface _SplitButton {
    ref?:React.Ref<HTMLDivElement>;
    id?:string
    className?:string;
    style?:splitButtonStyleType;
    appearance?: 'neutral' | 'primary';
    shape?:globalShapeType;
    txtLabel:string;
    options:optionItemType[]
    optionSelected?:string[]
    iconBefore?:JSX.Element;
    iconAfter?:JSX.Element;
    isDisabled?:boolean;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    onOptionClick?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void;
};

export type splitButtonStyleType = {
    group?:React.CSSProperties,
    mainButton?:buttonStyleType,
    secondaryButton?:iconButtonStyleType,
    dropdownMenu?:dropdownMenuStyleType
}
