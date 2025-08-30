import clsx from 'clsx'
import './styles.scss'
import type { globalShapeType, optionItemType } from '../_types'
import { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import TableColumn from './components/table-column'
import TableFooter from './components/table-footer';
import TableDataRow from './components/table-data-row';
import { PiDotsThree, PiDownloadBold, PiPencil, PiTrashBold } from 'react-icons/pi'

export type tableRowDataType = {
    id:string, 
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

const TableData = ({
    className,
    shape,
    onClickRow = undefined,
    onClickRowAction = undefined,
    
    selectedRow = [],
    onClickRowCheckbox = undefined,

    isColumnSwapable = false,
    isShowFooter = false,
    isCheckbox = false
}:{
    className?:string,
    shape?:globalShapeType,
    selectedRow?:string[]
    onClickRow?:(rowData:tableRowDataType)=>void
    onClickRowAction?:(idButton:string, rowData:tableRowDataType)=>void
    onClickRowCheckbox?:(listSelectedRow:string[], rowData?:tableRowDataType)=>void

    isColumnSwapable?:boolean
    isShowFooter?:boolean
    isCheckbox?:boolean
}) =>{ 
    const {
        globalShape,
    } = useContext(GlobalContext) as _GlobalContextType

    const [data, _] = useState<tableRowDataType[]>(dataDummy)
    
    const [isTableScrolled, setIsTableScrolled] = useState(false)
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const tableColumnFloatingRef = useRef<HTMLTableRowElement>(null);
    const [isColumnDragging, setIsColumnDragging] = useState(false)
    const [column, setColumn] = useState<tableColumnType[]>(columnDummy)
    
    useEffect(()=>{
        if(isCheckbox){
            setColumn((prev)=>{
                const tampNew = [
                    {
                        key:'#checkbox',
                        size:{size:'0%', min:'23px'},
                        txtLable:''
                    },
                    ...prev
                ]
                return tampNew
            })
        }
    },[])

    const defaultSort = useMemo(()=>{
        const tamp = column.find(i=>i.isDefaultSort)
        if(tamp){
            return tamp.key
        }else{
            return('')
        }
    },[])

    const [sortBy, setSortBy] = useState(defaultSort)
    const [isSortDesc, setIsSortDesc] = useState(false)
    const [maxRow, setMaxRow] = useState('10')

    const thisSelectedRow = useMemo(()=>{
        return selectedRow
    },[selectedRow])
    const columnCheckboxState = useMemo(()=>{
        if(selectedRow.length===0){
            return 0
        }else if(selectedRow.length===data.length){
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
            onClickRowCheckbox(data.map(i=>i.id))
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
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        isSortDesc={isSortDesc}
                        setIsSortDesc={setIsSortDesc}
                        setIsColumnDragging={setIsColumnDragging}
                        isColumnSwapable={isColumnSwapable}

                        columnCheckboxState={columnCheckboxState}
                        thisOnClickColumnCheckbox={thisOnClickColumnCheckbox}
                    />
                </table>
                <table className="table-data">
                    <tbody className='table-body'>
                        {data.map((rowData) => (
                            <TableDataRow
                                key={rowData.id}
                                rowData={rowData}
                                column={column}
                                onClickRow={onClickRow}
                                onClickRowAction={onClickRowAction}
                                onClickRowCheckbox={thisOnClickRowCheckbox}
                                isSelected={thisSelectedRow.includes(rowData.id)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {
                (isShowFooter)&&(
                    <TableFooter
                        tableContainerRef={tableContainerRef}
                        maxRow={maxRow}
                        setMaxRow={setMaxRow}
                        isTableScrolled={isTableScrolled}
                    />
                )
            }
            
        </div>
    )
}

export default TableData

const columnDummy: tableColumnType[] = [
    {key:'label1', txtLable:'Label 1', size:{size:'10%', min:'120px'}, isCanSort:true, horizontalAlign:'start', isDefaultSort:true},
    {key:'label2', txtLable:'Label 2', size:{size:'40%', min:'420px'}, isCanSort:false, horizontalAlign:'start'},
    {key:'label3', txtLable:'Label 3', size:{size:'10%', min:'120px'}, isCanSort:true, horizontalAlign:'end'},
    {key:'label4', txtLable:'Label 4', size:{size:'10%', min:'120px'}, isCanSort:true, horizontalAlign:'start'},
    {key:'action', type:'row-action', txtLable:'Action', size:{size:'0%', min:'144px'}, horizontalAlign:'center', actionButtonList:[
        {id:"edit", type:'button', txtLabel:'Edit', icon:<PiPencil className='global-icon'/>},
        {id:"delete", type:'icon-button', txtLabel:'Delete', icon:<PiTrashBold className='global-icon'/>},
        {
            id:"option", 
            type:'dropdown-menu', 
            txtLabel:'Option', 
            icon:<PiDotsThree className='global-icon'/>, 
            option:[
                {
                    id:"download-csv", 
                    txtLabel:"Download as CSV", 
                    icon:<PiDownloadBold className='global-icon'/>,
                },
                {
                    id:"download-xlsx", 
                    txtLabel:"Download as XLSX", 
                    icon:<PiDownloadBold className='global-icon'/>
                }
            ]
        },
    ]},
]

const dataDummy: tableRowDataType[] = [
    {
        id: '1',
        label1: 'hello-1',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '131.123',
        label4: 'world-1'
    },
    {
        id: '2',
        label1: 'hello-2',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '300.549',
        label4: 'world-2'
    },
    {
        id: '3',
        label1: 'hello-3',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '982.341',
        label4: 'world-3'
    },
    {
        id: '4',
        label1: 'hello-4',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '55.672',
        label4: 'world-4'
    },
    {
        id: '5',
        label1: 'hello-5',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '640.897',
        label4: 'world-5'
    },
    {
        id: '6',
        label1: 'hello-6',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '754.320',
        label4: 'world-6'
    },
    {
        id: '7',
        label1: 'hello-7',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '128.421',
        label4: 'world-7'
    },
    {
        id: '8',
        label1: 'hello-8',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '999.432',
        label4: 'world-8'
    },
    {
        id: '9',
        label1: 'hello-9',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '437.912',
        label4: 'world-9'
    },
    {
        id: '10',
        label1: 'hello-10',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '847.120',
        label4: 'world-10'
    },
    {
        id: '11',
        label1: 'hello-11',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '431.123',
        label4: 'world-11'
    },
    {
        id: '12',
        label1: 'hello-12',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '222.786',
        label4: 'world-12'
    },
    {
        id: '13',
        label1: 'hello-13',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '567.874',
        label4: 'world-13'
    },
    {
        id: '14',
        label1: 'hello-14',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '784.342',
        label4: 'world-14'
    },
    {
        id: '15',
        label1: 'hello-15',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '345.001',
        label4: 'world-15'
    },
    {
        id: '16',
        label1: 'hello-16',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '120.876',
        label4: 'world-16'
    },
    {
        id: '17',
        label1: 'hello-17',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '654.987',
        label4: 'world-17'
    },
    {
        id: '18',
        label1: 'hello-18',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '189.765',
        label4: 'world-18'
    },
    {
        id: '19',
        label1: 'hello-19',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '999.876',
        label4: 'world-19'
    },
    {
        id: '20',
        label1: 'hello-20',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '210.987',
        label4: 'world-20'
    },
    {
        id: '21',
        label1: 'hello-21',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '501.230',
        label4: 'world-21'
    },
    {
        id: '22',
        label1: 'hello-22',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '672.432',
        label4: 'world-22'
    },
    {
        id: '23',
        label1: 'hello-23',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '789.567',
        label4: 'world-23'
    },
    {
        id: '24',
        label1: 'hello-24',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '980.123',
        label4: 'world-24'
    },
    {
        id: '25',
        label1: 'hello-25',
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '320.777',
        label4: 'world-25'
    }
];
