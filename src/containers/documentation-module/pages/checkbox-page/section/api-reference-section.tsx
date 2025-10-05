import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefCheckboxList, apiRefCheckboxButtonList, apiRefCheckboxGroupList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefCheckboxData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCheckboxList)
    },[])

    const apiRefCheckboxButtonData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCheckboxButtonList)
    },[])

    const apiRefCheckboxGroupData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCheckboxGroupList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Checkbox</span></p>
                <p>Indicator of checkbox only.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCheckboxData}
                />
            </div>
            <div
                id="api_ref_2" 
                ref={setSectionRef('api_ref_2')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg"><span className="text-title-lg text-code">CheckboxButton</span></p>
                <p>Button with checkbox indicator.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCheckboxButtonData}
                />
            </div>
            <div
                id="api_ref_3" 
                ref={setSectionRef('api_ref_3')}
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p className="text-title-lg"><span className="text-title-lg text-code">CheckboxGroup</span></p>
                <p>Container of controlled checkbox buttons.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCheckboxGroupData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection