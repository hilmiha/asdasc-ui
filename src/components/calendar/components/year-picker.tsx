import { useDayPicker } from "react-day-picker";
import type { optionItemType } from "../../_types";
import Button from "../../button";
import { useEffect, useRef, useState } from "react";

const YearPicker = ({
	onClick,
}: {
	onClick: (id: string) => void;
}) => {
	function generateYearOptions(range?: { from: Date; to: Date }): optionItemType[] {
		const now = new Date();
		const from = range?.from ?? new Date(now.getFullYear() - 100, 0, 1);
		const to = range?.to ?? new Date(now.getFullYear() + 5, 11, 31);

		const years: optionItemType[] = [];
		for (let y = from.getFullYear(); y <= to.getFullYear(); y++) {
			years.push({
				id: String(y),
				txtLabel: String(y),
			});
		}

		return years;
	}


	const years = generateYearOptions();
	const { 
		months 
	} = useDayPicker();
	const selected = months[0].date;
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
					/>
				);
			})}
		</div>
	);
};

export default YearPicker;
