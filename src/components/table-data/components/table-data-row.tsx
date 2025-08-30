import clsx from "clsx"
import * as ctrl from '../controller';
import type { tableColumnType, tableRowDataType } from ".."
import { Fragment, useMemo } from "react"
import Button from "../../button";
import IconButton from "../../icon-button";
import { PiSquareBold } from "react-icons/pi";
import DropdownMenu from "../../dropdown-menu";
import CheckboxButton from "../../checkbox-button";

const TableDataRow = ({
    rowData,
    onClickRow,
    onClickRowAction,
    onClickRowCheckbox,
    column,
    isSelected,
}:{
    rowData:tableRowDataType
    onClickRow?:(rowData:tableRowDataType)=>void
    onClickRowAction?:(idButton:string, rowDate:tableRowDataType)=>void
    onClickRowCheckbox?:(rowData:tableRowDataType)=>void
    column:tableColumnType[],
    isSelected:boolean,
}) =>{

    const isCanClickRow = useMemo(()=>{
        if(onClickRow!==undefined){
            return true
        }else{
            return false
        }
    },[onClickRow])
    
    return(
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
                        paddingLeft:headerData.key==='#checkbox'?('var(--space-150)'):(undefined),
                        paddingRight:headerData.key==='#checkbox'?('var(--space-150)'):(undefined),
                        width: headerData.size.size,
                        minWidth: headerData.size.min,
                        textAlign: headerData.horizontalAlign==='center'?('center'):(headerData.horizontalAlign==='end')?('end'):('start'),
                        verticalAlign: headerData.verticalAlign==='middle'?('middle'):(headerData.verticalAlign==='bottom')?('bottom'):('top'),
                    }}
                >
                    {
                        (typeof(rowData[headerData.key])==='string')?(
                            <>{rowData[headerData.key]}</>
                        ):(headerData.key==='#checkbox')?(
                            <div className="table-action-box interactive-box">
                                <CheckboxButton
                                    className="table-checkbox-button"
                                    isSelected={isSelected}
                                    onClick={()=>{
                                        if(onClickRowCheckbox){
                                            onClickRowCheckbox(rowData)
                                        }
                                    }}
                                />
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
                                                />
                                            )}
                                            {(itmButton.type==='dropdown-menu')&&(
                                                <DropdownMenu
                                                    trigger={
                                                        <IconButton
                                                            className="table-action-icon-button"
                                                            txtLabel={itmButton.txtLabel}
                                                            icon={itmButton.icon??<PiSquareBold className="global-icon"/>}
                                                        />
                                                    }
                                                    options={itmButton.option??[]}
                                                    floatingConfig={{
                                                        isCloseOnItemClicked:true,
                                                        isContainerWidthSameAsTrigger:true
                                                    }}
                                                    onClick={(idButton)=>{
                                                        if(onClickRowAction){
                                                            onClickRowAction(idButton, rowData)
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                }
                            </div>
                        ):(
                            <></>
                        )
                    }
                </td>
            ))}
        </tr>
    )
}

export default TableDataRow