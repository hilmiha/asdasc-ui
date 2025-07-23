import type { radioGroupConfigType, radioGroupOptionType } from ".";
import type { fieldErrorType } from "../_types";


export const doValidateValue = (
    newValue:string,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
    config:radioGroupConfigType,
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

export const onRadioClicked = (
    option:radioGroupOptionType,
    value:string,
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    onChange?:(newValue:string, option:radioGroupOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void,
    config?:radioGroupConfigType,
    onValidate?:(error:fieldErrorType, newValue:string)=>void
) =>{
    const newValue = (option.id===value)?(''):(option.id)

    if(onChange){
        onChange(newValue, option, event)
    }
    console.log(config)
    if(onValidate && config){
        doValidateValue(newValue, onValidate, config)
    }
}