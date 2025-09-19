import * as ctrl from '../controller';
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import IconButton from "../../icon-button"
import { PiArrowLineUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretLineLeftBold, PiCaretLineRightBold, PiCaretRightBold, PiCheckBold, PiColumnsBold, PiDotsSixVerticalBold, PiEyeBold, PiEyeClosedBold, PiGearBold, PiGearFill } from "react-icons/pi"
import DropdownMenu from "../../dropdown-menu"
import Button from "../../button"
import Sortable from "sortablejs"
import BottomSheet from "../../bottom-sheet"
import type { tableColumnType, tableConfigType } from ".."
import { useDeepCompareMemo } from "../../../hook/useDeepCompareMemo"
import type { globalShapeType, optionItemType } from "../../_types"
import CheckboxButton from "../../checkbox-button"
import clsx from "clsx"
import Spinner from '../../spinner';

const TableFooter = ({
    tableContainerRef,
    tableConfig,
    onSelectMaxRow,
    onClickPagination,
    isTableScrolled,
    selectedRowCount,
    isColumnSwapable,
    isLoading,
    column,
    setColumn,
    columnShowList,
    setColumnShowList,
    shape
}:{
    tableContainerRef:React.RefObject<HTMLDivElement | null>
    tableConfig?:tableConfigType
    onSelectMaxRow?:(newMaxRow:number)=>void
    onClickPagination?:(newCurrentPage:number)=>void
    isTableScrolled:boolean
    selectedRowCount:number
    isColumnSwapable:boolean
    isLoading:boolean
    column:tableColumnType[]
    setColumn:React.Dispatch<React.SetStateAction<tableColumnType[]>>
    columnShowList:string[]
    setColumnShowList:React.Dispatch<React.SetStateAction<string[]>>
    shape?:globalShapeType
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    const footerNuberRow:[number, number] = useMemo(()=>{
        const currentPage = tableConfig?.currentPage??1
        const maxRow = tableConfig?.maxRow??1
        const totalData = tableConfig?.totalData??0
        const startAt = (currentPage*maxRow)-maxRow+1
        const endAt = Math.min((currentPage*maxRow),totalData)
        return([startAt,endAt])
    },[tableConfig?.maxRow, tableConfig?.currentPage, tableConfig?.totalData])

    const maxRowOption:optionItemType[] = [
        {id:'10', txtLabel:'10 Rows'},
        {id:'25', txtLabel:'25 Rows'},
        {id:'50', txtLabel:'50 Rows'},
        {id:'100', txtLabel:'100 Rows'},
    ]
    const columnList = useDeepCompareMemo<optionItemType[]>(()=>{
        const tamp:optionItemType[] = column.filter(i=>(i.key!=='#checkbox' && i.key!=='#expandable')).map((i)=>{
            return({
                id:i.key,
                txtLabel:i.txtLable,
                type:'option'
            })
        })
        return(tamp)
    },[column])

    const [isShowTableSetting, setIsShowTableSetting] = useState(false)

    return(
        <div
            className='table-footer-floating'
            style={{
                gridTemplateColumns:screenSize==='laptop'?('1fr 1fr 1fr'):('1fr max-content')
            }}
        >
            {
                (
                    tableConfig &&
                    screenSize==='laptop'
                )&&(
                    <div className='footer-left'>
                        {
                            (!isLoading)?(
                                <p>
                                    <span>Showing {footerNuberRow[0]}-{footerNuberRow[1]} of {tableConfig?.totalData} {(selectedRowCount>0)&&(`, ${selectedRowCount} rows selected`)}</span>
                                </p>
                            ):(
                                <Spinner size='small'/>
                            )
                        }
                    </div>
                )
            }
            
            <div 
                className='footer-pagination'
                style={{
                    justifyContent:screenSize==='laptop'?('center'):('start')
                }}
            >
                {
                    (tableConfig && onClickPagination)&&(
                        <>
                            <IconButton
                                icon={<PiCaretLineLeftBold className='global-icon'/>}
                                txtLabel='First Page'
                                appearance='subtle'
                                isDisabled={tableConfig.currentPage===1}
                                onClick={()=>{
                                    if(isLoading){
                                        return
                                    }
                                    onClickPagination(1)
                                    ctrl.doScrollToTop(tableContainerRef)
                                }}
                                shape={shape}
                            />
                            <IconButton
                                icon={<PiCaretLeftBold className='global-icon'/>}
                                txtLabel='Previous Page'
                                appearance='subtle'
                                isDisabled={tableConfig.currentPage===1}
                                onClick={()=>{
                                    if(isLoading){
                                        return
                                    }
                                    onClickPagination(tableConfig.currentPage - 1)
                                    ctrl.doScrollToTop(tableContainerRef)
                                }}
                                shape={shape}
                            />
                            <p className='page-info-box'>Page {tableConfig.currentPage} / {tableConfig.countPage}</p>
                            <IconButton
                                icon={<PiCaretRightBold className='global-icon'/>}
                                txtLabel='Next Page'
                                appearance='subtle'
                                isDisabled={tableConfig.currentPage===tableConfig.countPage}
                                onClick={()=>{
                                    if(isLoading){
                                        return
                                    }
                                    onClickPagination(tableConfig.currentPage + 1)
                                    ctrl.doScrollToTop(tableContainerRef)
                                }}
                                shape={shape}
                            />
                            <IconButton
                                icon={<PiCaretLineRightBold className='global-icon'/>}
                                txtLabel='Last Page'
                                appearance='subtle'
                                isDisabled={tableConfig.currentPage===tableConfig.countPage}
                                onClick={()=>{
                                    if(isLoading){
                                        return
                                    }
                                    onClickPagination(tableConfig.countPage)
                                    ctrl.doScrollToTop(tableContainerRef)
                                }}
                                shape={shape}
                            />
                        </>
                    )
                }
                
            </div>
            <div className='footer-right'>
                {
                    (screenSize==='mobile')?(
                        <>
                            <IconButton
                                icon={<PiGearBold className="global-icon"/>}
                                txtLabel={`Table Settings`}
                                appearance='subtle'
                                onClick={()=>{
                                    setIsShowTableSetting(true)
                                }}
                                shape={shape}
                                isDisabled={isLoading}
                            />
                            <BottomSheet
                                className="table-setting-bottom-sheet"
                                isOpen={isShowTableSetting}
                                setIsOpen={setIsShowTableSetting}
                                txtTitle="Table Setting"
                                iconTitle={<PiGearFill className="global-icon"/>}
                                shape={shape}
                            >
                                <TableSettingMobile
                                    tableConfig={tableConfig}
                                    onSelectMaxRow={(newMaxRow)=>{
                                        if(onSelectMaxRow){
                                            onSelectMaxRow(newMaxRow)
                                        }
                                        setIsShowTableSetting(false)
                                    }}
                                    maxRowOption={maxRowOption}
                                    column={column}
                                    setColumn={setColumn}
                                    columnShowList={columnShowList}
                                    setColumnShowList={setColumnShowList}
                                    isColumnSwapable={isColumnSwapable}
                                    shape={shape}
                                />
                            </BottomSheet>
                        
                        </>
                        
                    ):(tableConfig && onSelectMaxRow)?(
                        <DropdownMenu
                            trigger={
                                <Button
                                    className='max-row-button'
                                    txtLabel={`Show ${tableConfig.maxRow} Rows`}
                                    iconAfter={<PiCaretDownBold className='global-icon'/>}
                                    appearance='subtle'
                                    shape={shape}
                                    isDisabled={isLoading}
                                />
                            }
                            optionSelected={[`${tableConfig.maxRow}`]}
                            options={maxRowOption}
                            onClick={(id)=>{
                                onSelectMaxRow(parseInt(id))
                            }}
                            floatingConfig={{
                                isContainerWidthSameAsTrigger:true,
                                placement:'bottom-end',
                                fallbackPlacement:['top-end'],
                                isCloseOnItemClicked:true
                            }}
                            shape={shape}
                        />
                    ):(<></>)
                }
                {
                    (screenSize!=='mobile')&&(
                        <>
                            <DropdownMenu
                                trigger={
                                    <IconButton
                                        icon={<PiColumnsBold className='global-icon'/>}
                                        txtLabel='Column'
                                        appearance='subtle'
                                        shape={shape}
                                        isDisabled={isLoading}
                                    />
                                }  
                                optionSelected={columnShowList}
                                onClick={(id)=>{
                                    setColumnShowList((prev)=>{
                                        if(prev.includes(id)){
                                            return [...prev].filter(i=>i!==id)
                                        }else{
                                            return [...prev, id]
                                        }
                                    })
                                }}
                                options={columnList}
                                floatingConfig={{
                                    isWithCheckmark:true,
                                    isContainerWidthSameAsTrigger:true
                                }}
                                shape={shape}
                            />
                        </>
                    )
                }
                {
                    (screenSize!=='mobile')&&(
                        <>
                            <IconButton
                                icon={<PiArrowLineUpBold className='global-icon'/>}
                                txtLabel='Go To Top'
                                onClick={()=>{
                                    ctrl.doScrollToTop(tableContainerRef)
                                }}
                                isDisabled={!isTableScrolled}
                                appearance='subtle'
                                shape={shape}
                            />
                        </>
                    )
                }
                
            </div>
        </div>
    )
}

export default TableFooter

const TableSettingMobile = ({
    tableConfig,
    onSelectMaxRow,
    maxRowOption,

    isColumnSwapable,
    column,
    setColumn,
    columnShowList,
    setColumnShowList,
    shape
}:{
    tableConfig?:tableConfigType
    onSelectMaxRow?:(newMaxRow:number)=>void
    maxRowOption:optionItemType[]

    isColumnSwapable:boolean
    column:tableColumnType[]
    setColumn:React.Dispatch<React.SetStateAction<tableColumnType[]>>
    columnShowList:string[]
    setColumnShowList:React.Dispatch<React.SetStateAction<string[]>>
    shape?:globalShapeType
}) =>{
    const columnRef = useRef(null)

    useEffect(() => {
        if(!isColumnSwapable) return;
        if (!columnRef.current) return;

        const sortable = Sortable.create(columnRef.current, {
            animation: 150,
            swap: true, // enable swap
            swapClass: 'highlight-swap',
            chosenClass:'highlight-drag',
            handle: '.drag-handle',
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
    }, [JSON.stringify(column), isColumnSwapable, columnRef.current]);

    return(
        <div>
            {
                (tableConfig && onSelectMaxRow)&&(
                    <div>
                        <p className="section-title">
                            Max Row
                        </p>
                        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                            {
                                maxRowOption.map((i)=>(
                                    <Button
                                        key={i.id}
                                        txtLabel={i.txtLabel}
                                        isSelected={`${tableConfig.maxRow}`===i.id}
                                        iconBefore={(`${tableConfig.maxRow}`===i.id)?(<PiCheckBold className="global-icon"/>):(undefined)}
                                        onClick={()=>{
                                            onSelectMaxRow(parseInt(i.id))
                                        }}
                                        shape={shape}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }
            <div style={{marginTop:'var(--space-250)'}}>
                <p className="section-title">
                    Column Order
                </p>
                <div
                    ref={columnRef}
                    className="list-column-box"
                >
                    {
                        column.map((headerData)=>(
                            <div 
                                key={headerData.key} 
                                className={clsx(
                                    'item-column',
                                    {
                                        ['no-swap']:(headerData.key==='#checkbox' || headerData.key==='#expandable')
                                    }
                                )}
                            >
                                {
                                    (isColumnSwapable && headerData.key!=='#checkbox' && headerData.key!=='#expandable')&&(
                                        <div className='drag-handle' style={{display:"flex", alignItems:'center'}}>
                                            <PiDotsSixVerticalBold className='global-icon' size={18}/>
                                        </div>
                                    )
                                }
                                <div style={{flexGrow:'1'}}>
                                    {
                                        headerData.key==='#checkbox'?(
                                            'Checkbox'
                                        ):headerData.key==='#expandable'?(
                                            'Expandable'
                                        ):(
                                            headerData.txtLable
                                        )
                                    }
                                </div>
                                {
                                    (headerData.key!=='#checkbox' && headerData.key!=='#expandable')&&(
                                        <>
                                            {
                                                !columnShowList.includes(headerData.key)?(
                                                    <PiEyeClosedBold/>

                                                ):(
                                                    <PiEyeBold/>
                                                )
                                            }
                                            <CheckboxButton
                                                isSelected={columnShowList.includes(headerData.key)}
                                                onClick={()=>{
                                                    const id = headerData.key
                                                    setColumnShowList((prev)=>{
                                                        if(prev.includes(id)){
                                                            return [...prev].filter(i=>i!==id)
                                                        }else{
                                                            return [...prev, id]
                                                        }
                                                    })
                                                }}
                                                shape={shape}
                                            />
                                        </>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}