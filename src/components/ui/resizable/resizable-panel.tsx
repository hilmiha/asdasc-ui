import { useMemo, type JSX } from "react"
import { Panel } from "react-resizable-panels"

const ResizablePanel = ({
    id = undefined,
    children,
    order = undefined,
    minPanelSize = 0,
    maxPanelSize = undefined,
    defaultPanelSize = 50,
    minContentWidth = '80px',
    isOverFlow = false
}:{
    id?:string
    children:JSX.Element,
    order?:number,
    minPanelSize?:number,
    maxPanelSize?:number,
    defaultPanelSize?:number,
    minContentWidth?:string,
    isOverFlow?:boolean
}) =>{

    const isPanelGroup = useMemo(()=>{
        if(typeof children.type === 'function'){
            return true
        }else{
            return false
        }
    },[])

    if(isPanelGroup){
        return(
            <Panel id={id} minSize={minPanelSize} maxSize={maxPanelSize} defaultSize={defaultPanelSize} order={order}>
                {children}
            </Panel>
        )
    }else{
        return(
            <Panel id={id} minSize={minPanelSize} maxSize={maxPanelSize} defaultSize={defaultPanelSize}>
                <div 
                    className='resizable-panel'
                    style={{
                        overflow:(isOverFlow)?('auto'):('auto')
                    }}
                >
                    <div
                        style={{
                            minWidth:minContentWidth,
                            height:'100%'
                        }}
                    >
                        {children}
                    </div>
                </div>
            </Panel>
        )
    }
    
}

export default ResizablePanel
