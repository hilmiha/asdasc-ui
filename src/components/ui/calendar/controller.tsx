import { isDateRange, type Mode } from "react-day-picker";
import type { pickModeType, validCalendarValue } from ".";
import { isDate } from "date-fns";

export const onValueChange = (
    type:Mode | 'single-with-time',
    prevValue:validCalendarValue,
    newValue:validCalendarValue,
    isDisabled:boolean,
    onChange?: (newValue:validCalendarValue)=>void
) =>{
    if(isDisabled){
        return
    }
    if(type==='multiple' && (Array.isArray(newValue) || !newValue) && onChange){
        const isArrayEmpty = Array.isArray(newValue) && newValue.length===0
        if(isArrayEmpty){
            onChange(undefined)
        }else{
            onChange(newValue)
        }
    }else if(type==='range' && (isDateRange(newValue) || !newValue) && onChange){
        onChange(newValue)
    }else if((type==='single' || type==='single-with-time') && (isDate(newValue) || !newValue) && onChange){
        const tampNewValue = newValue

        if(type==='single-with-time' && tampNewValue){
            const tampOldValue = prevValue as Date | undefined
            const hour = tampOldValue?(tampOldValue.getHours()):(0)
            const minute = tampOldValue?(tampOldValue.getMinutes()):(0)
            const second = tampOldValue?(tampOldValue.getSeconds()):(0)

            tampNewValue.setHours(hour)
            tampNewValue.setMinutes(minute)
            tampNewValue.setSeconds(second)
        }
        onChange(newValue)
    }
}

export const onClickMonthYearNavButton = (
    newPickMode:pickModeType,
    setPickMode:React.Dispatch<React.SetStateAction<pickModeType>>
) =>{
    setPickMode((prev)=>{
        if((prev==='month' && newPickMode==='month') || (prev==='year' && newPickMode==='year') || newPickMode==='date'){
            return 'date'
        }else if(newPickMode==='month'){
            return 'month'
        }else if(newPickMode==='year'){
            return 'year'
        }else{
            return 'date'
        }
    })
}