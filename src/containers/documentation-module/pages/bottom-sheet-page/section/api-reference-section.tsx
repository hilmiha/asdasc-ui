import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefBottomSheetList, apiRefBottomSheetFloatingConfigList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefBottomSheetData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefBottomSheetList)
    },[])

    const apiRefBottomSheetFloatingConfigData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefBottomSheetFloatingConfigList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">BottomSheet</span></p>
                <p>Container that will become the <span className="text-code">BottomSheet</span> contain content inside.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefBottomSheetData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">bottomSheetFloatingConfig</span></p>
                <p>Configuration on how the <span className="text-code">BottomSheet</span> behave.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefBottomSheetFloatingConfigData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection