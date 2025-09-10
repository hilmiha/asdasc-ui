export const goToNext = (
    totalSlides:number,
    canLoop:boolean,
    isAutoRunning:boolean,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    setCurrentIndex((prev)=>{
        if (prev < totalSlides - 1) {
            return (prev + 1)
        }else if (canLoop || isAutoRunning) {
            return (0)
        }else{
            return (prev)
        }
    });
}

export const goToPrevious = (
    totalSlides:number,
    canLoop:boolean,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    setCurrentIndex((prev)=>{
        if (prev > 0) {
            return (prev - 1)
        }else if (canLoop) {
            return (totalSlides - 1)
        }else{
            return (prev)
        }
    });
}

export const goToSlide = (
    newIndex:number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    setCurrentIndex(newIndex);
}