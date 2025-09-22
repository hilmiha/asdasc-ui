import type { tableRowDataType } from ".";

//tabel continer funtion
export const doScrollToTop = (
    tableContainerRef:React.RefObject<HTMLDivElement | null>
) =>{
    tableContainerRef.current?.scrollTo({top:0, behavior:'smooth'})
}

//Row Click Functions
export const thisOnMouseClickRow = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, 
    rowData:tableRowDataType,
    onClickRow:(rowData:tableRowDataType)=>void
) =>{
    //Ignore if user selected text
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) return;

    //Ignore if click happened inside an interactive element
    const target = e.target as HTMLElement;

    if(target.closest('.label-cell')){
        onClickRow(rowData);
        return
    }
    if (
        target.closest('.interactive-box')||
        target.tagName!=='TD'
    ) {
        return;
    }

    onClickRow(rowData);
}
export const thisOnKeyDownClickRow = (
    e: React.KeyboardEvent<HTMLTableRowElement>, 
    rowData:tableRowDataType,
    onClickRow:(rowData:tableRowDataType)=>void
) =>{
    //Ignore if click happened inside an interactive element
    const target = e.target as HTMLElement;
    if (
        target.closest('.interactive-box')||
        target.tagName!=='TR'
    ) {
        return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClickRow(rowData);
    }
}

//expand button click functions
export const onClickExpandAll = (
    tableData:tableRowDataType[], 
    setRowExpanded:React.Dispatch<React.SetStateAction<string[]>>
) =>{
    setRowExpanded((prev)=>{
        if(prev.length===tableData.length || prev.length>0){
            return([])
        }else{
            return tableData.map(i=>i.id)
        }
    })
}
export const onClickExpandRow = (
    id:string,
    setRowExpanded:React.Dispatch<React.SetStateAction<string[]>>
) =>{
    setRowExpanded((prev)=>{
        if(prev.includes(id)){
            return [...prev].filter(i=>i!=id)
        }else{
            return [...prev, id]
        }
    })
}

//checkbox button click function
export const onClickCheckboxAll = (
    columnCheckboxState:number,
    tableData:tableRowDataType[],
    onClickRowCheckbox:(listSelectedRow: string[], rowData?: tableRowDataType) => void
) =>{
    if(columnCheckboxState===0 || columnCheckboxState===1){
        onClickRowCheckbox(tableData.map(i=>i.id))
    }else{
        onClickRowCheckbox([])
    }
}
export const onClickCheckboxRow = (
    selectedRow:string[],
    dataRow:tableRowDataType,
    onClickRowCheckbox:(listSelectedRow: string[], rowData?: tableRowDataType) => void
) =>{
    const id = dataRow.id
    if(selectedRow.includes(dataRow.id)){
        const tamp = [...selectedRow].filter(i=>i!==id)
        onClickRowCheckbox(tamp, dataRow)
    }else{
        const tamp = [...selectedRow, id]
        onClickRowCheckbox(tamp, dataRow)
    }
}