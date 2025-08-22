import './styles.scss'
import * as ctrl from './controller';
import clsx from 'clsx'
import { useContext, useState } from 'react'
import { DayPicker, isDateRange, type DateRange, type Mode } from "react-day-picker"
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import type { globalShapeType } from '../_types'
import CalendarNavigation from './components/calendar-navigation'
import CalendarPickerArea from './components/calendar-picker-area'
import { isDate } from 'date-fns'
import TimePicker from './components/time-picker'

const Calendar = ({
    type = 'single',
    value = undefined,
    onChange = undefined,
    isDisabled = false,
    isWithTime = false, //only applies when type === single
    disabledDates = undefined,
    shape = undefined
}:_Calendar) =>{
    
    //Context start ====
    const {
        globalShape,
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    const [pickMode, setPickMode] = useState<pickModeType>('date')

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
                        onSelect={(newValue)=>{ctrl.onValueChange(type, value, newValue, isDisabled, isWithTime, onChange)}}
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
                        onSelect={(newValue)=>{ctrl.onValueChange(type, value, newValue, isDisabled, isWithTime, onChange)}}
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
                        onSelect={(newValue)=>{ctrl.onValueChange(type, value, newValue, isDisabled, isWithTime, onChange)}}
                        disabled={disabledDates}
                        fixedWeeks={true}
                        footer={(type==='single-with-time')?(
                            <TimePicker value={value} setValue={onChange as React.Dispatch<React.SetStateAction<Date | undefined>>} isDisabled={isDisabled}/>
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

interface _Calendar {
    type:Mode | 'single-with-time'
    value?:Date | DateRange | Date[] | undefined
    onChange?: React.Dispatch<React.SetStateAction<Date | undefined>> | React.Dispatch<React.SetStateAction<DateRange | undefined>> | React.Dispatch<React.SetStateAction<Date[] | undefined>>
    isDisabled?:boolean
    isWithTime?:boolean
    disabledDates?:validCalendarDisabledValue[]
    shape?:globalShapeType
}
export type pickModeType = "date" | 'month' | 'year'
export type validCalendarDisabledValue = Date | Date[] | DateRange
export type validCalendarValue = Date | Date[] | DateRange | undefined