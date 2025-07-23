import { intersection } from "lodash";
import type { checkboxGroupChildOptionType, checkboxGroupConfigType, checkboxGroupOptionType } from ".";
import type { fieldErrorType } from "../_types";

export const getProcessedOption = (value:string[], option:checkboxGroupOptionType[], maxValue?:number): checkboxGroupOptionType[] => {
    let tampOptions = [...option]

    if(maxValue){
        if(value.length >= maxValue){
            return tampOptions.map((i)=>{
                if(i.childOption){
                    const tampi = {...i}
                    let countValue = 0

                    tampi.childOption = i.childOption.map((k)=>{
                        if(value.includes(k.id)){
                            countValue = countValue++
                            return k
                        }else{
                            return {...k, isDisabled:true}
                        }
                    })
                    
                    if(!(i.isDisabled)){
                        tampi.isDisabled=(countValue!==tampi.childOption.length)
                    }
                    return tampi
                }else{
                    if(value.includes(i.id)){
                        return i
                    }else{
                        return {...i, isDisabled:true}
                    }
                }
                
            })
        }else{
            return tampOptions
        }
    }else{
        return tampOptions
    }
};

export const getDisplayValue = (
    option:checkboxGroupOptionType,
    value:string[],
) =>{
    let isIndeterminate = false
    let isSelected = false

    const childIdOption = option.childOption?.map((i)=>i.id)??[]
    const intersected = intersection(value, childIdOption)

    if(option.childOption){
        isIndeterminate = intersected.length !== option.childOption.length
        isSelected = intersected.length > 0
    }else{
        isIndeterminate = false
        isSelected = value.includes(option.id)
    }

    return({isIndeterminate, isSelected})
}

export const doChangeValue = (
    newValue:string[],
    option:checkboxGroupOptionType|checkboxGroupChildOptionType,
    onChange:(newValue:string[], option:checkboxGroupOptionType|checkboxGroupChildOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
) =>{
    onChange(newValue, option, event)
}

export const doValidateValue = (
    newValue:string[],
    onValidate:(error:fieldErrorType, newValue:string[])=>void,
    config:checkboxGroupConfigType,
) =>{
    let isError = false
    let errorMessage = ''

    if(config['isRequired'] && !isError){
        if(!newValue){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }

    onValidate({isError:isError, errorMessage:errorMessage},newValue)
}

export const onCheckboxClicked = (
    option:checkboxGroupOptionType|checkboxGroupChildOptionType,
    oldValue:string[],
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange?:(newValue:string[], option:checkboxGroupOptionType|checkboxGroupChildOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    config?:checkboxGroupConfigType,
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
) =>{
    let newValue = [...oldValue]
    if(oldValue.includes(option.id)){
        newValue = newValue.filter(i=>i!=option.id)
    }else{
        newValue.push(option.id)
    }

    if(config?.maxValue && newValue.length > config.maxValue){
        newValue = [...oldValue]
    }

    if(onChange){
        doChangeValue(newValue, option, onChange, event)
    }

    if(onValidate && config){
        doValidateValue(newValue, onValidate, config)
    }
}

export const onParentCheckboxClicked = (
    option:checkboxGroupOptionType,
    oldValue:string[],
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange?:(newValue:string[], option:checkboxGroupOptionType|checkboxGroupChildOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    config?:checkboxGroupConfigType,
    onValidate?:(error:fieldErrorType, newValue:string[])=>void
) =>{
    let newValue = [...oldValue]
    const listIdChild = option.childOption?.filter((i)=>(!i.isDisabled)).map((i)=>i.id)??[]
    const intersected = intersection(newValue, listIdChild)
    if(intersected.length>=0 && intersected.length!==listIdChild.length){
        listIdChild.forEach((i)=>{
            if(!intersected.includes(i)){
                newValue.push(i)
            }
        })
    }else{
        newValue = newValue.filter((i)=>(!intersected.includes(i)))
    }
    console.log(newValue)
    if(onChange){
        doChangeValue(newValue, option, onChange, event)
    }
    
    if(onValidate && config){
        doValidateValue(newValue, onValidate, config)
    }
}