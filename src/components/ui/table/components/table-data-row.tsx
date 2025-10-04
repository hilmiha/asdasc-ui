import clsx from "clsx"
import * as ctrl from '../controller';
import type { tableColumnType, tableRowDataType } from ".."
import { Fragment, useMemo, type JSX } from "react"
import Button from "../../button";
import IconButton from "../../icon-button";
import { PiCaretDownBold, PiCaretUpBold, PiSquareBold } from "react-icons/pi";
import DropdownMenu from "../../dropdown-menu";
import CheckboxButton from "../../checkbox-button";
import type { globalShapeType } from "src/components/_types";

const TableDataRow = ({
    rowData,
    onClickRow,
    onClickRowAction,
    onClickRowCheckbox,
    column,
    columnShowList,
    isSelected,
    isExpanded,
    onClickExpandButton,
    shape,
}:{
    rowData:tableRowDataType
    onClickRow?:(rowData:tableRowDataType)=>void
    onClickRowAction?:(idButton:string, rowDate:tableRowDataType)=>void
    onClickRowCheckbox?:(rowData:tableRowDataType)=>void
    column:tableColumnType[],
    columnShowList:string[]
    isSelected:boolean,
    isExpanded:boolean,
    onClickExpandButton:(id:string)=>void,
    shape?:globalShapeType
}) =>{

    const isCanClickRow = useMemo(()=>{
        if(onClickRow!==undefined){
            return true
        }else{
            return false
        }
    },[onClickRow])
    return(
        <>
            <tr 
                className={clsx({
                    ['row-clickable']:(isCanClickRow),
                    ['row-selected']:(isSelected)
                })}
                key={rowData.id} 
                role='button' 
                tabIndex={isCanClickRow?0:-1} 
                onKeyDown={(e) => {
                    if(onClickRow){
                        ctrl.thisOnKeyDownClickRow(e, rowData, onClickRow)
                    }
                }}
                onClick={(e) => {
                    if(onClickRow){
                        ctrl.thisOnMouseClickRow(e, rowData, onClickRow)
                    }
                }}
            >
                {column.map((headerData) => (
                    <td
                        key={headerData.key}
                        style={{
                            paddingLeft:(headerData.key==='#checkbox'||headerData.key==='#expandable')?('var(--space-150)'):(undefined),
                            paddingRight:(headerData.key==='#checkbox'||headerData.key==='#expandable')?('var(--space-150)'):(undefined),
                            paddingBottom:(headerData.key==='#expandable')?('0px'):(undefined),
                            width: headerData.size.size,
                            minWidth: headerData.size.min,
                            maxWidth: headerData.size.min,
                            textAlign: headerData.horizontalAlign==='center'?('center'):(headerData.horizontalAlign==='end')?('end'):('start'),
                            verticalAlign: headerData.verticalAlign==='middle'?('middle'):(headerData.verticalAlign==='bottom')?('bottom'):('top'),
                            display:(!columnShowList.includes(headerData.key))?('none'):(undefined)
                        }}
                    >
                        {
                            (headerData.key==='#checkbox')?(
                                <div className="table-action-box interactive-box">
                                    <CheckboxButton
                                        className="table-checkbox-button"
                                        isSelected={isSelected}
                                        onClick={()=>{
                                            if(onClickRowCheckbox){
                                                onClickRowCheckbox(rowData)
                                            }
                                        }}
                                        shape={shape}
                                    />
                                </div>
                            ):(headerData.key==='#expandable' && rowData['expandedPage'])?(
                                <div 
                                    className="table-action-box interactive-box" 
                                    style={
                                        isExpanded?{height:'100%', display:'grid', gridTemplateRows:'max-content 1fr', margin:'0px'}:{}
                                    }>
                                    <IconButton
                                        className="table-expand-button"
                                        icon={(isExpanded)?(<PiCaretUpBold className="global-icon"/>):(<PiCaretDownBold className="global-icon"/>)}
                                        isSelected={isExpanded}
                                        appearance="subtle"
                                        txtLabel={isExpanded?"Collapse":"Expand"}
                                        onClick={()=>{onClickExpandButton(rowData.id)}}
                                    />
                                    {
                                        (isExpanded)&&(
                                            <div style={{
                                                width:'1px',
                                                height:'100%',
                                                marginLeft:'var(--space-150)',
                                                borderLeft:'1px solid var(--clr-border-primary)'
                                            }}/>
                                        )
                                    }
                                </div>
                            ):(headerData.type==='row-action' && headerData.actionButtonList)?(
                                <div className="table-action-box interactive-box">
                                    {
                                        headerData.actionButtonList.map((itmButton, idx)=>(
                                            <Fragment key={`${itmButton.id}-${idx}`}>
                                                {(itmButton.type==='button')&&(
                                                    <Button
                                                        className="table-action-button"
                                                        txtLabel={itmButton.txtLabel}
                                                        iconBefore={itmButton.icon}
                                                        onClick={()=>{
                                                            if(onClickRowAction){
                                                                onClickRowAction(itmButton.id, rowData)
                                                            }
                                                        }}
                                                        shape={shape}
                                                    />
                                                )}
                                                {(itmButton.type==='icon-button')&&(
                                                    <IconButton
                                                        className="table-action-icon-button"
                                                        txtLabel={itmButton.txtLabel}
                                                        icon={itmButton.icon??<PiSquareBold className="global-icon"/>}
                                                        onClick={()=>{
                                                            if(onClickRowAction){
                                                                onClickRowAction(itmButton.id, rowData)
                                                            }
                                                        }}
                                                        shape={shape}
                                                    />
                                                )}
                                                {(itmButton.type==='dropdown-menu')&&(
                                                    <DropdownMenu
                                                        trigger={
                                                            <IconButton
                                                                className="table-action-icon-button"
                                                                txtLabel={itmButton.txtLabel}
                                                                icon={itmButton.icon??<PiSquareBold className="global-icon"/>}
                                                                shape={shape}
                                                            />
                                                        }
                                                        options={itmButton.option??[]}
                                                        floatingConfig={{
                                                            isCloseOnItemClicked:true,
                                                        }}
                                                        onClick={(idButton)=>{
                                                            if(onClickRowAction){
                                                                onClickRowAction(idButton, rowData)
                                                            }
                                                        }}
                                                        shape={shape}
                                                    />
                                                )}
                                            </Fragment>
                                        ))
                                    }
                                </div>
                            ):(Array.isArray(rowData[headerData.key]))?(
                                <>
                                    {
                                        (rowData[headerData.key] as any[]).map((k)=>(
                                            <Fragment key={`${k}`}>
                                                {
                                                    (typeof(k) === 'string')?(
                                                        <span className="label-cell" style={{display:'inline-block'}}>{k}</span>
                                                    ):(
                                                        <>{k}</>
                                                    )
                                                }
                                            </Fragment>
                                        ))
                                    }
                                </>
                            ):(
                                <>{rowData[headerData.key]}</>
                            )
                        }
                    </td>
                ))}
            </tr>
            {
                (rowData['expandedPage'] && isExpanded)&&(
                    <ExpandedPageRow
                        isExpanded={isExpanded}
                        rowData={rowData['expandedPage']}
                        colSpan={column.length-1}
                    />
                )
            }
        </>
    )
}

export default TableDataRow

const ExpandedPageRow = ({
    isExpanded,
    colSpan,
    rowData
}:{
    isExpanded:boolean
    colSpan:number,
    rowData:JSX.Element|string
}) =>{

    return(
        <tr
            className={clsx(
                "expanded-content-box",
                (isExpanded)?('open'):('close'),
            )}
            style={{
                maxHeight:'0px'
            }}
        >
            <td className="table-expanded-span-box">
                <div className="table-expanded-span">
                </div>
            </td>
            <td className="table-expanded-box" colSpan={colSpan}>
                {
                    <>{rowData}</>
                }
            </td>
        </tr>
    )
}