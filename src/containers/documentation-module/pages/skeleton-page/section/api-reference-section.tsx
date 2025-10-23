import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefSkeletonList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefSkeletonData = useMemo<tableRowDataType[]>(()=>{
        console.log(parsePropsToDocumentation(`
            className?: string;
            shape?:globalShapeType;
            width?:string | number;
            height?:string | number;
            style?:React.CSSProperties;
        `))
        return(apiRefSkeletonList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Skeleton</span></p>
                <p>The skeleton.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefSkeletonData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection