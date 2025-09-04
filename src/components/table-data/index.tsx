import clsx from 'clsx'
import './styles.scss'
import type { globalShapeType, optionItemType } from '../_types'
import { useContext, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import TableColumn from './components/table-column'
import TableFooter from './components/table-footer';
import TableDataRow from './components/table-data-row';
import { PiCheckCircleBold, PiDotsThree, PiDownloadBold, PiHourglassBold, PiPencil, PiTagBold, PiTrashBold, PiXSquareBold } from 'react-icons/pi'
import Tag from '../tag'

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
    const [columnShowList, setColumnShowList] = useState<string[]>(column.map((i)=>i.key)) 
    
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

                setColumnShowList(tampNew.map((i)=>i.key))
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
                        columnShowList={columnShowList}
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
                                columnShowList={columnShowList}
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

                        column={column}
                        setColumn={setColumn}
                        columnShowList={columnShowList}
                        setColumnShowList={setColumnShowList}
                        isColumnSwapable={isColumnSwapable}
                    />
                )
            }
            
        </div>
    )
}

export default TableData

const columnDummy: tableColumnType[] = [
    {key:'label1', txtLable:'Label 1', size:{size:'30%', min:'200px'}, isCanSort:true, horizontalAlign:'start', isDefaultSort:true},
    {key:'label2', txtLable:'Label 2', size:{size:'60%', min:'280px'}, isCanSort:false, horizontalAlign:'start'},
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
        label1: [
            'Data Row Satu',
            (<div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-50)'}}>
                <Tag txtLabel='tag-1' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-10' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-11' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
            </div>)
        ],
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '131.123',
        label4: (
            <Tag appearance='success' txtLabel='Success' iconBefore={<PiCheckCircleBold className='global-icon'/>}/>
        )
    },
    {
        id: '2',
        label1: [
            'Data Row Satu',
            (<div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-50)'}}>
                <Tag txtLabel='tag-1' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-10' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-11' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
            </div>)
        ],
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '131.123',
        label4: (
            <Tag appearance='warning' txtLabel='Pending' iconBefore={<PiHourglassBold className='global-icon'/>}/>
        )
    },
    {
        id: '3',
        label1: [
            'Data Row Satu',
            (<div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-50)'}}>
                <Tag txtLabel='tag-1' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-10' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
                <Tag txtLabel='tag-11' iconBefore={<PiTagBold className='global-icon'/>} onClick={(_, textLabel)=>{console.log(textLabel)}}/>
            </div>)
        ],
        label2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        label3: '131.123',
        label4: (
            <Tag appearance='danger' txtLabel='Canceled' iconBefore={<PiXSquareBold className='global-icon'/>}/>
        )
    },
];
