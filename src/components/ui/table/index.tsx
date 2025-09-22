import clsx from 'clsx'
import './styles.scss'
import * as ctrl from './controller';
import type { globalShapeType, optionItemType } from 'src/components/_types'
import { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import TableColumn from './components/table-column'
import TableFooter from './components/table-footer';
import TableDataRow from './components/table-data-row';
import TableDataRowLoading from './components/table-data-row-loading';

const Table = ({
    className,
    shape,

    tableData = [],
    tableColumn = [],
    tableConfig = undefined,

    onClickSortColumn = undefined,
    onSelectMaxRow = undefined,

    selectedRow = [],
    onClickRow = undefined,
    onClickRowAction = undefined,
    onClickRowCheckbox = undefined,
    onClickPagination = undefined,

    isColumnSwapable = false,
    isShowFooter = false,
    isCheckbox = false,
    isExpandable = false,
    isLoading = false,
    isFillContainer = false
}:_Table) =>{ 
    const {
        globalShape,
    } = useContext(GlobalContext) as _GlobalContextType

    const [isTableScrolled, setIsTableScrolled] = useState(false)
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const tableColumnFloatingRef = useRef<HTMLTableRowElement>(null);
    const [isColumnDragging, setIsColumnDragging] = useState(false)
    const [column, setColumn] = useState<tableColumnType[]>(tableColumn)
    const [columnShowList, setColumnShowList] = useState<string[]>(column.map((i)=>i.key)) 
    
    useEffect(()=>{
        const tampColumnKeys = column.map((i)=>i.key)
        if(isCheckbox && !tampColumnKeys.includes('#checkbox')){
            setColumn((prev)=>{
                const tampNew = [
                    {
                        key:'#checkbox',
                        size:{size:'0%', min:'23px'},
                        txtLable:''
                    },
                    ...prev
                ]

                setColumnShowList(tampNew.map((i)=>i.key))
                return tampNew
            })
        }
        if(isExpandable && !tampColumnKeys.includes('#expandable')){
            setColumn((prev)=>{
                const tampNew = [
                    {
                        key:'#expandable',
                        size:{size:'0%', min:'23px'},
                        txtLable:''
                    },
                    ...prev
                ]

                setColumnShowList(tampNew.map((i)=>i.key))
                return tampNew
            })
        }
    },[])

    const [rowExpanded, setRowExpanded] = useState<string[]>([])

    const selectedRowCount = useMemo(()=>{
        return selectedRow.length
    },[selectedRow])
    const columnCheckboxState = useMemo(()=>{
        if(selectedRow.length===0){
            return 0 //none selected
        }else if(selectedRow.length===tableData.length){
            return 2 //all selected
        }else{
            return 1 //partial selected
        }
    },[selectedRow])

    useEffect(()=>{
        setRowExpanded([])
        if(onClickRowCheckbox){
            onClickRowCheckbox([])
        }
    },[tableConfig])

    return(
        <div
            className={clsx(
                'table-container',
                (shape)?(shape):(globalShape),
                {
                    ['fill-container']:(isFillContainer)
                },
                className
            )}
        >
            <div
                className='table-box'
                ref={tableContainerRef}
                style={{
                    maxHeight:'100%',
                    overflowY:isColumnDragging?'hidden':'auto'
                }}
                onScroll={(e)=>{
                    const scrollTop = (e.target as HTMLDivElement).scrollTop
                    if(scrollTop>0){
                        setIsTableScrolled(true)
                    }else{
                        setIsTableScrolled(false)
                    }
                }}
            >
                <table className={clsx('table-header-floating')}>
                    <TableColumn
                        ref={tableColumnFloatingRef}
                        column={column}
                        setColumn={setColumn}
                        columnShowList={columnShowList}
                        tableConfig={tableConfig}
                        onClickSortColumn={onClickSortColumn}

                        setIsColumnDragging={setIsColumnDragging}
                        isColumnSwapable={isColumnSwapable}
                        isLoading={isLoading}

                        columnCheckboxState={columnCheckboxState}
                        onClickColumnCheckbox={()=>{
                            if(onClickRowCheckbox && !isLoading){
                                ctrl.onClickCheckboxAll(columnCheckboxState, tableData, onClickRowCheckbox)
                            }
                        }}
                        onClickExpandAll={()=>{
                            if(!isLoading){
                                ctrl.onClickExpandAll(tableData, setRowExpanded)
                            }
                        }}
                        shape={shape}
                    />
                </table>
                <table className="table-data" style={{height:'1px'}}>
                    <tbody className='table-body'>
                        {
                            (isLoading)?(
                                <>
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                    <TableDataRowLoading
                                        column={column}
                                        columnShowList={columnShowList} 
                                        shape={shape}
                                    />
                                </>
                            ):(
                                <>
                                    {tableData.map((rowData) => (
                                        <TableDataRow
                                            key={rowData.id}
                                            rowData={rowData}
                                            column={column}
                                            columnShowList={columnShowList}
                                            onClickRow={onClickRow}
                                            onClickRowAction={onClickRowAction}
                                            onClickRowCheckbox={(rowData)=>{
                                                if(onClickRowCheckbox){
                                                    ctrl.onClickCheckboxRow(selectedRow, rowData, onClickRowCheckbox)
                                                }
                                            }}
                                            isSelected={selectedRow.includes(rowData.id)}
                                            isExpanded={rowExpanded.includes(rowData.id)}
                                            onClickExpandButton={(id)=>{
                                                ctrl.onClickExpandRow(id, setRowExpanded)
                                            }}
                                            shape={shape}
                                        />
                                    ))}
                                </>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {
                (isShowFooter)&&(
                    <TableFooter
                        tableContainerRef={tableContainerRef}
                        tableConfig={tableConfig}
                        onSelectMaxRow={onSelectMaxRow}
                        onClickPagination={onClickPagination}
                        
                        isTableScrolled={isTableScrolled}
                        selectedRowCount={selectedRowCount}
                        column={column}
                        setColumn={setColumn}
                        columnShowList={columnShowList}
                        setColumnShowList={setColumnShowList}
                        isColumnSwapable={isColumnSwapable}
                        isLoading={isLoading}
                        shape={shape}
                    />
                )
            }
            
        </div>
    )
}

export default Table

interface _Table {
    className?:string,
    shape?:globalShapeType,

    tableData:tableRowDataType[]
    tableColumn:tableColumnType[]
    tableConfig?:tableConfigType

    onClickSortColumn?:(newSortBy:string, newIsDesc:boolean)=>void
    onSelectMaxRow?: (newMaxRow: number) => void
    onClickPagination?: (newCurrentPage:number) => void

    selectedRow?:string[]
    onClickRow?:(rowData:tableRowDataType)=>void
    onClickRowAction?:(idButton:string, rowData:tableRowDataType)=>void
    onClickRowCheckbox?:(listSelectedRow:string[], rowData?:tableRowDataType)=>void

    isColumnSwapable?:boolean
    isShowFooter?:boolean
    isCheckbox?:boolean
    isExpandable?:boolean
    isLoading?:boolean
    isFillContainer?:boolean
}

export type tableRowDataType = {
    id:string, 
    expandedPage?:JSX.Element | string
    [key:string]:any
}

export type rowActionButtonType = {
    id:string,
    type:'button'|'icon-button'|'dropdown-menu'
    txtLabel:string,
    icon?:JSX.Element,
    option?:optionItemType[]
}

export type tableColumnType = {
    key:string,
    txtLable:string,
    size:{
        size:string,
        min:string
    },
    horizontalAlign?:'start' | 'end' | 'center',
    verticalAlign?:'top' | 'bottom' | 'middle',
    isCanSort?:boolean,
    isDefaultSort?:boolean

    type?:'row-action'
    
    //for type row-action only
    actionButtonList?:rowActionButtonType[]
}

export type tableConfigType = {
    maxRow: number;
    currentPage: number;
    countPage: number;
    totalData: number;
    sortBy: string;
    isSortDesc: boolean;
}