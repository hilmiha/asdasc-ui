import { useEffect, useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefCarouselList, apiRefCarouselChildList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefCarouselData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCarouselList)
    },[])

    const apiRefCarouselChildData = useMemo<tableRowDataType[]>(()=>{
        return(apiRefCarouselChildList)
    },[])

    useEffect(()=>{
        const tamp = parsePropsToDocumentation(`className?: string;
        shape?: globalShapeType;
        height?: string;
        isAutoRunning?: boolean;
        autoRunInterval?: number;
        canLoop?: boolean;
        indicatorPosition?: 'start' | 'end' | 'center';
        children: React.ReactNode[];`)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Carousel</span></p>
                <p>Contains all <span className="text-code">CarouselChild</span> into one controlled group.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCarouselData}
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
                <p className="text-title-lg"><span className="text-title-lg text-code">CarouselChild</span></p>
                <p>Contains the content for one slide of a carousel.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefCarouselChildData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection