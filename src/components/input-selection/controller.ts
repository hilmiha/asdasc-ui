import type { inputSelectConfigType, inputSelectType } from ".";
import { getFormatedNumberForDisplay } from "../../helper/helper";
import type { fieldErrorType } from "../_types";

export const doValidate = (
    newValue:string[],
    config?:inputSelectConfigType,
    onValidate?:(error:fieldErrorType, newValue:string[])=>void,
) =>{
    if(!config || !onValidate){
        return null
    }
    let isError = false
    let errorMessage = ''
    
    if(config['isRequired'] && !isError){
        if(newValue.length===0){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }
    if(config['maxValue'] && !isError){
        if(newValue.length > config['maxValue']){
            isError = true
            errorMessage = `Value selected cannot exceed ${getFormatedNumberForDisplay(`${config['maxValue']}`)} items`
        }
    }

    if(config['minValue'] && !isError){
        if(newValue.length < config['minValue']){
            isError = true
            errorMessage = `Value must be at least ${getFormatedNumberForDisplay(`${config['minValue']}`)} items`
        }
    }

    onValidate(
        {isError:isError, errorMessage:errorMessage},
        newValue
    )
}
export const onOptionClick = (
    idButton:string,
    currentValue:string[],
    type:inputSelectType,
    config?:inputSelectConfigType,
    onChange?:(newValue:string[])=>void,
) =>{
    let newValue = []
    if(type==='multiple'){
        const tamp = [...currentValue]
        if(currentValue.includes(idButton)){
            newValue = tamp.filter(i=>i!=idButton)
        }else{
            tamp.push(idButton)
            newValue = tamp
        }
    }else{
        newValue = [idButton]
    }

    if(onChange){
        if(config?.maxValue && newValue.length > config.maxValue){
            
        }else{
            onChange(newValue)
        }
    }
}

export const clearValue = (
    onChange?:(newValue:string[])=>void
) =>{
    if(onChange){
        onChange([])
    }
}