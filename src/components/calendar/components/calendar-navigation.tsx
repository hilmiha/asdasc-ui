import { useDayPicker } from "react-day-picker"
import Button from "../../button"
import { addMonths, format, subMonths } from "date-fns"
import IconButton from "../../icon-button"
import { PiCalendarBlankBold, PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import type { pickModeType } from ".."

const CalendarNavigation = ({
    pickMode,
    setPickMode
}:{
    pickMode:pickModeType
    setPickMode:React.Dispatch<React.SetStateAction<pickModeType>>
}) =>{
    const {
        goToMonth,
        months
    } = useDayPicker()

    return(
        <div
            className="cal-nav-box"
        >
            <div className="month-year-box">
                <Button
                    txtLabel={format(months[0].date, 'MMMM')}
                    isSelected={pickMode==='month'}
                    onClick={()=>{
                        setPickMode((prev)=>{
                            if(prev==='month'){
                                return 'date'
                            }else{
                                return 'month'
                            }
                        })
                    }}
                />
                <Button
                    txtLabel={format(months[0].date, 'yyyy')}
                    isSelected={pickMode==='year'}
                    onClick={()=>{
                        setPickMode((prev)=>{
                            if(prev==='year'){
                                return 'date'
                            }else{
                                return 'year'
                            }
                        })
                    }}
                />
            </div>
            
            <div className="next-prev-box">
                {
                    pickMode!=='date'&&(
                        <IconButton
                            icon={<PiCalendarBlankBold className="global-icon"/>}
                            txtLabel="back to date view"
                            isShowtooltip={false}
                            onClick={()=>{
                                setPickMode('date')
                            }}
                        />
                    )
                }
                {
                    pickMode==='date'&&(
                        <IconButton
                            icon={<PiCaretLeftBold className="global-icon"/>}
                            txtLabel="previous month"
                            isShowtooltip={false}
                            onClick={()=>{goToMonth(subMonths(months[0].date, 1))}}
                        />
                    )
                }
                
                {
                    pickMode==='date'&&(
                        <IconButton
                            icon={<PiCaretRightBold className="global-icon"/>}
                            txtLabel="next month"
                            isShowtooltip={false}
                            onClick={()=>{goToMonth(addMonths(months[0].date, 1))}}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default CalendarNavigation