import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefInputColorList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefInputColorData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefInputColorList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">InputColor</span></p>
                <p>Input field specifically function for inputing sensitive text.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefInputColorData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection