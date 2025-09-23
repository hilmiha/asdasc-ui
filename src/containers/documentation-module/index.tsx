import './styles.scss'
import { Suspense } from "react"
import ThreeColumnTemplate from 'src/templates/three-column-template'
import { Route, Routes } from 'react-router'
import routes from './routes'
import LeftSideContent from './sections/left-side-content'
import PageSkeleton from './sections/page-skeleton'

const DocsModule = () =>{
    return(
        <ThreeColumnTemplate
            className='docs-module'
            leftSideContent={
                <LeftSideContent/>
            }
            rightSideContent={<></>}
        >
            <Suspense fallback={<PageSkeleton/>}>
                <Routes>
                    {
                        routes.map((itmRoute)=>(
                            <Route key={itmRoute.key} path={itmRoute.path} element={itmRoute.component}/>
                        ))         
                    }
                </Routes>
            </Suspense>
        </ThreeColumnTemplate>
    )
}

export default DocsModule