import './styles.scss'
import type { ReactNode } from "react"
import { PanelGroup } from "react-resizable-panels"

const Resizable = ({
    children,
    isSavePanelSize,
    direction,
    minHeight,
    maxHeight,
}:{
    isSavePanelSize?:boolean
    direction:'horizontal' | 'vertical',
    minHeight?:number | string,
    maxHeight?:number | string,
    children:ReactNode
}) =>{
    return(
        <PanelGroup autoSaveId={isSavePanelSize?("conditional"):(undefined)} direction={direction} className={`resizable-panel-group ${direction}`} style={{minHeight:minHeight, maxHeight:maxHeight}}>
            {children}
        </PanelGroup>
    )
}

export default Resizable