import * as ctrl from './controller';
import React, { useCallback, type JSX } from "react";
import type { _Accordion } from "../accordion";

const AccordionGroup = ({
    children,
    listOpen,
    setListOpen,
    isAllowMultipleOpen = false
}:_AccordionGroup) => {
    
    const renderChildren = useCallback(() => {
        return React.Children.map(children, (child) => {
            return React.cloneElement<_Accordion>(child, {
                isOpen: listOpen.includes(child.props.id),
                onClickTrigger: (id)=>{ctrl.onClickAccordion(id, listOpen, setListOpen, isAllowMultipleOpen)}
            });
        });
    }, [listOpen])

    return(
        <>
            {
                renderChildren()
            }
        </>
    )
}

export default AccordionGroup

interface _AccordionGroup {
    children:JSX.Element[] | JSX.Element
    listOpen:string[]
    setListOpen:React.Dispatch<React.SetStateAction<string[]>>
    isAllowMultipleOpen?:boolean
}