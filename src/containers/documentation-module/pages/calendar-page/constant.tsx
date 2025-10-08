import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'calendar';

export const prevComp = {
    name:'Button',
    path:'/button'
}
export const nextComp = {
    name:'Carousel',
    path:'/carousel'
}

export const sections = [
    {id:'preview', txtLabel:'Calendar', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Calendar', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Single selection with time', isSub:true},
    {id:'example_2', txtLabel:'Multiple dates', isSub:true},
    {id:'example_3', txtLabel:'Range dates', isSub:true},
    {id:'example_4', txtLabel:'Disabling dates', isSub:true},
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
        description:<p>When focus is on an <span className="text-code">Button</span>, press and do selection for date, month or year.</p>,
    },
    {
        id:'2',
        key:<Tag txtLabel="Enter"/>,
        description:<p>When focus is on an <span className="text-code">Button</span>, press and do selection for date, month or year.</p>,
    },
    {
        id:'3',
        key:<Tag txtLabel="Tab"/>,
        description:<p>Moves focus to the next focusable element.</p>,
    },
    {
        id:'4',
        key:<Tag txtLabel="Arrow Buttons"/>,
        description:<p>Naviagte focus inside dates, months and years</p>,
    },
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLable:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLable:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLable:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefCalendarList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>type<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>calendarType</p>,
        "default": <p style={{fontFamily:'monospace'}}>'single'</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>value</p>,
        "type": <p style={{fontFamily:'monospace'}}>validCalendarValue</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>onChange</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function (newValue) => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>isDisabled</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>disabledDates</p>,
        "type": <p style={{fontFamily:'monospace'}}>validCalendarDisabledValue[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>calendarStart</p>,
        "type": <p style={{fontFamily:'monospace'}}>Date</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>calendarEnd</p>,
        "type": <p style={{fontFamily:'monospace'}}>Date</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]