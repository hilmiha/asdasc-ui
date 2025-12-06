import clsx from 'clsx'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import './styles.scss'
import { useContext, useEffect, useRef, useState } from "react"
import { PiCaretRightBold, PiSidebar } from 'react-icons/pi'
import BottomSheet from 'src/components/ui/bottom-sheet'
import { ThreeColumnTemplateContext, type ThreeColumnTemplateContextValue } from './context'
import Button from 'src/components/ui/button'

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
    const [isShowMobileNavContent, setIsShowMobileNavContent] = useState(true)
    const [isShowLeftContent, setIsShowLeftContent] = useState(false)
    const [isShowRightContent, setIsShowRightContent] = useState(false)

    const ctxValue: ThreeColumnTemplateContextValue = {
        pageContentBox,
        isShowLeftContent,
        setIsShowLeftContent,
        isShowRightContent, 
        setIsShowRightContent,
    };

    const lastScrollTop = useRef(0);

    useEffect(()=>{
        pageContentBox.current?.scrollTo({top:0})
    },[location.pathname])


    const handleScroll = () => {
        const div = pageContentBox.current;
        if (!div) return;
        if(div.scrollHeight<1000) return;

        const currentScrollTop = div.scrollTop;
        if (currentScrollTop > lastScrollTop.current && isShowMobileNavContent) {
            setIsShowMobileNavContent(false);
        } else if(currentScrollTop < lastScrollTop.current && !isShowMobileNavContent) {
            setIsShowMobileNavContent(true);
        }

        lastScrollTop.current = currentScrollTop;
    };

    useEffect(()=>{
        if(!isShowMobileNavContent && screenSize!=='mobile'){
            setIsShowMobileNavContent(true);
        }
    },[screenSize])

    return(
        <ThreeColumnTemplateContext.Provider value={ctxValue}>
            <div 
                className={clsx(
                    'three-column-template', 
                    screenSize,
                    className
                )}
                style={{
                    gridTemplateColumns:(screenSize==='laptop' || screenSize==='tablet')?'270px 1fr':('1fr'),
                    gridTemplateRows:(screenSize==='mobile')?('max-content 1fr'):('1fr')
                }}
            >
                {
                    (screenSize==='laptop' || screenSize==='tablet')?(
                        <div className='left-side-content-box'>
                            {leftSideContent}
                        </div>
                    ):(
                        <div className={`left-side-content-box-mobile ${isShowMobileNavContent?('show-mobile-nav'):('hide-mobile-nav')}`}>
                            <Button
                                iconBefore={<PiSidebar className='global-icon'/>}
                                txtLabel='Menu'
                                appearance='subtle'
                                onClick={()=>{setIsShowLeftContent(true)}}
                                isSelected={isShowLeftContent}
                                style={{
                                    button:{
                                        margin:'0px',
                                        padding:"var(--space-25) var(--space-100)",
                                        minHeight:'fit-content'
                                    },
                                    textLabel:{
                                        fontWeight:'var(--font-weight-normal)',
                                        fontSize:'var(--font-size-sm)'
                                    }
                                }}
                            />
                            <Button
                                iconAfter={<PiCaretRightBold className='global-icon'/>}
                                txtLabel='On This Page'
                                appearance='subtle'
                                onClick={()=>{setIsShowRightContent(true)}}
                                isSelected={isShowRightContent}
                                style={{
                                    button:{
                                        margin:'0px',
                                        padding:"var(--space-25) var(--space-100)",
                                        minHeight:'fit-content'
                                    },
                                    textLabel:{
                                        fontWeight:'var(--font-weight-normal)',
                                        fontSize:'var(--font-size-sm)'
                                    }
                                }}
                            />
                            
                            <BottomSheet
                                className='left-side-content-box-bottom-sheet'
                                isOpen={isShowLeftContent}
                                setIsOpen={setIsShowLeftContent}
                            >
                                {leftSideContent}
                            </BottomSheet>
                            <BottomSheet
                                className='left-side-content-box-bottom-sheet'
                                isOpen={isShowRightContent}
                                setIsOpen={setIsShowRightContent}
                            >
                                {rightSideContent}
                            </BottomSheet>
                        </div>
                    )}
                <div 
                    className='main-content-box' 
                    ref={pageContentBox}
                    onScroll={screenSize==='mobile'?(handleScroll):(undefined)}
                >
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