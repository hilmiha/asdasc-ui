import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType, optionItemType } from "../_types";
import { useContext, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu from '../dropdown-menu';
import { PiCaretDownBold, PiCaretUpBold, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import Tag from '../tag';
import { useDeepCompareMemo } from '../../hook/useDeepCompareMemo';

const InputTags = ({
    id = undefined,
    className = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'text-no-space',
    txtPlaceholder = undefined,
    options = [],
    value = [],
    isDisabled = false,
    onChange = undefined,
    onBlur = undefined,
    onFocus = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined,
}:_InputTag) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isDirty, setIsDirty] = useState(false)

    const [searchParam, setSearchParam] = useState('')

    const filteredOptions = useDeepCompareMemo(()=>{
        return ctrl.getFilteredOptions(options, value, searchParam, config)
    },[options, value, searchParam, config?.maxValue])

    const valueElement = useDeepCompareMemo(()=>{
        return  value.map((i)=>(
            <Tag
                className='input-tag-tag'
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
    },[value, isDisabled])
     //States end ====

    // Update ref
    const inputTagRef = useRef<HTMLInputElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    //render input element
    const renderTagInputElement = (inputRef:any, additionalProps?:Record<string, unknown>) =>{
        return(
            <div
                className={clsx(
                    'input-tag-container',
                    (shape)?(shape):(globalShape),
                    {
                        ['disabled']:(isDisabled),
                        ['error']:(error?.isError),
                        ['selected']:(isDropdownOpen && filteredOptions.length>0)
                    },
                    className
                )}
            >
                {
                    (config?.prefixElement)&&(
                        <div className='prefix-box'>
                            {config?.prefixElement}
                        </div>
                    )
                }
                <div className='input-tag-input'>
                    {
                        (value.length>0)&&(valueElement)
                    }
                    {
                        (!isDisabled)&&(
                            <input
                                {...(additionalProps??{})}
                                ref={inputRef}
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
                                        ctrl.onInputTagBlur(e, inputTagRef, value, searchParam, setSearchParam, isDropdownOpen, filteredOptions,  isDirty, onBlur, config, onValidate)
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
                    (value.length > 0 && !isDisabled && !config?.isHideClear)&&(
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
                        <div className='caret-box' onClick={()=>{inputTagRef.current?.focus()}}>
                            {(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
                        </div>
                    ):(<></>)
                }
            </div>
        )
    }

    return(
        <div className={clsx('input-tag-box')}>
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
                    renderTagInputElement(inputTagRef)
                ):(
                    <DropdownMenu
                        className={clsx(
                            'input-tag-dropdown',
                        )}
                        trigger={
                            (triggerRef, getReferenceProps, _, trigger)=>{
                                if(trigger.current){
                                    inputTagRef.current = trigger.current as HTMLInputElement
                                }
                                return(renderTagInputElement(triggerRef, {...(getReferenceProps?.() ?? {})} ))
                            }
                        }
                        options={filteredOptions}
                        optionSelected={value}
                        shape={shape}
                        style={{
                            optionButton:{
                                textLabel:{
                                    fontWeight:'var(--font-weight-normal)'
                                }
                            }
                        }}
                        onClick={(_, option, e)=>{
                            if(!isDisabled){
                                ctrl.onOptionClick(e, option, value, setSearchParam, inputTagRef, isDirty, setIsDirty, config, onChange, error, onValidate)
                            }
                        }}
                        onOpen={()=>{
                            setIsDropdownOpen(true)
                        }}
                        onClose={()=>{
                            setIsDropdownOpen(false)
                        }}
                        floatingConfig={{
                            isContainerWidthSameAsTrigger:true,
                            isLockScroll:(filteredOptions.length!==0),
                            isShowDropdown:(filteredOptions.length!==0),
                            mode:['dropdown']
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

interface _InputTag {
    id?:string
    className?:string;
    shape?:globalShapeType;
    
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputTagType
    txtPlaceholder?:string;
    options?:optionItemType[]
    value?:string[];
    isDisabled?:boolean
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    onBlur?:(e:React.FocusEvent<HTMLInputElement>, inputValue:string[])=>void
    onFocus?:(e:React.FocusEvent<HTMLInputElement>, inputValue:string[])=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
    config?:inputTagConfigType
}

export type inputTagType = 'text' | 'text-no-space';

export type inputTagConfigType = {
    isRequired?:boolean
    minValue?:number
    maxValue?:number
    prefixElement?:JSX.Element|string
    sufixElement?:JSX.Element|string
    isHideClear?:boolean
}