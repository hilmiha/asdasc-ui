import './styles.scss'
import { Route, Routes } from 'react-router'
import AppTemplate from 'src/templates/app-template'
import GlobalProvider from 'src/context/global-context.tsx'
import { Suspense } from 'react'
import routes from './routes'

const MainModule = () =>{

    return(
        <GlobalProvider>
            <AppTemplate>
                <Suspense fallback={<div>Loading…</div>}>
                    <Routes>
                        {
                            routes.map((itmRoute)=>(
                                <Route key={itmRoute.key} path={itmRoute.path} element={itmRoute.component}/>
                            ))         
                        }
                    </Routes>
                </Suspense>
            </AppTemplate>
        </GlobalProvider>
    )
}

export default MainModule