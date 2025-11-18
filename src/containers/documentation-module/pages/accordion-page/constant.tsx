import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'accordion';

export const prevComp = {
    name:'Colors',
    path:'/colors'
}
export const nextComp = {
    name:'Bottom Sheet',
    path:'/bottom-sheet'
}

export const sections = [
    {id:'preview', txtLabel:'Accordion', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'AccordionGroup', isSub:true},
    {id:'api_ref_2', txtLabel:'Accordion', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Allow multiple items open at the same time', isSub:true},
    {id:'example_2', txtLabel:'Accordion as individual component', isSub:true},
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
        description:<p>When focus is on an <span className="text-code">Accordion</span> of a collapsed section, expands the section.</p>,
    },
    {
        id:'2',
        key:<Tag txtLabel="Enter"/>,
        description:<p>When focus is on an <span className="text-code">Accordion</span> of a collapsed section, expands the section.</p>,
    },
    {
        id:'3',
        key:<Tag txtLabel="Tab"/>,
        description:<p>Moves focus to the next focusable element.</p>,
    },
    {
        id:'4',
        key:<div style={{display:'flex', alignItems:"center", gap:'var(--space-50)'}}><Tag txtLabel="Shift"/> + <Tag txtLabel="Tab"/> </div>,
        description:<p>Moves focus to the next previous element.</p>,
    },
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLabel:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLabel:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLabel:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefAccordionGroupList:tableRowDataType[] = [
    {
        id:'1',
        prop:<p style={{fontFamily:'monospace'}}>{`listOpen`} <span style={{color:"var(--clr-danger-700)"}}>*</span></p>,
        type:<p style={{fontFamily:'monospace'}}>{`string[]`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`-`}</p>,
    },
    {
        id:'2',
        prop:<p style={{fontFamily:'monospace'}}>{`setListOpen`} <span style={{color:"var(--clr-danger-700)"}}>*</span></p>,
        type:<p style={{fontFamily:'monospace'}}>{`setState of string[]`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`-`}</p>,
    },
    {
        id:'3',
        prop:<p style={{fontFamily:'monospace'}}>{`isAllowMultipleOpen`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`boolean`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`false`}</p>,
    }
]

export const apiRefAccordionList:tableRowDataType[] = [
    {
        id:'1',
        prop:<p style={{fontFamily:'monospace'}}>{`id`} <span style={{color:"var(--clr-danger-700)"}}>*</span></p>,
        type:<p style={{fontFamily:'monospace'}}>{`string`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`-`}</p>,
    },
    {
        id:'2',
        prop:<p style={{fontFamily:'monospace'}}>{`isOpen`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`boolean`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`false`}</p>,
    },
    {
        id:'3',
        prop:<p style={{fontFamily:'monospace'}}>{`onClickTrigger`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`function (id:string) => void`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'4',
        prop:<p style={{fontFamily:'monospace'}}>{`className`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`string`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'5',
        prop:<p style={{fontFamily:'monospace'}}>{`onOpen`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`function (id:string) => void`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'6',
        prop:<p style={{fontFamily:'monospace'}}>{`onClose`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`function (id:string) => void`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'7',
        prop:<p style={{fontFamily:'monospace'}}>{`isDisabled`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`boolean`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'8',
        prop:<p style={{fontFamily:'monospace'}}>{`txtLabel`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`string`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'9',
        prop:<p style={{fontFamily:'monospace'}}>{`iconBefore`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`React.ReactNode`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'10',
        prop:<p style={{fontFamily:'monospace'}}>{`children`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`React.ReactNode`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'11',
        prop:<p style={{fontFamily:'monospace'}}>{`maxHeightContent`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`string | number`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'12',
        prop:<p style={{fontFamily:'monospace'}}>{`style`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`accordionStyleType`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    },
    {
        id:'13',
        prop:<p style={{fontFamily:'monospace'}}>{`shape`}</p>,
        type:<p style={{fontFamily:'monospace'}}>{`globalShapeType`}</p>,
        default:<p style={{fontFamily:'monospace'}}>{`undefined`}</p>,
    }
]