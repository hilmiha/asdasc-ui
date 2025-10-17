import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'modal';

export const prevComp = {
    name:'Input Textarea',
    path:'/input-textarea'
}
export const nextComp = {
    name:'Radio',
    path:'/radio'
}

export const sections = [
    {id:'preview', txtLabel:'Modal', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Modal', isSub:true},
    {id:'api_ref_2', txtLabel:'modalFloatingConfig', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Disabling dismis by click outside, x close button, and Esc key', isSub:true},
    {id:'keyboard', txtLabel:'Keyboard Interactions', isSub:false},
]

export const keyboardInteractionsColumnList:tableColumnType[] = [
    {key:'key', txtLable:'Key', size:{min:'100px', size:'1fr'}},
    {key:'description', txtLable:'Description', size:{min:'400px', size:'1fr'}},
]

export const keyboardInteractionsList:tableRowDataType[] = [
    {
        id:'1',
        key:<Tag txtLabel="Space"/>,
        description:<p>When focus is on an <span className="text-code">Button</span>, press and do the <span className="text-code">onClick</span> function.</p>,
    },
    {
        id:'2',
        key:<Tag txtLabel="Enter"/>,
        description:<p>When focus is on an <span className="text-code">Button</span>, press and do the <span className="text-code">onClick</span> function.</p>,
    },
    {
        id:'3',
        key:<Tag txtLabel="Tab"/>,
        description:<p>Moves focus to the next focusable element.</p>,
    },
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLable:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLable:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLable:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefModalList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>isOpen</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>setIsOpen</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`setState of boolean`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>txtTitle</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>iconTitle</p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>className</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>style</p>,
        "type": <p style={{fontFamily:'monospace'}}>modalStyleType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>size</p>,
        "type": <p style={{fontFamily:'monospace'}}>modalSizeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "9",
        "prop": <p style={{fontFamily:'monospace'}}>onOpen</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function () => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "10",
        "prop": <p style={{fontFamily:'monospace'}}>onClose</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function () => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "11",
        "prop": <p style={{fontFamily:'monospace'}}>elementHeader</p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "12",
        "prop": <p style={{fontFamily:'monospace'}}>elementFooter</p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "13",
        "prop": <p style={{fontFamily:'monospace'}}>children<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "14",
        "prop": <p style={{fontFamily:'monospace'}}>floatingConfig</p>,
        "type": <p style={{fontFamily:'monospace'}}>modalFloatingConfigType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]

export const apiRefModalFloatingConfigList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>isChildOpen</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>isDisableDismiss</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>level</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]