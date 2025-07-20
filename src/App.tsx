import './App.scss'
import { useCallback, useContext, useMemo, useState } from 'react';
import Button from './components/button';
import { PiCircleBold, PiCircleDashedBold, PiCityBold, PiCopyBold, PiDotsThreeBold, PiPencilBold, PiStarFourBold, PiTagBold, PiXCircleBold } from 'react-icons/pi';
import IconButton from './components/icon-button';
import { GlobalContext, type _GlobalContextType } from './context/global-context';
import { BiSquare, BiSquareRounded } from 'react-icons/bi';
import SplitButton from './components/split-button';
import DropdownMenu, { type dropdownMenuOptionType } from './components/dropdown-menu';
import InputText from './components/input-text';
import type { fieldErrorType, globalShapeType } from './components/_types';
import InputPassword from './components/input-password';
import InputSelection from './components/input-selection';
import InputTags from './components/input-tags';

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
        testTags:[],
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
        testTags:{isError:false, errorMessage:''},

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
                <div style={{display:'flex', flexWrap:'wrap'}}>
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
                <div>
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
                        option={[...indonesiaProvinces]}
                        config={{
                            isCombobox:true,
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
                        option={[...indonesiaProvinces]}
                        config={{
                            isCombobox:true,
                            maxValue:2,
                            isRequired:true,
                            isDisabled:false
                        }}
                    />
                    <InputTags
                        type='text-no-space'
                        txtPlaceholder='Select city...'
                        value={form['testTags']}
                        onChange={(newValue)=>{onChange('testTags', newValue)}}
                        onValidate={(error)=>{onValidate('testTags', error)}}
                        error={formError['testTags']}
                        options={[...tagsDummy]}
                        config={{
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
                        onClick={()=>{
                            toggleGlobalTheme()
                        }}
                        onOptionClick={(id)=>{toggleGlobalShape(id as globalShapeType)}}
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


const indonesiaProvinces:dropdownMenuOptionType[] = [
    {id:'sumatera', txtLabel:'Sumatera', type:'separator'},
    {id:'aceh', txtLabel:'Aceh', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-utara', txtLabel:'Sumatera Utara', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-barat', txtLabel:'Sumatera Barat', type:'option', icon:<PiCityBold/>},
    {id:'riau', txtLabel:'Riau', type:'option', icon:<PiCityBold/>},
    {id:'kepulauan-riau', txtLabel:'Kepulauan Riau', type:'option', icon:<PiCityBold/>},
    {id:'jambi', txtLabel:'Jambi', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-selatan', txtLabel:'Sumatera Selatan', type:'option', icon:<PiCityBold/>},
    {id:'kepulauan-bangka-belitung', txtLabel:'Kepulauan Bangka Belitung', type:'option', icon:<PiCityBold/>},
    {id:'jawa', txtLabel:'Jawa', type:'separator'},
    {id:'bengkulu', txtLabel:'Bengkulu', type:'option', icon:<PiCityBold/>},
    {id:'lampung', txtLabel:'Lampung', type:'option', icon:<PiCityBold/>},
    {id:'dki-jakarta', txtLabel:'DKI Jakarta', type:'option', icon:<PiCityBold/>},
    {id:'jawa-barat', txtLabel:'Jawa Barat', type:'option', icon:<PiCityBold/>},
    {id:'banten', txtLabel:'Banten', type:'option', icon:<PiCityBold/>},
    {id:'jawa-tengah', txtLabel:'Jawa Tengah', type:'option', icon:<PiCityBold/>},
    {id:'di-yogyakarta', txtLabel:'DI Yogyakarta', type:'option', icon:<PiCityBold/>},
    {id:'jawa-timur', txtLabel:'Jawa Timur', type:'option', icon:<PiCityBold/>},
    {id:'nusa-tenggara', txtLabel:'Nusa Tenggara', type:'separator'},
    {id:'bali', txtLabel:'Bali', type:'option', icon:<PiCityBold/>},
    {id:'nusa-tenggara-barat', txtLabel:'Nusa Tenggara Barat', type:'option', icon:<PiCityBold/>},
    {id:'nusa-tenggara-timur', txtLabel:'Nusa Tenggara Timur', type:'option', icon:<PiCityBold/>},
    {id:'kalimantan-barat', txtLabel:'Kalimantan Barat', type:'option', icon:<PiCityBold/>},
    {id:'kalimantan-tengah', txtLabel:'Kalimantan Tengah', type:'option', icon:<PiCityBold/>},
    {id:'kalimantan-selatan', txtLabel:'Kalimantan Selatan', type:'option', icon:<PiCityBold/>},
    {id:'kalimantan-timur', txtLabel:'Kalimantan Timur', type:'option', icon:<PiCityBold/>},
    {id:'kalimantan-utara', txtLabel:'Kalimantan Utara', type:'option', icon:<PiCityBold/>},
    {id:'sulawesi-utara', txtLabel:'Sulawesi Utara', type:'option', icon:<PiCityBold/>},
    {id:'gorontalo', txtLabel:'Gorontalo', type:'option', icon:<PiCityBold/>},
    {id:'sulawesi-tengah', txtLabel:'Sulawesi Tengah', type:'option', icon:<PiCityBold/>},
    {id:'sulawesi-barat', txtLabel:'Sulawesi Barat', type:'option', icon:<PiCityBold/>},
    {id:'sulawesi-selatan', txtLabel:'Sulawesi Selatan', type:'option', icon:<PiCityBold/>},
    {id:'sulawesi-tenggara', txtLabel:'Sulawesi Tenggara', type:'option', icon:<PiCityBold/>},
    {id:'maluku', txtLabel:'Maluku', type:'option', icon:<PiCityBold/>},
    {id:'maluku-utara', txtLabel:'Maluku Utara', type:'option', icon:<PiCityBold/>},
    {id:'papua-barat', txtLabel:'Papua Barat', type:'option', icon:<PiCityBold/>},
    {id:'papua-barat-daya', txtLabel:'Papua Barat Daya', type:'option', icon:<PiCityBold/>},
    {id:'papua-tengah', txtLabel:'Papua Tengah', type:'option', icon:<PiCityBold/>},
    {id:'papua', txtLabel:'Papua', type:'option', icon:<PiCityBold/>},
    {id:'papua-pegunungan', txtLabel:'Papua Pegunungan', type:'option', icon:<PiCityBold/>},
    {id:'papua-selatan', txtLabel:'Papua Selatan', type:'option', icon:<PiCityBold/>}
];

const tagsDummy: dropdownMenuOptionType[] = [
    {id:'1', txtLabel:'Content Management System', type:'option', icon:<PiTagBold/>, alis:'cms'},
    {id:'2', txtLabel:'Digital Asset Management', type:'option', icon:<PiTagBold/>},
    {id:'3', txtLabel:'Content Strategy', type:'option', icon:<PiTagBold/>},
    {id:'4', txtLabel:'Editorial Workflow', type:'option', icon:<PiTagBold/>},
    {id:'5', txtLabel:'Content Publishing', type:'option', icon:<PiTagBold/>},
    {id:'6', txtLabel:'Version Control', type:'option', icon:<PiTagBold/>},
    {id:'7', txtLabel:'Editorial Calendar', type:'option', icon:<PiTagBold/>},
    {id:'8', txtLabel:'Content Governance', type:'option', icon:<PiTagBold/>},
    {id:'9', txtLabel:'Metadata Management', type:'option', icon:<PiTagBold/>},
    {id:'10', txtLabel:'Content Lifecycle', type:'option', icon:<PiTagBold/>},
    {id:'11', txtLabel:'Multi Channel Publishing', type:'option', icon:<PiTagBold/>},
    {id:'12', txtLabel:'Content Personalization', type:'option', icon:<PiTagBold/>},
    {id:'13', txtLabel:'Taxonomy Management', type:'option', icon:<PiTagBold/>},
    {id:'14', txtLabel:'Content Analytics', type:'option', icon:<PiTagBold/>},
    {id:'15', txtLabel:'Headless CMS', type:'option', icon:<PiTagBold/>},
    {id:'16', txtLabel:'Content Collaboration', type:'option', icon:<PiTagBold/>},
    {id:'17', txtLabel:'SEO Optimization', type:'option', icon:<PiTagBold/>},
    {id:'18', txtLabel:'Content Migration', type:'option', icon:<PiTagBold/>},
    {id:'19', txtLabel:'User Permissions', type:'option', icon:<PiTagBold/>},
    {id:'20', txtLabel:'Content Archiving', type:'option', icon:<PiTagBold/>},
];