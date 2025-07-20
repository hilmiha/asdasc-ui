import type { inputSelectConfigType, inputSelectType } from ".";
import { getFormatedNumberForDisplay } from "../../helper/helper";
import type { fieldErrorType } from "../_types";

export const doValidate = (
    newValue:string[],
    config:inputSelectConfigType,
    onValidate:(error:fieldErrorType, newValue:string[])=>void,
) =>{
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
export const thisOnchange = (
    newTag:string,
    currentValue:string[],
    type:inputSelectType,
    config?:inputSelectConfigType,
    onChange?:(newValue:string[])=>void,
) =>{
    let newValue = []
    if(type==='tags'){
        const tamp = [...currentValue]
        if(currentValue.includes(newTag)){
            newValue = tamp.filter(i=>i!=newTag)
        }else{
            tamp.push(newTag)
            newValue = tamp
        }
    }else{
        newValue = [newTag]
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

export const toggleTrigger = (triggerButtonRef?:React.RefObject<HTMLButtonElement | null>) =>{
    if (triggerButtonRef?.current){
        setTimeout(() => {
            triggerButtonRef.current?.click();
        }, 100);
    }
}