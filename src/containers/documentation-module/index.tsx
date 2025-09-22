import './styles.scss'
import Button from 'src/components/ui/button'
import { Suspense, useMemo } from "react"
import ThreeColumnTemplate from 'src/templates/three-column-template'
import { Route, Routes, useNavigate } from 'react-router'
import routes from './routes'
import { baseUrl, sideNavMenues } from './constant'

const DocsModule = () =>{
    const navigation = useNavigate()
    const menuComponent = useMemo(()=>{
        return([...sideNavMenues])
    },[])

    return(
        <ThreeColumnTemplate
            className='docs-page'
            leftSideContent={
                <>
                    {
                        menuComponent.map((section)=>(
                            <div key={section.id} style={{ marginBottom:'var(--space-400)'}}>
                                {
                                    (section.txtLable)&&(
                                        <p className='text-sub' style={{marginBottom:'var(--space-100)', marginLeft:"var(--space-100)"}}>{section.txtLable}</p>
                                    )
                                }
                                <div style={{display:'grid', gap:'var(--space-50)'}}>
                                    {
                                        (section.menu).map((menu)=>(
                                            <Button
                                                className='side-nav-button'
                                                appearance='subtle'
                                                key={menu.id}
                                                txtLabel={menu.txtLable}
                                                onClick={()=>{navigation(`${baseUrl}${menu.to}`)}}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </>
            }
            rightSideContent={<></>}
        >
            <Suspense fallback={<div>Loading…</div>}>
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