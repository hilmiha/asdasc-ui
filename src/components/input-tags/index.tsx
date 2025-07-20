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

    type = 'tags',
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
    
    const isDisabled = useMemo(()=>{
        return config?.isDisabled??false
    },[config?.isDisabled])

    const valueLabelPair = useMemo(()=>{
        return value.map(i=>{
            const tamp = option.find(j=>j.id===i)
            if(tamp){
                return([tamp.id, tamp.txtLabel])
            }else{
                return [i, i]
            }
        })
    },[value, option])

    const [searchParam, setSearchParam] = useState('')

    const optionTamp = useMemo(()=>{
        let tampOptions = [...option].filter(i=>!value.includes(i.txtLabel))

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
    },[option, value, searchParam])
    //States end ====

    // Update ref
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
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
                    option.filter(i=>i.type==='option').map((i)=>(
                        <option key={i.id} value={i.id}>{i.txtLabel}</option>
                    ))
                }
            </select>
            <DropdownMenu
                className={clsx(
                    'input-tag-dropdown',
                )}
                trigger={
                    (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                        if(trigger.current){
                            triggerButtonRef.current = trigger.current as HTMLButtonElement
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
                                                valueLabelPair.map((i)=>(
                                                    <div className='tag-box' key={i[0]} style={{opacity:'0%'}}>
                                                        <span className='tag-label'>{i[1]}</span>
                                                        <IconButton
                                                            icon={<PiXBold size={12}/>}
                                                            txtLabel={`Remove ${i}`}
                                                            appearance='subtle'
                                                            isShowtooltip={false}
                                                            onClick={()=>{
                                                                ctrl.thisOnchange(i[0], value, type, config, onChange)

                                                                if(onValidate && error?.isError){
                                                                    onValidate({isError:false, errorMessage:''},[])
                                                                }
                                                                setIsDirty(true)
                                                            }}
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
                                        const newValue = e.target.value
                                        if(newValue===' '){
                                            ctrl.toggleTrigger(triggerButtonRef)
                                        }else{
                                            if(newValue && !isDropdownOpen){
                                                ctrl.toggleTrigger(triggerButtonRef)
                                            }
                                            setSearchParam(newValue)
                                        }
                                    }}
                                    onKeyDown={(e)=>{
                                        if(e.key==='Backspace' && searchParam==='' && value.length>0){
                                            ctrl.thisOnchange(value.at(-1)??'', value, type, config, onChange)
                                        }else if(e.key==='Enter'){
                                            ctrl.thisOnchange(searchParam.trim(), value, type, config, onChange)
                                        }
                                        if(onValidate && error?.isError){
                                            onValidate({isError:false, errorMessage:''},[])
                                        }
                                        setIsDirty(true)
                                    }}
                                    onBlur={()=>{
                                        if(optionTamp.length===0 && searchParam!=='' && isDropdownOpen){
                                            setSearchParam('')
                                        }
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
                onClick={(_, option)=>{
                    if(!isDisabled){
                        ctrl.thisOnchange(option.txtLabel, value, type, config, onChange)

                        if(onValidate && error?.isError){
                            onValidate({isError:false, errorMessage:''},[])
                        }

                        if(type==='tags'){
                            setSearchParam('')
                            triggerButtonRef.current?.focus()
                        }

                        setIsDirty(true)
                    }
                }}
                onOptionOpen={()=>{
                    setIsDropdownOpen(true)
                }}
                onOptionClose={()=>{
                    setIsDropdownOpen(false)
                    
                    if(config && onValidate && isDirty){
                        ctrl.doValidate(value, config, onValidate)
                    }
                    
                    if(searchParam && isDropdownOpen){
                        setSearchParam('')
                    }
                }}
                floatingConfig={{
                    isContainerWidthSameAsTrigger:true,
                    isLockScroll:(optionTamp.length!==0),
                    isShowDropdown:(optionTamp.length!==0),
                }}
            />
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
                            valueLabelPair.map((i)=>(
                                <div className='tag-box' key={i[0]} style={{pointerEvents:'all'}}>
                                    <span className='tag-label'>{i[1]}</span>
                                    <IconButton
                                        icon={<PiXBold size={12}/>}
                                        txtLabel={`Remove ${i}`}
                                        appearance='subtle'
                                        isShowtooltip={false}
                                        onClick={()=>{
                                            ctrl.thisOnchange(i[0], value, type, config, onChange)

                                            if(onValidate && error?.isError){
                                                onValidate({isError:false, errorMessage:''},[])
                                            }
                                            setIsDirty(true)
                                        }}
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

export default InputTags

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

export type inputSelectType = 'tags';

export type inputSelectConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    minValue?:number
    maxValue?:number
}

export type inputSelectionStyleType = {
    triggerButton:React.CSSProperties,
}