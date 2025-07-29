import type { bottomSheetFloatingConfig, snapPointType } from "."

export const doChangeSnappoint = (
    newPoint:snapPointType,
    currentSnapPoint:snapPointType,
    setSnapPoint: React.Dispatch<React.SetStateAction<snapPointType>>,
    floatingConfig?:bottomSheetFloatingConfig,
    onClose?: () => void
) =>{
    if(floatingConfig?.isChildOpen){
        return null
    }

    setSnapPoint(newPoint)
    if(newPoint==='HIDDEN' && onClose && currentSnapPoint!=='HIDDEN'){
        onClose()
    }
}

//onBackdropclicked
export const handleBackdropClick = (
    currentSnapPoint:snapPointType,
    setSnapPoint: React.Dispatch<React.SetStateAction<snapPointType>>,
    floatingConfig?:bottomSheetFloatingConfig,
    onClose?: () => void
) => {
    if (currentSnapPoint !== 'HIDDEN') {
        doChangeSnappoint('HIDDEN', currentSnapPoint, setSnapPoint, floatingConfig, onClose);
    }
};

//Handle dragging
export const handlePointerDown = (
    e:React.PointerEvent<HTMLDivElement>,
    currentHeight: number,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDragStart: React.Dispatch<React.SetStateAction<{y: number; height: number;}>>
) => {
    setIsDragging(true);
    setDragStart({
        y: e.clientY,
        height: currentHeight
    });
    
    // Prevent text selection during drag
    e.preventDefault();
    document.body.style.userSelect = 'none';
};

export const handlePointerMove = (
    e:PointerEvent,
    isDragging:boolean,
    dragStart:{y: number;height: number;},
    setCurrentHeight: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!isDragging) return;
    
    const deltaY = dragStart.y - e.clientY;
    const windowHeight = window.innerHeight;
    const heightChange = (deltaY / windowHeight) * 100;
    const newHeight = Math.max(0, Math.min(95, dragStart.height + heightChange));
    
    setCurrentHeight(newHeight);
};

export const handlePointerUp = (
    e:PointerEvent,
    currentSnapPoint:snapPointType,
    setSnapPoint: React.Dispatch<React.SetStateAction<snapPointType>>,
    snapPointConfig:Record<snapPointType, number>,
    isDragging:boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    dragStart:{y: number;height: number;},
    onClose?:()=>void,
    floatingConfig?:bottomSheetFloatingConfig,
) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    document.body.style.userSelect = '';
    
    const deltaY = dragStart.y - e.clientY;
    const windowHeight = window.innerHeight;
    const heightChange = (deltaY / windowHeight) * 100;
    const finalHeight = dragStart.height + heightChange;

    // Determine closest snap point
    let closestSnapPoint:snapPointType = 'HIDDEN';
    let minDistance = Math.abs(finalHeight - snapPointConfig.HIDDEN);

    Object.entries(snapPointConfig).forEach(([point, height]) => {
        const distance = Math.abs(finalHeight - height);
        if (distance < minDistance) {
            minDistance = distance;
            closestSnapPoint = point as snapPointType;
        }
    });
    
    // Consider drag velocity for better UX
    const velocity = Math.abs(deltaY);
    if (velocity > 100) {
        if (deltaY > 0) {
            // Fast upward drag
            if (finalHeight > 30) {
                closestSnapPoint = 'FULL';
            } else {
                closestSnapPoint = 'HALF';
            }
        } else {
            // Fast downward drag
            if (finalHeight < 20) {
                closestSnapPoint = 'HIDDEN';
            } else {
                closestSnapPoint = 'HALF';
            }
        }
    }
    doChangeSnappoint(closestSnapPoint, currentSnapPoint, setSnapPoint, floatingConfig, onClose);
};

//Content touch drag
export const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    setTouchStart:React.Dispatch<React.SetStateAction<{y: number; scrollTop: number;} | null>>,

) => {
    const touch = e.touches[0];
    const element = e.currentTarget;
    setTouchStart({
        y: touch.clientY,
        scrollTop: element.scrollTop
    });
};

export const onTouchMove = (
    e:React.TouchEvent<HTMLDivElement>,
    touchStart:{y: number; scrollTop: number;} | null,
    setTouchStart:React.Dispatch<React.SetStateAction<{y: number; scrollTop: number;} | null>>,
    currentSnapPoint:snapPointType,
    setSnapPoint: React.Dispatch<React.SetStateAction<snapPointType>>,
    floatingConfig?:bottomSheetFloatingConfig,
    onClose?: () => void
) =>{
    if(!touchStart){
        return
    }
    const element = e.currentTarget;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const isScrollable = scrollHeight > clientHeight;
    const isAtTop = scrollTop === 0
    // const hasScrolledPercent = scrollTop >= scrollHeight * 0.4;

    const touch = e.touches[0];
    const deltaY = touchStart.y - touch.clientY;
    
    if (Math.abs(deltaY) > 30) { // Minimum drag distance
        if (deltaY > 0) {
            // Drag up - expand
            // if(isScrollable && !hasScrolledPercent){
            //     return
            // }

            if (currentSnapPoint === 'HALF') {
                doChangeSnappoint('FULL', currentSnapPoint, setSnapPoint, floatingConfig, onClose);
            }
        } else if (deltaY < 0) {
            // Drag down - collapse

            if(isScrollable && !isAtTop){
                return
            }
            if (currentSnapPoint === 'FULL') {
                doChangeSnappoint('HALF', currentSnapPoint, setSnapPoint, floatingConfig, onClose);
            } else if (currentSnapPoint === 'HALF') {
                doChangeSnappoint('HIDDEN', currentSnapPoint, setSnapPoint, floatingConfig, onClose);
            }
        }

        setTouchStart(null);
    }
}