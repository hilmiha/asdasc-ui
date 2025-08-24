import { differenceInDays, format } from "date-fns";
import type { calendarType, validCalendarValue } from "../calendar";
import { isDate } from "lodash";
import type { fieldErrorType } from "../_types";
import type { inputDateTimeConfigType } from ".";
import { isDateRange } from "react-day-picker";
import { getFormatedNumberForDisplay } from "../../helper/helper";

export const getDisplayValue = (
    type:calendarType,
    value:validCalendarValue
) =>{
    if(type==='single' && isDate(value)){
        return(format(value, 'dd MMM yyyy'))
    }else if(type==='single-with-time' && isDate(value)){
        return(format(value, 'dd MMM yyyy, HH:mm:ss'))
    }else if(type==='multiple' && value && Array.isArray(value)){
        const tamp = value.map((i)=>format(i, 'dd MMM yyyy'))
        return(tamp.join(', '))
    }else if(type==='range' && value && isDateRange(value)){
        const from = value.from
        const to = value.to
        if(from && to){
            return(`${format(from, 'dd MMM yyyy')} to ${format(to, 'dd MMM yyyy')}`)
        }else{
            return('')
        }
    }else{
        //need to add more type
        return('')
    }
}

//send new value
export const doChangeValue = (
    newValue:validCalendarValue,
    onChange:(newValue:validCalendarValue)=>void,
) =>{
    onChange(newValue)
}

export const doValidateValue = (
    type:calendarType,
    newValue:validCalendarValue,
    onValidate:(error:fieldErrorType, newValue:validCalendarValue)=>void,
    config:inputDateTimeConfigType
) =>{
    let isError = false
    let errorMessage = ''

    if(config['isRequired'] && !isError){
        if(!newValue){
            isError = true
            errorMessage = 'This field cannot be empty!'
        }
    }
    if(config['minSelected'] && !isError && (type==='multiple' || type==='range')){
        let countDay = 0

        if(type==='multiple' && newValue && Array.isArray(newValue)){
            countDay = newValue.length
        }

        if(type==='range' && newValue && isDateRange(newValue) && newValue.from && newValue.to){
            countDay = differenceInDays(newValue.to, newValue.from) + 1
        }

        if(countDay < config.minSelected){
            isError = true
            errorMessage = `Value must be at least ${getFormatedNumberForDisplay(`${config['minSelected']}`)} items`
        }
    }
    
    if(config['maxSelected'] && !isError && (type==='multiple' || type==='range')){
        let countDay = 0

        if(type==='multiple' && newValue && Array.isArray(newValue)){
            countDay = newValue.length
        }

        if(type==='range' && newValue && isDateRange(newValue) && newValue.from && newValue.to){
            countDay = differenceInDays(newValue.to, newValue.from) + 1
        }

        if(countDay > config.maxSelected){
            isError = true
            errorMessage = `Value selected cannot exceed ${getFormatedNumberForDisplay(`${config['maxSelected']}`)} items`
        }
    }
    // need to add more validation


    onValidate({isError:isError, errorMessage:errorMessage}, newValue)
}

export const clearValue = (
    onChange?:(newValue:validCalendarValue)=>void,
) =>{
    if(onChange){
        doChangeValue(undefined, onChange)
    }
}
//on clear button clicked
export const onClearButtonClick = (
    event:React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type:calendarType,
    isDirty:boolean, 
    setIsDirty:(x:boolean)=>void,
    config?:inputDateTimeConfigType,
    onChange?:(newValue:validCalendarValue)=>void,
    onValidate?:(error:fieldErrorType, newValue:validCalendarValue)=>void,
    triggerRef?:React.RefObject<HTMLButtonElement | null>
) => {
    event.stopPropagation()
    if(onChange){
        clearValue(onChange)
    }

    if(onValidate && config){
        doValidateValue(type, undefined, onValidate , config)
    }

    if(triggerRef?.current){
        triggerRef.current.focus()
    }

    //set input text dirty after user typing something
    if(!isDirty){
        setIsDirty(true)
    }
}