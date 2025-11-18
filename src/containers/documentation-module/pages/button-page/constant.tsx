import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'button';

export const prevComp = {
    name:'Bottom Sheet',
    path:'/bottom-sheet'
}
export const nextComp = {
    name:'Calendar',
    path:'/calendar'
}

export const sections = [
    {id:'preview', txtLabel:'Button', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Button', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Appearances', isSub:true},
    {id:'example_2', txtLabel:'States', isSub:true},
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
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLabel:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLabel:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLabel:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefButtonList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>ref</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`React.Ref<HTMLButtonElement>`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>id</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>className</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>style</p>,
        "type": <p style={{fontFamily:'monospace'}}>buttonStyleType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>appearance</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalAppearanceType</p>,
        "default": <p style={{fontFamily:'monospace'}}>"neutral"</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>txtLabel<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode | string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>iconBefore</p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "9",
        "prop": <p style={{fontFamily:'monospace'}}>iconAfter</p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "10",
        "prop": <p style={{fontFamily:'monospace'}}>isSelected</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>false</p>
    },
    {
        "id": "11",
        "prop": <p style={{fontFamily:'monospace'}}>isDisabled</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>false</p>
    },
    {
        "id": "12",
        "prop": <p style={{fontFamily:'monospace'}}>isLoading</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>false</p>
    },
    {
        "id": "13",
        "prop": <p style={{fontFamily:'monospace'}}>onClick</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function (event) => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "14",
        "prop": <p style={{fontFamily:'monospace'}}>tabIndex</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]