import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefDropdownList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefDropdownData = useMemo<tableRowDataType[]>(()=>{
        const tamp = parsePropsToDocumentation(`
            className?:string;
            trigger:JSX.Element | ((
                triggerRef: React.RefCallback<HTMLElement>, 
                getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
                isDropdownOpen:boolean, 
                trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
            ) => JSX.Element);
            style?:dropdownStyleType;
            shape?:globalShapeType;
            isDisabled?:boolean;
            onOpen?: () => void;
            onClose?: () => void;
            elementHeader?:JSX.Element;
            elementFooter?:JSX.Element;
            children?:JSX.Element | JSX.Element[];
            triggerClose?:1|0;
            floatingConfig?:dropdownFloatingConfigType;
        `)
        console.log(tamp)
        return(apiRefDropdownList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">Dropdown</span></p>
                <p>Dropdown component that contain trigger and content as the children.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefDropdownData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection