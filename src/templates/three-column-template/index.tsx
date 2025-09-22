import clsx from 'clsx'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import './styles.scss'
import { useContext, useState } from "react"
import IconButton from 'src/components/ui/icon-button'
import { PiListBold } from 'react-icons/pi'
import BottomSheet from 'src/components/ui/bottom-sheet'

const ThreeColumnTemplate = ({
    className,
    leftSideContent,
    children,
    rightSideContent
}:{
    className?:string,
    leftSideContent:React.ReactElement
    children:React.ReactElement
    rightSideContent:React.ReactElement
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType

    const [isShowLeftContent, setIsShowLeftContent] = useState(false)
    return(
        <div 
            className={clsx(
                'three-column-template', 
                screenSize,
                className
            )}
            style={{
                gridTemplateColumns:(screenSize==='laptop')?'240px 1fr min(25vw, 280px)':(screenSize==='tablet')?('240px 1fr'):('1fr'),
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
            <div className='doc-pages-box'>
                <div>
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
    )
}

export default ThreeColumnTemplate