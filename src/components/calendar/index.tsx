
import { useContext, useState } from 'react'
import './styles.scss'
import { DayPicker, isDateRange, type DateRange, type Mode } from "react-day-picker"
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import type { globalShapeType } from '../_types'
import clsx from 'clsx'
import CalendarNavigation from './components/calendar-navigation'
import CalendarPickerArea from './components/calendar-picker-area'
import TimePickerMobile from './components/time-picker-mobile'
import { isDate } from 'date-fns'
import TimePicker from './components/time-picker'

interface _Calendar {
    type:Mode | 'single-with-time'
    value?:Date | DateRange | Date[] | undefined
    setValue?: React.Dispatch<React.SetStateAction<Date | undefined>> | React.Dispatch<React.SetStateAction<DateRange | undefined>> | React.Dispatch<React.SetStateAction<Date[] | undefined>>
    isDisabled?:boolean
    isWithTime?:boolean
    disabledDates?:validCalendarDisabledValue[]
    shape?:globalShapeType
}
export type pickModeType = "date" | 'month' | 'year'

export type validCalendarDisabledValue = Date | Date[] | DateRange
export type validCalendarValue = Date | Date[] | DateRange | undefined
const Calendar = ({
    type = 'single',
    value = undefined,
    setValue = undefined,
    isDisabled = false,
    isWithTime = false, //only applies when type === single
    disabledDates = undefined,
    shape = undefined
}:_Calendar) =>{
    
    //Context start ====
    const {
        globalShape,
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    const [pickMode, setPickMode] = useState<pickModeType>('date')
    
    const onChangeValue = (newValue:validCalendarValue) =>{
        if(isDisabled){
            return
        }
        if(type==='multiple' && (Array.isArray(newValue) || !newValue) && setValue){
            const setFunction = setValue as React.Dispatch<React.SetStateAction<Date[] | undefined>>
            setFunction(newValue)
        }else if(type==='range' && (isDateRange(newValue) || !newValue) && setValue){
            const setFunction = setValue as React.Dispatch<React.SetStateAction<DateRange | undefined>>
            setFunction(newValue)
        }else if((type==='single' || type==='single-with-time') && (isDate(newValue) || !newValue) && setValue){
            const tampNewValue = newValue

            if(isWithTime && tampNewValue){
                const tampOldValue = value as Date | undefined
                const hour = tampOldValue?(tampOldValue.getHours()):(0)
                const minute = tampOldValue?(tampOldValue.getMinutes()):(0)
                const second = tampOldValue?(tampOldValue.getSeconds()):(0)

                tampNewValue.setHours(hour)
                tampNewValue.setMinutes(minute)
                tampNewValue.setSeconds(second)
            }
            

            const setFunction = setValue as React.Dispatch<React.SetStateAction<Date | undefined>>
            setFunction(tampNewValue)
        }
    }

    return(
        <div 
            className={clsx(
                'calendar-box',
                (shape)?(shape):(globalShape),
                {
                    ['disabled']:isDisabled
                }
                
            )}
        >
            {
                (type==='multiple' && (Array.isArray(value) || !value))?(
                    <DayPicker
                        components={{
                            MonthCaption:()=>{
                                return<CalendarNavigation pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                            Nav:()=>{
                                return(<></>)
                            },
                            MonthGrid:(props)=>{
                                return<CalendarPickerArea props={props} pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                        }}
                        mode='multiple'
                        selected={value as Date[] | undefined}
                        onSelect={(newValue)=>{onChangeValue(newValue)}}
                        disabled={disabledDates}
                        fixedWeeks={true}
                    />
                ):(type==='range' && (isDateRange(value) || !value))?(
                    <DayPicker
                        components={{
                            MonthCaption:()=>{
                                return<CalendarNavigation pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                            Nav:()=>{
                                return(<></>)
                            },
                            MonthGrid:(props)=>{
                                return<CalendarPickerArea props={props} pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                        }}
                        mode='range'
                        selected={value as DateRange | undefined}
                        onSelect={(newValue)=>{onChangeValue(newValue)}}
                        disabled={disabledDates}
                        fixedWeeks={true}
                    />
                ):((type==='single' || type==='single-with-time') && (isDate(value) || !value))?(
                    <DayPicker
                        components={{
                            MonthCaption:()=>{
                                return<CalendarNavigation pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                            Nav:()=>{
                                return(<></>)
                            },
                            MonthGrid:(props)=>{
                                return<CalendarPickerArea props={props} pickMode={pickMode} setPickMode={setPickMode}/>
                            },
                        }}
                        mode='single'
                        selected={value as Date | undefined}
                        onSelect={(newValue)=>{onChangeValue(newValue)}}
                        disabled={disabledDates}
                        fixedWeeks={true}
                        footer={(type==='single-with-time')?(
                            <TimePicker value={value} setValue={setValue as React.Dispatch<React.SetStateAction<Date | undefined>>} isDisabled={isDisabled}/>
                        ):(undefined)}
                    />
                ):(
                    <>type problem</>
                )
            }
        </div>
        
    )
}

export default Calendar