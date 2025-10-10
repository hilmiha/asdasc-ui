import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefInputTextList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefInputTextData = useMemo<tableRowDataType[]>(()=>{
        const tamp = parsePropsToDocumentation(`
            ref?:React.Ref<HTMLInputElement>;
            id?:string;
            className?:string;
            style?:inputTextStyleType;
            shape?:globalShapeType;
            afterElement?:JSX.Element;
            beforeElement?:JSX.Element;
            type:inputTextType;
            txtPlaceholder?:string;
            isDisabled?:boolean;
            value?:string;
            onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined)=>void;
            onBlur?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void;
            onFocus?:(e:React.FocusEvent<HTMLInputElement>, value:string)=>void;
            error?:fieldErrorType;
            onValidate?:(error:fieldErrorType, value:string)=>void;
            config?:inputTextConfigType;
            `)
        console.log(tamp)
        return(apiRefInputTextList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">InputText</span></p>
                <p>Text input specifically function for inputing text value.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefInputTextData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection