import {
    eachDayOfInterval,
    eachMonthOfInterval,
    startOfMonth,
    endOfMonth,
    isSameDay,
} from "date-fns";
import type { DateRange } from "react-day-picker";

type ValidDateList = DateRange | Date | Date[];
type DisabledDates = ValidDateList[];

// Expand all disabled dates into an array of single days
function expandDisabledDates(disDates: DisabledDates): Date[] {
    const allDates: Date[] = [];

    for (const item of disDates) {
        if (item instanceof Date) {
        allDates.push(item);
        } else if (Array.isArray(item)) {
        allDates.push(...item);
        } else if ("from" in item && "to" in item && item.from && item.to) {
        allDates.push(...eachDayOfInterval({ start: item.from, end: item.to }));
        }
    }

    // Remove duplicates
    return allDates.filter(
        (date, index, self) =>
        index === self.findIndex((d) => isSameDay(d, date))
    );
}

export function getAvailMonths(disDates: DisabledDates): Date[] {
    const allDisabledDays = expandDisabledDates(disDates);
    if (allDisabledDays.length === 0) return [];

    // Find the overall min and max to check within
    const minDate = allDisabledDays.reduce((min, d) => (d < min ? d : min), allDisabledDays[0]);
    const maxDate = allDisabledDays.reduce((max, d) => (d > max ? d : max), allDisabledDays[0]);

    const months = eachMonthOfInterval({
        start: startOfMonth(minDate),
        end: startOfMonth(maxDate)
    });

    const fullyDisabledMonths: Date[] = [];

    for (const month of months) {
        const daysInMonth = eachDayOfInterval({
            start: startOfMonth(month),
            end: endOfMonth(month)
        });

        const allDaysDisabled = daysInMonth.every(day =>
            allDisabledDays.some(dis => isSameDay(dis, day))
        );

        if (allDaysDisabled) {
            fullyDisabledMonths.push(month);
        }
    }

    return fullyDisabledMonths;
}

export const pad2 = (num: number) => num.toString().padStart(2, "0"); // add 0 to time value
