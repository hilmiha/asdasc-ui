import { useContext, useState, type JSX } from 'react';
import './styles.scss';
import clsx from 'clsx';
import { autoUpdate, flip, FloatingPortal, offset, shift, useDismiss, useFloating, useFocus, useHover, useInteractions } from '@floating-ui/react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
// import * as ctrl from './controller';

const Tooltip = ({
    className = undefined,
    children = <></>,
    content = ''
}:_Tooltip) =>{
    if(!content){
        return(
            <>{children}</>
        )
    }

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    //States start ====
    const [isShow, setIsShow] = useState<boolean>(false)
    //States end ====

    //FloatingUi Config ====
    const {refs, floatingStyles, context} = useFloating({
        open: isShow,
        onOpenChange: setIsShow,
        placement: 'top',
        middleware: [
            offset(4),
            shift(),
            flip({padding: 10})
        ],
        strategy: 'fixed',
        whileElementsMounted: autoUpdate,
    });
    const hover = useHover(context, { 
        move: false, 
    });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss
    ]);
    //FloatingUi Config ====

    return(
        <>
            <div 
                className={
                    clsx(
                        'tooltip',
                        className
                    )
                }
                ref={refs.setReference} 
                {...getReferenceProps()}
            >
                {
                    children
                }
            </div>
            {
                (isShow)&&(
                    <FloatingPortal>
                        <div
                            className={
                                clsx(
                                    'tooltip-content-container',
                                    globalShape
                                )
                            }
                            ref={refs.setFloating}
                            style={floatingStyles}
                            {...getFloatingProps()}
                        >
                            {
                                content
                            }
                        </div>
                    </FloatingPortal>
                    
                )
            }
        </>
    )

}

export default Tooltip

interface _Tooltip {
    className?: string
    children: JSX.Element,
    content: string | JSX.Element
}