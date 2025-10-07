import type { tableColumnType, tableRowDataType } from "src/components/ui/table"
import Tag from "src/components/ui/tag"

export const prevComp = {
    name:'Icon Button',
    path:'/icon-button'
}
export const nextComp = {
    name:'Input Password',
    path:'/input-password'
}

export const sections = [
    {id:'preview', txtLabel:'Input Password', isSub:false},
    {id:'api_ref', txtLabel:'API Refrence', isSub:false},
    {id:'api_ref_1', txtLabel:'InputPassword', isSub:true},
    {id:'example', txtLabel:'Example', isSub:false},
    {id:'example_0', txtLabel:'Disabled field', isSub:true},
    {id:'example_1', txtLabel:'Strong password validation', isSub:true},
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
    }
]

export const apiRefTableColumnList:tableColumnType[] = [
    {key:'prop', txtLable:'Prop', size:{min:'140px', size:'0.5fr'}},
    {key:'type', txtLable:'Type', size:{min:'220px', size:'1fr'}},
    {key:'default', txtLable:'Default', size:{min:'100px', size:'0.3fr'}},
]

export const apiRefInputPasswordList:tableRowDataType[] = []