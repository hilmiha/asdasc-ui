import type { fieldErrorType } from "src/components/_types"
import type { inputCodeConfigType } from "."

//validation of value
export const doValidateValue = (
    value:string,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
    config:inputCodeConfigType,
) =>{
    let isError = false
    let errorMessage = ''

    const valueLength = value.length


    if(config['isRequired'] && !isError){
        if(!valueLength){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }

    onValidate({isError:isError, errorMessage:errorMessage}, value)
}

export const onInputChange = (
    newValue: string,
    isDirtyRef: React.RefObject<boolean>,
    onChange?: (newValue: string) => void,
    config?:inputCodeConfigType,
    onValidate?:(error:fieldErrorType, newValue:string)=>void,
) =>{
    if (onChange) {
        onChange(newValue);
    }  
    if(onValidate && config){
        doValidateValue(newValue, onValidate, config)
    }

    //set input text dirty after user typing something
    if(!isDirtyRef.current){
        isDirtyRef.current = true
    }
}

export const onInputFocus = (
    event:FocusEvent,
    value:string,
	onFocus?:(e:FocusEvent, value:string)=>void
) =>{
    if(onFocus){
        const newValue = value
        onFocus(event, newValue)
    }
}

export const onInputBlur = (
    event:FocusEvent,
    value:string,
    isDirtyRef: React.RefObject<boolean>,
    config?:inputCodeConfigType,
    onValidate?:(error:fieldErrorType, newValue:string)=>void,
	onBlur?:(e:FocusEvent, value:string)=>void
) =>{

    if(onBlur){
        const newValue = value
        onBlur(event, newValue)
    }

    if(onValidate && config && isDirtyRef.current){
        doValidateValue(value, onValidate, config)
    }
}