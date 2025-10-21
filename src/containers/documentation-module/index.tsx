import './styles.scss'
import { Suspense, useEffect, useRef, useState } from "react"
import ThreeColumnTemplate from 'src/templates/three-column-template'
import { Route, Routes } from 'react-router'
import routes from './routes'
import LeftSideContent from './sections/left-side-content'
import PageSkeleton from './sections/page-skeleton'
import RightSideContent from './sections/right-side-content'
import { DocModuleContext } from './context'

export type rightSideSectionType = {id:string, txtLabel:string, isSub:boolean}

const DocsModule = () =>{
    const [pageOn, setPageOn] = useState<string>('')

    const [sectionList, setSectionList] = useState<rightSideSectionType[]>([])
    const [sectionOn, setSectionOn] = useState<string>('')
    
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
        sectionRefs.current[id] = el
    }

    const scrollToSection = (id: string) => {
        const el = sectionRefs.current[id]
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    useEffect(() => {
        const ids = Object.keys(sectionRefs.current).filter((id) => sectionRefs.current[id] !== null)
        if(ids.length === 0){
            return
        }

        // Main observer
        const mainObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if(visible.length > 0) {
                    const id = visible[0].target.getAttribute("id")

                    if(id){
                        setSectionOn(id)
                    }
                }
            },
            { 
                threshold: 0, 
                rootMargin: "-20% 0px -90% 0px" 
            }
        )

        // Attach observers
        ids.forEach((id) => {
            const el = sectionRefs.current[id]
            if(!el){
                return
            }

            mainObserver.observe(el)
        })

        return () => {
            mainObserver.disconnect()
        }
    }, [location.pathname, JSON.stringify(sectionList)])

    return(
        <DocModuleContext.Provider value={{
            pageOn, 
            setPageOn,
            sectionList, 
            setSectionList,
            sectionOn, 
            setSectionOn,
            sectionRefs,
            setSectionRef,
            scrollToSection
        }}>
            <ThreeColumnTemplate
                className='docs-module'
                leftSideContent={
                    <LeftSideContent 
                        pageOn={pageOn}
                    />
                }
                rightSideContent={
                    <RightSideContent 
                        sectionOn={sectionOn}
                        sectionList={sectionList}
                        scrollToSection={scrollToSection}
                    />
                }
            >
                <Suspense fallback={<PageSkeleton/>}>
                    <Routes>
                        {
                            routes.map((itmRoute)=>(
                                <Route key={itmRoute.key} path={itmRoute.path} element={itmRoute.component}/>
                            ))         
                        }
                    </Routes>
                    <div style={{marginTop:'10vh', marginBottom:'20vh'}}>
                        <p>Built with ❤️ and the desire to understand.</p>
                        <a style={{color:'var(--clr-primary-700)'}} href='https://github.com/hilmiha'>Hilmi Hidayat Arfisko</a> 
                    </div>
                </Suspense>
            </ThreeColumnTemplate>
        </DocModuleContext.Provider>
    )
}

export default DocsModule