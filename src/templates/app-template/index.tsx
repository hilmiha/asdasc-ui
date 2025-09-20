import './styles.scss'
import { useContext, useState, type JSX } from "react"
import { useNavigate } from "react-router"
import Button from "../../components/button"
import { PiPaintRollerBold, PiPaintRollerFill, PiSailboat } from 'react-icons/pi'
import IconButton from '../../components/icon-button'
import Dropdown from '../../components/dropdown'
import AppThemeSetting from './app-theme-settings'
import { GlobalContext, type _GlobalContextType } from '../../context/global-context'
import BottomSheet from '../../components/bottom-sheet'

const AppTemplate = ({
    children
}:{
    children:JSX.Element
}) =>{
    const {
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    const navigate = useNavigate()

    const [isShowThemeSetting, setIsShowThemeSetting] = useState(false)
    
    return(
        <div className="app-template">
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