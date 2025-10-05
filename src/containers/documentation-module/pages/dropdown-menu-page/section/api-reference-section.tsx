import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module/context"
import { apiRefDropdownMenuList, apiRefTableColumnList } from "../constant"
import { parsePropsToDocumentation } from "src/helper/helper"

const ApiReferenceSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const apiRefTableColumn = useMemo<tableColumnType[]>(()=>{
        return(apiRefTableColumnList)
    },[])

    const apiRefDropdownMenuData = useMemo<tableRowDataType[]>(()=>{
        const tamp = parsePropsToDocumentation(`
            className?:string;
            trigger:JSX.Element | ((
                triggerRef: React.RefCallback<HTMLElement> | undefined, 
                getReferenceProps: ((userProps?: React.HTMLProps<Element>) => Record<string, unknown>) | undefined,
                isDropdownOpen:boolean, 
                trigger:React.MutableRefObject<Element | null> | React.MutableRefObject<HTMLElement | null>,
            ) => JSX.Element);
            style?:dropdownMenuStyleType;
            shape?:globalShapeType;
            options:optionItemType[];
            optionSelected?:string[];
            optionSelectedAppearance?:checkboxButtonAppearance;
            isDisabled?:boolean;
            onClick?:(idOption:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement>)=>void;
            onOpen?: () => void;
            onClose?: () => void;
            elementHeader?:JSX.Element;
            elementFooter?:JSX.Element;
            floatingConfig?:dropdownFloatingConfigType;
        `)
        console.log(tamp)
        return(apiRefDropdownMenuList)
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
                <p className="text-title-lg"><span className="text-title-lg text-code">DropdownMenu</span></p>
                <p>Dropdown component that contain trigger and menu list item.</p>
                <Table
                    tableColumn={apiRefTableColumn}
                    tableData={apiRefDropdownMenuData}
                />
            </div>
        </>
    )
}

export default ApiReferenceSection