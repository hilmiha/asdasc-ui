import './App.scss'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Button from './components/button';
import { PiCircleBold, PiCircleDashedBold, PiCityBold, PiCopyBold, PiDotsThreeBold, PiPencilBold, PiPencilLineBold, PiStarFourBold, PiXCircleBold } from 'react-icons/pi';
import IconButton from './components/icon-button';
import { GlobalContext, type _GlobalContextType } from './context/global-context';
import { BiSquare, BiSquareRounded } from 'react-icons/bi';
import SplitButton from './components/split-button';
import DropdownMenu from './components/dropdown-menu';
import InputText from './components/input-text';
import type { fieldErrorType } from './components/_types';
import InputPassword from './components/input-password';
import InputSelection from './components/input-selection';

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

    const [form, setForm] = useState<{[key:string]:any}>({
        testText:'',
        testPassword:'',
        testTextNoSpace:'',
        testTextNumber:'',
        testTextNumberText:'',
        testSelection:[],
        testSelectionComboBox:[],
        testSelectionMulti:[],
    })
    const [formError, setFormError] = useState<{[key:string]:fieldErrorType}>({
        testText:{isError:false, errorMessage:''},
        testPassword:{isError:false, errorMessage:''},
        testTextNoSpace:{isError:false, errorMessage:''},
        testTextNumber:{isError:false, errorMessage:''},
        testTextNumberText:{isError:false, errorMessage:''},
        testSelection:{isError:false, errorMessage:''},
        testSelectionComboBox:{isError:false, errorMessage:''},
        testSelectionMulti:{isError:false, errorMessage:''},

    })
    const onChange = useCallback((key: string, newValue: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: newValue
        }));
    }, []);

    const onValidate = useCallback((key: string, error: fieldErrorType) => {
        setFormError((prev) => ({
            ...prev,
            [key]: error
        }));
    }, []); 

    return (
        <div>
            <div style={{padding:"var(--space-300)"}}>
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
                        appearance='primary'
                    />
                    <Button 
                        txtLabel='Hello World'
                        appearance='subtle'
                    />
                </div>
                
                <div style={{display:'flex'}}>
                    <Button
                        iconBefore={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello'
                    />
                    <Button
                        iconAfter={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello'
                    />
                </div>
                <div style={{display:'flex'}}>
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isDisabled
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isSelected
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        appearance='primary'
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        appearance='subtle'
                    />
                </div>
                <div style={{display:'flex'}}>
                    <SplitButton
                        txtLabel='Hello World'
                        options={[
                            {id:'duplicate', txtLabel:'Duplicate', icon:<PiCopyBold className='global-icon'/>, isDisabled:true},
                            {id:'edit', txtLabel:'Edit', icon:<PiPencilBold className='global-icon'/>},
                            {id:'hide', txtLabel:'Hide', icon:<PiCircleDashedBold className='global-icon'/>},
                            {id:'delete', txtLabel:'Delete', icon:<PiXCircleBold className='global-icon'/>},
                        ]}
                        onClick={(id)=>{console.log(id)}}
                    />
                </div>
                <div>
                    <DropdownMenu
                        options={[
                            {id:'duplicate', txtLabel:'Duplicate', icon:<PiCopyBold className='global-icon'/>, isDisabled:true},
                            {id:'edit', txtLabel:'Edit', icon:<PiPencilBold className='global-icon'/>},
                            {id:'hide', txtLabel:'Hide', icon:<PiCircleDashedBold className='global-icon'/>},

                            {id:"modified", type:"separator", txtLabel:''},
                            {id:'delete', txtLabel:'Delete', icon:<PiXCircleBold className='global-icon'/>},
                            {
                                id:'other', 
                                txtLabel:'Others', 
                                icon:<PiDotsThreeBold className='global-icon'/>, 
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
                <div
                    style={{
                        display:'flex',
                        gap:'var(--space-300)',
                        margin:"var(--space-500) 0px"
                    }}
                >
                    
                    <div
                        style={{
                            flexGrow:'1', 
                            borderRadius:'var(--space-100)',
                            boxShadow:'var(--box-shadow)',
                            border:'1px solid var(--clr-border)',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor:'var(--clr-surface-1)',
                                padding: 'var(--space-500) var(--space-1000) var(--space-200) var(--space-1000)',
                                // border:'1px solid var(--clr-border)',
                                borderBottom:'transparent',
                                borderRadius:'var(--space-100) var(--space-100) 0px 0px',
                                display:'flex',
                                alignItems:'center',
                                gap:'var(--space-100)',
                                color:"var(--clr-primary-700)",
                            }}
                        >
                            <PiPencilLineBold className='global-icon'/>
                            <span style={{fontWeight:'var(--font-weight-subtitle)'}}>Edit Detail Form</span>
                        </div>
                        <div
                            style={{
                                padding:'var(--space-500) var(--space-1000)',
                                backgroundColor:'var(--clr-surface-1)',
                                flexGrow:'1',
                                display:"grid",
                                gap:'var(--space-100)',
                                // border:'1px solid var(--clr-border)',
                                borderTop:'transparent',
                                borderRadius:'var(--space-100)',
                                borderTopRightRadius:'0px',
                                borderTopLeftRadius:'0px',
                            }}
                        >
                            <InputText
                                type='text'
                                txtPlaceholder='Enter test text...'
                                value={form['testText']}
                                onChange={(newValue)=>{onChange('testText', newValue)}}
                                onValidate={(error)=>{onValidate('testText', error)}}
                                error={formError['testText']}
                                config={{
                                    isRequired:true,
                                    isDisabled:false,
                                }}
                            />
                            <InputText
                                type='text'
                                txtPlaceholder='Enter test text...'
                                value={form['testText']}
                                config={{
                                    isDisabled:true,
                                }}
                            />
                            <InputPassword
                                txtPlaceholder='Enter password...'
                                value={form['testPassword']}
                                onChange={(newValue)=>{onChange('testPassword', newValue)}}
                                onValidate={(error)=>{onValidate('testPassword', error)}}
                                error={formError['testPassword']}
                                config={{
                                    isDisabled:false,
                                    validRegex: [
                                        // [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters with one uppercase, one lowercase, one number, and one special character (@$!%*?&)']
                                    ]
                                }}
                            />
                            <InputText
                                type='text-no-space'
                                txtPlaceholder='Enter test text nospace...'
                                value={form['testTextNoSpace']}
                                onChange={(newValue)=>{onChange('testTextNoSpace', newValue)}}
                                config={{
                                    isDisabled:false,
                                    maxLength:42
                                }}
                            />
                            <InputText
                                type='number'
                                txtPlaceholder='Enter test text number...'
                                value={form['testTextNumber']}
                                onChange={(newValue)=>{onChange('testTextNumber', newValue)}}
                                onValidate={(error)=>{onValidate('testTextNumber', error)}}
                                error={formError['testTextNumber']}
                                config={{
                                    isDisabled:false,
                                    maxLength:42,
                                    minValue:10,
                                    maxValue:1000
                                }}
                            />
                            <InputText
                                type='number-text'
                                txtPlaceholder='Enter test text number...'
                                value={form['testTextNumberText']}
                                onChange={(newValue)=>{onChange('testTextNumberText', newValue)}}
                                onValidate={(error)=>{onValidate('testTextNumberText', error)}}
                                error={formError['testTextNumberText']}
                                config={{
                                    isDisabled:false,
                                    maxLength:42
                                }}
                            />
                            <InputSelection
                                type='single'
                                txtPlaceholder='Select city...'
                                value={form['testSelection']}
                                onChange={(newValue)=>{onChange('testSelection', newValue)}}
                                onValidate={(error)=>{
                                    console.log(error)
                                    onValidate('testSelection', error)
                                }}
                                error={formError['testSelection']}
                                option={[
                                    {id:'jakarta', txtLabel:'Jakarta', type:'option', icon:<PiCityBold/>},
                                    {id:'bandung', txtLabel:'Bandung', type:'option', icon:<PiCityBold/>},
                                    {id:'surabaya', txtLabel:'Surabaya', type:'option', icon:<PiCityBold/>},
                                ]}
                                config={{
                                    isDisabled:false,
                                    isRequired:true
                                }}
                            />
                            <InputSelection
                                type='combo-box'
                                txtPlaceholder='Select city...'
                                value={form['testSelectionComboBox']}
                                onChange={(newValue)=>{onChange('testSelectionComboBox', newValue)}}
                                onValidate={(error)=>{
                                    console.log(error)
                                    onValidate('testSelectionComboBox', error)
                                }}
                                error={formError['testSelectionComboBox']}
                                option={[
                                    {id:'jakarta', txtLabel:'Jakarta', type:'option', icon:<PiCityBold/>},
                                    {id:'bandung', txtLabel:'Bandung', type:'option', icon:<PiCityBold/>},
                                    {id:'surabaya', txtLabel:'Surabaya', type:'option', icon:<PiCityBold/>},
                                ]}
                                config={{
                                    isDisabled:false,
                                    isRequired:true
                                }}
                            />
                            <InputSelection
                                type='multiple'
                                txtPlaceholder='Select city...'
                                value={form['testSelectionMulti']}
                                onChange={(newValue)=>{onChange('testSelectionMulti', newValue)}}
                                onValidate={(error)=>{onValidate('testSelectionMulti', error)}}
                                error={formError['testSelectionMulti']}
                                option={[
                                    {id:'jakarta', txtLabel:'Jakarta', type:'option', icon:<PiCityBold/>},
                                    {id:'bandung', txtLabel:'Bandung', type:'option', icon:<PiCityBold/>},
                                    {id:'surabaya', txtLabel:'Surabaya', type:'option', icon:<PiCityBold/>},
                                ]}
                                config={{
                                    maxValue:2,
                                    isRequired:true,
                                    isDisabled:false
                                }}
                            />
                            <div style={{display:'flex', gap:'var(--spacep-50)', justifyContent:'end', marginTop:'var(--space-1000)'}}>
                                <Button
                                    txtLabel={'Submit'}
                                    appearance='primary'
                                />
                                <Button
                                    txtLabel={'Cancel'}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            padding:'var(--space-200)',
                            // backgroundColor:'var(--clr-surface-2)',
                            display:"grid",
                            gap:'var(--space-100)',
                            // border:'1px solid var(--clr-border)',
                            borderRadius:'var(--space-100)',
                            marginBottom:'var(--space-400)',
                            marginTop:'var(--space-400)',
                            minWidth:'40vw'
                        }}
                    >
                        
                    </div>
                </div>
                {/* <div
                    style={{
                        padding:'var(--space-200)',
                        backgroundColor:'var(--clr-surface-2)',
                        display:"grid",
                        gap:'var(--space-100)',
                        border:'1px solid var(--clr-border)',
                        borderRadius:'var(--space-100)',
                        marginBottom:'var(--space-100)'
                    }}
                >
                    <InputText
                        type='text'
                        txtPlaceholder='Enter test text...'
                        value={form['testText']}
                    />
                    <InputText
                        type='text-no-space'
                        txtPlaceholder='Enter test text nospace...'
                        value={form['testTextNoSpace']}
                    />
                    <InputText
                        type='number'
                        txtPlaceholder='Enter test text number...'
                        value={form['testTextNumber']}
                    />
                    <InputText
                        type='number-text'
                        txtPlaceholder='Enter test text number...'
                        value={form['testTextNumberText']}
                    />
                    <div style={{display:'flex', gap:'var(--spacep-50)'}}>
                        <Button
                            txtLabel={'Submit'}
                            appearance='primary'
                        />
                        <Button
                            txtLabel={'Cancel'}
                        />
                    </div>
                </div>
                <div
                    style={{
                        padding:'var(--space-200)',
                        backgroundColor:'var(--clr-surface-3)',
                        display:"grid",
                        gap:'var(--space-100)',
                        border:'1px solid var(--clr-border)',
                        borderRadius:'var(--space-100)',
                        marginBottom:'var(--space-100)'
                    }}
                >
                    <InputText
                        type='text'
                        txtPlaceholder='Enter test text...'
                        value={form['testText']}
                    />
                    <InputText
                        type='text-no-space'
                        txtPlaceholder='Enter test text nospace...'
                        value={form['testTextNoSpace']}
                    />
                    <InputText
                        type='number'
                        txtPlaceholder='Enter test text number...'
                        value={form['testTextNumber']}
                    />
                    <InputText
                        type='number-text'
                        txtPlaceholder='Enter test text number...'
                        value={form['testTextNumberText']}
                    />
                    <div style={{display:'flex', gap:'var(--spacep-50)'}}>
                        <Button
                            txtLabel={'Submit'}
                            appearance='primary'
                        />
                        <Button
                            txtLabel={'Cancel'}
                        />
                    </div>
                </div> */}
            </div>
            <div
                style={{
                    backgroundColor:'var(--clr-surface-2)',
                    border:'0px solid var(--clr-border)',
                    padding:'20px',
                    minWidth:'200px',
                    borderRadius:'10px',
                    display:'flex',
                    flexDirection:"column",
                    gap:"20px",
                    margin:'var(--space-300)',
                    maxWidth:'240px'
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
                            {id:'circle', txtLabel:'Toggle Shape Circle', icon:<PiCircleBold className='global-icon'/>},
                            {id:'rounded', txtLabel:'Toggle Shape Rounded', icon:<BiSquareRounded className='global-icon'/>},
                            {id:'box', txtLabel:'Toggle Shape Box', icon:<BiSquare className='global-icon'/>},
                        ]}
                        appearance='neutral'
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
                                    <div key={`${lvl}`} style={{height:'15px',width:'15px',background:`var(--clr-${clr}-${lvl})`, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={()=>{toggleGlobalPrimary(clr)}}>
                                        <span style={{color:(appTheme.includes('light')?((lvl<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((lvl<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))}}>o</span>
                                    </div>
                                ))
                            }
                            {
                                surfaceLevel.map((sfLvl)=>(
                                    <div key={`${sfLvl}`} style={{height:'15px',width:'15px',background:`var(--clr-surface-${clr}-${sfLvl})`, display:'flex', justifyContent:'center', alignItems:'center'}} onClick={()=>{toggleGlobalPrimary(clr)}}>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App
