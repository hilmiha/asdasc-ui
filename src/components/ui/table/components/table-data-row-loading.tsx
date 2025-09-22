import type { tableColumnType } from ".."
import type { globalShapeType } from "src/components/_types";
import Skeleton from "../../skeleton";

const TableDataRowLoading = ({
    column,
    columnShowList,
    shape
}:{
    column:tableColumnType[],
    columnShowList:string[]
    shape?:globalShapeType
}) =>{

    return(
        <>
            <tr className="loading">
                {column.map((headerData) => (
                    <td
                        key={headerData.key}
                        style={{
                            paddingLeft:(headerData.key==='#checkbox'||headerData.key==='#expandable')?('var(--space-150)'):(undefined),
                            paddingRight:(headerData.key==='#checkbox'||headerData.key==='#expandable')?('var(--space-150)'):(undefined),
                            paddingBottom:(headerData.key==='#expandable')?('0px'):(undefined),
                            width: headerData.size.size,
                            minWidth: headerData.size.min,
                            textAlign: headerData.horizontalAlign==='center'?('center'):(headerData.horizontalAlign==='end')?('end'):('start'),
                            verticalAlign: headerData.verticalAlign==='middle'?('middle'):(headerData.verticalAlign==='bottom')?('bottom'):('top'),
                            display:(!columnShowList.includes(headerData.key))?('none'):(undefined)
                        }}
                    >
                        {
                            (headerData.key==='#checkbox')?(
                                <div 
                                    className="table-action-box interactive-box" 
                                    style={{width:'23.2px', display:'flex', justifyContent:'center'}}
                                >
                                    <Skeleton shape={shape} height={16} width={16}/>
                                    {/* <CheckboxButton
                                        className="table-checkbox-button"
                                        isSelected={isSelected}
                                        onClick={()=>{
                                            if(onClickRowCheckbox){
                                                onClickRowCheckbox(rowData)
                                            }
                                        }}
                                        shape={shape}
                                    /> */}
                                </div>
                            ):(headerData.key==='#expandable')?(
                                <div 
                                    className="table-action-box interactive-box" 
                                    style={{width:'25.6px', display:'flex', justifyContent:'center'}}
                                >
                                    <Skeleton shape={shape} height={16} width={16}/>
                                    {/* <IconButton
                                        className="table-expand-button"
                                        icon={(isExpanded)?(<PiCaretUpBold className="global-icon"/>):(<PiCaretDownBold className="global-icon"/>)}
                                        isSelected={isExpanded}
                                        appearance="subtle"
                                        txtLabel={isExpanded?"Collapse":"Expand"}
                                        onClick={()=>{onClickExpandButton(rowData.id)}}
                                    /> */}
                                </div>
                            ):(headerData.type==='row-action' && headerData.actionButtonList)?(
                                <div style={{display:'flex', gap:'var(--space-100)'}}>
                                    <Skeleton shape={shape} width={'50%'} style={{margin:'0px'}}/>
                                    <Skeleton shape={shape} width={'50%'} style={{margin:'0px'}}/>
                                    {/* {
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
                                                            isContainerWidthSameAsTrigger:true
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
                                    } */}
                                </div>
                            ):(
                                <Skeleton shape={shape}/>
                                // <>{rowData[headerData.key]}</>
                            )
                        }
                    </td>
                ))}
            </tr>
        </>
    )
}

export default TableDataRowLoading