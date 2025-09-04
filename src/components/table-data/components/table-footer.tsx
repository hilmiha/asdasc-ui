import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext, type _GlobalContextType } from "../../../context/global-context"
import IconButton from "../../icon-button"
import { PiArrowLineUpBold, PiCaretDownBold, PiCaretLeftBold, PiCaretLineLeftBold, PiCaretLineRightBold, PiCaretRightBold, PiCheckBold, PiColumnsBold, PiDotsSixVerticalBold, PiEyeBold, PiEyeClosedBold, PiGearBold, PiGearFill } from "react-icons/pi"
import DropdownMenu from "../../dropdown-menu"
import Button from "../../button"
import Sortable from "sortablejs"
import BottomSheet from "../../bottom-sheet"
import type { tableColumnType } from ".."
import { useDeepCompareMemo } from "../../../hook/useDeepCompareMemo"
import type { optionItemType } from "../../_types"
import CheckboxButton from "../../checkbox-button"
import clsx from "clsx"

const TableFooter = ({
    tableContainerRef,
    maxRow,
    isTableScrolled,
    setMaxRow,

    isColumnSwapable,
    column,
    setColumn,
    columnShowList,
    setColumnShowList
}:{
    tableContainerRef:React.RefObject<HTMLDivElement | null>
    maxRow:string,
    isTableScrolled:boolean
    setMaxRow: React.Dispatch<React.SetStateAction<string>>

    isColumnSwapable:boolean
    column:tableColumnType[]
    setColumn:React.Dispatch<React.SetStateAction<tableColumnType[]>>
    columnShowList:string[]
    setColumnShowList:React.Dispatch<React.SetStateAction<string[]>>
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    const maxRowOption:optionItemType[] = [
        {id:'10', txtLabel:'10 Rows'},
        {id:'25', txtLabel:'25 Rows'},
        {id:'50', txtLabel:'50 Rows'},
        {id:'100', txtLabel:'100 Rows'},
    ]
    const columnList = useDeepCompareMemo<optionItemType[]>(()=>{
        const tamp:optionItemType[] = column.filter(i=>i.key!=='#checkbox').map((i)=>{
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
                (screenSize==='laptop')&&(
                    <div className='footer-left'>
                        <p>Showing 1-25 of 25</p>
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
                    icon={<PiCaretLineLeftBold className='global-icon'/>}
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
                    icon={<PiCaretLineRightBold className='global-icon'/>}
                    txtLabel='Last Page'
                    appearance='subtle'
                />
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
                            />
                            <BottomSheet
                                className="table-setting-bottom-sheet"
                                isOpen={isShowTableSetting}
                                setIsOpen={setIsShowTableSetting}
                                txtTitle="Table Setting"
                                iconTitle={<PiGearFill className="global-icon"/>}
                            >
                                <TableSettingMobile
                                    maxRow={maxRow}
                                    setMaxRow={setMaxRow}
                                    maxRowOption={maxRowOption}
                                    column={column}
                                    setColumn={setColumn}
                                    columnShowList={columnShowList}
                                    setColumnShowList={setColumnShowList}
                                    isColumnSwapable={isColumnSwapable}
                                />
                            </BottomSheet>
                        
                        </>
                        
                    ):(
                        <DropdownMenu
                            trigger={
                                <Button
                                    className='max-row-button'
                                    txtLabel={`Show ${maxRow} Rows`}
                                    iconAfter={<PiCaretDownBold className='global-icon'/>}
                                    appearance='subtle'
                                />
                            }
                            optionSelected={[maxRow]}
                            options={maxRowOption}
                            onClick={(id)=>{
                                setMaxRow(id)
                            }}
                            floatingConfig={{
                                isContainerWidthSameAsTrigger:true,
                                placement:'bottom-end',
                                fallbackPlacement:['top-end']
                            }}
                        />
                    )
                }
                {
                    (screenSize!=='mobile')&&(
                        <>
                            <div className='separator'></div>
                            <DropdownMenu
                                trigger={
                                    <IconButton
                                        icon={<PiColumnsBold className='global-icon'/>}
                                        txtLabel='Column'
                                        appearance='subtle'
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
                            />
                        </>
                    )
                }
                {
                    (screenSize!=='mobile')&&(
                        <>
                            <div className='separator'></div>
                            <IconButton
                                icon={<PiArrowLineUpBold className='global-icon'/>}
                                txtLabel='Go To Top'
                                onClick={()=>{
                                    tableContainerRef.current?.scrollTo({top:0, behavior:'smooth'})
                                }}
                                isDisabled={!isTableScrolled}
                                appearance='subtle'
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
    maxRow,
    setMaxRow,
    maxRowOption,

    isColumnSwapable,
    column,
    setColumn,
    columnShowList,
    setColumnShowList
}:{
    maxRow:string,
    setMaxRow: React.Dispatch<React.SetStateAction<string>>
    maxRowOption:optionItemType[]

    isColumnSwapable:boolean
    column:tableColumnType[]
    setColumn:React.Dispatch<React.SetStateAction<tableColumnType[]>>
    columnShowList:string[]
    setColumnShowList:React.Dispatch<React.SetStateAction<string[]>>
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
                                isSelected={maxRow===i.id}
                                iconBefore={(maxRow===i.id)?(<PiCheckBold className="global-icon"/>):(undefined)}
                                onClick={()=>{
                                    setMaxRow(i.id)
                                }}
                            />
                        ))
                    }
                </div>
            </div>
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
                                        ['no-swap']:(headerData.key==='#checkbox')
                                    }
                                )}
                            >
                                {
                                    (isColumnSwapable && headerData.key!=='#checkbox')&&(
                                        <div className='drag-handle' style={{display:"flex", alignItems:'center'}}>
                                            <PiDotsSixVerticalBold className='global-icon' size={18}/>
                                        </div>
                                    )
                                }
                                <div style={{flexGrow:'1'}}>
                                    {
                                        headerData.key==='#checkbox'?(
                                            'Checkbox'
                                        ):(
                                            headerData.txtLable
                                        )
                                    }
                                </div>
                                {
                                    (headerData.key!=='#checkbox')&&(
                                        <>
                                            {/* <IconButton
                                                icon={
                                                    !columnShowList.includes(headerData.key)?(
                                                        <PiEyeClosedBold/>

                                                    ):(
                                                        <PiEyeBold/>
                                                    )
                                                }
                                                txtLabel="Show/Hide column"
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
                                            /> */}
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