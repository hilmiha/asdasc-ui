import './styles.scss'
import { createContext, Suspense, useContext, useEffect, useRef, useState } from "react"
import ThreeColumnTemplate from 'src/templates/three-column-template'
import { Route, Routes } from 'react-router'
import routes from './routes'
import LeftSideContent from './sections/left-side-content'
import PageSkeleton from './sections/page-skeleton'
import RightSideContent from './sections/right-side-content'

export type rightSideSectionType = {id:string, txtLabel:string, isSub:boolean}

const DocsModule = () =>{
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

    const ctxValue: DocModuleContextValue = {
        sectionList, 
        setSectionList,
        sectionOn, 
        setSectionOn,
        sectionRefs,
        setSectionRef,
        scrollToSection
    };

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
                rootMargin: "-20% 0px -70% 0px" 
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
    }, [location.pathname])

    return(
        <DocModuleContext.Provider value={ctxValue}>
            <ThreeColumnTemplate
                className='docs-module'
                leftSideContent={
                    <LeftSideContent/>
                }
                rightSideContent={<RightSideContent 
                    ctxValue={ctxValue}
                />}
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
        </DocModuleContext.Provider>
    )
}

export default DocsModule

//Context
export interface DocModuleContextValue {
    sectionList: rightSideSectionType[]
    setSectionList: React.Dispatch<React.SetStateAction<rightSideSectionType[]>>
    sectionOn:string
    setSectionOn: React.Dispatch<React.SetStateAction<string>>
    sectionRefs: React.RefObject<Record<string, HTMLDivElement | null>>
    setSectionRef: (id: string) => (el: HTMLDivElement | null) => void
    scrollToSection: (id: string) => void
}
const DocModuleContext = createContext<DocModuleContextValue | null>(null);
export const useDocModule = () => {
    const ctx = useContext(DocModuleContext);
    if (!ctx) throw new Error('useDocModule must be used inside <DocModuleContext>');
    return ctx;
};