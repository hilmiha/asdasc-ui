import clsx from "clsx"
import * as ctrl from './controller';
import { useContext } from "react";
import Button from "../button"
import DropdownMenu from ".";
import { PiCaretRightBold, PiCheckBold, PiCircleBold } from "react-icons/pi";
import { GlobalContext, type _GlobalContextType } from "../../context/global-context";
import type { globalShapeType } from "../_types";
import type { dropdownFloatingConfigType, dropdownMenuOptionType, dropdownMenuStyleType } from "."

const OptionsComponent = ({
    style,
    shape,
    onClick,
    setIsChildOpen,
    options,
    optionSelected,
    floatingConfig
}:{
    style?:dropdownMenuStyleType;
    shape?:globalShapeType;
    onClick?:(idOption:string, option:dropdownMenuOptionType, e:React.MouseEvent<HTMLButtonElement>)=>void;
    setIsChildOpen?:React.Dispatch<React.SetStateAction<boolean>>,
    options:dropdownMenuOptionType[]
    optionSelected?:string[],
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
                        if(option.childMenu===undefined){
                            return (
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