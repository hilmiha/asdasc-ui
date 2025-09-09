import clsx from 'clsx'
import './styles.scss'
import type { globalShapeType, optionItemType } from '../_types'
import { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import TableColumn from './components/table-column'
import TableFooter from './components/table-footer';
import TableDataRow from './components/table-data-row';

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

const TableData = ({
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
    isExpandable = false
}:{
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
}) =>{ 
    const {
        globalShape,
    } = useContext(GlobalContext) as _GlobalContextType

    // const [data, _] = useState<tableRowDataType[]>(dataDummy)
    
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
    const onClickExpandAll = () =>{
        if(rowExpanded.length===tableData.length || rowExpanded.length>0){
            setRowExpanded([])
        }else{
            setRowExpanded(tableData.map(i=>i.id))
        }
    }
    const onClickExpandRow = (id:string) =>{
        if(rowExpanded.includes(id)){
            setRowExpanded((prev)=>{
                return [...prev].filter(i=>i!=id)
            })
        }else{
            setRowExpanded((prev)=>{
                return [...prev, id]
            })
        }
    }
    useEffect(()=>{
        setRowExpanded([])
    },[tableConfig])
    


    const thisSelectedRow = useMemo(()=>{
        return selectedRow
    },[selectedRow])
    const selectedRowCount = useMemo(()=>{
        return selectedRow.length
    },[selectedRow])
    const columnCheckboxState = useMemo(()=>{
        if(selectedRow.length===0){
            return 0
        }else if(selectedRow.length===tableData.length){
            return 2
        }else{
            return 1
        }
    },[selectedRow])

    const thisOnClickRowCheckbox = (dataRow:tableRowDataType) =>{
        if(!onClickRowCheckbox){
            return
        }
        const id = dataRow.id
        if(thisSelectedRow.includes(dataRow.id)){
            const tamp = [...thisSelectedRow].filter(i=>i!==id)
            onClickRowCheckbox(tamp, dataRow)
        }else{
            const tamp = [...thisSelectedRow, id]
            onClickRowCheckbox(tamp, dataRow)
        }
    }
    const thisOnClickColumnCheckbox = () =>{
        if(!onClickRowCheckbox){
            return
        }
        if(columnCheckboxState===0 || columnCheckboxState===1){
            onClickRowCheckbox(tableData.map(i=>i.id))
        }else{
            onClickRowCheckbox([])
        }
    }

    return(
        <div
            className={clsx(
                'table-container',
                (shape)?(shape):(globalShape),
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

                        columnCheckboxState={columnCheckboxState}
                        onClickColumnCheckbox={thisOnClickColumnCheckbox}
                        onClickExpandAll={onClickExpandAll}
                        shape={shape}
                    />
                </table>
                <table className="table-data" style={{height:'1px'}}>
                    <tbody className='table-body'>
                        {tableData.map((rowData) => (
                            <TableDataRow
                                key={rowData.id}
                                rowData={rowData}
                                column={column}
                                columnShowList={columnShowList}
                                onClickRow={onClickRow}
                                onClickRowAction={onClickRowAction}
                                onClickRowCheckbox={thisOnClickRowCheckbox}
                                isSelected={thisSelectedRow.includes(rowData.id)}
                                isExpanded={rowExpanded.includes(rowData.id)}
                                onClickExpandButton={onClickExpandRow}
                                shape={shape}
                            />
                        ))}
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
                        shape={shape}
                    />
                )
            }
            
        </div>
    )
}

export default TableData