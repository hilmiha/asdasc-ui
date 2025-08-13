import type { inputTagConfigType, inputTagType } from ".";
import { getFormatedNumberForDisplay } from "../../helper/helper";
import type { fieldErrorType, optionItemType } from "../_types";

export const triggerOptionDropdown = (inputTagRef:React.RefObject<HTMLInputElement | null>) =>{
    setTimeout(() => {
        inputTagRef.current?.click();
    }, 100);
}

export const getFilteredOptions = (
    options:optionItemType[],
    value:string[], 
    searchParam:string, 
    config?:inputTagConfigType,
) => {
    if(!options){
        return []
    }
    let tampOptions = [...options].filter(i=>!value.includes(i.txtLabel))

    if(searchParam){
        tampOptions = tampOptions.filter(i=>(`${i.txtLabel}${i.alias}`).toLowerCase().includes(searchParam.toLowerCase()))
    }

    if(config?.maxValue){
        if(value.length >= config?.maxValue){
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
}

//send new value
export const doChangeValue = (
    newValue:string[],
    addedValue:string|undefined,
    onChange:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    event:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>,
) =>{
    onChange(newValue, addedValue, event)
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
    config:inputTagConfigType,
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
    setSearchParam:React.Dispatch<React.SetStateAction<string>>,
    inputTagRef:React.RefObject<HTMLInputElement | null>,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    config?:inputTagConfigType,
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    error?:fieldErrorType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    let newValue = [...oldValue]
    const addedValue = option.txtLabel

    if(newValue.includes(addedValue)){
        newValue = newValue.filter(i=>i!=addedValue)
    }else{
        newValue.push(addedValue)
    }

    if(config?.maxValue && newValue.length > config.maxValue){
        newValue = [...oldValue]
    }

    //send new value out of this component
    if(onChange){
        doChangeValue(newValue, addedValue, onChange, event)
    }

    //Reset validation when user focus on field
    if(onValidate && error?.isError){
        doResetValidationValue(newValue, onValidate)
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }

    //reset input text and bring focus to input text
    setSearchParam('')
    inputTagRef.current?.focus()
}

export const onInputTagChange = (
    event:React.ChangeEvent<HTMLInputElement>,
    inputTagRef:React.RefObject<HTMLInputElement | null>,
    type:inputTagType,
    oldValue:string[],
    isDirty:boolean, 
    setIsDirty:React.Dispatch<React.SetStateAction<boolean>>,
    isDropdownOpen:boolean,
    setSearchParam:React.Dispatch<React.SetStateAction<string>>,
    error?:fieldErrorType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    const inputValue = event.target.value
    let newSearchValue = inputValue

    switch (type) {
        case 'text-no-space':
            newSearchValue = inputValue.replace(/\s/g, '')
            break
        case 'text':
        default:
            newSearchValue = inputValue
            break
    }
    if(inputValue===' '){
        triggerOptionDropdown(inputTagRef)
    }else{
        if(newSearchValue && !isDropdownOpen){
            triggerOptionDropdown(inputTagRef)
        }
        setSearchParam(newSearchValue)
    }

    if(onValidate && error?.isError){
        doResetValidationValue(oldValue, onValidate)
    }
    
    if(!isDirty){
        setIsDirty(true)
    }
}

export const onInputTagBlur = (
    e:React.FocusEvent<HTMLInputElement>,
    inputTagRef:React.RefObject<HTMLInputElement | null>,
    currentValue:string[],
    searchParam:string,
    setSearchParam:React.Dispatch<React.SetStateAction<string>>,
    isDropdownOpen:boolean,
    option: optionItemType[],
    isDirty:boolean, 
    onBlur?:(e:React.FocusEvent<HTMLInputElement>, value:string[])=>void,
    config?:inputTagConfigType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    if(option.length===0 && searchParam!==''){
        setSearchParam('')

        if(isDropdownOpen){
            inputTagRef.current?.click()
        }
    }
    
    if(onValidate && config && isDirty && (!isDropdownOpen || (isDropdownOpen && option.length===0)) ){
        doValidateValue(currentValue, onValidate , config)
    }

    if(onBlur){
        onBlur(e, currentValue)
    }
}

export const onInputTagFocus = (
    e:React.FocusEvent<HTMLInputElement>,
    currentValue:string[],
    onFocus?:(e:React.FocusEvent<HTMLInputElement>, value:string[])=>void
) =>{
    if(onFocus){
        onFocus(e, currentValue)
    }
}

export const onInputTagKeyDown = (
    e:React.KeyboardEvent<HTMLInputElement>,        
    inputTagRef:React.RefObject<HTMLInputElement | null>,
    searchParam:string,
    setSearchParam:React.Dispatch<React.SetStateAction<string>>,
    currentValue:string[],
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    config?:inputTagConfigType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) => {
    const key = e.key
    if(key==='Backspace' && searchParam==='' && currentValue.length>0){
        const newValue = [...currentValue]
        newValue.pop()

        if(onChange){
            if(onValidate && config?.maxValue){
                doValidateValue(newValue, onValidate, config)
            }
            doChangeValue(newValue, undefined, onChange, e)
        }
    }if(key==='Enter' && searchParam===''){
        triggerOptionDropdown(inputTagRef)
    }else if(key==='Enter' && searchParam!==''){
        const tampValue = [...currentValue]
        const addedValue = searchParam.trim()
        if(!tampValue.includes(addedValue)){
            tampValue.push(addedValue)

            if(onValidate && config?.maxValue){
                doValidateValue(tampValue, onValidate, config)
            }

            let isCanAdd = true
            if(config?.maxValue && config?.maxValue < tampValue.length){
                isCanAdd = false
            }
            if(onChange && isCanAdd){
                doChangeValue(tampValue, addedValue, onChange, e)
            }
        } 
        setSearchParam('')
        // triggerOptionDropdown(inputTagRef)
    }
}

export const doRemoveValueX = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    valueX:string,
    currentValue:string[],
    isDirty:boolean,
    setIsDirty:React.Dispatch<React.SetStateAction<boolean>>,
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    config?:inputTagConfigType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    const newValue = [...currentValue].filter(i=>i!==valueX)
    if(onChange){
        doChangeValue(newValue, undefined, onChange, event)
    }
    if(onValidate && config){
        doValidateValue(newValue, onValidate, config)
    }
    if(!isDirty){
        setIsDirty(true)
    }
}

export const onClearButtonClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    inputTagRef:React.RefObject<HTMLInputElement | null>,
    onChange?:(newValue:string[], addedValue:string|undefined, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|React.KeyboardEvent<HTMLInputElement>)=>void,
    config?:inputTagConfigType,
    onValidate?:(error: fieldErrorType, newValue: string[]) => void,
) =>{
    if(onChange){
        doChangeValue([], undefined, onChange, event)
    }

    if(onValidate && config){
        doValidateValue([], onValidate , config)
    }

    if(inputTagRef?.current){
        inputTagRef.current.focus()
    }
}