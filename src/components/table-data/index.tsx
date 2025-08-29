import clsx from 'clsx'
import './styles.scss'
import type { globalShapeType } from '../_types'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import Sortable, { Swap }from 'sortablejs';
import { PiArrowDownBold, PiArrowsDownUpBold, PiArrowUp, PiArrowUpBold, PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold, PiDotsSixVerticalBold, PiRowsBold } from 'react-icons/pi'
import IconButton from '../icon-button'
import DropdownMenu from '../dropdown-menu'
import Button from '../button'


if (!(window as any)._swapMounted) {
    Sortable.mount(new Swap());
    (window as any)._swapMounted = true;
}

export type tableRowData = {
    id:string, 
    [key:string]:any
}

const TableData = ({
    className,
    shape,
    onClickRow = undefined,

    isColumnSwapable = false,
    isShowFooter = false,
}:{
    className?:string,
    shape?:globalShapeType,
    onClickRow?:(rowData:tableRowData)=>void

    isColumnSwapable?:boolean
    isShowFooter?:boolean
}) =>{ 
    const {
        globalShape,
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    const isCanClickRow = useMemo(()=>{
        if(onClickRow!==undefined){
            return true
        }else{
            return false
        }
    },[])
    const thisOnMouseClickRow = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, rowData:tableRowData) =>{
        if (!isCanClickRow) return;

        // 1. Ignore if user selected text
        const selectedText = window.getSelection()?.toString().trim();
        if (selectedText) return;

        // 2. Ignore if click happened inside an interactive element
        const target = e.target as HTMLElement;
        if (
            target.closest('.interactive-box')
        ) {
            return;
        }
        console.log(rowData);
    }
    const thisOnKeyDownClickRow = (e: React.KeyboardEvent<HTMLTableRowElement>, rowData:tableRowData) =>{
        if (!isCanClickRow) return;

        // 1. Ignore if user selected text
        const selectedText = window.getSelection()?.toString().trim();
        if (selectedText) return;

        // 2. Ignore if click happened inside an interactive element
        const target = e.target as HTMLElement;
        if (
            target.closest('.interactive-box')
        ) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log(rowData);
        }
    }

    const [data, _] = useState<tableRowData[]>(dataDummy)
    const [column, setColumn] = useState([
        {key:'label1', txtLable:'Label 1', size:{size:'5%', min:'120px'}, isCanSort:true, verticalAlign:'start', isDefaultSort:true},
        {key:'label2', txtLable:'Label 2', size:{size:'50%', min:'420px'}, isCanSort:false, verticalAlign:'start'},
        {key:'label3', txtLable:'Label 3', size:{size:'25%', min:'120px'}, isCanSort:true, verticalAlign:'end'},
        {key:'label4', txtLable:'Label 4', size:{size:'15%', min:'120px'}, isCanSort:true, verticalAlign:'start'},
    ])
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

    const [isShowFloatingHeader, setIsShowFloatingHeader] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const tableColumnRef = useRef<HTMLTableRowElement>(null);
    const tableColumnFloatingRef = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if(!isColumnSwapable) return;
        if (!tableColumnRef.current) return;
        if (!tableColumnFloatingRef.current) return;

        const sortable = Sortable.create(tableColumnRef.current, {
            animation: 150,
            swap: true, // enable swap
            swapClass: 'highlight-swap',
            chosenClass:'highlight-drag',
            handle: '.drag-handle',
            onChoose:()=>{
                setIsDragging(true)
            },
            onUnchoose:()=>{
                setIsDragging(false)
            },
            onEnd: (evt) => {
                const newItems = [...column];
                const itemToOldIndex = newItems[evt.newIndex!]
                const itemToNewIndex = newItems[evt.oldIndex!]
                newItems[evt.newIndex!] = itemToNewIndex
                newItems[evt.oldIndex!] = itemToOldIndex
                setColumn(newItems);
            },
        });
        const sortableFloating = Sortable.create(tableColumnFloatingRef.current, {
            animation: 150,
            swap: true, // enable swap
            swapClass: 'highlight-swap',
            chosenClass:'highlight-drag',
            handle: '.drag-handle-floating',
            onChoose:()=>{
                setIsDragging(true)
            },
            onUnchoose:()=>{
                setIsDragging(false)
            },
            onEnd: (evt) => {
                const newItems = [...column];
                const itemToOldIndex = newItems[evt.newIndex!]
                const itemToNewIndex = newItems[evt.oldIndex!]
                newItems[evt.newIndex!] = itemToNewIndex
                newItems[evt.oldIndex!] = itemToOldIndex
                setColumn(newItems);
            },
        });

        return () => {
            sortable.destroy();
            sortableFloating.destroy();
        };
    }, [JSON.stringify(column), isColumnSwapable]);

    
    return(
        <div
            ref={tableContainerRef}
            className={clsx(
                'table-container',
                (shape)?(shape):(globalShape),
                className
            )}
            style={{
                maxHeight:'100%',
                overflowY:isDragging?'hidden':'auto'
            }}
            onScroll={(e)=>{
                const scrollTop = (e.target as HTMLDivElement).scrollTop
                if(scrollTop>50){
                    setIsShowFloatingHeader(true)
                }else{
                    setIsShowFloatingHeader(false)
                }
            }}
        >
            <table className={clsx('table-header-floating', {['floating-header-show']:(isShowFloatingHeader)})}>
                <thead className='table-header'>
                    <tr
                        ref={tableColumnFloatingRef}
                    >
                        {column.map((headerData) => (
                            <th
                                key={headerData.key}
                                style={{
                                    width: headerData.size.size,
                                    minWidth: headerData.size.min,
                                }}
                            >
                                <div className='cell-header'>
                                    <div className='drag-handle-floating'>
                                        <PiDotsSixVerticalBold className='global-icon' size={18}/>
                                    </div>
                                    {headerData.txtLable}
                                    {
                                        (headerData.isCanSort)&&(
                                            <div style={{flexGrow:'1', display:'flex', justifyContent:'end'}}>
                                                <IconButton
                                                    className='sort-button'
                                                    icon={sortBy===headerData.key?(isSortDesc?(<PiArrowDownBold className='global-icon'/>):(<PiArrowUpBold className='global-icon'/>)):(<PiArrowsDownUpBold className='global-icon'/>)}
                                                    appearance='subtle'
                                                    txtLabel='Sort'
                                                    isShowtooltip={false}
                                                    onClick={()=>{
                                                        setSortBy(headerData.key)
                                                        if(sortBy===headerData.key){
                                                            setIsSortDesc(!isSortDesc)
                                                        }else{
                                                            setIsSortDesc(false)
                                                        }
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
            </table>
            <table className="table">
                <thead className='table-header'>
                    <tr 
                        ref={tableColumnRef}
                    >
                        {column.map((headerData) => (
                            <th
                                key={headerData.key}
                                style={{
                                    width: headerData.size.size,
                                    minWidth: headerData.size.min,
                                }}
                            >
                                <div className='cell-header'>
                                    {
                                        isColumnSwapable&&(
                                            <div className='drag-handle'>
                                                <PiDotsSixVerticalBold className='global-icon' size={18}/>
                                            </div>
                                        )
                                    }
                                    {headerData.txtLable}
                                    {
                                        (headerData.isCanSort)&&(
                                            <div style={{flexGrow:'1', display:'flex', justifyContent:'end'}}>
                                                <IconButton
                                                    className='sort-button'
                                                    icon={sortBy===headerData.key?(isSortDesc?(<PiArrowDownBold className='global-icon'/>):(<PiArrowUpBold className='global-icon'/>)):(<PiArrowsDownUpBold className='global-icon'/>)}
                                                    appearance='subtle'
                                                    txtLabel='Sort'
                                                    isShowtooltip={false}
                                                    onClick={()=>{
                                                        setSortBy(headerData.key)
                                                        if(sortBy===headerData.key){
                                                            setIsSortDesc(!isSortDesc)
                                                        }else{
                                                            setIsSortDesc(false)
                                                        }
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
                <tbody className='table-body'>
                    {data.map((rowData) => (
                        <tr 
                            className={clsx({
                                ['row-clickable']:(isCanClickRow)
                            })}
                            key={rowData.id} 
                            role='button' 
                            tabIndex={isCanClickRow?0:-1} 
                            onKeyDown={(e) => {thisOnKeyDownClickRow(e, rowData)}}
                            onClick={(e) => {thisOnMouseClickRow(e, rowData)}}
                        >
                            {column.map((headerData) => (
                                <td
                                    key={headerData.key}
                                    style={{
                                        width: headerData.size.size,
                                        minWidth: headerData.size.min,
                                        textAlign: headerData.verticalAlign==='center'?('start'):(headerData.verticalAlign==='end')?('end'):('start')
                                    }}
                                >
                                    {rowData[headerData.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                (isShowFooter)&&(
                    <div
                        className='table-footer-floating'
                        style={{
                            gridTemplateColumns:screenSize==='laptop'?('1fr 1fr 1fr'):('1fr max-content')
                        }}
                    >
                        {
                            (screenSize==='laptop')&&(
                                <div className='footer-left'>
                                    <p>Showing 1-25 of 25 items</p>
                                </div>
                            )
                        }
                        <div 
                            className='footer-pagination'
                            style={{
                                justifyContent:screenSize==='laptop'?('center'):('start')
                            }}
                        >
                            <IconButton
                                icon={<PiCaretDoubleLeftBold className='global-icon'/>}
                                txtLabel='First Page'
                                appearance='subtle'
                            />
                            <IconButton
                                icon={<PiCaretLeftBold className='global-icon'/>}
                                txtLabel='Previous Page'
                                appearance='subtle'
                            />
                            <p className='page-info-box'>Page 1 / 1</p>
                            <IconButton
                                icon={<PiCaretRightBold className='global-icon'/>}
                                txtLabel='Next Page'
                                appearance='subtle'
                            />
                            <IconButton
                                icon={<PiCaretDoubleRightBold className='global-icon'/>}
                                txtLabel='Last Page'
                                appearance='subtle'
                            />
                        </div>
                        <div className='footer-right'>
                            <DropdownMenu
                                trigger={
                                    (screenSize==='mobile')?(
                                        <IconButton
                                            icon={<PiRowsBold/>}
                                            txtLabel={`Show ${maxRow} Rows`}
                                            appearance='subtle'
                                        />
                                    ):(
                                        <Button
                                            className='max-row-button'
                                            txtLabel={`Show ${maxRow} Rows`}
                                            iconAfter={<PiCaretDownBold className='global-icon'/>}
                                            appearance='subtle'
                                        />
                                    )
                                    
                                }
                                optionSelected={[maxRow]}
                                options={[
                                    {id:'10', txtLabel:'10 Rows'},
                                    {id:'25', txtLabel:'25 Rows'},
                                    {id:'50', txtLabel:'50 Rows'},
                                    {id:'100', txtLabel:'100 Rows'},
                                ]}
                                onClick={(id)=>{
                                    setMaxRow(id)
                                }}
                                floatingConfig={{
                                    isContainerWidthSameAsTrigger:true,
                                    placement:'bottom-end',
                                    fallbackPlacement:['top-end']
                                }}
                            />
                            {
                                (screenSize!=='mobile')&&(
                                    <>
                                        <div className='separator'></div>
                                        <IconButton
                                            icon={<PiArrowUp className='global-icon'/>}
                                            txtLabel='Go To Top'
                                            onClick={()=>{
                                                tableContainerRef.current?.scrollTo({top:0, behavior:'smooth'})
                                            }}
                                            isDisabled={!isShowFloatingHeader}
                                            appearance='subtle'
                                        />
                                    </>
                                )
                            }
                            
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}

export default TableData

const dataDummy: tableRowData[] = [
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
