import type { fieldErrorType } from "src/components/_types";
import type { inputColorConfigType } from ".";

//send new value
export const doChangeValue = (
    newValue:string,
    onChange:(newValue:string)=>void,
) =>{
    onChange(newValue)
}

export const onColorPick = (
    newValue:string,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    onChange?:(newValue:string)=>void,
    onValidate?:(error:fieldErrorType, newValue:string)=>void,
    
) =>{
    if(onChange){
        doChangeValue(newValue, onChange)
    }
    if(onValidate){
        onValidate({isError:false, errorMessage:''}, newValue)
    }
    if(!isDirty){
        setIsDirty(true)
    }
}

export const doValidateValue = (
    newValue:string,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
    config:inputColorConfigType
) =>{
    let isError = false
    let errorMessage = ''

    if(config['isRequired'] && !isError){
        if(!newValue){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }
    // need to add more validation

    onValidate({isError:isError, errorMessage:errorMessage}, newValue)
}

export const clearValue = (
    onChange?:(newValue:string)=>void,
) =>{
    if(onChange){
        doChangeValue('', onChange)
    }
}
//on clear button clicked
export const onClearButtonClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    config?:inputColorConfigType,
    onChange?:(newValue:string)=>void,
    onValidate?:(error:fieldErrorType, newValue:string)=>void,
    triggerRef?:React.RefObject<HTMLButtonElement | null>
) => {
    event.stopPropagation()
    if(onChange){
        clearValue(onChange)
    }

    if(onValidate && config){
        doValidateValue('', onValidate , config)
    }

    if(triggerRef?.current){
        triggerRef.current.focus()
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }
}