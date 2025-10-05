import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const prevComp = {
    name:'Calendar',
    path:'/calendar'
}
export const nextComp = {
    name:'Checkbox',
    path:'/checkbox'
}

export const sections = [
    {id:'preview', txtLabel:'Carousel', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Carousel', isSub:true},
    {id:'api_ref_2', txtLabel:'CarouselChild', isSub:true},
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

export const apiRefCarouselList:tableRowDataType[] = [
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
        "prop": <p style={{fontFamily:'monospace'}}>height</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>isAutoRunning</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>true</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>autoRunInterval</p>,
        "type": <p style={{fontFamily:'monospace'}}>number</p>,
        "default": <p style={{fontFamily:'monospace'}}>5000</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>canLoop</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>true</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>indicatorPosition</p>,
        "type": <p style={{fontFamily:'monospace'}}>'start' | 'end' | 'center'</p>,
        "default": <p style={{fontFamily:'monospace'}}>"center"</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>children<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
export const apiRefCarouselChildList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>children<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>React.ReactNode[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
