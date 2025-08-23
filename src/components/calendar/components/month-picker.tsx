import { useDayPicker } from "react-day-picker";
import type { optionItemType } from "../../_types";
import Button from "../../button";
import { useEffect, useMemo, useRef, useState } from "react";

const MonthPicker = ({
    onClick,
    calendarStartValue,
    calendarEndValue,
}:{
    onClick:(id:string)=>void
    calendarStartValue:Date
    calendarEndValue:Date
}) =>{
    const monthOption:optionItemType[] = [
        { id: '1', txtLabel: 'January' },
        { id: '2', txtLabel: 'February' },
        { id: '3', txtLabel: 'March' },
        { id: '4', txtLabel: 'April' },
        { id: '5', txtLabel: 'May' },
        { id: '6', txtLabel: 'June' },
        { id: '7', txtLabel: 'July' },
        { id: '8', txtLabel: 'August' },
        { id: '9', txtLabel: 'September' },
        { id: '10', txtLabel: 'October' },
        { id: '11', txtLabel: 'November' },
        { id: '12', txtLabel: 'December' }
    ];
    const {
        months,
    } = useDayPicker()
    const selected = months[0].date

    const availableMonth = useMemo(()=>{
        let filteredMonths: optionItemType[] = [];
        const selectedYear = selected.getFullYear()
        const startYear = calendarStartValue?.getFullYear()
        const endYear= calendarEndValue?.getFullYear()
        const startMonth = calendarStartValue
        const endMonth = calendarEndValue

        if (selectedYear < startYear || selectedYear > endYear) {
            // No months available
            filteredMonths = [];
        } else if (selectedYear === startYear && selectedYear === endYear) {
            // Both start and end in the same year
            filteredMonths = monthOption.filter(
                (m) => +m.id >= startMonth.getMonth() + 1 && +m.id <= endMonth.getMonth() + 1
            );
        } else if (selectedYear === startYear) {
            // Starting year: filter from start month to December
            filteredMonths = monthOption.filter((m) => +m.id >= startMonth.getMonth() + 1);
        } else if (selectedYear === endYear) {
            // Ending year: filter from January to end month
            filteredMonths = monthOption.filter((m) => +m.id <= endMonth.getMonth() + 1);
        } else {
            // Full year between start and end
            filteredMonths = monthOption;
        }

        return(filteredMonths);
    },[])

    const isTodayYear = new Date().getFullYear() == selected.getFullYear()
    const todayMonth = new Date().getMonth()+1;

	const selectedRef = useRef<HTMLButtonElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [focusIndex, setFocusIndex] = useState(
        availableMonth.findIndex((y) => y.id === String(selected.getMonth() + 1))
    );

    // scroll to keep selected centered
	useEffect(() => {
		if (selectedRef.current) {
			const parent = selectedRef.current.parentElement;
			if (parent) {
				parent.scrollTop =
				selectedRef.current.offsetTop -
				parent.clientHeight / 2 +
				selectedRef.current.clientHeight / 2;
			}

			// ensure selected button is focused on mount
			// selectedRef.current.focus();
		}
	}, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
		e.preventDefault();

		const cols = 1;
		let newIndex = focusIndex;

		if (e.key === "ArrowRight") newIndex = Math.min(focusIndex + 1, availableMonth.length - 1);
		if (e.key === "ArrowLeft") newIndex = Math.max(focusIndex - 1, 0);
		if (e.key === "ArrowDown") newIndex = Math.min(focusIndex + cols, availableMonth.length - 1);
		if (e.key === "ArrowUp") newIndex = Math.max(focusIndex - cols, 0);

		setFocusIndex(newIndex);

		const btns = containerRef.current?.querySelectorAll<HTMLButtonElement>(".month-button");
		btns?.[newIndex]?.focus();
	};

    return(
        <div 
			ref={containerRef}
            className="month-picker-box"
			onKeyDown={handleKeyDown}
        >
            {
                availableMonth.map((i, idx)=>{
                    const isSelected = `${selected.getMonth() + 1}`===i.id;
                    return(
                        <Button
                            ref={isSelected ? selectedRef : null}
                            tabIndex={isSelected ? 0 : -1} // only selected is tabbable
                            className={`month-button ${todayMonth.toString()===i.id&&isTodayYear?('today'):('')}`}
                            key={i.id}
                            txtLabel={i.txtLabel}
                            onClick={()=>{
                                setFocusIndex(idx);
                                onClick(i.id)
                            }}
                            appearance={isSelected?('primary'):('subtle')}
                        />
                    )
                })
            }
        </div>
    )
}

export default MonthPicker