import { MonthGrid, useDayPicker, type MonthGridProps } from "react-day-picker"
import type { pickModeType } from ".."
import MonthPicker from "./month-picker";
import YearPicker from "./year-picker";

const CalendarPickerArea = ({
    props,
    pickMode,
    setPickMode,
    calendarStartValue,
    calendarEndValue
}:{ 
    props:MonthGridProps,
    pickMode:pickModeType,
    setPickMode: React.Dispatch<React.SetStateAction<pickModeType>>
    calendarStartValue:Date
    calendarEndValue:Date
}) =>{
    const {
        goToMonth,
        months
    } = useDayPicker()

    const selected = months[0].date

    if(pickMode==='date'){
        return <MonthGrid {...props} />;
    }else if(pickMode==='month'){
        return (
            <MonthPicker 
                onClick={(id)=>{
                    goToMonth(new Date(`${id}-1-${selected.getFullYear()}`))
                    setPickMode('date')
                }}
                calendarStartValue={calendarStartValue}
                calendarEndValue={calendarEndValue}
            />
        )
    }else if(pickMode==='year'){
        return (
            <YearPicker
                onClick={(id)=>{
                    goToMonth(new Date(`${selected.getMonth() + 1}-1-${id}`))
                    setPickMode('date')
                }}
                calendarStartValue={calendarStartValue}
                calendarEndValue={calendarEndValue}
            />
        )
    }
}

export default CalendarPickerArea