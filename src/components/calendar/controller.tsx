import { isDateRange, type DateRange, type Mode } from "react-day-picker";
import type { pickModeType, validCalendarValue } from ".";
import { isDate } from "date-fns";

export const onValueChange = (
    type:Mode | 'single-with-time',
    prevValue:validCalendarValue,
    newValue:validCalendarValue,
    isDisabled:boolean,
    isWithTime:boolean,
    onChange?: React.Dispatch<React.SetStateAction<Date | undefined>> | React.Dispatch<React.SetStateAction<DateRange | undefined>> | React.Dispatch<React.SetStateAction<Date[] | undefined>>
) =>{
    if(isDisabled){
        return
    }
    if(type==='multiple' && (Array.isArray(newValue) || !newValue) && onChange){
        const setFunction = onChange as React.Dispatch<React.SetStateAction<Date[] | undefined>>
        setFunction(newValue)
    }else if(type==='range' && (isDateRange(newValue) || !newValue) && onChange){
        const setFunction = onChange as React.Dispatch<React.SetStateAction<DateRange | undefined>>
        setFunction(newValue)
    }else if((type==='single' || type==='single-with-time') && (isDate(newValue) || !newValue) && onChange){
        const tampNewValue = newValue

        if(isWithTime && tampNewValue){
            const tampOldValue = prevValue as Date | undefined
            const hour = tampOldValue?(tampOldValue.getHours()):(0)
            const minute = tampOldValue?(tampOldValue.getMinutes()):(0)
            const second = tampOldValue?(tampOldValue.getSeconds()):(0)

            tampNewValue.setHours(hour)
            tampNewValue.setMinutes(minute)
            tampNewValue.setSeconds(second)
        }
        

        const setFunction = onChange as React.Dispatch<React.SetStateAction<Date | undefined>>
        setFunction(tampNewValue)
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