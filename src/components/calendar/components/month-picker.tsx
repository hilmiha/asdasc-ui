import { useDayPicker } from "react-day-picker";
import type { optionItemType } from "../../_types";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";

const MonthPicker = ({
    onClick
}:{
    onClick:(id:string)=>void
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
        months
    } = useDayPicker()
    const selected = months[0].date

	const selectedRef = useRef<HTMLButtonElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [focusIndex, setFocusIndex] = useState(
        monthOption.findIndex((y) => y.id === String(selected.getMonth() + 1))
    );

    useEffect(() => {
        if (selectedRef.current) {
			// ensure selected button is focused on mount
            selectedRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
		e.preventDefault();

		const cols = 2;
		let newIndex = focusIndex;

		if (e.key === "ArrowRight") newIndex = Math.min(focusIndex + 1, monthOption.length - 1);
		if (e.key === "ArrowLeft") newIndex = Math.max(focusIndex - 1, 0);
		if (e.key === "ArrowDown") newIndex = Math.min(focusIndex + cols, monthOption.length - 1);
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
                monthOption.map((i, idx)=>{
                    const isSelected = `${selected.getMonth() + 1}`===i.id;
                    return(
                        <Button
                            ref={isSelected ? selectedRef : null}
                            tabIndex={isSelected ? 0 : -1} // only selected is tabbable
                            className="month-button"
                            key={i.id}
                            txtLabel={i.txtLabel}
                            onClick={()=>{
                                setFocusIndex(idx);
                                onClick(i.id)
                            }}
                            appearance={isSelected?('primary'):('neutral')}
                        />
                    )
                })
            }
        </div>
    )
}

export default MonthPicker