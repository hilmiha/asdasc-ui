import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefRadioList, apiRefRadioButtonList, apiRefRadioGroupList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefRadioData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefRadioList)
    },[])

    const apiRefRadioButtonData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefRadioButtonList)
    },[])

    const apiRefRadioGroupData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefRadioGroupList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Radio</span></p>
                <p>Indicator of radio only.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefRadioData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">RadioButton</span></p>
                <p>Button with radio indicator.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefRadioButtonData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">RadioGroup</span></p>
                <p>Container of controlled radio buttons.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefRadioGroupData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection