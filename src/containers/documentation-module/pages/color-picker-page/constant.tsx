import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'color-picker';

export const prevComp = {
    name:'Checkbox',
    path:'/checkbox'
}
export const nextComp = {
    name:'Dropdown',
    path:'/dropdown'
}

export const sections = [
    {id:'preview', txtLabel:'Calendar', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Calendar', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Value with alpha', isSub:true},
    {id:'keyboard', txtLabel:'Keyboard Interactions', isSub:false},
]

export const keyboardInteractionsColumnList:tableColumnType[] = [
    {key:'key', txtLabel:'Key', size:{min:'100px', size:'1fr'}},
    {key:'description', txtLabel:'Description', size:{min:'400px', size:'1fr'}},
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
    {
        id:'4',
        key:<Tag txtLabel="Arrow Buttons"/>,
        description:<p>Naviagte color inside color area</p>,
    },
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLabel:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLabel:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLabel:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefColorPickerList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>className</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>value</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>onChange</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function (newValue) => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>initMode</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]