import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import RadioButton from '../radio-button';
import type { fieldErrorType } from '../_types';
import { PiWarningBold } from 'react-icons/pi';

const RadioGroup = ({
    className = undefined,
    style = undefined,
    options = [],
    value = '',
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined
}:_RadioGroup) =>{
    return(
        <div
            className={clsx(
                'radio-group-box',
                className
            )}
        >
            <div 
                className='checkbox-group-container'
                style={style?.radioGroupContainer}
            >
                {
                    options.map((i)=>(
                        <RadioButton
                            key={i.id}
                            value={i.id===value}
                            txtLabel={i.txtLabel}
                            txtSublabel={i.txtSublabel}
                            onClick={(_, e)=>{ctrl.onRadioClicked(i, value, e, onChange, config, onValidate)}}
                            isDisabled={(i.isDisabled)??(config?.isDisabled)}
                        />
                    ))
                }
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

export default RadioGroup

interface _RadioGroup{
    className?:string
    options:radioGroupOptionType[]
    value?:string,
    onChange?:(newValue:string, option:radioGroupOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string)=>void
    config?:radioGroupConfigType;
    style?:{
        radioGroupContainer?:React.CSSProperties,
    }
}

export type radioGroupOptionType = {
    id:string,
    txtLabel:string,
    txtSublabel?:string,
    isDisabled?:boolean,
};

export type radioGroupConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
}