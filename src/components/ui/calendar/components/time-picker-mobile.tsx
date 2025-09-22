import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PiClockBold } from "react-icons/pi";
import type { optionItemType } from "src/components/_types";
import { pad2 } from "src/helper/calendar-helper";
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import clsx from "clsx";
import { debounce } from "lodash";

const TimePickerMobile = ({
    value,
    setValue,
    isDisabled
}:{
    value: Date | undefined;
    setValue?: React.Dispatch<React.SetStateAction<Date | undefined>>;
    isDisabled?:boolean
}) =>{
    const date = useMemo(() => {
        return value ?? new Date(0, 0, 0, 0, 0, 0);
    }, [value]);

    // raw editing states
    const [hourRaw, setHourRaw] = useState<string>(`${date.getHours()}`);
    const [minuteRaw, setMinuteRaw] = useState<string>(`${date.getMinutes()}`);
    const [secondRaw, setSecondRaw] = useState<string>(`${date.getSeconds()}`);

    // sync with external date when value changes outside
    useMemo(() => {
        setHourRaw(`${date.getHours()}`);
        setMinuteRaw(`${date.getMinutes()}`);
        setSecondRaw(`${date.getSeconds()}`);
    }, [date]);

    const listHours = useMemo<optionItemType[]>(
        () => {
            return Array.from({ length: 24 }, (_, i) => ({
                id: String(i),
                txtLabel: pad2(i),
            }))
        },
        []
    );
    const listMinutes = useMemo<optionItemType[]>(
        () => {
            return Array.from({ length: 60 }, (_, i) => ({
                id: String(i),
                txtLabel: pad2(i),
            }))
        },
        []
    );
    const listSeconds = useMemo<optionItemType[]>(
        () => {
            return Array.from({ length: 60 }, (_, i) => ({
                id: String(i),
                txtLabel: pad2(i),
            }))
        },
        []
    );
    // const listAmPm = useMemo<optionItemType[]>(
    //     () => {
    //         return([
    //             {id:'am', txtLabel:'AM'},
    //             {id:'pm', txtLabel:'PM'}
    //         ])
    //     },
    //     []
    // );

    const clamp = (num: number, max: number) => {
        return Math.min(Math.max(num, 0), max);
    }
    
    const onChangeValue = (part: "hour" | "minute" | "second", raw: string) =>{

        let num = parseInt(raw, 10);
        if (isNaN(num)) num = 0;

        let clamped = 0;
        if (part === "hour") {
            clamped = clamp(num, 23)
        }
        if (part === "minute" || part === "second") {
            clamped = clamp(num, 59);
        }

        const newDate = new Date(date);
        if (part === "hour") {
            newDate.setHours(clamped);
        }
        if (part === "minute") {
            newDate.setMinutes(clamped);
        }
        if (part === "second") {
            newDate.setSeconds(clamped);
        }

        if(setValue){
            setValue(newDate);
        }
    }

    return(
        <div className="time-picker-wheel-box"> {/* dthe class already have flex and gap */}
            <div className="icon-box">
                <PiClockBold className="global-icon"/>
            </div>
            <ScrollWheel
                options={listHours}
                value={hourRaw}
                onChange={(newValue)=>{onChangeValue('hour', newValue)}}
                isDisabled={isDisabled?(isDisabled):(!value)}
            />
            <ScrollWheel
                options={listMinutes}
                value={minuteRaw}
                onChange={(newValue)=>{onChangeValue('minute', newValue)}}
                isDisabled={isDisabled?(isDisabled):(!value)}
            />
            <ScrollWheel
                options={listSeconds}
                value={secondRaw}
                onChange={(newValue)=>{onChangeValue('second', newValue)}}
                isDisabled={isDisabled?(isDisabled):(!value)}
            />
            {/* <ScrollWheel
                options={listAmPm}
            /> */}
        </div>
    )
}

export default TimePickerMobile



interface ScrollWheelProps {
    options: optionItemType[];
    value?: string;
    onChange?: (value: string, index: number) => void;
    height?: number;
    itemHeight?: number;
    isDisabled?:boolean
}

const ScrollWheel: React.FC<ScrollWheelProps> = ({
    options,
    value,
    onChange,
    height = 34*3,
    itemHeight = 34,
    isDisabled = false
}) => {
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);
    const scrollTimeout = useRef<number | undefined>(undefined);

    // Initialize selected index based on value prop
    useEffect(() => {
        if (value) {
            const index = options.findIndex((i)=>i.id===value);
            if (index >= 0) {
                setSelectedIndex(index);
            }
        }
    }, [value, options]);

    // Scroll to selected index
    useEffect(() => {
        if (containerRef.current && !isScrolling.current) {
            const scrollTop = selectedIndex * itemHeight;
            containerRef.current.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    }, [selectedIndex, itemHeight]);

    const debouncedOnChange = useCallback(
        debounce((newValue:string, index:number) => {
            if (onChange) {
                onChange(newValue, index);
            }
        }, 300),
    [onChange]);

    const handleScroll = () => {
        if(isDisabled){
            return
        }

        if (!containerRef.current){
            return
        }

        isScrolling.current = true;
            
        // Clear previous timeout
        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        // Set a timeout to detect when scrolling stops
        scrollTimeout.current = setTimeout(() => {
            if (!containerRef.current) return;
            
            const scrollTop = containerRef.current.scrollTop;
            const newIndex = Math.round(scrollTop / itemHeight);
            const clampedIndex = Math.max(0, Math.min(newIndex, options.length - 1));
            
            setSelectedIndex(clampedIndex);
            
            // Snap to the correct position
            containerRef.current.scrollTo({
                top: clampedIndex * itemHeight,
                behavior: 'smooth'
            });
            
            // Call onChange callback
            if (onChange) {
                debouncedOnChange(options[clampedIndex].id, clampedIndex);
            }
            
            isScrolling.current = false;
        }, 150);
    };

    const handleItemClick = (index: number) => {
        setSelectedIndex(index);
        if (onChange) {
            onChange(options[index].id, index);
        }
    };

    return (
        <div 
            className={clsx(
                "scroll-wheel-container",
                globalShape,
                {
                    ['disabled']:(isDisabled)
                }
            )}
        >
            {/* Selection indicator */}
            <div 
                className="selection-indicator"
                style={{ 
                    top: itemHeight * 1,
                    height: itemHeight 
                }}
            />
        
            {/* Scrollable content */}
            <div
                ref={containerRef}
                className="scroll-content"
                style={{ height }}
                onScroll={!isDisabled?handleScroll:undefined}
            >
                {/* Padding at top and bottom to center items */}
                <div style={{ height: itemHeight * 1 }} />
                
                {options.map((option, index) => (
                    <div
                        key={option.id}
                        className={`scroll-item ${index === selectedIndex ? 'selected' : ''}`}
                        style={{ height: itemHeight }}
                        onClick={() => handleItemClick(index)}
                    >
                        {option.txtLabel}
                    </div>
                ))}

                {/* Padding at top and bottom to center items */}
                <div style={{ height: itemHeight * 1 }} />
            </div>
        </div>
    );
};