import React, { useCallback, useEffect, useMemo, useState } from 'react'

export const GlobalContext = React.createContext<_GlobalContextType | null>(null);

const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [globalTheme, setGlobalTheme] = useState<string>('dark');
    const [globalTone, setGlobalTone] = useState<string>('tonal_blue');
    const [globalPrimary, setGlobalPrimary] = useState<string>('primary_emerald');
    const [globalShape, setGlobalShape] = useState<globalShapeType>('rounded');

    const appTheme = useMemo(()=>{
        return {
            globalTheme,
            globalTone,
            globalPrimary,
            globalShape
        }
    },[globalTheme, globalTone, globalPrimary, globalShape])
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', `${globalTheme}-tonal_${globalTone}-primary_${globalPrimary}-${globalShape}`);
    }, [globalTheme, globalTone, globalPrimary, globalShape]);

    const toggleGlobalTheme = useCallback(() => {
        setGlobalTheme(globalTheme.includes('light') ? 'dark' : 'light');
    },[globalTheme])

    const toggleGlobalTone = useCallback((color:string) => {
        setGlobalTone(`tonal_${color}`);
    },[])

    const toggleGlobalPrimary = useCallback((color:string) => {
        setGlobalPrimary(`primary_${color}`);
    },[])

    const toggleGlobalShape = useCallback((shape:globalShapeType) => {
        setGlobalShape(shape);
    },[])

    return (
        <GlobalContext.Provider value={{
            appTheme, 
            toggleGlobalTheme,
            toggleGlobalTone,
            toggleGlobalPrimary,
            globalShape,
            toggleGlobalShape,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;

export interface _GlobalContextType {
    appTheme:{
        globalTheme: string;
        globalTone: string;
        globalPrimary: string;
        globalShape: globalShapeType;
    };
    toggleGlobalTheme:()=>void;
    toggleGlobalTone:(color:string)=>void;
    toggleGlobalPrimary:(color:string)=>void;
    globalShape:globalShapeType;
    toggleGlobalShape:(shape:globalShapeType)=>void
}

export type globalShapeType = 'rounded' | 'box' | 'circle';