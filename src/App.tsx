import './App.scss'
import { useContext, useMemo } from 'react';
import Button from './components/button';
import { PiCircleBold, PiCircleDashedBold, PiCopyBold, PiDotsThreeBold, PiPencilBold, PiStarFourBold, PiXCircleBold } from 'react-icons/pi';
import IconButton from './components/icon-button';
import { GlobalContext, type _GlobalContextType } from './context/global-context';
import { BiSquare, BiSquareRounded } from 'react-icons/bi';
import SplitButton from './components/split-button';
import DropdownMenu from './components/dropdown-menu';

function App() {
    const {
        appTheme,
        toggleGlobalPrimary,
        toggleGlobalTheme,
        toggleGlobalTone,
        toggleGlobalShape,
    } = useContext(GlobalContext) as _GlobalContextType
    
    const colors = useMemo(()=>{
        return ['rose', 'red', 'orange', 'yellow', 'lime', 'green', 'emerald', 'teal', 'blue', 'purple', 'magenta', 'grey', 'stone', 'black']
    },[])
    const colorLevel = useMemo(()=>{
        return [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    },[])
    const surfaceLevel = useMemo(()=>{
        return [5,4,3,2,1]
    },[])
    return (
        <div>
            <div style={{height:'200px', padding:"var(--space-300)"}}>
                <div style={{display:'flex'}}>
                    <Button 
                        txtLabel='Hello World'
                        isDisabled
                    />
                    <Button 
                        txtLabel='Hello World'
                        isSelected
                    />
                    <Button 
                        txtLabel='Hello World'
                    />
                    <Button 
                        txtLabel='Hello World'
                        apperance='primary'
                    />
                    <Button 
                        txtLabel='Hello World'
                        apperance='subtle'
                    />
                </div>
                
                <div style={{display:'flex'}}>
                    <Button
                        iconBefore={<PiStarFourBold/>}
                        txtLabel='Hello'
                    />
                    <Button
                        iconAfter={<PiStarFourBold/>}
                        txtLabel='Hello'
                    />
                </div>
                <div style={{display:'flex'}}>
                    <IconButton 
                        icon={<PiStarFourBold/>}
                        txtLabel='Hello World'
                        isDisabled
                    />
                    <IconButton 
                        icon={<PiStarFourBold/>}
                        txtLabel='Hello World'
                        isSelected
                    />
                    <IconButton 
                        icon={<PiStarFourBold/>}
                        txtLabel='Hello World'
                    />
                    <IconButton 
                        icon={<PiStarFourBold/>}
                        txtLabel='Hello World'
                        apperance='primary'
                    />
                    <IconButton 
                        icon={<PiStarFourBold/>}
                        txtLabel='Hello World'
                        apperance='subtle'
                    />
                </div>
                <div style={{display:'flex'}}>
                    <SplitButton
                        txtLabel='Hello World'
                        options={[
                            {id:'duplicate', txtLabel:'Duplicate', icon:<PiCopyBold/>, isDisabled:true},
                            {id:'edit', txtLabel:'Edit', icon:<PiPencilBold/>},
                            {id:'hide', txtLabel:'Hide', icon:<PiCircleDashedBold/>},
                            {id:'delete', txtLabel:'Delete', icon:<PiXCircleBold/>},
                        ]}
                        onClick={(id)=>{console.log(id)}}
                    />
                </div>
                <div>
                    <DropdownMenu
                        options={[
                            {id:'duplicate', txtLabel:'Duplicate', icon:<PiCopyBold/>, isDisabled:true},
                            {id:'edit', txtLabel:'Edit', icon:<PiPencilBold/>},
                            {id:'hide', txtLabel:'Hide', icon:<PiCircleDashedBold/>},

                            {id:"modified", type:"separator", txtLabel:''},
                            {id:'delete', txtLabel:'Delete', icon:<PiXCircleBold/>},
                            {
                                id:'other', 
                                txtLabel:'Others', 
                                icon:<PiDotsThreeBold/>, 
                                childMenu:[
                                    {id:'a', txtLabel:'A'},
                                    {id:'b', txtLabel:'B'},
                                    {id:'c', txtLabel:'C'},
                                    {
                                        id:'d', 
                                        txtLabel:'D',
                                        childMenu:[
                                            {id:'a', txtLabel:'A'},
                                            {id:'b', txtLabel:'B'},
                                            {id:'c', txtLabel:'C'},
                                        ]
                                    },
                                ]
                            }
                        ]}
                        trigger={
                            <Button
                                txtLabel={"Hello"}
                            />
                        }
                        onClick={(idButton)=>{console.log(idButton)}}
                    />
                </div>
            </div>
            <div
                style={{
                    padding:'30px',
                    display:'flex',
                    gap:'var(--space-300)'
                }}
            >
                <div
                    style={{
                        backgroundColor:'var(--clr-surface-2)',
                        border:'0px solid var(--clr-border)',
                        padding:'20px',
                        minWidth:'200px',
                        borderRadius:'10px',
                        display:'flex',
                        flexDirection:"column",
                        gap:"20px"
                    }}
                >
                    <div
                        style={{
                            backgroundColor:'var(--clr-surface-3)',
                            border:'0px solid var(--clr-border)',
                            padding:'20px',
                            minWidth:'200px',
                            borderRadius:'10px'
                        }}
                    >
                        <SplitButton
                            txtLabel='Toggle Theme'
                            options={[
                                {id:'circle', txtLabel:'Toggle Shape Circle', icon:<PiCircleBold/>},
                                {id:'rounded', txtLabel:'Toggle Shape Rounded', icon:<BiSquareRounded/>},
                                {id:'box', txtLabel:'Toggle Shape Box', icon:<BiSquare/>},
                            ]}
                            apperance='neutral'
                            optionSelected={[appTheme.split('-')[3]??'-']}
                            onClick={(id)=>{
                                if(id==='_main'){
                                    toggleGlobalTheme()
                                }else if(
                                    id==='circle'||
                                    id==='rounded'||
                                    id==='box'
                                ){
                                    toggleGlobalShape(id)
                                }
                            }}
                        />
                        <p className='hello'>{appTheme.split('-')[0]??'-'}</p>
                        <p className='hello'>{appTheme.split('-')[1]??'-'}</p>
                        <p className='hello'>{appTheme.split('-')[2]??'-'}</p>
                        <p className='hello'>{appTheme.split('-')[3]??'-'}</p>
                        <div
                            style={{
                                display:'grid',
                                gridTemplateColumns:'1fr 1fr'
                            }}
                        >
                            <div>
                                {
                                    colors.map((clr)=>(
                                        <div 
                                            key={clr} 
                                            style={{
                                                display:'flex',
                                                height:'40px',
                                                width:'40px',
                                                background:`var(--clr-${clr}-500)`,
                                                border:`2px solid ${appTheme.includes(`tonal_${clr}`)?'var(--surface-3)':'transparent'}`
                                            }}
                                            onClick={()=>{toggleGlobalTone(clr)}}
                                        >
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                {
                                    colors.map((clr)=>(
                                        <div 
                                            key={clr} 
                                            style={{
                                                display:'flex',
                                                height:'40px',
                                                width:'40px',
                                                background:`var(--clr-${clr}-500)`,
                                                border:`2px solid ${appTheme.includes(`primary_${clr}`)?'var(--surface-3)':'transparent'}`
                                            }}
                                            onClick={()=>{toggleGlobalPrimary(clr)}}
                                        >
                                            
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        colors.map((clr)=>(
                            <div key={clr} style={{display:'flex'}}>
                                {
                                    colorLevel.map((lvl)=>(
                                        <div key={`${lvl}`} style={{height:'40px',width:'40px',background:`var(--clr-${clr}-${lvl})`, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={()=>{toggleGlobalPrimary(clr)}}>
                                            <span style={{color:(appTheme.includes('light')?((lvl<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((lvl<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))}}>o</span>
                                        </div>
                                    ))
                                }
                                {
                                    surfaceLevel.map((sfLvl)=>(
                                        <div key={`${sfLvl}`} style={{height:'40px',width:'40px',background:`var(--clr-surface-${clr}-${sfLvl})`, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={()=>{toggleGlobalPrimary(clr)}}>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default App
