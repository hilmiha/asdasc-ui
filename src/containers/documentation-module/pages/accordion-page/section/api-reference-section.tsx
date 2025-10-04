import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module"
import { apiRefAccordionGroupList, apiRefAccordionList, apiRefTableColumnList } from "../constant"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefAccordionGroupData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefAccordionGroupList)
    },[])

    const apiRefAccordionData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefAccordionList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">AccordionGroup</span></p>
                <p>Contains all <span className="text-code">Accordion</span> into one controlled group.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefAccordionGroupData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Accordion</span></p>
                <p>Contains the trigger and collapsible content for an item of accordion.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefAccordionData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection