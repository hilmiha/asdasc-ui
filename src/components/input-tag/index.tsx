import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from "../_types";
import { useContext, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu, { type dropdownMenuOptionType } from '../dropdown-menu';
import { PiCaretDownBold, PiCaretUpBold, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import Tag from '../tag';

const InputTags = ({
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'text-no-space',
    txtPlaceholder = undefined,
    options = [],
    value = [],
    onChange = undefined,
    onBlur = undefined,
    onFocus = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined,
}:_InputSelection) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isDirty, setIsDirty] = useState(false)
    
    const isDisabled = useMemo(()=>{
        return config?.isDisabled??false
    },[config?.isDisabled])

    const [searchParam, setSearchParam] = useState('')

    const optionTamp = useMemo(()=>{
        if(!options){
            return []
        }
        let tampOptions = [...options].filter(i=>!value.includes(i.txtLabel))

        if(searchParam){
            tampOptions = tampOptions.filter(i=>(`${i.txtLabel}${i.alis}`).toLowerCase().includes(searchParam.toLowerCase()))
        }

        if(config?.maxValue){
            if(value.length >= config?.maxValue){
                return tampOptions.map((i)=>{
                    if(value.includes(i.id)){
                        return i
                    }else{
                        return {...i, isDisabled:true}
                    }
                })
            }else{
                return tampOptions
            }
        }else{
            return tampOptions
        }
    },[options, value, searchParam])

    const shadowValueElement = useMemo(()=>{
        return value.map((i)=>(
            <Tag
                key={i}
                txtLabel={i}
                onClickRemove={()=>{}}
                style={{
                    tagContainer:{opacity:'0%'}
                }}
                isDisabled={true}
            />
        ))
    },[value])
    const valueElement = useMemo(()=>{
        return  value.map((i)=>(
            <Tag
                key={i}
                txtLabel={i}
                onClickRemove={
                    !isDisabled?(
                        (e)=>{
                            ctrl.doRemoveValueX(e, i, value, isDirty, setIsDirty, onChange, config, onValidate)
                        }
                    ):(undefined)
                }
                style={{
                    removeButton:{button:{pointerEvents:'all'}},
                    textLabel:{pointerEvents:'all'}
                }}
                isDisabled={isDisabled}
            />
        ))
    },[value,isDisabled])
     //States end ====

    // Update ref
    const inputTagRef = useRef<HTMLInputElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return(
        <div className={clsx(
            'input-tag-box',
            {
                ['open']:(isDropdownOpen)
            }
        )}>
            <select
                style={{display:'none'}}
                id={id}
                value={value}
                multiple={true}
                disabled
            >
                <option value=""></option>
                {
                    value.map((i)=>(
                        <option key={i} value={i}>{i}</option>
                    ))
                }
            </select>
            {
                (options.length===0 || isDisabled)?(
                    <div
                        className={clsx(
                            'input-tag-container',
                            (shape)?(shape):(globalShape),
                            {
                                ['disabled']:(isDisabled),
                                ['error']:(error?.isError),
                            },
                            className
                        )}
                    >
                        {
                            (config?.prefixElement)&&(
                                <div className='perfix-box'>
                                    {config?.prefixElement}
                                </div>
                            )
                        }
                        <div className='input-tag-input'>
                            {
                                (value.length>0)&&(shadowValueElement)
                            }
                            {
                                (!isDisabled)&&(
                                    <input
                                        ref={inputTagRef}
                                        placeholder={txtPlaceholder}
                                        className='input-tag'
                                        value={searchParam}
                                        onChange={(e)=>{
                                            if(!isDisabled){
                                                ctrl.onInputTagChange(e, inputTagRef, type, value, isDirty, setIsDirty, isDropdownOpen, setSearchParam, error, onValidate)
                                            }
                                        }}
                                        onBlur={(e)=>{
                                            if(!isDisabled){
                                                ctrl.onInputTagBlur(e, inputTagRef, value, searchParam, setSearchParam, isDropdownOpen, optionTamp,  isDirty, onBlur, config, onValidate)
                                            }   
                                        }}
                                        onFocus={(e)=>{
                                            if(!isDisabled){
                                                ctrl.onInputTagFocus(e, value, onFocus)
                                            }
                                        }}
                                        onKeyDown={(e)=>{
                                            ctrl.onInputTagKeyDown(e, inputTagRef, searchParam, setSearchParam, value, onChange, config, onValidate)
                                        }}
                                    />
                                )
                            }
                        </div>
                        {
                            (config?.sufixElement)&&(
                                <div className='sufix-box'>
                                    {config?.sufixElement}
                                </div>
                            )
                        }
                        {
                            (value.length > 0 && !isDisabled)&&(
                                <IconButton
                                    className='clear-button'
                                    icon={<PiXBold/>}
                                    txtLabel='Clear'
                                    appearance='subtle'
                                    isShowtooltip={false}
                                    onClick={(e)=>{ctrl.onClearButtonClick(e, inputTagRef, onChange, config, onValidate)}}
                                />
                            )
                        }
                        {
                            (isDisabled)&&(
                                <div className='lock-box'><PiLockBold className='global-icon'/></div>
                            )
                        }
                    </div>
                ):(
                    <DropdownMenu
                        className={clsx(
                            'input-tag-dropdown',
                        )}
                        trigger={
                            (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                                if(trigger.current){
                                    inputTagRef.current = trigger.current as HTMLInputElement
                                }

                                return(
                                    <div
                                        className={clsx(
                                            'input-tag-container',
                                            (shape)?(shape):(globalShape),
                                            {
                                                ['disabled']:(isDisabled),
                                                ['selected']:(isDropdownOpen && optionTamp.length>0),
                                                ['error']:(error?.isError),
                                            },
                                            className
                                        )}
                                        style={style?.triggerButton}
                                        onClick={()=>{inputTagRef.current?.focus()}}
                                    >
                                        {
                                            (config?.prefixElement)&&(
                                                <div className='perfix-box'>
                                                    {config?.prefixElement}
                                                </div>
                                            )
                                        }
                                        <div className='input-tag-input'>
                                            {
                                                (value.length>0)&&(shadowValueElement)
                                            }
                                            {
                                                (!isDisabled)&&(
                                                    <input
                                                        {...getReferenceProps()}
                                                        ref={triggerRef}
                                                        placeholder={txtPlaceholder}
                                                        className='input-tag'
                                                        value={searchParam}
                                                        onChange={(e)=>{
                                                            if(!isDisabled){
                                                                ctrl.onInputTagChange(e, inputTagRef, type, value, isDirty, setIsDirty, isDropdownOpen, setSearchParam, error, onValidate)
                                                            }
                                                        }}
                                                        onBlur={(e)=>{
                                                            if(!isDisabled){
                                                                ctrl.onInputTagBlur(e, inputTagRef, value, searchParam, setSearchParam, isDropdownOpen, optionTamp,  isDirty, onBlur, config, onValidate)
                                                            }   
                                                        }}
                                                        onFocus={(e)=>{
                                                            if(!isDisabled){
                                                                ctrl.onInputTagFocus(e, value, onFocus)
                                                            }
                                                        }}
                                                        onKeyDown={(e)=>{
                                                            ctrl.onInputTagKeyDown(e, inputTagRef, searchParam, setSearchParam, value, onChange, config, onValidate)
                                                        }}
                                                    />
                                                )
                                            }
                                        </div>
                                        {
                                            (config?.sufixElement)&&(
                                                <div className='sufix-box'>
                                                    {config?.sufixElement}
                                                </div>
                                            )
                                        }
                                        {
                                            (value.length > 0 && !isDisabled)&&(
                                                <IconButton
                                                    className='clear-button'
                                                    icon={<PiXBold/>}
                                                    txtLabel='Clear'
                                                    appearance='subtle'
                                                    isShowtooltip={false}
                                                    onClick={(e)=>{ctrl.onClearButtonClick(e, inputTagRef, onChange, config, onValidate)}}
                                                />
                                            )
                                        }
                                        {
                                            (isDisabled)?(
                                                <div className='lock-box'><PiLockBold className='global-icon'/></div>
                                            ):(options.length!==0)?(
                                                <div className='caret-box'>
                                                    {(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
                                                </div>
                                            ):(<></>)
                                        }
                                    </div>
                                )
                            }
                        }
                        options={optionTamp}
                        optionSelected={value}
                        shape={shape}
                        style={{
                            optionButton:{
                                textLabel:{
                                    fontWeight:'var(--font-weight-text)'
                                }
                            }
                        }}
                        onClick={(_, option, e)=>{
                            if(!isDisabled){
                                ctrl.onOptionClick(e, option, value, setSearchParam, inputTagRef, isDirty, setIsDirty, config, onChange, error, onValidate)
                            }
                        }}
                        onOptionOpen={()=>{
                            setIsDropdownOpen(true)
                        }}
                        onOptionClose={()=>{
                            setIsDropdownOpen(false)
                        }}
                        floatingConfig={{
                            isContainerWidthSameAsTrigger:true,
                            isLockScroll:(optionTamp.length!==0),
                            isShowDropdown:(optionTamp.length!==0),
                        }}
                    />
                )
            }
            {
                (value.length>0)&&(
                    <div
                        className={clsx(
                            'input-tag-container',
                            'input-tag-value-container',
                            (shape)?(shape):(globalShape),
                        )}
                    >
                        {
                            (config?.prefixElement)&&(
                                <div className='perfix-box' style={{opacity:'0%'}}>
                                    {config?.prefixElement}
                                </div>
                            )
                        }
                        <div className='input-tag-input'>
                            {valueElement}
                        </div>
                        {
                            (config?.sufixElement)&&(
                                <div className='sufix-box' style={{opacity:'0%'}}>
                                    {config?.sufixElement}
                                </div>
                            )
                        }
                        {
                            (value.length > 0 && !isDisabled)&&(
                                <IconButton
                                    className='clear-button'
                                    icon={<PiXBold/>}
                                    txtLabel='Clear'
                                    appearance='subtle'
                                    isShowtooltip={false}
                                    onClick={(e)=>{ctrl.onClearButtonClick(e, inputTagRef, onChange, config, onValidate)}}
                                    style={{
                                        button:{opacity:'0%'}
                                    }}
                                />
                            )
                        }
                        {
                            (isDisabled)?(
                                <div className='lock-box' style={{opacity:'0%'}}><PiLockBold className='global-icon'/></div>
                            ):(options.length!==0)?(
                                <div className='caret-box' style={{opacity:'0%'}}>
                                    {(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
                                </div>
                            ):(<></>)
                        }
                    </div>
                )
            }
            {
                (beforeElement)&&(
                    <div className='before-element-box'>
                        {beforeElement}
                    </div>
                )
            }
            {
                (afterElement)&&(
                    <div className='after-element-box'>
                        {afterElement}
                    </div>
                )
            }
            {
                (error&& error.isError && error.errorMessage)&&(
                    <div className='error-box'>
                        <PiWarningBold className='global-icon'/>
                        <p>{error.errorMessage}</p>
                    </div>
                )
            }
        </div>
    )
}

export default InputTags

interface _InputSelection {
    id?:string
    className?:string;
    style?:inputSelectionStyleType;
    shape?:globalShapeType;
    
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputTagType
    txtPlaceholder?:string;
    options?:dropdownMenuOptionType[]
    value?:string[];
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    onBlur?:(e:React.FocusEvent<HTMLInputElement>, inputValue:string[])=>void
    onFocus?:(e:React.FocusEvent<HTMLInputElement>, inputValue:string[])=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
    config?:inputTagConfigType
}

export type inputTagType = 'text' | 'text-no-space';

export type inputTagConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    minValue?:number
    maxValue?:number
    prefixElement?:JSX.Element|string
    sufixElement?:JSX.Element|string
}

export type inputSelectionStyleType = {
    triggerButton:React.CSSProperties,
}