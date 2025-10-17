import { createContext, useContext } from "react";

//Context
export interface ThreeColumnTemplateContextValue {
    pageContentBox: React.RefObject<HTMLDivElement | null>;
    isShowLeftContent: boolean;
    setIsShowLeftContent: React.Dispatch<React.SetStateAction<boolean>>;
    isShowRightContent: boolean;
    setIsShowRightContent: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ThreeColumnTemplateContext = createContext<ThreeColumnTemplateContextValue | null>(null);
export const useThreeColumnTemplate = () => {
    const ctx = useContext(ThreeColumnTemplateContext);
    if (!ctx) throw new Error('useThreeColumnTemplate must be used inside <ThreeColumnTemplate>');
    return ctx;
};