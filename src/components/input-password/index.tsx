import './styles.scss';
import type { fieldErrorType, globalShapeType } from '../_types';
import React, { useState } from 'react';
import InputText, { type inputTextConfigType, type inputTextStyleType } from "../input-text"
import type { iconButtonStyleType } from '../icon-button';
import IconButton from '../icon-button';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';

const InputPassword = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,
    txtPlaceholder = undefined,
    value = '',
    onChange = undefined,
    error = undefined,
    onValidate = undefined,
    config = undefined,
    initialShowPassword = false
}:_InputPassword) =>{

    //State start ====
    const [isShowPassword, setIsShowPassword] = useState(initialShowPassword)
    //State end ====

    return(
        <InputText
            ref={ref}
            id={id}
            className={className}
            value={value}
            shape={shape}
            style={style?.input}
            type={(isShowPassword)?("text"):('password')}
            txtPlaceholder={txtPlaceholder}
            onChange={onChange}
            onValidate={onValidate}
            config={config}
            error={error}

            afterElement={
                <IconButton
                    icon={isShowPassword?(<PiEyeClosedBold className='global-icon'/>):(<PiEyeBold className='global-icon'/>)}
                    txtLabel='Show Password'
                    shape={shape}
                    style={style?.showButton}
                    isShowtooltip={false}
                    isSelected={isShowPassword}
                    onClick={()=>{setIsShowPassword(!isShowPassword)}}
                />
            }
        />
    )
}

export default InputPassword

interface _InputPassword {
    ref?:React.Ref<HTMLInputElement>;
    id?:string
    className?:string;
    style?:inputPasswordStyleType;
    shape?:globalShapeType;
    txtPlaceholder?:string;
    value?:string;
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string)=>void;
    config?:inputTextConfigType;
    initialShowPassword?:boolean;
}

type inputPasswordStyleType = {
    input : inputTextStyleType;
    showButton: iconButtonStyleType;
}