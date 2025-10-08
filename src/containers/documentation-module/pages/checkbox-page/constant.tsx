import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const pageId = 'checkbox';

export const prevComp = {
    name:'Carousel',
    path:'/carousel'
}
export const nextComp = {
    name:'Dropdown',
    path:'/dropdown'
}

export const sections = [
    {id:'preview', txtLabel:'Checkbox', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'Checkbox', isSub:true},
    {id:'api_ref_2', txtLabel:'CheckBoxButton', isSub:true},
    {id:'api_ref_3', txtLabel:'CheckboxGroup', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_1', txtLabel:'Checkbox as an indicator only', isSub:true},
    {id:'example_2', txtLabel:'Controlled group of checkboxes', isSub:true},
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
        description:<p>When focus is on an <span className="text-code">CheckboxButton</span>, press and do the <span className="text-code">onClick</span> function.</p>,
    },
    {
        id:'2',
        key:<Tag txtLabel="Enter"/>,
        description:<p>When focus is on an <span className="text-code">CheckboxButton</span>, press and do the <span className="text-code">onClick</span> function.</p>,
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

export const apiRefCheckboxList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>isSelected<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>isIndeterminate<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
export const apiRefCheckboxButtonList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>className</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>style</p>,
        "type": <p style={{fontFamily:'monospace'}}>buttonStyleType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>shape</p>,
        "type": <p style={{fontFamily:'monospace'}}>globalShapeType</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>appearance</p>,
        "type": <p style={{fontFamily:'monospace'}}>checkboxButtonAppearance</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>txtLabel</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "6",
        "prop": <p style={{fontFamily:'monospace'}}>txtSublabel</p>,
        "type": <p style={{fontFamily:'monospace'}}>string</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "7",
        "prop": <p style={{fontFamily:'monospace'}}>icon</p>,
        "type": <p style={{fontFamily:'monospace'}}>JSX.Element</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "8",
        "prop": <p style={{fontFamily:'monospace'}}>isSelected<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "9",
        "prop": <p style={{fontFamily:'monospace'}}>onClick</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function (newValue, event) => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "10",
        "prop": <p style={{fontFamily:'monospace'}}>isDisabled</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "11",
        "prop": <p style={{fontFamily:'monospace'}}>isIndeterminate</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
export const apiRefCheckboxGroupList:tableRowDataType[] = [
    {
        "id": "1",
        "prop": <p style={{fontFamily:'monospace'}}>options<span style={{color:"var(--clr-danger-700)"}}> *</span></p>,
        "type": <p style={{fontFamily:'monospace'}}>optionItemType[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "2",
        "prop": <p style={{fontFamily:'monospace'}}>selectedList</p>,
        "type": <p style={{fontFamily:'monospace'}}>string[]</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "3",
        "prop": <p style={{fontFamily:'monospace'}}>isDisabled</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "4",
        "prop": <p style={{fontFamily:'monospace'}}>isDefaultCollapse</p>,
        "type": <p style={{fontFamily:'monospace'}}>boolean</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    },
    {
        "id": "5",
        "prop": <p style={{fontFamily:'monospace'}}>onChange</p>,
        "type": <p style={{fontFamily:'monospace'}}>{`function (checkedLeafIds: string[]) => void`}</p>,
        "default": <p style={{fontFamily:'monospace'}}>undefined</p>
    }
]
