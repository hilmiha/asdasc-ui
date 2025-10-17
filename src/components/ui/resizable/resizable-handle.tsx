import type { Direction } from "node_modules/react-resizable-panels/dist/declarations/src/types"
import { useContext } from "react"
import { PiDotsSixBold, PiDotsSixVerticalBold } from "react-icons/pi"
import { PanelResizeHandle } from "react-resizable-panels"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"

const ResizableHandle = ({
    direction
}:{
    direction:Direction
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    return(
        <PanelResizeHandle className="resizable-handle">
            {
                (screenSize==='mobile')&&(
                    <div className="handle-box">
                        {
                            (direction==="horizontal")?(
                                <PiDotsSixVerticalBold size={12} className="handle-icon"/>
                            ):(
                                <PiDotsSixBold size={12} className="handle-icon"/>
                            )
                        }
                    </div>
                )
            }
        </PanelResizeHandle>
    )
}

export default ResizableHandle
