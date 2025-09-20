import './styles.scss'
import type { JSX } from "react"

const DocsTemplate = ({
    children
}:{
    children:JSX.Element
}) =>{
    return(
        <div className='docs-template'>
            <div className='side-nav-box'>
                sidenave
            </div>
            <div className='doc-pages-box'>
                {children}
            </div>
        </div>
    )
}

export default DocsTemplate