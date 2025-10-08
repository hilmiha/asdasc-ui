import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'dropdown';

export const prevComp = {
    name:'Checkbox',
    path:'/checkbox'
}
export const nextComp = {
    name:'Dropdown Menu',
    path:'/dropdown-menu'
}

export const sections = [
    {id:'preview', txtLabel:'Dropdown', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Dropdown', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Custom trigger', isSub:true},
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

export const apiRefDropdownList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>className</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>trigger</p>,
        "type": <>
            <p style={{fontFamily:'monospace'}}>JSX.Element | </p>
            <p style={{fontFamily:'monospace'}}>{`funtion (triggerRef, getReferenceProps, isDropdownOpen, trigger) => JSX.Element`} </p>
        </>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>style</p>,
        "type": <p style={{fontFamily:'monospace'}}>dropdownStyleType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>isDisabled</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>onOpen</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function () => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>onClose</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function () => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>elementHeader</p>,
        "type": <p style={{fontFamily:'monospace'}}>JSX.Element</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "9",
        "prop": <p style={{fontFamily:'monospace'}}>elementFooter</p>,
        "type": <p style={{fontFamily:'monospace'}}>JSX.Element</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "10",
        "prop": <p style={{fontFamily:'monospace'}}>children</p>,
        "type": <p style={{fontFamily:'monospace'}}>JSX.Element | JSX.Element[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "11",
        "prop": <p style={{fontFamily:'monospace'}}>triggerClose</p>,
        "type": <p style={{fontFamily:'monospace'}}>1|0</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "12",
        "prop": <p style={{fontFamily:'monospace'}}>floatingConfig</p>,
        "type": <p style={{fontFamily:'monospace'}}>dropdownFloatingConfigType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]