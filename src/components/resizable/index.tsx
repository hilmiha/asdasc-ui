import './styles.scss'
import type { ReactNode } from "react"
import { PanelGroup } from "react-resizable-panels"

const Resizable = ({
    children,
    isSavePanelSize,
    direction,
}:{
    isSavePanelSize?:boolean
    direction:'horizontal' | 'vertical',
    children:ReactNode
}) =>{
    return(
        <PanelGroup autoSaveId={isSavePanelSize?("conditional"):(undefined)} direction={direction} className={`resizable-panel-group ${direction}`}>
            {children}
        </PanelGroup>
    )
}

export default Resizable