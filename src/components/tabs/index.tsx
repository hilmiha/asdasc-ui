import './styles.scss'
import clsx from "clsx"
import type { globalShapeType } from "../_types"
import { useContext, type JSX } from "react"
import { GlobalContext, type _GlobalContextType } from "../../context/global-context"
import Button, { type buttonStyleType } from "../button"

export type tabItem = {id:string, txtLabel:string, iconBefore?:JSX.Element, iconAfter?:JSX.Element, isDisabled?:boolean}
const Tabs = ({
    className = undefined,
    shape = undefined,
    appearance = 'detached',
    style = undefined,
    tabItem = [],
    selectedItem = '',
    onClickTabItem = undefined
}:_Tabs) =>{
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    return(
        <div
            className={clsx(
                'tabs-box',
                appearance,
                (shape)?(shape):(globalShape),

                className
            )}
        >
            {
                tabItem.map((i)=>(
                    <Button
                        shape={shape}
                        className="tabs-item-button"
                        appearance={appearance==='detached'?('subtle'):('subtle')}
                        txtLabel={i.txtLabel}
                        isSelected={i.id===selectedItem}
                        isDisabled={i.isDisabled}
                        iconBefore={i.iconBefore}
                        iconAfter={i.iconAfter}
                        onClick={()=>{
                            if(onClickTabItem){
                                onClickTabItem(i.id)
                            }
                        }}
                        style={style}
                    />
                ))
            }
        </div>
    )
}

export default Tabs

interface _Tabs {
    className?:string,
    shape?:globalShapeType,
    appearance?:'detached' | 'flush',
    style?:buttonStyleType,
    tabItem:tabItem[],
    selectedItem:string,
    onClickTabItem?:(id:string)=>void
}