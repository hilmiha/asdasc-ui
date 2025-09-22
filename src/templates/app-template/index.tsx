import './styles.scss'
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Button from "src/components/ui/button"
import { PiPaintRollerBold, PiPaintRollerFill, PiSailboat } from 'react-icons/pi'
import IconButton from 'src/components/ui/icon-button'
import Dropdown from 'src/components/ui/dropdown'
import AppThemeSetting from './app-theme-settings'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import BottomSheet from 'src/components/ui/bottom-sheet'
import clsx from 'clsx'

const AppTemplate = ({
    children
}:{
    children:React.ReactNode,
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const navigate = useNavigate()

    const [isShowThemeSetting, setIsShowThemeSetting] = useState(false)
    
    return(
        <div className={clsx("app-template", screenSize)}>
            <div className='top-banner-box'>

            </div>
            <div className="top-nav-box">
                <div className='logo-box'>
                    <PiSailboat size={32} color='var(--clr-primary-600)'/>
                </div>
                <div className='nav-buttons-box'>
                    <Button
                        className='top-nav-button'
                        appearance='subtle'
                        txtLabel={'Home'}
                        onClick={()=>{navigate('/')}}
                    />
                    <Button
                        className='top-nav-button'
                        appearance='subtle'
                        txtLabel={'Docs'}
                        onClick={()=>{navigate('/docs')}}
                    />
                </div>
                <div className='app-action-box'>
                    {
                        (screenSize==='laptop')?(
                            <Dropdown
                                trigger={
                                    <IconButton
                                        className='top-nav-button'
                                        appearance='subtle'
                                        icon={<PiPaintRollerBold className='global-icon'/>}
                                        txtLabel='Theme'
                                    />
                                }
                                floatingConfig={{
                                    width:340
                                }}
                            >
                                <AppThemeSetting/>
                            </Dropdown>
                        ):(
                            <>
                                <IconButton
                                    className='top-nav-button'
                                    appearance='subtle'
                                    icon={<PiPaintRollerBold className='global-icon'/>}
                                    txtLabel='Theme'
                                    onClick={()=>{setIsShowThemeSetting(true)}}
                                />
                                <BottomSheet
                                    isOpen={isShowThemeSetting}
                                    setIsOpen={setIsShowThemeSetting}
                                    iconTitle={<PiPaintRollerFill className='global-icon'/>}
                                    txtTitle='App Theme Setting'
                                    floatingConfig={{
                                        defaultSnapPoint:'FULL',
                                    }}
                                >
                                    <AppThemeSetting/>
                                </BottomSheet>
                            </>
                        )
                    }
                    
                </div>
            </div>
            <div className="app-pages-box">
                {children}
            </div>
        </div>
    )
}

export default AppTemplate