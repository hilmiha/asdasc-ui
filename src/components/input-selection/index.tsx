import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from "../_types";
import { useContext, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import DropdownMenu, { type dropdownMenuOptionType } from '../dropdown-menu';
import { PiEmpty, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import InputText from '../input-text';

const InputSelection = ({
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'selection',
    txtPlaceholder = undefined,
    option = [],
    value = [],
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined
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

    const labelValue = useMemo(()=>{
        return option.filter(i=>value.includes(i.id)).map(i=>i.txtLabel).join(', ')
    },[value])

    const [seacrhParam, setSearchParam] = useState('')

    const optionTamp = useMemo(()=>{
        let tampOptions = [...option]

        if(seacrhParam){
            tampOptions = tampOptions.filter(i=>(i.txtLabel).toLowerCase().includes(seacrhParam.toLowerCase()))
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
    },[option, value, seacrhParam])
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
            <DropdownMenu
                className='input-select-dropdown'
                trigger={
                    (triggerRef, isDropdownOpen, trigger)=>{
                        if(trigger.current){
                            triggerButtonRef.current = trigger.current as HTMLButtonElement
                        }
                        setIsDropdownOpen(isDropdownOpen);

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
                                style={
                                    style?.inputContainer
                                }
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
                                {
                                    (isDisabled)&&(
                                        <div className='lock-box'><PiLockBold className='global-icon'/></div>
                                    )
                                }
                            </button>
                        )
                    }
                }
                options={optionTamp}
                optionSelected={value}
                isContainerWidthSameAsTrigger={true}
                isWithCheckmark={type==='multiple'}
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

                        setIsDirty(true)
                    }
                }}
                onOptionClose={()=>{
                    if(config && onValidate && isDirty){
                        ctrl.doValidate(value, config, onValidate)
                    }
                    if(seacrhParam){
                        setSearchParam('')
                    }
                }}
                elementHeader={
                    <>
                        <div className='search-bar-box'>
                            <InputText 
                                type='text'
                                txtPlaceholder='Search...'
                                value={seacrhParam}
                                onChange={(newValue)=>{setSearchParam(newValue)}}
                            />
                        </div>
                    </>
                }
                elementFooter={
                    <>
                        {
                            (seacrhParam && optionTamp.length===0 && option.length>0)&&(
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
            {/* <select
                style={{display:'none'}}
                id={id}
                value={value}
                multiple={type==='multiple'}
            >
                <option value=""></option>
                {
                    option.filter(i=>i.type==='option').map((i)=>(
                        <option key={i.id} value={i.id}>{i.txtLabel}</option>
                    ))
                }
            </select> */}
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

export type inputSelectType = 'selection' | 'multiple';

export type inputSelectConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    minValue?:number
    maxValue?:number
}

export type inputSelectionStyleType = {
    inputContainer:React.CSSProperties,
    input:React.CSSProperties,
}