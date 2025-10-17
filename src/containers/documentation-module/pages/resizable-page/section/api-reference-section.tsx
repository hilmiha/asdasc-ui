import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefResizableList, apiRefResizableHandleList, apiRefResizablePanelList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefResizableData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefResizableList)
    },[])
    const apiRefResizablePanelData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefResizablePanelList)
    },[])
    const apiRefResizableHandleData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefResizableHandleList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Resizable</span></p>
                <p>Container than control the resizable panel and resizable handle</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefResizableData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">ResizablePanel</span></p>
                <p>Conatiner that contain content inside.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefResizablePanelData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">ResizableHandle</span></p>
                <p>Separator between panels and handle area to resize panels.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefResizableHandleData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection