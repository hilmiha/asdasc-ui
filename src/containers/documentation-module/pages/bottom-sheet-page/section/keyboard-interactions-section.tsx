import { useMemo } from "react"
import Table, { type tableColumnType, type tableRowDataType } from "src/components/ui/table"
import { useDocModule } from "src/containers/documentation-module"
import { keyboardInteractionsColumnList, keyboardInteractionsList } from "../constant"

const KeyboardInteractionsSection = () =>{
    const {
        setSectionRef
    } = useDocModule()

    const keyboardInteractionsColumn = useMemo<tableColumnType[]>(()=>{
        return(keyboardInteractionsColumnList)
    },[])

    const keyboardInteractionsData = useMemo<tableRowDataType[]>(()=>{
        return(keyboardInteractionsList)
    },[])

    return(
        <>
            <div 
                id="keyboard" 
                ref={setSectionRef('keyboard')}
            >
                <p className="text-title-xl">Keyboard Interactions</p>
            </div>
            <div
                style={{
                    display:'grid',
                    gap:'var(--space-150)'
                }}
            >
                <p>This component have several keyboard interaction for accesibility.</p>
                <Table
                    tableColumn={keyboardInteractionsColumn}
                    tableData={keyboardInteractionsData}
                />
            </div>
        </>
    )
}

export default KeyboardInteractionsSection