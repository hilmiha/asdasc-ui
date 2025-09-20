import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { globalShapeType } from '../components/_types';

export const GlobalContext = React.createContext<_GlobalContextType | null>(null);

const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [globalTheme, setGlobalTheme] = useState<string>('dark');
    const [globalTone, setGlobalTone] = useState<string>('tonal_blue');
    const [globalPrimary, setGlobalPrimary] = useState<string>('primary_emerald');
    const [globalShape, setGlobalShape] = useState<globalShapeType>('rounded');
    const [screenSize, setScreenSize] = useState<ScreenSizeType>('mobile');
    const [globalFontSize, setGlobalFontSize] = useState<string>('medium');

    // Function to determine screen size category
    const getScreenSize = useCallback((width: number): ScreenSizeType => {
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'laptop';
    }, []);

    // Initialize screen size and set up resize listener
    useEffect(() => {
        const handleResize = () => {
            const newSize = getScreenSize(window.innerWidth);
            setScreenSize(newSize);
        };

        // Set initial screen size
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const appTheme = useMemo(()=>{
        return {
            globalTheme,
            globalTone,
            globalPrimary,
            globalShape,
            globalFontSize,
            screenSize
        }
    },[globalTheme, globalTone, globalPrimary, globalShape, screenSize, globalFontSize])
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', `${globalTheme}-tonal_${globalTone}-primary_${globalPrimary}-${globalShape}`);
        document.documentElement.setAttribute('data-screen-size', screenSize);
        document.documentElement.setAttribute('data-font-size', globalFontSize);
    }, [globalTheme, globalTone, globalPrimary, globalShape, screenSize, globalFontSize]);

    const toggleGlobalTheme = useCallback((theme?:'light'|'dark') => {
        setGlobalTheme(theme?(theme):(globalTheme.includes('light') ? 'dark' : 'light'));
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

    const toggleGlobalFontSize = useCallback((size:string) => {
        setGlobalFontSize(size);
    },[])
    return (
        <GlobalContext.Provider value={{
            appTheme, 
            toggleGlobalTheme,
            toggleGlobalTone,
            toggleGlobalPrimary,
            globalShape,
            toggleGlobalShape,
            toggleGlobalFontSize,
            screenSize,
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
        globalFontSize:string;
        screenSize: ScreenSizeType;
    };
    toggleGlobalTheme:(theme?:'light'|'dark')=>void;
    toggleGlobalTone:(color:string)=>void;
    toggleGlobalPrimary:(color:string)=>void;
    globalShape:globalShapeType;
    toggleGlobalShape:(shape:globalShapeType)=>void;
    toggleGlobalFontSize:(size:string)=>void;
    screenSize: ScreenSizeType;
}

export type ScreenSizeType = 'mobile' | 'tablet' | 'laptop';