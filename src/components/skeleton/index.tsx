import './styles.scss'
import clsx from "clsx"
import { useContext } from "react"
import { GlobalContext, type _GlobalContextType } from "../../context/global-context"
import type { globalShapeType } from "../_types"

const Skeleton = ({
    className = undefined,
    shape = undefined,
    width = undefined,
    height = undefined,
    style = undefined
}:_Skeleton) =>{

    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType

    return(
        <div
            className={
                clsx(`skeleton`, (shape)?(shape):(globalShape), className)
            }
            style={{
                width:(typeof width === 'number')?(`${width}px`):(width),
                height:(typeof height === 'number')?(`${height}px`):(height),
                ...style
            }}
        >
            <p>...</p>
        </div>
    )
}

export default Skeleton

interface _Skeleton {
    className?: string,
    shape?:globalShapeType,
    width?:string | number
    height?:string | number
    style?:React.CSSProperties,
}