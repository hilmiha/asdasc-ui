import './styles.scss'
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import Button from "src/components/ui/button"
import { PiListBold, PiPaintRollerBold, PiPaintRollerFill } from 'react-icons/pi'
import IconButton from 'src/components/ui/icon-button'
import Dropdown from 'src/components/ui/dropdown'
import AppThemeSetting from './app-theme-settings'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import BottomSheet from 'src/components/ui/bottom-sheet'
import clsx from 'clsx'
import DropdownMenu from 'src/components/ui/dropdown-menu'
import appLogo from 'src/assets/hilmi.png';

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
            <div className={`top-nav-box`}>
                <div className='logo-box'>
                    {
                        (screenSize!=='mobile')?(
                            <IconButton
                                className='top-nav-button'
                                appearance='subtle'
                                icon={
                                    <img src={appLogo} height={32} style={{borderRadius:'32px'}}/>
                                }
                                txtLabel='Home'
                                onClick={()=>{navigate('/')}}
                            />
                        ):(
                            <DropdownMenu
                                trigger={
                                    <IconButton
                                        className='top-nav-button'
                                        appearance='subtle'
                                        icon={<PiListBold className='global-icon'/>}
                                        txtLabel='navigation'
                                    />
                                }
                                options={[
                                    // {id:'/', txtLabel:'Home'},
                                    {id:'/docs', txtLabel:'Documentation'},
                                    {id:'/generate-colors', txtLabel:'Generate Colors'},
                                ]}
                                elementHeader={
                                    <div style={{padding:'var(--space-0) var(--space-200)', display:'flex', alignItems:'center', gap:'var(--space-150)', marginBottom:'var(--space-300)'}}>
                                        <img src={appLogo} height={32} style={{borderRadius:'32px'}}/>
                                        <p className='text-title-lg'>ASDAS-UI</p>
                                    </div>
                                }
                                onClick={(id)=>{navigate(id)}}
                                floatingConfig={{
                                    isCloseOnItemClicked:true
                                }}
                            />
                        )
                    }
                </div>
                <div className='nav-buttons-box'>
                    {
                        (screenSize!=='mobile')?(
                            <>
                                {/* <Button
                                    className='top-nav-button'
                                    appearance='subtle'
                                    txtLabel={'Home'}
                                    onClick={()=>{navigate('/')}}
                                /> */}
                                <Button
                                    className='top-nav-button'
                                    appearance='subtle'
                                    txtLabel={'Documentation'}
                                    onClick={()=>{navigate('/docs')}}
                                />
                                <Button
                                    className='top-nav-button'
                                    appearance='subtle'
                                    txtLabel={'Generate Colors'}
                                    onClick={()=>{navigate('/generate-colors')}}
                                />
                            </>
                        ):(
                            <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                                <IconButton
                                    className='top-nav-button'
                                    appearance='subtle'
                                    icon={
                                        <img src={appLogo} height={32} style={{borderRadius:'32px'}}/>
                                    }
                                    txtLabel='Home'
                                    onClick={()=>{navigate('/')}}
                                />
                            </div>
                        )
                    }
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
            <div className={`app-pages-box`}>
                {children}
            </div>
        </div>
    )
}

export default AppTemplate