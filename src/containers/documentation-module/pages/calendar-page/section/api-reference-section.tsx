import { useEffect, useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefCalendarList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefCalendarData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCalendarList)
    },[])

    useEffect(()=>{
        const tamp = parsePropsToDocumentation(`
            type:calendarType;
            value?:validCalendarValue;
            onChange?:(newValue:validCalendarValue)=>void;
            isDisabled?:boolean;
            disabledDates?:validCalendarDisabledValue[];
            shape?:globalShapeType;
            calendarStart?:Date;
            calendarEnd?:Date;
        }`)
        console.log(tamp)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Calendar</span></p>
                <p>Calendar with rendered dates that can be selected.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCalendarData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection