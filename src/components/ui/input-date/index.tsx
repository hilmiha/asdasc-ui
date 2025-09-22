import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext, useEffect, useRef, useState, type JSX } from 'react';
import type { dropdownMenuStyleType } from '../dropdown-menu';
import type { fieldErrorType, globalShapeType } from 'src/components/_types';
import type { calendarType, validCalendarDisabledValue, validCalendarValue } from '../calendar';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import { useDeepCompareMemo } from 'src/hook/useDeepCompareMemo';
import { PiCaretDownBold, PiCaretUpBold, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import DropdownBottomSheet from './components/dropdown-bottom-sheet';

const InputDateTime = ({
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'single',
    txtPlaceholder = undefined,
    value = undefined,
    isDisabled = false,
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined,
}:_InputDateTime) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false)

    const labelValue = useDeepCompareMemo(()=>{
        return ctrl.getDisplayValue(type, value)
    },[value])
    //States end ====

     //Refs start ====
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    //Refs end ====

    useEffect(()=>{
        if(!isDropdownOpen && onValidate && config && isDirty){
            ctrl.doValidateValue(type, value, onValidate,config)
        }
    },[JSON.stringify(value)])

    return(
        <div className={clsx(
            'input-date-box',
            {
                ['open']:(isDropdownOpen)
            }
        )}>
            <DropdownBottomSheet
                type={type}
                isDisabled={isDisabled}
                trigger={
                    (triggerRef, getReferenceProps, isDropdownOpen, trigger)=>{
                        if(trigger.current){
                            triggerButtonRef.current = trigger.current as HTMLButtonElement
                        }
                        return(
                            <div
                                ref={triggerRef}
                                {...(getReferenceProps?.() ?? {})}
                                role='button'
                                tabIndex={isDisabled?-1:0}
                                id={id}
                                className={clsx(
                                    'input-date',
                                    (shape)?(shape):(globalShape),
                                    {
                                        ['disabled']:(isDisabled),
                                        ['selected']:(isDropdownOpen),
                                        ['error']:(error?.isError),
                                    },
                                    className
                                )}
                                style={style?.triggerButton}
                                onKeyDown={(e)=>{ //to allow space click to open option bottom sheet
                                    const isTriggerClicked = !(e.target as HTMLElement).classList.contains('clear-button')
                                    if((e.keyCode===13 || e.keyCode===32) && isTriggerClicked ){
                                        e.preventDefault()
                                        triggerButtonRef.current?.click()
                                    }
                                }}
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
                                        (value)?(
                                            <p className='value-label'>{labelValue}</p>
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
                                    (value && !isDisabled && !config?.isHideClear)&&(
                                        <IconButton
                                            className='clear-button'
                                            icon={<PiXBold/>}
                                            txtLabel='Clear'
                                            appearance='subtle'
                                            isShowtooltip={false}
                                            onClick={(e)=>{
                                                ctrl.onClearButtonClick(e, type, isDirty, setIsDirty, config, onChange, onValidate, triggerButtonRef)
                                            }}
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
                shape={shape}
                style={style?.dropdownMenu}
                value={value}
                config={config}
                onCalendarChange={(newValue:validCalendarValue)=>{
                    if(!isDisabled){
                        if(onChange){
                            onChange(newValue)
                        }
                        if(!isDirty){
                            setIsDirty(true)
                        }
                    }
                }}
                onOpen={()=>{
                    setIsDropdownOpen(true)
                }}
                onClose={()=>{
                    setIsDropdownOpen(false)
                    if(isDirty && onValidate && config){
                        ctrl.doValidateValue(type, value, onValidate, config)
                    }
                }}
                floatingConfig={{
                    isLockScroll:true,
                    isContainerWidthSameAsTrigger:false,
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

export default InputDateTime

interface _InputDateTime {
    id?:string
    className?:string;
    style?:inputSelectionStyleType;
    shape?:globalShapeType;
    
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:calendarType
    txtPlaceholder?:string;
    isDisabled?:boolean
    value?:validCalendarValue
    onChange?:(newValue:validCalendarValue)=>void,
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:validCalendarValue)=>void
    config?:inputDateTimeConfigType
}

export type inputDateTimeConfigType = {
    isRequired?:boolean
    calendarStart?:Date
    calendarEnd?:Date
    disabledDates?:validCalendarDisabledValue[]
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
    isHideClear?:boolean
    minSelected?:number
    maxSelected?:number
}

export type inputSelectionStyleType = {
    triggerButton?:React.CSSProperties,
    dropdownMenu?:dropdownMenuStyleType
}
