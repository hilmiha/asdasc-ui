import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext, useEffect, useRef, useState, type JSX } from 'react';
import type { dropdownMenuStyleType } from '../dropdown-menu';
import type { fieldErrorType, globalShapeType } from 'src/components/_types';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import { useDeepCompareMemo } from 'src/hook/useDeepCompareMemo';
import { PiCaretDownBold, PiCaretUpBold, PiCaretUpDownBold, PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import DropdownBottomSheet from './components/dropdown-bottom-sheet';
import type { colorPickerModeType } from '../color-picker';
import { hexToRgba } from '../color-picker/controller';
import ColorPreview from '../color-picker/color-preview';

const InputColor = ({
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    txtPlaceholder = undefined,
    value = '',
    isDisabled = false,
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined,
}:_InputColor) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState(false)
    const [mode, setMode] = useState<colorPickerModeType>('hex')
    const labelValue = useDeepCompareMemo(()=>{
        if(mode==='rgb'){
            const tampValue = hexToRgba(value, config?.isAllowAlpha)
            return `${config?.isAllowAlpha?('rgba('):('rgb(')}${tampValue.r}, ${tampValue.g}, ${tampValue.b}${config?.isAllowAlpha?(`, ${tampValue.a.toFixed(2)})`):(')')}`
        }else{
            return value
        }
    },[value, mode])

    const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
    //States end ====

     //Refs start ====
    const triggerButtonRef = useRef<HTMLButtonElement>(null);
    //Refs end ====

    useEffect(()=>{
        if(!isDropdownOpen && onValidate && config && isDirty){
            ctrl.doValidateValue(value, onValidate, config)
        }
    },[value])

    return(
        <div className={clsx(
            'input-color-box',
            {
                ['open']:(isDropdownOpen)
            }
        )}>
            <DropdownBottomSheet
                mode={mode}
                setMode={setMode}
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
                                    'input-color',
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
                                                ctrl.onClearButtonClick(e, isDirty, setIsDirty, config, onChange, onValidate, triggerButtonRef)
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
                onColorChange={(newValue:string)=>{
                    if(!isDisabled){
                        ctrl.onColorPick(newValue, isDirty, setIsDirty, onChange, onValidate)
                    }
                }}
                onOpen={()=>{
                    setIsDropdownOpen(true)
                }}
                onClose={()=>{
                    setIsDropdownOpen(false)
                    if(isDirty && onValidate && config){
                        ctrl.doValidateValue(value, onValidate, config)
                    }
                }}
                bottomSheetOpen={bottomSheetOpen}
                setBottomSheetOpen={setBottomSheetOpen}
                floatingConfig={{
                    isLockScroll:true,
                    isContainerWidthSameAsTrigger:false,
                }}
            />
            <div className='before-element-box'>
                <div style={{margin:'var(--space-50)'}} onClick={()=>{
                    triggerButtonRef.current?.click()
                    setBottomSheetOpen(true)
                }}>
                    <ColorPreview
                        value={value}
                        isAllowAlpha={config?.isAllowAlpha}
                        height='28px'
                        width='28px'
                    />
                </div>
                {beforeElement}
            </div>
            <div className='after-element-box'>
                <IconButton
                    icon={<PiCaretUpDownBold className='global-icon'/>}
                    txtLabel='Chane mode'
                    onClick={()=>{
                        setMode((prev)=>{
                            if(prev==='rgb'){
                                return('hex')
                            }else{
                                return('rgb')
                            }
                        })
                    }}  
                />
                {afterElement}
            </div>
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

export default InputColor

interface _InputColor {
    id?:string;
    className?:string;
    style?:inputSelectionStyleType;
    shape?:globalShapeType;
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;
    txtPlaceholder?:string;
    isDisabled?:boolean;
    value?:string;
    onChange?:(newValue:string)=>void;
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string)=>void;
    config?:inputColorConfigType;
}

export type inputColorConfigType = {
    isRequired?:boolean
    isAllowAlpha?:boolean
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
    isHideClear?:boolean
}

export type inputSelectionStyleType = {
    triggerButton?:React.CSSProperties,
    dropdownMenu?:dropdownMenuStyleType
}
