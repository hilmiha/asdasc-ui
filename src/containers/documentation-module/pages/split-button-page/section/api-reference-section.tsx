import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefSplitButtonList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefSplitButtonData = useMemo<tableRowDataType[]>(()=>{
        console.log(parsePropsToDocumentation(`
            ref?:React.Ref<HTMLDivElement>;
            id?:string;
            className?:string;
            style?:splitButtonStyleType;
            appearance?: 'neutral' | 'primary';
            shape?:globalShapeType;
            txtLabel:string;
            options:optionItemType[];
            optionSelected?:string[];
            iconBefore?:JSX.Element;
            iconAfter?:JSX.Element;
            isDisabled?:boolean;
            onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
            onOptionClick?:(idButton:string, e:React.MouseEvent<HTMLButtonElement>)=>void;
            floatingConfig?:dropdownFloatingConfigType;
        `))
        return(apiRefSplitButtonList)
    },[])

    return(
        <>
            <div 
                id="api_ref" 
                ref={setSectionRef('api_ref')}
            >
                <p className="text-title-xl">API Reference</p>
            </div>
            <div
                id="api_ref_1" 
                ref={setSectionRef('api_ref_1')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg"><span className="text-title-lg text-code">SplitButton</span></p>
                <p>The main button and dropdown menu button.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefSplitButtonData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection