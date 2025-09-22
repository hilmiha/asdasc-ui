import { useContext } from "react"
import { PiDotsSixVerticalBold } from "react-icons/pi"
import { PanelResizeHandle } from "react-resizable-panels"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"

const ResizableHandle = () =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    return(
        <PanelResizeHandle className="resizable-handle">
            {
                (screenSize==='mobile')&&(
                    <div className="handle-box">
                        <PiDotsSixVerticalBold className="global-icon handle-icon"/>
                    </div>
                )
            }
        </PanelResizeHandle>
    )
}

export default ResizableHandle
