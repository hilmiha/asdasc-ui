import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import CheckboxButton from '../checkbox-button';
import type { fieldErrorType } from '../_types';
import { PiWarningBold } from 'react-icons/pi';
import React from 'react';
import { useDeepCompareMemo } from '../../hook/useDeepCompareMemo';

const CheckboxGroup = ({
    className = undefined,
    style = undefined,
    options = [],
    value = [],
    onChange = undefined,
    error = undefined,
    onValidate = undefined,

    config = undefined
}:_CheckboxGroup) =>{

    const optionTamp = useDeepCompareMemo(()=>{
        return ctrl.getProcessedOption(value, options, config?.maxValue)
    },[options, value, config?.maxValue])

    return(
        <div
            className={clsx(
                'checkbox-group-box',
                className
            )}
        >
            <div 
                className='checkbox-group-container'
                style={style?.checkboxGroupContainer}
            >
                {
                    optionTamp.map((i)=>{
                        const {isIndeterminate, isSelected} = ctrl.getDisplayValue(i, value)
                        return(
                            <div key={i.id}>
                                <CheckboxButton
                                    value={isSelected}
                                    txtLabel={i.txtLabel}
                                    txtSublabel={i.txtSublabel}
                                    onClick={(_, e)=>{
                                        if(i.childOption){
                                            ctrl.onParentCheckboxClicked(i, value, e, onChange, config, onValidate)
                                        }else{
                                            ctrl.onCheckboxClicked(i, value, e, onChange, config, onValidate)
                                        }
                                    }}
                                    isDisabled={(i.isDisabled)??(config?.isDisabled)}
                                    isIndeterminate={isIndeterminate}
                                />
                                {
                                    (i.childOption)&&(
                                        <div 
                                            className='child-option-group-box'
                                            style={style?.childOptionBox}
                                        >
                                            {
                                                (i.childOption)?.map((k)=>(
                                                    <CheckboxButton
                                                        key={k.id}
                                                        value={value.includes(k.id)}
                                                        txtLabel={k.txtLabel}
                                                        txtSublabel={k.txtSublabel}
                                                        onClick={(_, e)=>{ctrl.onCheckboxClicked(k, value, e, onChange, config, onValidate)}}
                                                        isDisabled={(k.isDisabled)??(config?.isDisabled)}
                                                    />
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                
                            </div>
                        )
                    })
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

export default CheckboxGroup

interface _CheckboxGroup{
    className?:string
    options:checkboxGroupOptionType[]
    value?:string[],
    onChange?:(newValue:string[], option:checkboxGroupOptionType|checkboxGroupChildOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
    config?:checkboxGroupConfigType;
    style?:{
        checkboxGroupContainer?:React.CSSProperties,
        childOptionBox?:React.CSSProperties
    }
}

export type checkboxGroupOptionType = {
    id:string,
    txtLabel:string,
    txtSublabel?:string,
    isDisabled?:boolean,
    childOption?:checkboxGroupChildOptionType[]
};

export type checkboxGroupChildOptionType = {
    id:string,
    txtLabel:string,
    txtSublabel?:string,
    isDisabled?:boolean,
}

export type checkboxGroupConfigType = {
    isDisabled?:boolean
    isRequired?:boolean
    maxValue?:number
}