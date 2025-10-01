import { useContext, useEffect, useRef, useState } from 'react';
import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import IconButton from '../icon-button';
import { PiCaretLeftBold, PiCaretRightBold, PiPauseFill, PiPlayFill } from 'react-icons/pi';
import type { globalShapeType } from 'src/components/_types';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';

const Carousel = ({
    className,
    shape,
    height,
    isAutoRunning = true,
    autoRunInterval = 5000,
    canLoop = true,
    indicatorPosition = 'center',
    children
}: _Carausel) => {
    const { globalShape } = useContext(GlobalContext) as _GlobalContextType;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const totalSlides = children.length;

    const progressRef = useRef(0);              // progress value (0–100)
    const barRef = useRef<HTMLDivElement>(null); // DOM ref for indicator bar
    const rafRef = useRef<number>(0);

    const canGoPrevious = currentIndex > 0 || canLoop;
    const canGoNext = currentIndex < totalSlides - 1 || canLoop;

    // animation loop for progress bar
    useEffect(() => {
        if (!isAutoRunning || isPaused) return;

        let lastTime = performance.now();

        const tick = (now: number) => {
            const delta = now - lastTime;
            lastTime = now;

            progressRef.current += (delta / autoRunInterval) * 100;

            if (progressRef.current >= 100) {
                progressRef.current = 0;
                ctrl.goToNext(totalSlides, canLoop, isAutoRunning, setCurrentIndex);
            }

            // update DOM directly, no React re-render
            if (barRef.current) {
                barRef.current.style.width = `${progressRef.current}%`;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isAutoRunning, isPaused, autoRunInterval, totalSlides, canLoop]);

    // reset progress when index changes manually
    useEffect(() => {
        progressRef.current = 0;
        if (barRef.current) barRef.current.style.width = `0%`;
    }, [currentIndex]);

    return (
        <div
            className={clsx(
                'carousel-box',
                (shape)?(shape):(globalShape),
                className
            )}
            style={{
                justifyContent:indicatorPosition
            }}
        >
            <div className='main-carousel'>
                <div
                    className='carousel-container'
                    style={{ 
                        transform: `translateX(-${currentIndex * 100}%)`,
                        height: `${height ?? '420px'}`
                    }}
                >
                    {children}
                </div>
            </div>
            <div className='button-carousel-box'>
                <IconButton
                    className='nex-prev-button'
                    icon={<PiCaretLeftBold className='global-icon'/>}
                    txtLabel='Prev.'
                    appearance='subtle'
                    onClick={() => {
                        ctrl.goToPrevious(totalSlides, canLoop, setCurrentIndex);
                    }}
                    isDisabled={!canGoPrevious}
                />
                <div className="indicator-box">
                    {children.map((_, index) => (
                        <button
                            tabIndex={-1}
                            key={index}
                            onClick={() => {
                                ctrl.goToSlide(index, setCurrentIndex);
                            }}
                            className={clsx(
                                'indicator-button',
                                { ['selected']: index === currentIndex }
                            )}
                        >
                            {index === currentIndex && isAutoRunning && (
                                <div className="time-indicator" ref={barRef} />
                            )}
                        </button>
                    ))}
                    {isAutoRunning && (
                        <IconButton
                            className='play-pause-button'
                            icon={(isPaused)?(<PiPlayFill size={12}/>):(<PiPauseFill size={12}/>)}
                            txtLabel={isPaused ? 'Play' : 'Pause'}
                            appearance='subtle'
                            onClick={() => setIsPaused(!isPaused)}
                            isDisabled={!canGoNext}
                        />
                    )}
                </div>
                <IconButton
                    className='nex-prev-button'
                    icon={<PiCaretRightBold className='global-icon'/>}
                    txtLabel='Next'
                    appearance='subtle'
                    onClick={() => {
                        ctrl.goToNext(totalSlides, canLoop, isAutoRunning, setCurrentIndex);
                    }}
                    isDisabled={!canGoNext}
                />
            </div>
        </div>
    );
};

export default Carousel;

interface _Carausel {
    className?: string;
    shape?: globalShapeType;
    height?: string;
    isAutoRunning?: boolean;
    autoRunInterval?: number;
    canLoop?: boolean;
    indicatorPosition?: 'start' | 'end' | 'center';
    children: React.ReactNode[];
}
