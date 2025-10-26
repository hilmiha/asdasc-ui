import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefSwitchList, apiRefSwitchButtonList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefSwitchData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefSwitchList)
    },[])

    const apiRefSwitchButtonData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefSwitchButtonList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Switch</span></p>
                <p>Indicator of radio only.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefSwitchData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">SwitchButton</span></p>
                <p>Button with radio indicator.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefSwitchButtonData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection