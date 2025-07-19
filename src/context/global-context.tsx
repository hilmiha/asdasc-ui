import React, { useEffect, useMemo, useState } from 'react'

export const GlobalContext = React.createContext<_GlobalContextType | null>(null);

const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [globalTheme, setGlobalTheme] = useState<string>('dark');
    const [globalTone, setGlobalTone] = useState<string>('tonal_blue');
    const [globalPrimary, setGlobalPrimary] = useState<string>('primary_emerald');
    const [globalShape, setGlobalShape] = useState<globalShapeType>('rounded');

    const appTheme = useMemo(()=>{
        return `${globalTheme}-${globalTone}-${globalPrimary}-${globalShape}`
    },[globalTheme, globalTone, globalPrimary, globalShape])
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', `${globalTheme}-tonal_${globalTone}-primary_${globalPrimary}-${globalShape}`);
    }, [globalTheme, globalTone, globalPrimary, globalShape]);

    const toggleGlobalTheme = () => {
        setGlobalTheme(globalTheme.includes('light') ? 'dark' : 'light');
    }
    const toggleGlobalTone = (color:string) => {
        setGlobalTone(`tonal_${color}`);
    }
    const toggleGlobalPrimary = (color:string) =>{
        setGlobalPrimary(`primary_${color}`)
    }
    const toggleGlobalShape = (shape:globalShapeType) =>{
        setGlobalShape(shape)
    }

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
    appTheme:string;
    toggleGlobalTheme:()=>void;
    toggleGlobalTone:(color:string)=>void;
    toggleGlobalPrimary:(color:string)=>void;
    globalShape:globalShapeType;
    toggleGlobalShape:(shape:globalShapeType)=>void
}

export type globalShapeType = 'rounded' | 'box' | 'circle';