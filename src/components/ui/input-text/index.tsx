import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from 'src/components/_types';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import { PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';
import { debounce } from 'lodash';

const InputText = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,

    afterElement = undefined,
    beforeElement = undefined,

    type = 'text',
    txtPlaceholder = undefined,
    value = '',
    isDisabled = false,
    onChange = undefined,
    onBlur = undefined,
    onFocus = undefined,
    onKeyDown = undefined,
    error = undefined,
    onValidate = undefined,
    triggerValidate = 0,

    config = undefined
}:_InputText) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [tampValue, setTampValue] = useState(value)
    const [isDirty, setIsDirty] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const inputTypeMode = useMemo(()=>{
        return ctrl.getInputTypeMode(type)
    },[type])
    //States end ====

    // Update ref when external ref changes
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref && inputRef.current) {
            if (typeof ref === 'function') {
                ref(inputRef.current);
            } else if (ref.current !== undefined) {
                ref.current = inputRef.current;
            }
        }
    }, [ref]);

    const debouncedOnChange = useCallback(
        debounce((newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined) => {
            if (onChange) {
                onChange(newValue, e);
            }
        }, 300),
    [onChange]);
    
    //detect if value change/setted outsite of component
    useEffect(()=>{
        if((value !== tampValue) && !isFocus){
            setTampValue(value)
            if(onValidate && config && isDirty){
                ctrl.doValidateValue(type, value, onValidate, config)
            }
        }
    },[value])

    useEffect(()=>{
        if(triggerValidate===1){
            if(onValidate && config){
                ctrl.doValidateValue(type, value, onValidate, config)
            }
        }
    },[triggerValidate])

    return(
        <div className={clsx(
            'input-text-box',
            className
        )}>
            <div
                className={clsx(
                    'input-text-container',
                    (shape)?(shape):(globalShape),
                    {
                        ['disabled']:(isDisabled),
                        ['error']:(error?.isError),
                    }
                )}
                onClick={()=>{inputRef.current?.focus()}}
            >
                {
                    (config?.prefixElement)&&(
                        <div className='prefix-box'>
                            {config?.prefixElement}
                        </div>
                    )
                }
                <input
                    id={id}
                    ref={inputRef}
                    className={clsx('input-text')}
                    style={style?.input}
                    placeholder={txtPlaceholder}
                    value={ctrl.getDisplayValue(tampValue, type)}
                    onChange={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputChange(e, value, type, setTampValue, isDirty, setIsDirty, debouncedOnChange, config, error, onValidate)
                        }
                    }}
                    onBlur={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputBlur(e, value, type, setTampValue, isDirty, debouncedOnChange, config, onValidate, onBlur)
                        }
                        setIsFocus(false)
                    }}
                    onFocus={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputFocus(e, value, onFocus)
                        }
                        setIsFocus(true)
                    }}
                    onKeyDown={(e)=>{
                        if(!isDisabled){
                            ctrl.onKeyDownInput(e, tampValue, onKeyDown)
                        }
                    }}
                    disabled={isDisabled}
                    type={inputTypeMode.type}
                    inputMode={inputTypeMode.mode}
                />
                {
                    (config?.sufixElement)&&(
                        <div className='sufix-box'>
                            {config?.sufixElement}
                        </div>
                    )
                }
                {
                    (config?.isWithCounter && !isDisabled)&&(
                        <div>
                            <p className='text-sub text-sm'>{`${tampValue.length}${config.maxLength?(` / ${config.maxLength}`):('')}`}</p>
                        </div>
                    )
                }
                {
                    (tampValue.length > 0 && !isDisabled && config?.isShowClear)&&(
                        <IconButton
                            className='clear-button'
                            icon={<PiXBold/>}
                            txtLabel='Clear'
                            appearance='subtle'
                            isShowtooltip={false}
                            onClick={(e)=>{ctrl.onClearButtonClick(e, type, setTampValue, debouncedOnChange, config, onValidate, inputRef)}}
                        />
                    )
                }
                {
                    (isDisabled)&&(
                        <div className='lock-box'><PiLockBold className='global-icon'/></div>
                    )
                }
            </div>
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

export default InputText

export interface _InputText {
    ref?:React.Ref<HTMLInputElement>;
    id?:string;
    className?:string;
    style?:inputTextStyleType;
    shape?:globalShapeType;
    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;
    type:inputTextType;
    txtPlaceholder?:string;
    isDisabled?:boolean;
    value?:string;
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined)=>void;
    onBlur?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void;
    onFocus?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void;
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>, value:string)=>void;
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, value:string)=>void;
    triggerValidate?:0|1;
    config?:inputTextConfigType;
}

export type inputTextType = 'text' | 'text-no-space' | 'number-text' | 'number' | 'password' | 'tel';

export type inputTextConfigType = {
    isRequired?:boolean
    maxLength?: number
    minLength?: number
    minValue?:number
    maxValue?:number
    validRegex?:[RegExp, string][]
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
    isShowClear?:boolean
    isWithCounter?:boolean
}

export type inputTextStyleType = {
    input:React.CSSProperties,
}
