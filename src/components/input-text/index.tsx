import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from '../_types';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import { PiLockBold, PiWarningBold } from 'react-icons/pi';

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
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined
}:_InputText) =>{

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

    const inputMode = useMemo(()=>{
        return ctrl.getInputMode(type)
    },[type])

    const displayValue = useMemo(()=>{  // Get the display value (formatted for number type)
        return ctrl.getDisplayValue(value, type);
    },[value])
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

    return(
        <div className='input-text-box'>
            <div
                className={clsx(
                    'input-text-container',
                    (shape)?(shape):(globalShape),
                    {
                        ['disabled']:(isDisabled),
                        ['error']:(error?.isError),
                    },
                    className
                )}
                style={style?.inputContainer}
            >
                <input
                    id={id}
                    ref={inputRef}
                    className={clsx('input-text')}
                    style={style?.input}
                    placeholder={txtPlaceholder}
                    value={ctrl.getDisplayValue(value, type)}
                    onChange={(e)=>{
                        if(!isDisabled){
                            ctrl.thisOnchange(e, type, config, onChange)
                            
                            if(type==='number' && inputRef.current){
                                ctrl.setFormattedCursorPosition(inputRef.current, displayValue, e);
                            }

                            if(onValidate && error?.isError){
                                onValidate({isError:false, errorMessage:''},'')
                            }
                            
                            if(!isDirty){
                                setIsDirty(true)
                            }
                        }
                    }}
                    onBlur={(e)=>{
                        if(!isDisabled){
                            ctrl.thisOnBlur(e, type, value, isDirty, config, onChange, onValidate)
                        }
                    }}
                    disabled={isDisabled}
                    type={inputMode}
                />
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
    id?:string
    className?:string;
    style?:inputTextStyleType;
    shape?:globalShapeType;

    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputTextType
    txtPlaceholder?:string;
    value?:string;
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string)=>void
    config?:inputTextConfigType
}

export type inputTextType = 'text' | 'text-no-space' | 'number-text' | 'number' | 'password';

export type inputTextConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    maxLength?: number
    minLength?: number
    minValue?:number
    maxValue?:number
    validRegex?:[RegExp, string][]
}

export type inputTextStyleType = {
    inputContainer:React.CSSProperties,
    input:React.CSSProperties,
}