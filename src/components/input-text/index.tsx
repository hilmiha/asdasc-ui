import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { fieldErrorType, globalShapeType } from '../_types';
import React, { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import { PiLockBold, PiWarningBold, PiXBold } from 'react-icons/pi';
import IconButton from '../icon-button';

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
    onBlur = undefined,
    onFocus = undefined,
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
                    value={ctrl.getDisplayValue(value, type)}
                    onChange={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputChange(e, value, type, isDirty, setIsDirty, config, onChange, error, onValidate)
                        }
                    }}
                    onBlur={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputBlur(e, value, type, isDirty, config, onChange, onValidate, onBlur)
                        }
                    }}
                    onFocus={(e)=>{
                        if(!isDisabled){
                            ctrl.onInputFocus(e, value, onFocus)
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
                    (value.length > 0 && !isDisabled)&&(
                        <IconButton
                            className='clear-button'
                            icon={<PiXBold/>}
                            txtLabel='Clear'
                            appearance='subtle'
                            isShowtooltip={false}
                            onClick={(e)=>{ctrl.onClearButtonClick(e, type, config, onChange, onValidate, inputRef)}}
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
    id?:string
    className?:string;
    style?:inputTextStyleType;
    shape?:globalShapeType;

    afterElement?:JSX.Element;
    beforeElement?:JSX.Element;

    type:inputTextType
    txtPlaceholder?:string;
    value?:string;
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    onBlur?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void
    onFocus?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, value:string)=>void
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
    sufixElement?:JSX.Element|string
    prefixElement?:JSX.Element|string
}

export type inputTextStyleType = {
    input:React.CSSProperties,
}