import { useContext, useEffect, useState } from 'react';
import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import IconButton from '../icon-button';
import { PiCaretLeftBold, PiCaretRightBold, PiPauseFill, PiPlayFill } from 'react-icons/pi';
import type { globalShapeType } from '../_types';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';

const Carousel = ({
    className,
    shape,
    height,
    isAutoRunning = true,
    autoRunInterval = 5000,
    canLoop = true,
    indicatorPosition = 'center',
    children
}:_Carausel) =>{
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    
    const [isPaused, setIsPaused] = useState(false);

    const totalSlides = children.length;

    const canGoPrevious = currentIndex > 0 || canLoop;
    const canGoNext = currentIndex < totalSlides - 1 || canLoop;

    // Auto-run functionality
    useEffect(() => {
        if (!isAutoRunning || isPaused) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (100 / (autoRunInterval / 100));
                if (newProgress >= 100) {
                    ctrl.goToNext(totalSlides, canLoop, isAutoRunning, setCurrentIndex);
                    return 0;
                }
                return newProgress;
            });
        }, 100);

        return () => {
            clearInterval(progressInterval);
        };
    }, [isAutoRunning, isPaused, autoRunInterval]);

    return(
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
            <div
                className='main-carousel'
            >
                <div
                    className='carousel-container'
                    style={{ 
                        transform: `translateX(-${currentIndex * 100}%)`,
                        height: `${height??'420px'}`
                    }}
                >
                    {
                        children.map((child, idx)=>(
                            <div key={idx} className='carousel-child-box'>
                                {child}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div
                className='button-carousel-box'
            >
                
                <IconButton
                    className='nex-prev-button'
                    icon={<PiCaretLeftBold className='global-icon'/>}
                    txtLabel='Prev.'
                    appearance='subtle'
                    onClick={()=>{
                        ctrl.goToPrevious(totalSlides, canLoop, setCurrentIndex)
                        setProgress(0)
                    }}
                    isDisabled={!canGoPrevious}
                />
                <div className="indicator-box">
                    {children.map((_, index) => (
                        <button
                            tabIndex={-1}
                            key={index}
                            onClick={() => {
                                ctrl.goToSlide(index, setCurrentIndex)
                                setProgress(0)
                            }}
                            className={clsx(
                                'indicator-button',
                                {
                                    ['selected']:(index === currentIndex)
                                }
                            )}
                        >
                            {index === currentIndex && isAutoRunning &&(
                                <div 
                                    className="time-indicator"
                                    style={{ width: `${progress}%` }}
                                />
                            )}
                        </button>
                    ))}
                    {
                        isAutoRunning&&(
                            <IconButton
                                className='play-pause-button'
                                icon={isPaused?(<PiPlayFill size={12}/>):(<PiPauseFill size={12}/>)}
                                txtLabel={isPaused?('Play'):('Pause')}
                                appearance='subtle'
                                onClick={()=>{
                                    setIsPaused(!isPaused)
                                }}
                                isDisabled={!canGoNext}
                            />
                        )
                    }
                    
                </div>
                
                <IconButton
                    className='nex-prev-button'
                    icon={<PiCaretRightBold className='global-icon'/>}
                    txtLabel='Next'
                    appearance='subtle'
                    onClick={()=>{
                        ctrl.goToNext(totalSlides, canLoop, isAutoRunning, setCurrentIndex)
                        setProgress(0)
                    }}
                    isDisabled={!canGoNext}
                />
            </div>
        </div>
    )
}

export default Carousel

interface _Carausel {
    className?:string,
    shape?:globalShapeType
    height?:string
    isAutoRunning?: boolean;
    autoRunInterval?: number;
    canLoop?: boolean;
    indicatorPosition?:'start'|'end'|'center'
    children: React.ReactNode[];
}