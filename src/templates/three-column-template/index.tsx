import clsx from 'clsx'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import './styles.scss'
import { createContext, useContext, useEffect, useRef, useState } from "react"
import IconButton from 'src/components/ui/icon-button'
import { PiListBold } from 'react-icons/pi'
import BottomSheet from 'src/components/ui/bottom-sheet'

interface _ThreeColumnTemplateProps {
    className?: string;
    leftSideContent: React.ReactNode;
    children: React.ReactNode;
    rightSideContent: React.ReactNode;
    footerContent?: React.ReactNode;
}

const ThreeColumnTemplate = ({
    className,
    leftSideContent,
    children,
    rightSideContent,
    footerContent,
}:_ThreeColumnTemplateProps) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    //scroll top when navigation change
    const pageContentBox = useRef<HTMLDivElement>(null)
    const [isShowLeftContent, setIsShowLeftContent] = useState(false)

    const ctxValue: ThreeColumnTemplateContextValue = {
        pageContentBox,
        isShowLeftContent,
        setIsShowLeftContent
    };

    useEffect(()=>{
        pageContentBox.current?.scrollTo({top:0})
    },[location.pathname])

    return(
        <ThreeColumnTemplateContext.Provider value={ctxValue}>
            <div 
                className={clsx(
                    'three-column-template', 
                    screenSize,
                    className
                )}
                style={{
                    gridTemplateColumns:(screenSize==='laptop' || screenSize==='tablet')?'240px 1fr':('1fr'),
                    gridTemplateRows:(screenSize==='mobile')?('max-content 1fr'):('1fr')
                }}
            >
                {
                    (screenSize==='laptop' || screenSize==='tablet')?(
                        <div className='left-side-content-box'>
                            {leftSideContent}
                        </div>
                    ):(
                        <div className='left-side-content-box-mobile'>
                            <IconButton
                                icon={<PiListBold className='global-icon'/>}
                                txtLabel='Show'
                                appearance='subtle'
                                isShowtooltip={false}
                                onClick={()=>{setIsShowLeftContent(true)}}
                                isSelected={isShowLeftContent}
                                style={{
                                    button:{
                                        margin:'0px'
                                    }
                                }}
                            />
                            <BottomSheet
                                className='left-side-content-box-bottom-sheet'
                                isOpen={isShowLeftContent}
                                setIsOpen={setIsShowLeftContent}
                                floatingConfig={{
                                    defaultSnapPoint:'FULL'
                                }}
                            >
                                {leftSideContent}
                            </BottomSheet>
                        </div>
                    )}
                <div className='main-content-box' ref={pageContentBox}>
                    <div className='doc-pages-box'>
                        <div className='page-box'>
                            <div className='page-content'>
                                {children}
                            </div>
                        </div>
                        {
                            (screenSize==='laptop')&&(
                                <div className='right-side-content-box'>
                                    {rightSideContent}
                                </div>
                            )
                        }
                    </div>
                    {
                        (footerContent)&&(
                            <div className='footer-content-box'>
                                {footerContent}
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </ThreeColumnTemplateContext.Provider>
    )
}

export default ThreeColumnTemplate

//Context
export interface ThreeColumnTemplateContextValue {
    pageContentBox: React.RefObject<HTMLDivElement | null>;
    isShowLeftContent: boolean;
    setIsShowLeftContent: React.Dispatch<React.SetStateAction<boolean>>;
}
const ThreeColumnTemplateContext = createContext<ThreeColumnTemplateContextValue | null>(null);
export const useThreeColumnTemplate = () => {
    const ctx = useContext(ThreeColumnTemplateContext);
    if (!ctx) throw new Error('useThreeColumnTemplate must be used inside <ThreeColumnTemplate>');
    return ctx;
};