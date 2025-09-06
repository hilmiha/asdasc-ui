import { PiArrowDownBold, PiArrowsDownUpBold, PiArrowUpBold, PiDotsSixVerticalBold } from "react-icons/pi"
import type { tableColumnType, tableConfigType } from ".."
import IconButton from "../../icon-button"
import { useContext, useEffect } from "react"
import Sortable, { Swap } from "sortablejs"
import CheckboxButton from "../../checkbox-button"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import type { globalShapeType } from "../../_types"

if (!(window as any)._swapMounted) {
    Sortable.mount(new Swap());
    (window as any)._swapMounted = true;
}

const TableColumn = ({
    ref,
    column,
    setColumn,
    columnShowList,
    tableConfig,
    onClickSortColumn,
    setIsColumnDragging,
    isColumnSwapable,

    columnCheckboxState,
    thisOnClickColumnCheckbox,
    shape
}:{
    ref:React.RefObject<HTMLTableRowElement | null>
    column:tableColumnType[]
    setColumn:React.Dispatch<React.SetStateAction<tableColumnType[]>>
    columnShowList:string[]
    tableConfig?:tableConfigType
    onClickSortColumn?:(newSortBy:string, newIsDesc:boolean)=>void
    setIsColumnDragging:React.Dispatch<React.SetStateAction<boolean>>,
    isColumnSwapable:boolean

    columnCheckboxState:number,
    thisOnClickColumnCheckbox:()=>void
    shape?:globalShapeType
}) =>{

    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    useEffect(() => {
        if(!isColumnSwapable) return;
        if (!ref.current) return;

        const sortable = Sortable.create(ref.current, {
            animation: 150,
            swap: true, // enable swap
            swapClass: 'highlight-swap',
            chosenClass:'highlight-drag',
            handle: '.drag-handle',
            onChoose:()=>{
                setIsColumnDragging(true)
            },
            onUnchoose:()=>{
                setIsColumnDragging(false)
            },
            onEnd: (evt) => {
                const newItems = [...column];
                const itemToOldIndex = newItems[evt.newIndex!]
                const itemToNewIndex = newItems[evt.oldIndex!]
                newItems[evt.newIndex!] = itemToNewIndex
                newItems[evt.oldIndex!] = itemToOldIndex
                setColumn(newItems);
            },
            onMove: (evt) => {
                const related = evt.related; // element being swapped with
                if (related.classList.contains('no-swap')) {
                    return false; // Cancel move
                }

                return true; // allow otherwise
            },
        });

        return () => {
            sortable.destroy();
        };
    }, [JSON.stringify(column), isColumnSwapable, ref.current]);

    return(
        <thead className='table-header'>
            <tr
                ref={ref}
            >
                {column.map((headerData) => (
                    <th
                        className={headerData.key==='#checkbox'?'no-swap':undefined}
                        key={headerData.key}
                        style={{
                            width: headerData.size.size,
                            minWidth: headerData.size.min,
                            paddingLeft:headerData.key==='#checkbox'?('var(--space-150)'):(undefined),
                            paddingRight:headerData.key==='#checkbox'?('var(--space-150)'):(undefined),
                            display:(!columnShowList.includes(headerData.key))?('none'):(undefined)
                        }}
                    >
                        <div className='cell-header'>
                            {
                                (isColumnSwapable && headerData.key!=='#checkbox' && screenSize!=="mobile")&&(
                                    <div className='drag-handle'>
                                        <PiDotsSixVerticalBold className='global-icon' size={18}/>
                                    </div>
                                )
                            }
                            {
                                (headerData.key==='#checkbox')&&(
                                    <div className="table-action-box interactive-box">
                                        <CheckboxButton
                                            className="table-checkbox-button"
                                            isSelected={columnCheckboxState===2}
                                            isIndeterminate={columnCheckboxState===1}
                                            onClick={thisOnClickColumnCheckbox}
                                            shape={shape}
                                        />
                                    </div>
                                )
                            }
                            {headerData.txtLable}
                            {
                                (
                                    tableConfig &&
                                    onClickSortColumn &&
                                    headerData.isCanSort &&
                                    headerData.type!=='row-action'
                                )&&(
                                    <div style={{flexGrow:'1', display:'flex', justifyContent:'end'}}>
                                        <IconButton
                                            className='sort-button'
                                            icon={tableConfig.sortBy===headerData.key?(tableConfig.isSortDesc?(<PiArrowUpBold className='global-icon'/>):(<PiArrowDownBold className='global-icon'/>)):(<PiArrowsDownUpBold className='global-icon'/>)}
                                            appearance='subtle'
                                            shape={shape}
                                            txtLabel={tableConfig.sortBy===headerData.key?((tableConfig.isSortDesc)?('Chnage Sort To Asc'):('Change Sort To Des')):('Sort Asc')}
                                            isSelected={tableConfig.sortBy===headerData.key}
                                            onClick={()=>{
                                                let newSortBy = headerData.key
                                                let newIsDesc = false
                                                if(tableConfig.sortBy===headerData.key){
                                                    newIsDesc = !tableConfig.isSortDesc
                                                }
                                                onClickSortColumn(newSortBy, newIsDesc)
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export default TableColumn