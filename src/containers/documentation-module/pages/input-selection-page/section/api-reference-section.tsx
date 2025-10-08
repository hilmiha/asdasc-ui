import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefInputSelectionList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefInputSelectionData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefInputSelectionList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">InputSelection</span></p>
                <p>Text input specifically function for inputing value from options.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefInputSelectionData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection