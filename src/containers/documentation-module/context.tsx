import { createContext, useContext } from "react"
import type { rightSideSectionType } from "."

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
export const DocModuleContext = createContext<DocModuleContextValue | null>(null);

export const useDocModule = () => {
    const ctx = useContext(DocModuleContext);
    if (!ctx) throw new Error('useDocModule must be used inside <DocModuleContext>'); //after i edit some of my code and save it. react hot reload. i move to page taht use this context it gives this error. it back to normal if i refresh the page. error only when hot reload
    return ctx;
};