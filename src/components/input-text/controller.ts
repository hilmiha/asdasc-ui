import React from "react";
import type { inputTextConfigType, inputTextType } from ".";
import type { fieldErrorType } from "../_types";

// Helper function to format number for display
const formatNumberForDisplay = (value: string): string => {
    if (!value) return '';
    
    // Remove any non-digit characters except the first minus sign
    const cleanValue = value.replace(/[^0-9-]/g, '').replace(/-+/g, (_, offset) => offset === 0 ? '-' : '');
    
    // Handle negative sign
    const isNegative = cleanValue.startsWith('-');
    const numberPart = cleanValue.replace('-', '');
    
    if (!numberPart) return isNegative ? '-' : '';
    
    // Add thousand separators (dots in your case)
    const formatted = numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return isNegative ? `-${formatted}` : formatted;
};

// Helper function to clean number for state storage
const cleanNumberForState = (value: string): string => {
    if (!value) return '';
    
    // Remove everything except digits and the first minus sign
    let cleaned = value.replace(/[^0-9-]/g, '');
    
    // Handle multiple minus signs - keep only the first one if it's at the beginning
    if (cleaned.includes('-')) {
        const firstMinusIndex = cleaned.indexOf('-');
        if (firstMinusIndex === 0) {
        cleaned = '-' + cleaned.substring(1).replace(/-/g, '');
        } else {
        cleaned = cleaned.replace(/-/g, '');
        }
    }
    
    // Handle leading zeros
    if (cleaned) {
        const isNegative = cleaned.startsWith('-');
        const numberPart = cleaned.replace('-', '');
        
        if (numberPart) {
        // Remove leading zeros, but keep at least one digit
        const withoutLeadingZeros = numberPart.replace(/^0+/, '') || '0';
        
        // If the result is just "0", don't add negative sign
        if (withoutLeadingZeros === '0') {
            cleaned = '0';
        } else {
            cleaned = isNegative ? `-${withoutLeadingZeros}` : withoutLeadingZeros;
        }
        }
    }
    
    return cleaned;
};

// Helper function to validate number input during typing
const validateNumberInput = (newValue: string): boolean => {
    // Allow empty string
    if (!newValue) return true;
    
    // Allow single minus at the beginning
    if (newValue === '-') return true;
    
    // Get the cleaned value
    const cleanValue = cleanNumberForState(newValue);
    
    // Check if it's a valid number pattern
    const numberPattern = /^-?\d+$/;
    
    if (numberPattern.test(cleanValue)) {
        return true;
    }
    
    // Allow intermediate states during typing (like "-0" before adding more digits)
    // but these will be cleaned up by cleanNumberForState
    if (newValue === '-0' || newValue === '0') {
        return true;
    }
    
    return false;
};

export const thisOnchange = (
    e:React.ChangeEvent<HTMLInputElement>,
    type:inputTextType,
    config?:inputTextConfigType,
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>)=>void,
) =>{
    if(onChange){
        const inputValue = e.target.value
        let newValue = inputValue
        let shouldUpdate = true;

        switch (type) {
            case 'text-no-space':
                newValue = inputValue.replace(/\s/g, '')
                break
            case 'number-text':
                newValue = inputValue.replace(/[^0-9]/g, '')
                break
            case 'number':
                // Clean the input for state storage
                const cleanedValue = cleanNumberForState(inputValue);
                
                // Validate the input
                if (!validateNumberInput(inputValue)) {
                    shouldUpdate = false;
                    break;
                }
                
                // Store the clean value in state
                newValue = cleanedValue;
                break;
            case 'text':
            case 'password':
            default:
                newValue = inputValue
                break
        }

        if(config?.maxLength){
            newValue = newValue.slice(0, config.maxLength)
        }
        
        //send the final value to onChange as a new value
        if (shouldUpdate) {
            onChange(newValue, e)
        }
    }
}

export const thisOnValidate = (
    type:inputTextType,
    onValidate:(error:fieldErrorType, newValue:string)=>void,
    newValue:string,
    config?:inputTextConfigType
) =>{
    let isError = false
    let errorMessage = ''

    if(config){
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
            const cleanedValue = cleanNumberForState(newValue);
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
    }

    onValidate(
        {isError:isError, errorMessage:errorMessage},
        newValue
    )
}

export const thisOnBlur = (
    e:React.FocusEvent<HTMLInputElement>,
    type:inputTextType,
    currentValue:string,
    isDirty:boolean,
    config?:inputTextConfigType,
    onChange?:(newValue:string, e:React.FocusEvent<HTMLInputElement>)=>void,
    onValidate?:(error:fieldErrorType, newValue:string)=>void
) =>{
    const inputValue = e.target.value
    let newValue = inputValue.trim()
    if(type==='number'){
        newValue = cleanNumberForState(newValue)
    }

    if(onChange && newValue!==currentValue){
        onChange(newValue, e)
    }

    if(onValidate && isDirty){
        thisOnValidate(type, onValidate, newValue, config)
    }
}

export const getInputMode = (type: inputTextType): "numeric" | "text" | "password" | undefined => {
    switch (type) {
        case 'number':
        case 'number-text':
            return 'numeric'
        case 'password':
            return 'password'
        default:
            return 'text'
    }
}

export const getDisplayValue = (value: string, type: inputTextType): string => {
    if (type === 'number' && value) {
        return formatNumberForDisplay(value);
    }
    return value;
};

//Adjust cursos for number input
export const setFormattedCursorPosition = (
    input: HTMLInputElement,
    oldValue: string,
    e:React.ChangeEvent<HTMLInputElement>,
) => {
    const inputEvent = e.target;
    const newValue = getDisplayValue(inputEvent.value, 'number');
    const cursor = inputEvent.selectionStart ?? 0;
    const oldCursorPos = cursor - 1;

    // If user was at the end of the old string, keep them at the end
    if (oldCursorPos >= oldValue.length) {
        const end = newValue.length;
        input.setSelectionRange(end, end);
        return;
    }

    const oldLeft = oldValue.slice(0, oldCursorPos);
    const leftCount = countVisibleCharacters(oldLeft);

    let newCursor = 0;
    let visibleCount = 0;

    for (; newCursor < newValue.length; newCursor++) {
        if (isVisibleChar(newValue[newCursor])) {
            visibleCount++;
        }
        if (visibleCount >= leftCount + 2) break; // +2 for newly inserted character
    }

    requestAnimationFrame(() => {
        input.setSelectionRange(newCursor, newCursor);
    });
}

const countVisibleCharacters = (str: string) => {
    return str.split('').filter(isVisibleChar).length;
}

const isVisibleChar = (char: string) => {
    return /[a-zA-Z0-9]/.test(char); // You can adjust if only digits are expected
}