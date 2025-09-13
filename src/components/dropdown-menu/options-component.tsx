import clsx from "clsx"
import * as ctrl from './controller';
import { useContext } from "react";
import Button from "../button"
import DropdownMenu from ".";
import { PiCaretRightBold, PiCircleBold } from "react-icons/pi";
import { GlobalContext, type _GlobalContextType } from "../../context/global-context";
import type { globalShapeType, optionItemType } from "../_types";
import type { dropdownFloatingConfigType, dropdownMenuStyleType } from "."
import CheckboxButton, { type checkboxButtonAppearance } from "../checkbox-button";

const OptionsComponent = ({
    style,
    shape,
    onClick,
    setIsChildOpen,
    options,
    optionSelected,
    optionSelectedAppearance,
    floatingConfig
}:{
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    onClick?:(idOption:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement>)=>void;
    setIsChildOpen?:React.Dispatch<React.SetStateAction<boolean>>,
    options:optionItemType[]
    optionSelected?:string[],
    optionSelectedAppearance?:checkboxButtonAppearance
    floatingConfig?:dropdownFloatingConfigType
}) =>{
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    return(
        <>
            {
                options.map((option)=>{
                    if(option.type!=='separator'){
                        if(option.childOption===undefined){
                            if(floatingConfig?.isWithCheckmark && option.type==='option'){
                                return(
                                    <CheckboxButton
                                        className={clsx('dropdown-item')}
                                        style={style?.optionButton}
                                        shape={shape}
                                        key={option.id}
                                        txtLabel={option.txtLabel}
                                        txtSublabel={option.txtSublabel}
                                        icon={option.icon}
                                        isSelected={optionSelected?.includes(option.id)||false}
                                        onClick={(_, e)=>{ctrl.onOptionClick(option, e, onClick)}}
                                        isDisabled={option.isDisabled}
                                        appearance={optionSelectedAppearance}
                                    />
                                )
                            }else{
                                return(
                                    <Button
                                        key={option.id}
                                        id={option.id}
                                        className={clsx('dropdown-item')}
                                        style={style?.optionButton}
                                        shape={shape}
                                        txtLabel={<div className='text-label-box'>
                                            <p className='text-label'>{option.txtLabel}</p>
                                            {
                                                (option.txtSublabel)&&(
                                                    <p className='text-sublabel'>{option.txtSublabel??''}</p>
                                                )
                                            }
                                        </div>}
                                        iconBefore={
                                            (floatingConfig?.isWithCheckmark)?(
                                                <div className='check-icon-container'>
                                                    <PiCircleBold className='global-icon' style={{color:'transparent'}}/>
                                                    {option.icon}
                                                </div>
                                            ):(
                                                option.icon
                                            )
                                        }
                                        isSelected={optionSelected?.includes(option.id)}
                                        appearance={'subtle'}
                                        onClick={(e)=>{ctrl.onOptionClick(option, e, onClick)}}
                                        isDisabled={option.isDisabled}
                                    />
                                )
                            }
                        }else{
                            return(
                                <DropdownMenu
                                    key={option.id}
                                    options={option.childOption}
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
                                        placement:floatingConfig?.placement??'bottom-start',
                                        fallbackPlacement:floatingConfig?.fallbackPlacement,
                                        level:((floatingConfig?.level)??0)+1,
                                        isWithCheckmark:floatingConfig?.isWithCheckmark,
                                    }}
                                    onOpen={()=>{
                                        if(setIsChildOpen){
                                            setIsChildOpen(true)
                                        }
                                    }}
                                    onClose={()=>{
                                        if(setIsChildOpen){
                                            setIsChildOpen(false)
                                        }
                                    }}
                                    trigger={
                                        (triggerRef, getReferenceProps, isDropdownOpen, )=>(
                                            <div style={{display:'flex'}} {...(getReferenceProps?.() ?? {})}>
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
                                                        (floatingConfig?.isWithCheckmark)?(
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
                            <div key={option.id} className='separator'>
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
        </>
    )
}

export default OptionsComponent