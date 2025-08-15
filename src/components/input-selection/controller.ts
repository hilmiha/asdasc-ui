import type { inputSelectConfigType, inputSelectType } from ".";
import { getFormatedNumberForDisplay } from "../../helper/helper";
import type { fieldErrorType, optionItemType } from "../_types";

export const getDisplayValue = (value:string[], option:optionItemType[]): string[] => {
    return value.map((i)=>{
        const tamp = option.find(j=>j.id===i)
        if(tamp){
            return tamp.txtLabel
        }else{
            return i
        }
    });
};

export const getProcessedOption = (value:string[], option:optionItemType[], searchParam:string, maxValue?:number): optionItemType[] => {
    let tampOptions = [...option]

    if(searchParam){
        tampOptions = tampOptions.filter(i=>(`${i.txtLabel}${i.alias}`).toLowerCase().includes(searchParam.toLowerCase()))
    }

    if(maxValue){
        if(value.length >= maxValue){
            return tampOptions.map((i)=>{
                if(value.includes(i.id)){
                    return i
                }else{
                    return {...i, isDisabled:true}
                }
            })
        }else{
            return tampOptions
        }
    }else{
        return tampOptions
    }
};

//send new value
export const doChangeValue = (
    newValue:string[],
    option:optionItemType|undefined,
    onChange:(newValue:string[], option:optionItemType|undefined, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
) =>{
    onChange(newValue, option, event)
}

//reset validation
export const doResetValidationValue = (
    newValue:string[],
    onValidate:(error:fieldErrorType, newValue:string[])=>void,
) =>{
    onValidate({isError:false, errorMessage:''}, newValue)
}
//validation of value
export const doValidateValue = (
    newValue:string[],
    onValidate:(error:fieldErrorType, newValue:string[])=>void,
    config:inputSelectConfigType,
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

    onValidate({isError:isError, errorMessage:errorMessage},newValue)
}

export const onOptionClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option:optionItemType,
    oldValue:string[],
    type:inputSelectType,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    config?:inputSelectConfigType,
    onChange?:(newValue:string[], option:optionItemType|undefined, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    error?:fieldErrorType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    let newValue = [...oldValue]
    if(type==='multiple'){
        if(oldValue.includes(option.id)){
            newValue = newValue.filter(i=>i!=option.id)
        }else{
            newValue.push(option.id)
        }
    }else{
        newValue = [option.id]
    }

    if(config?.maxValue && newValue.length > config.maxValue){
        newValue = [...oldValue]
    }

    //send new value out of this component
    if(onChange){
        doChangeValue(newValue, option, onChange, event)
    }

    //Reset validation when user focus on field
    if(onValidate && error?.isError){
        doResetValidationValue(newValue, onValidate)
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }
}

export const clearValue = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange:(newValue:string[], option:optionItemType|undefined, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
) =>{
    if(onChange){
        doChangeValue([], undefined, onChange, event)
    }
}
//on clear button clicked
export const onClearButtonClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    config?:inputSelectConfigType,
    onChange?:(newValue:string[], option:optionItemType|undefined, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
    triggerRef?:React.RefObject<HTMLButtonElement | null>
) =>{
    event.stopPropagation()
    if(onChange){
        clearValue(event, onChange)
    }

    if(onValidate && config){
        doValidateValue([], onValidate , config)
    }

    if(triggerRef?.current){
        triggerRef.current.focus()
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }
}