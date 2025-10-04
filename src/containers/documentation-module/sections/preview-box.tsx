import { useContext } from "react"
import { GlobalContext, type _GlobalContextType } from "src/context/global-context"

const PreviewBox = ({
    children
}:{
    children:React.ReactNode
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    return(
        <div className={`preview-box ${screenSize}`}>
            {children}
        </div>
    )
}

export default PreviewBox