import { useDayPicker } from "react-day-picker";
import type { optionItemType } from "src/components/_types";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";

const YearPicker = ({
	onClick,
    calendarStartValue,
    calendarEndValue
}: {
	onClick: (id: string) => void;
	calendarStartValue:Date
    calendarEndValue:Date
}) => {
	function generateYearOptionsForMonth(
		selectedMonth: Date
	): optionItemType[] {
		const monthIndex = selectedMonth.getMonth(); // 0 = January
		const fromYear = calendarStartValue.getFullYear();
		const toYear = calendarEndValue.getFullYear();

		const years: optionItemType[] = [];

		for (let y = fromYear; y <= toYear; y++) {
			const isStartYear = y === fromYear;
			const isEndYear = y === toYear;

			let isDisabled = false;

			if (isStartYear && monthIndex < calendarStartValue.getMonth()) {
				isDisabled = true;
			}
			if (isEndYear && monthIndex > calendarEndValue.getMonth()) {
				isDisabled = true;
			}

			years.push({
				id: String(y),
				txtLabel: String(y),
				isDisabled,
			});
		}

		return years;
	}

	const { 
		months 
	} = useDayPicker();
	const selected = months[0].date;
	const years = generateYearOptionsForMonth(selected);

    const todayYear = new Date().getFullYear()

	const selectedRef = useRef<HTMLButtonElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);


	const [focusIndex, setFocusIndex] = useState(
		years.findIndex((y) => y.id === String(selected.getFullYear()))
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

  	// handle arrow navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
		e.preventDefault();

		const cols = 1;
		let newIndex = focusIndex;

		if (e.key === "ArrowRight") newIndex = Math.min(focusIndex + 1, years.length - 1);
		if (e.key === "ArrowLeft") newIndex = Math.max(focusIndex - 1, 0);
		if (e.key === "ArrowDown") newIndex = Math.min(focusIndex + cols, years.length - 1);
		if (e.key === "ArrowUp") newIndex = Math.max(focusIndex - cols, 0);

		setFocusIndex(newIndex);

		const btns = containerRef.current?.querySelectorAll<HTMLButtonElement>(".year-button");
		btns?.[newIndex]?.focus();
	};

	return (
		<div
			ref={containerRef}
			className="year-picker-box"
			onKeyDown={handleKeyDown}
		>
			{years.map((i, idx) => {
				const isSelected = `${selected.getFullYear()}` === i.id;
				return (
					<Button
						ref={isSelected ? selectedRef : null}
						tabIndex={isSelected ? 0 : -1} // only selected is tabbable
						className={`year-button ${todayYear.toString()===i.id?('today'):('')}`}
						key={i.id}
						txtLabel={i.txtLabel}
						onClick={() => {
							setFocusIndex(idx);
							onClick(i.id);
						}}
						appearance={isSelected ? "primary" : "subtle"}
						isDisabled={i.isDisabled}
					/>
				);
			})}
		</div>
	);
};

export default YearPicker;
