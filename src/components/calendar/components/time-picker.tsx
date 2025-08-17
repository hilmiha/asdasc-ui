import { useMemo, useState } from "react";
import InputText from "../../input-text";
import { PiClockBold } from "react-icons/pi";
import { pad2 } from "../../../helper/calendar-helper";

const TimePicker = ({
    value,
    setValue,
    isDisabled
}: {
    value: Date | undefined;
    setValue: React.Dispatch<React.SetStateAction<Date | undefined>>;
    isDisabled?:boolean
}) => {
    const date = useMemo(() => {
        return value ?? new Date(0, 0, 0, 0, 0, 0);
    }, [value]);

    // raw editing states
    const [hourRaw, setHourRaw] = useState<string>(pad2(date.getHours()));
    const [minuteRaw, setMinuteRaw] = useState<string>(pad2(date.getMinutes()));
    const [secondRaw, setSecondRaw] = useState<string>(pad2(date.getSeconds()));

    // sync with external date when value changes outside
    useMemo(() => {
        setHourRaw(pad2(date.getHours()));
        setMinuteRaw(pad2(date.getMinutes()));
        setSecondRaw(pad2(date.getSeconds()));
    }, [date]);

    const clamp = (num: number, max: number) =>
        Math.min(Math.max(num, 0), max);

    const handleBlur = (part: "hour" | "minute" | "second", raw: string) => {
        let num = parseInt(raw, 10);
        if (isNaN(num)) num = 0;

        let clamped = 0;
        if (part === "hour") clamped = clamp(num, 23);
        if (part === "minute" || part === "second") clamped = clamp(num, 59);

        const newDate = new Date(date);
        if (part === "hour") newDate.setHours(clamped);
        if (part === "minute") newDate.setMinutes(clamped);
        if (part === "second") newDate.setSeconds(clamped);

        setValue(newDate);

        // set back padded string
        if (part === "hour") setHourRaw(pad2(clamped));
        if (part === "minute") setMinuteRaw(pad2(clamped));
        if (part === "second") setSecondRaw(pad2(clamped));
    };

    return (
        <div className="time-picker-box">
            {/* Hours */}
            <div className="icon-box">
                <PiClockBold className="global-icon"/>
            </div>
            <InputText
                className="input-time"
                type="number-text"
                value={hourRaw}
                onChange={(newValue) => {
                    if (/^\d*$/.test(newValue)) setHourRaw(newValue);
                }}
                onBlur={(_, val) => handleBlur("hour", val)}
                isDisabled={isDisabled?isDisabled:!value}
                config={{
                    maxLength: 2,
                    isHideClear: true,
                }}
            />

            {/* Minutes */}
            <InputText
                className="input-time"
                type="number-text"
                value={minuteRaw}
                onChange={(newValue) => {
                    if (/^\d*$/.test(newValue)) setMinuteRaw(newValue);
                }}
                onBlur={(_, val) => handleBlur("minute", val)}
                isDisabled={isDisabled?isDisabled:!value}
                config={{
                    maxLength: 2,
                    isHideClear: true,
                }}
            />

            {/* Seconds */}
            <InputText
                className="input-time"
                type="number-text"
                value={secondRaw}
                onChange={(newValue) => {
                    if (/^\d*$/.test(newValue)) setSecondRaw(newValue);
                }}
                onBlur={(_, val) => handleBlur("second", val)}
                isDisabled={isDisabled?isDisabled:!value}
                config={{
                    maxLength: 2,
                    isHideClear: true,
                }}
            />
        </div>
    );
};

export default TimePicker;
