import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from "../_types";
import { useContext, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu, { type dropdownMenuOptionType } from '../dropdown-menu';
import { PiCaretDownBold, PiCaretUpBold, PiEmpty, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import InputText, { type inputTextStyleType } from '../input-text';

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
    const [isDirty, setIsDirty] = useState(false)
    
    const isComboBox = useMemo(()=>{
        return type==='combo-box'
    },[type])
    
    const isDisabled = useMemo(()=>{
        return config?.isDisabled??false
    },[config?.isDisabled])

    const labelValue = useMemo(()=>{
        return option.filter(i=>value.includes(i.id)).map(i=>i.txtLabel).join(', ')
    },[value, option])

    const [searchParam, setSearchParam] = useState('')

    const optionTamp = useMemo(()=>{
        let tampOptions = [...option]

        if(searchParam){
            tampOptions = tampOptions.filter(i=>(i.txtLabel).toLowerCase().includes(searchParam.toLowerCase()))
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
    },[option, value, searchParam])
    //States end ====

    // Update ref
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

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
                trigger={
                    (triggerRef, isDropdownOpen, trigger)=>{
                        if(trigger.current){
                            triggerButtonRef.current = trigger.current as HTMLButtonElement
                        }
                        setIsDropdownOpen(isDropdownOpen);
                        if(!isComboBox){
                            return (
                                <button
                                    ref={triggerRef}
                                    id={id}
                                    className={clsx(
                                        'input-selection-container',
                                        (shape)?(shape):(globalShape),
                                        {
                                            ['disabled']:(isDisabled),
                                            ['selected']:(isDropdownOpen),
                                            ['error']:(error?.isError),
                                        },
                                        className
                                    )}
                                    style={style?.triggerButton}
                                    disabled={isDisabled}
                                >
                                    <div className='value-label-box'>
                                        {
                                            (value.length>0)?(
                                                <span>{labelValue}</span>
                                            ):(
                                                <span className='placeholder'>{txtPlaceholder}</span>
                                            )
                                        }
                                    </div>
                                </button>
                            )
                        }else{
                            return (
                                <>
                                    <InputText
                                        ref={triggerRef}
                                        className='input-combo-box'
                                        type='text'
                                        txtPlaceholder={value.length>0?(undefined):(txtPlaceholder)}
                                        value={searchParam}
                                        shape={shape}
                                        style={style?.triggerInput}
                                        onChange={(newValue)=>{
                                            if(newValue===' '){
                                                ctrl.toggleTrigger(triggerButtonRef)
                                            }else{
                                                if(newValue && !isDropdownOpen){
                                                    ctrl.toggleTrigger(triggerButtonRef)
                                                }
                                                setSearchParam(newValue)
                                            }
                                        }}
                                        config={{
                                            isDisabled:config?.isDisabled
                                        }}
                                    />
                                    {
                                        (!searchParam)&&(
                                            <p
                                                className='input-combo-box-value'
                                                style={{
                                                    position:'absolute',
                                                    left:'var(--space-250)',
                                                    height:'100%',
                                                    display:'flex',
                                                    alignItems:'center'
                                                }}
                                            >{labelValue}</p>
                                        )
                                    }
                                </>
                            )
                        }
                        
                    }
                }
                options={optionTamp}
                optionSelected={value}
                isContainerWidthSameAsTrigger={true}
                isWithCheckmark={type==='multiple'}
                shape={shape}
                style={{
                    optionButton:{
                        textLabel:{
                            fontWeight:'var(--font-weight-text)'
                        }
                    }
                }}
                onClick={(idButton)=>{
                    if(!isDisabled){
                        ctrl.thisOnchange(idButton, value, type, config, onChange)

                        if(onValidate && error?.isError){
                            onValidate({isError:false, errorMessage:''},[])
                        }

                        if(type==='combo-box'){
                            setSearchParam('')
                        }

                        setIsDirty(true)
                    }
                }}
                onOptionClose={()=>{
                    if(config && onValidate && isDirty){
                        ctrl.doValidate(value, config, onValidate)
                    }
                    
                    if(searchParam && isDropdownOpen){
                        setSearchParam('')
                    }
                }}
                elementHeader={
                    <>
                        {
                            (!isComboBox)&&(
                                <div className='search-bar-box'>
                                    <InputText 
                                        type='text'
                                        txtPlaceholder='Search...'
                                        value={searchParam}
                                        onChange={(newValue)=>{setSearchParam(newValue)}}
                                    />
                                </div>
                            )
                        }
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
            />
            {
                (isDisabled)?(
                    <div className='lock-box'><PiLockBold className='global-icon'/></div>
                ):(
                    <div className='caret-box'>
                        {(isDropdownOpen)?(<PiCaretUpBold className='global-icon'/>):(<PiCaretDownBold className='global-icon'/>)}
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
                        onClick={()=>{
                            ctrl.clearValue(onChange)
                            if(onValidate && config){
                                ctrl.doValidate([], config, onValidate)
                            }

                            if(triggerButtonRef.current){
                                triggerButtonRef.current.focus()
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
    onChange?:(newValue:string[])=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
    config?:inputSelectConfigType
}

export type inputSelectType = 'single' | 'combo-box' | 'multiple';

export type inputSelectConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    minValue?:number
    maxValue?:number
}

export type inputSelectionStyleType = {
    triggerButton:React.CSSProperties,
    triggerInput:inputTextStyleType,
}