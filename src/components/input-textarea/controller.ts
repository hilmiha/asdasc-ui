import React from "react";
import type { inputTextareaConfigType, inputTextareaType } from ".";
import type { fieldErrorType } from "../_types";
import { getCleanedNumberForState, getFormatedNumberForDisplay } from "../../helper/helper";
import type { DebouncedFunc } from "lodash";

export const getInputTypeMode = (type: inputTextareaType): {type:"numeric" | "text" | "password", mode:'text' | 'tel'} => {
    switch (type) {
        case 'number':
        case 'number-text':
            return {type:'numeric', mode:'tel'}
        default:
            return {type:'text', mode:'text'}
    }
}

export const getDisplayValue = (value: string, type: inputTextareaType): string => {
    if (type === 'number' && value) {
        return getFormatedNumberForDisplay(value);
    }
    return value;
};

//reset validation
export const doResetValidationValue = (
    newValue:string,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
) =>{
    onValidate({isError:false, errorMessage:''}, newValue)
}
//validation of value
export const doValidateValue = (
    type:inputTextareaType,
    newValue:string,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
    config:inputTextareaConfigType,
) =>{
    let isError = false
    let errorMessage = ''

    if(config['isRequired'] && !isError){
        if(!newValue){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }

    if(config['minLength'] && !isError && type!=='number'){
        if(newValue.length < config.minLength){
            isError = true
            errorMessage = `Minimum ${config.minLength} characters required`
        }
    }

    if(config['maxLength'] && !isError && type!=='number'){
        if(newValue.length > config.maxLength){
            isError = true
            errorMessage = `Maximum ${config.maxLength} characters allowed`
        }
    }

    if(
        (
            config['maxValue']!==undefined ||
            config['minValue']!==undefined
        )
        && !isError && type==='number'
    ){
        const cleanedValue = getCleanedNumberForState(newValue);
        const intValue = parseInt(cleanedValue??'0')

        if(
            config['maxValue']!==undefined && 
            config['minValue']!==undefined &&
            (
                intValue < config['minValue'] ||
                intValue > config['maxValue']
            )
        ){
            isError = true
            errorMessage = `Value is out of range (${getDisplayValue(`${config['minValue']}`, 'number')} ~ ${getDisplayValue(`${config['maxValue']}`, 'number')})`
        }else if(
            config['maxValue']!==undefined && intValue > config['maxValue']
        ){
            isError = true
            errorMessage = `Value cannot exceed ${getDisplayValue(`${config['maxValue']}`, 'number')}`
        }else if(
            config['minValue']!==undefined && intValue < config['minValue']
        ){
            isError = true
            errorMessage = `Value must be at least ${getDisplayValue(`${config['minValue']}`, 'number')}`
        }
    }

    if (config['validRegex'] && !isError && type !== 'number') {
        for (const [regex, message] of config.validRegex) {
            if (!regex.test(newValue)) {
                isError = true
                errorMessage = message
                break
            }
        }
    }

    onValidate({isError:isError, errorMessage:errorMessage},newValue)
}

//Adjust cursos for number input
export const doAdjustCursorInputNumber = (
    inputTarget:HTMLTextAreaElement,
    oldValue: string,
    newValue: string
) => {
    const countVisibleCharacters = (str: string) => {
        return str.split('').filter(isVisibleChar).length;
    }

    const isVisibleChar = (char: string) => {
        return /[a-zA-Z0-9]/.test(char);
    }

    const newValueDisplay = getDisplayValue(newValue, 'number');
    const oldValueDisplay = getDisplayValue(oldValue, 'number')
    const cursor = inputTarget.selectionStart ?? 0;
    const oldCursorPos = cursor - 1;

    // If user was at the end of the old string, keep them at the end
    if (oldCursorPos >= oldValueDisplay.length) {
        const end = newValueDisplay.length;
        inputTarget.setSelectionRange(end, end);
        return;
    }

    const oldLeft = oldValueDisplay.slice(0, oldCursorPos);
    const leftCount = countVisibleCharacters(oldLeft);

    let newCursor = 0;
    let visibleCount = 0;

    for (; newCursor < newValueDisplay.length; newCursor++) {
        if (isVisibleChar(newValueDisplay[newCursor])) {
            visibleCount++;
        }
        if (visibleCount >= leftCount + 2) break; // +2 for newly inserted character
    }

    requestAnimationFrame(() => {
        inputTarget.setSelectionRange(newCursor, newCursor);
    });
}

//onChange function of input component
export const onInputChange = (
    event:React.ChangeEvent<HTMLTextAreaElement>,
    oldValue:string,
    type:inputTextareaType,
    setTampValue: React.Dispatch<React.SetStateAction<string>>,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    debouncedOnChange: DebouncedFunc<(newValue: string, e: React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void>,
    config?:inputTextareaConfigType,
    error?:fieldErrorType,
    onValidate?:(error: fieldErrorType, newValue: string) => void,
) =>{
    const inputValue = event.target.value
    let newValue = inputValue   

    switch (type) {
        case 'text-no-space':
            newValue = inputValue.replace(/\s/g, '')
            break
        case 'number-text':
            newValue = inputValue.replace(/[^0-9]/g, '')
            break
        case 'number':
            const cleanedValue = getCleanedNumberForState(inputValue);
            newValue = cleanedValue;
            break
        case 'text':
        default:
            newValue = inputValue
            break
    }

    if(config?.isAllowBreakline===false){
        newValue = newValue.replaceAll(/\n/g, '')
    }

    if(config?.maxLength){
        newValue = newValue.slice(0, config.maxLength)
    }

    //send new value out of this component
    setTampValue(newValue)
    debouncedOnChange(newValue, event)

    //Reset validation when user focus on field
    if(onValidate && error?.isError){
        doResetValidationValue(newValue, onValidate)
    }

    //adjust the cursor for input number field
    if(type==='number'){
        doAdjustCursorInputNumber(event.target, oldValue, newValue);
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }
}

//onBlur function of input component
export const onInputBlur = (
    event:React.FocusEvent<HTMLTextAreaElement>,
    oldValue:string,
    type:inputTextareaType,
    setTampValue: React.Dispatch<React.SetStateAction<string>>,
    isDirty:boolean,
    debouncedOnChange: DebouncedFunc<(newValue: string, e: React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void>,
    config?:inputTextareaConfigType,
    onValidate?:(error: fieldErrorType, newValue: string) => void,
    onBlur?:(e: React.FocusEvent<HTMLTextAreaElement>, newValue:string) => void
) =>{
    const inputValue = event.target.value
    let newValue = inputValue.trim()
    if(type==='number'){
        newValue = getCleanedNumberForState(newValue)
    }
    
    //send new value out of this component (trimmed and clean)
    if(oldValue!==newValue){
        setTampValue(newValue)
        debouncedOnChange(newValue, event)
    }

    //do validation and send the error out of this component
    if(onValidate && isDirty && config){
        doValidateValue(type, newValue, onValidate, config)
    }

    //do blur event
    if(onBlur){
        onBlur(event, newValue)
    }
}

//onFocus function of input component
export const onInputFocus = (
    event:React.FocusEvent<HTMLTextAreaElement>,
    value:string,
    onFocus?:(e:React.FocusEvent<HTMLTextAreaElement>, value:string)=>void
) =>{
    //do focus event
    if(onFocus){
        onFocus(event, value)
    }
}

//on clear button clicked
export const onClearButtonClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type:inputTextareaType,
    setTampValue: React.Dispatch<React.SetStateAction<string>>,
    debouncedOnChange: DebouncedFunc<(newValue: string, e: React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => void>,
    config?:inputTextareaConfigType,
    onValidate?:(error: fieldErrorType, newValue: string) => void,
    inputRef?:React.RefObject<HTMLTextAreaElement | null>
) =>{
    setTampValue('')
    debouncedOnChange('', event)

    if(onValidate && config){
        doValidateValue(type, '', onValidate , config)
    }

    if(inputRef?.current){
        inputRef.current.focus()
    }
}


//textarea resize
export const doResizeTextarea = (
    inputRef: React.RefObject<HTMLTextAreaElement | null>,
    textareaLineHeight:number,
    textareaInitialLines:number,
    textareaMaxLines:number
) => {
    const ta = inputRef.current;
    if (!ta || textareaLineHeight == null) return;

    ta.style.height = 'auto'; // Reset height to measure scrollHeight
    const scrollHeight = ta.scrollHeight;
    const linesVisible = Math.round(scrollHeight / textareaLineHeight);
    const clampedLines = Math.min(Math.max(textareaInitialLines, linesVisible), textareaMaxLines);
    ta.style.overflowY = linesVisible > textareaMaxLines ? 'auto' : 'hidden';
    ta.style.height = `${clampedLines * textareaLineHeight}px`;
};