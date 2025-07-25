import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from "../_types";
import { useContext, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu, { type dropdownMenuOptionType, type dropdownMenuStyleType } from '../dropdown-menu';
import { PiCaretDownBold, PiCaretUpBold, PiEmpty, PiLockBold, PiMagnifyingGlassBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import InputText from '../input-text';
import Button from '../button';
import { useDeepCompareMemo } from '../../hook/useDeepCompareMemo';

const InputSelection = ({
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'single',
    txtPlaceholder = undefined,
    option = [],
    value = [],
    onChange = undefined,
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
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false)
    const [searchParam, setSearchParam] = useState('')
    
    const isDisabled = useMemo(()=>{
        return config?.isDisabled??false
    },[config?.isDisabled])

    const labelValue = useDeepCompareMemo(()=>{
        return ctrl.getDisplayValue(value, option)
    },[value, option])

    const optionTamp = useDeepCompareMemo(()=>{
        return ctrl.getProcessedOption(value, option, searchParam, config?.maxValue)
    },[option, value, searchParam, config?.maxValue])
    //States end ====

    //Refs start ====
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const searchBarRef = useRef<HTMLInputElement>(null);
    //Refs end ====


    return(
        <div className={clsx(
            'input-selection-box',
            {
                ['open']:(isDropdownOpen)
            }
        )}>
            <select
                style={{display:'none'}}
                id={id}
                value={(type==='multiple')?(value):(value.length>0?value[0]:'')}
                multiple={type==='multiple'}
                disabled
            >
                <option value=""></option>
                {
                    option.filter(i=>i.type==='option').map((i)=>(
                        <option key={i.id} value={i.id}>{i.txtLabel}</option>
                    ))
                }
            </select>
            <DropdownMenu
                className='input-select-dropdown'
                isDisabled={isDisabled}
                trigger={
                    (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                        if(trigger.current){
                            triggerButtonRef.current = trigger.current as HTMLButtonElement
                        }
                        return(
                            <div
                                ref={triggerRef}
                                {...getReferenceProps()}
                                role='button'
                                tabIndex={isDisabled?-1:0}
                                id={id}
                                className={clsx(
                                    'input-selection',
                                    (shape)?(shape):(globalShape),
                                    {
                                        ['disabled']:(isDisabled),
                                        ['selected']:(isDropdownOpen),
                                        ['error']:(error?.isError),
                                    },
                                    className
                                )}
                                style={style?.triggerButton}
                            >
                                {
                                    (config?.prefixElement)&&(
                                        <div className='prefix-box'>
                                            {config?.prefixElement}
                                        </div>
                                    )
                                }
                                <div className='value-label-box'>
                                    {
                                        (value.length>0)?(
                                            <span>{labelValue.join(', ')}</span>
                                        ):(
                                            <span className='placeholder'>{txtPlaceholder}</span>
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
                                            onClick={(e)=>{ctrl.onClearButtonClick(e, config, onChange, onValidate, triggerButtonRef)}}
                                        />
                                    )
                                }
                                {
                                    (isDisabled)?(
                                        <div className='lock-box'><PiLockBold className='global-icon'/></div>
                                    ):(
                                        <div className='caret-box'>
                                            {(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                }
                options={optionTamp}
                optionSelected={value}
                shape={shape}
                style={style?.dropdownMenu}
                onClick={(_, option, e)=>{
                    if(!isDisabled){
                        ctrl.onOptionClick(e, option, value, type, isDirty, setIsDirty, config, onChange, error, onValidate)
                    }
                }}
                onOptionOpen={()=>{
                    setIsDropdownOpen(true)
                }}
                onOptionClose={()=>{
                    setIsDropdownOpen(false)
                    setSearchParam('')
                    if(isDirty && onValidate && config){
                        ctrl.doValidateValue(value, onValidate, config)
                    }
                }}
                elementHeader={
                    <>
                        {
                            (config?.isCombobox)?(
                                <div className='search-bar-box'>
                                    <InputText 
                                        ref={searchBarRef}
                                        type='text'
                                        txtPlaceholder='Search...'
                                        value={searchParam}
                                        onChange={(newValue)=>{setSearchParam(newValue)}}
                                        config={{
                                            prefixElement:<PiMagnifyingGlassBold className='global-icon'/>
                                        }}
                                    />
                                </div>
                            ):undefined
                        }
                        <div className='reset-box'>
                            <Button
                                shape='box'
                                className='reset-button'
                                txtLabel={'Clear Selection'}
                                appearance='subtle'
                                onClick={(e)=>{ctrl.onClearButtonClick(e, config, onChange)}}
                            />
                        </div>
                    </>
                }
                elementFooter={
                    <>
                        {
                            (searchParam && optionTamp.length===0 && option.length>0)&&(
                                <div className='empty-box'>
                                    <PiEmpty className='global-icon' size={32}/>
                                    <div>
                                        <span>No result.</span>
                                        <span>Try other search param!</span>
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
                floatingConfig={{
                    isLockScroll:true,
                    isContainerWidthSameAsTrigger:true,
                    isWithCheckmark:type==='multiple'
                }}
            />
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

export default InputSelection

interface _InputSelection {
    id?:string
    className?:string;
    style?:inputSelectionStyleType;
    shape?:globalShapeType;
    
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputSelectType
    txtPlaceholder?:string;
    option?:dropdownMenuOptionType[]
    value?:string[];
    onChange?:(newValue:string[], option:dropdownMenuOptionType|undefined, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
    config?:inputSelectConfigType
}

export type inputSelectType = 'single' | 'multiple';

export type inputSelectConfigType = {
    isCombobox?:boolean
    isDisabled?:boolean
    isRequired?:boolean
    minValue?:number
    maxValue?:number
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
}

export type inputSelectionStyleType = {
    triggerButton?:React.CSSProperties,
    dropdownMenu?:dropdownMenuStyleType
}