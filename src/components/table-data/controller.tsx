import type { tableRowDataType } from ".";

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