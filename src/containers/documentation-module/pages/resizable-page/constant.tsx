import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'resizable';

export const prevComp = {
    name:'Radio',
    path:'/radio'
}
export const nextComp = {
    name:'Skeleton',
    path:'/skeleton'
}

export const sections = [
    {id:'preview', txtLabel:'Resizable', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Resizable', isSub:true},
    {id:'api_ref_2', txtLabel:'ResizablePanel', isSub:true},
    {id:'api_ref_3', txtLabel:'ResizableHandle', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Vertical layout', isSub:true},
    {id:'example_2', txtLabel:'Nested groups', isSub:true},
    {id:'keyboard', txtLabel:'Keyboard Interactions', isSub:false},
]

export const keyboardInteractionsColumnList:tableColumnType[] = [
    {key:'key', txtLabel:'Key', size:{min:'100px', size:'1fr'}},
    {key:'description', txtLabel:'Description', size:{min:'400px', size:'1fr'}},
]

export const keyboardInteractionsList:tableRowDataType[] = [
    {
        id:'3',
        key:<Tag txtLabel="Tab"/>,
        description:<p>Moves focus to the next focusable element.</p>,
    },
    {
        id:'4',
        key:<Tag txtLabel="Arrow Buttons"/>,
        description:<p>Move handle <span className="text-code">ResizablePanel</span>.</p>,
    },
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLabel:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLabel:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLabel:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefResizableList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>isSavePanelSize</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>direction<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>'horizontal' | 'vertical'</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>children<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>minHeight</p>,
        "type": <p style={{fontFamily:'monospace'}}>number | string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>maxHeight</p>,
        "type": <p style={{fontFamily:'monospace'}}>number | string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
]
export const apiRefResizablePanelList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>direction<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>'horizontal' | 'vertical'</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
]
export const apiRefResizableHandleList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>id</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>children<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>JSX.Element</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>order</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>minPanelSize</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>defaultPanelSize</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>minContentWidth</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>isOverFlow</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
