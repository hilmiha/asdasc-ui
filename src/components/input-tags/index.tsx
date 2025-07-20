import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from "../_types";
import { useContext, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu, { type dropdownMenuOptionType } from '../dropdown-menu';
import { PiCaretDownBold, PiCaretUpBold, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';

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
                (options.length===0)?(
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
                            (value.length>0)&&(
                                <>
                                    {
                                        value.map((i)=>(
                                            <div className='tag-box' key={i} style={{opacity:'0%'}}>
                                                <span className='tag-label'>{i}</span>
                                                <IconButton
                                                    icon={<PiXBold size={12}/>}
                                                    txtLabel={`Remove ${i}`}
                                                    isShowtooltip={false}
                                                    isDisabled={true}
                                                />
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }
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
                                ctrl.onInputTagKeyDown(e, inputTagRef, searchParam, setSearchParam, value, onChange)
                            }}
                        />
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
                                        {...getReferenceProps()}
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
                                    >
                                        {
                                            (value.length>0)&&(
                                                <>
                                                    {
                                                        value.map((i)=>(
                                                            <div className='tag-box' key={i} style={{opacity:'0%'}}>
                                                                <span className='tag-label'>{i}</span>
                                                                <IconButton
                                                                    icon={<PiXBold size={12}/>}
                                                                    txtLabel={`Remove ${i}`}
                                                                    isShowtooltip={false}
                                                                    isDisabled={true}
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )
                                        }
                                        <input
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
                                                ctrl.onInputTagKeyDown(e, inputTagRef, searchParam, setSearchParam, value, onChange)
                                            }}
                                        />
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
                        style={{
                            position:'absolute',
                            gridColumn: '2 / 3',
                            padding:'3.6px var(--space-600) 3.6px var(--space-250)',
                            border:'1px solid transparent',
                            display:'flex',
                            flexWrap:'wrap',
                            gap:'var(--space-50)',
                            top:'3.6px',
                            pointerEvents:'none'
                        }}
                    >
                        {
                            value.map((i)=>(
                                <div className='tag-box' key={i} style={{pointerEvents:'all'}}>
                                    <span className='tag-label'>{i}</span>
                                    <IconButton
                                        icon={<PiXBold size={12}/>}
                                        txtLabel={`Remove ${i}`}
                                        appearance='subtle'
                                        isShowtooltip={false}
                                        onClick={(e)=>{ctrl.doRemoveValueX(e, i, value, isDirty, setIsDirty, onChange, config, onValidate)}}
                                    />
                                </div>
                            ))
                        }
                    </div>
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
                            button:{
                                right:(options.length===0)?('var(--space-100)'):(undefined)
                            }
                        }}
                    />
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
}

export type inputSelectionStyleType = {
    triggerButton:React.CSSProperties,
}