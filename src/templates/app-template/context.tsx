import { createContext, useContext } from "react";

//Context
export interface AppTemplateContextValue {
    isShowTopnav: boolean;
    setIsShowTopnav: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AppTemplateContext = createContext<AppTemplateContextValue | null>(null);
export const useAppTemplate = () => {
    const ctx = useContext(AppTemplateContext);
    if (!ctx) throw new Error('useAppTemplate must be used inside <AppTemplate>');
    return ctx;
};