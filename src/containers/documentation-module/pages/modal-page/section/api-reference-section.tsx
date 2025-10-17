import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefModalFloatingConfigList, apiRefModalList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefModalData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefModalList)
    },[])

    const apiRefModalFloatingConfigData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefModalFloatingConfigList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Modal</span></p>
                <p>Modal component that contain trigger and content as the children.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefModalData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">modalFloatingConfig</span></p>
                <p>Configuration on how the <span className="text-code">BottomSheet</span> behave.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefModalFloatingConfigData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection