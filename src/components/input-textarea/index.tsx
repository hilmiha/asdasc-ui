import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import type { fieldErrorType, globalShapeType } from '../_types';
import { debounce } from 'lodash';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import IconButton from '../icon-button';
import { PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';

export const InputTextarea = ({
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
    onChange = undefined,
    onBlur = undefined,
    onFocus = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined
}:_InputTextarea) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    
    //States start ====
    const [tampValue, setTampValue] = useState(value)
    const [isDirty, setIsDirty] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const isDisabled = useMemo(()=>{
        return config?.isDisabled??false
    },[config?.isDisabled])

    const inputTypeMode = useMemo(()=>{
        return ctrl.getInputTypeMode(type)
    },[type])
    //States end ====

    const inputRef = useRef<HTMLTextAreaElement>(null);
    // Update ref when external ref changes
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
        debounce((newValue:string, e:React.ChangeEvent<HTMLTextAreaElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined) => {
            if (onChange) {
                onChange(newValue, e);
            }
        }, 300),
    [onChange]);
    //detect if value change/setted outsite of component
    useEffect(()=>{
        if((value !== tampValue) && !isFocus){
            setTampValue(value)
        }
    },[value])

    
    // Textarea height height resize start =====
    const [textareaLineHeight, setTextareaLineHeight] = useState<number>(0);
    
    const textareaInitialLines = useMemo(()=>{
        return (config?.initialLines)??(2)
    },[config?.initialLines])

    const textareaMaxLines = useMemo(()=>{
        return (config?.maxLines)??(4)
    },[config?.maxLines])

    useEffect(() => {
        if (inputRef.current && textareaLineHeight === 0) {
            const computed = window.getComputedStyle(inputRef.current);
            const lh = parseFloat(computed.lineHeight);
            if (!isNaN(lh)){
                setTextareaLineHeight(lh)
            };
        }
    }, []);

    useEffect(() => {
        ctrl.doResizeTextarea(inputRef, textareaLineHeight, textareaInitialLines, textareaMaxLines);
    }, [tampValue, textareaLineHeight, textareaMaxLines, textareaInitialLines]);
    // Textarea height height resize end =====
    

    return (
        <div className={clsx(
            'input-textarea-box',
            className
        )}>
            <div
                className={clsx(
                    'input-textarea-container',
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
                <textarea
                    id={id}
                    ref={inputRef}
                    className={clsx('input-textarea')}
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
                    rows={1}
                    disabled={isDisabled}
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
                    (value.length > 0 && !isDisabled && !config?.isHideClear)&&(
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
        
    );
};

export default InputTextarea

export interface _InputTextarea {
    ref?:React.Ref<HTMLTextAreaElement>;
    id?:string
    className?:string;
    style?:inputTextareaStyleType;
    shape?:globalShapeType;

    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputTextareaType
    txtPlaceholder?:string;
    value?:string;
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLTextAreaElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined)=>void
    onBlur?:(e:React.FocusEvent<HTMLTextAreaElement>, value:string)=>void
    onFocus?:(e:React.FocusEvent<HTMLTextAreaElement>, value:string)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, value:string)=>void
    config?:inputTextareaConfigType
}

export type inputTextareaType = 'text' | 'text-no-space' | 'number-text' | 'number';

export type inputTextareaConfigType = {
    maxLines?: number;
    initialLines?: number;
    isAllowBreakline?: boolean

    isDisabled?:boolean
    isRequired?:boolean
    maxLength?: number
    minLength?: number
    minValue?:number
    maxValue?:number
    validRegex?:[RegExp, string][]
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
    isHideClear?:boolean
}

export type inputTextareaStyleType = {
    input:React.CSSProperties,
}

