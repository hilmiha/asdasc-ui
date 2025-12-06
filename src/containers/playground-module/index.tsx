import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Button from 'src/components/ui/button';
import { PiAppWindowFill, PiCaretDownBold, PiChatBold, PiCheckCircleBold, PiCircleBold, PiCircleDashedBold, PiCircleFill, PiCityBold, PiCopyBold, PiDotsThreeBold, PiDownloadBold, PiHourglassBold, PiHouseBold, PiMonitorArrowUpFill, PiPencil, PiPencilBold, PiStackBold, PiStarFourBold, PiTagBold, PiTrashBold, PiXCircleBold, PiXSquareBold } from 'react-icons/pi';
import IconButton from 'src/components/ui/icon-button';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import { BiSquare, BiSquareRounded } from 'react-icons/bi';
import SplitButton from 'src/components/ui/split-button';
import DropdownMenu from 'src/components/ui/dropdown-menu';
import InputText from 'src/components/ui/input-text';
import type { fieldErrorType, globalShapeType, optionItemType } from 'src/components/_types';
import InputPassword from 'src/components/ui/input-password';
import InputSelection from 'src/components/ui/input-selection';
import InputTag from 'src/components/ui/input-tag';
import RadioGroup from 'src/components/ui/radio-group';
import BottomSheet from 'src/components/ui/bottom-sheet';
import Dropdown from 'src/components/ui/dropdown';
import Modal from 'src/components/ui/modal';
import InputTextarea from 'src/components/ui/input-textarea';
import Accordion from 'src/components/ui/accordion';
import AccordionGroup from 'src/components/ui/accordion-group';
import Wysiwyg from 'src/components/ui/wysiwyg';
import type { Delta } from 'quill';
import { QuillHtmlUtils } from 'src/components/ui/wysiwyg/utils/utils';
import CheckboxButton from 'src/components/ui/checkbox-button';
import RadioButton from 'src/components/ui/radio-button';
import CheckboxGroup from 'src/components/ui/checkbox-group';
import Calendar, { type validCalendarDisabledValue, type validCalendarValue } from 'src/components/ui/calendar';
import { addDays, subDays } from 'date-fns';
import InputDateTime from 'src/components/ui/input-date';
import TableData, { type tableColumnType, type tableConfigType, type tableRowDataType } from 'src/components/ui/table';
import Tag from 'src/components/ui/tag';
import Carousel from 'src/components/ui/carousel';
import type { tabItem } from 'src/components/ui/tabs';
import Tabs from 'src/components/ui/tabs';
import Resizable from 'src/components/ui/resizable';
import ResizableHandle from 'src/components/ui/resizable/resizable-handle';
import ResizablePanel from 'src/components/ui/resizable/resizable-panel';
import SwitchButton from 'src/components/ui/switch-button';
import Spinner from 'src/components/ui/spinner';
import Skeleton from 'src/components/ui/skeleton';
import ColorPicker from 'src/components/ui/color-picker';
import InputColor from 'src/components/ui/input-color';
import CarouselChild from 'src/components/ui/carousel/carousel-child';
import InputCode from 'src/components/ui/input-code';

function PlaygroundModule() {
    const {
        appTheme,
        toggleGlobalPrimary,
        toggleGlobalTheme,
        toggleGlobalTone,
        toggleGlobalShape,
        toggleGlobalFontSize,
        screenSize
    } = useContext(GlobalContext) as _GlobalContextType
    
    const [isButtonLoading, setIsButtonLoading] = useState(false) 
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
        testTextArea:'',
        testSelection:[],
        testSelectionComboBox:[],
        testSelectionMulti:[],
        testTags:[],
        testDate:undefined,
        testDateTime:undefined,
        testDateMultiple:undefined,
        testDateRange:undefined,
        testColor:'#000000',
    })
    useEffect(()=>{
        console.log(form)
    },[JSON.stringify(form)])
    const [formError, setFormError] = useState<{[key:string]:fieldErrorType}>({
        testText:{isError:false, errorMessage:''},
        testPassword:{isError:false, errorMessage:''},
        testTextNoSpace:{isError:false, errorMessage:''},
        testTextNumber:{isError:false, errorMessage:''},
        testTextNumberText:{isError:false, errorMessage:''},
        testTextArea:{isError:false, errorMessage:''},
        testSelection:{isError:false, errorMessage:''},
        testSelectionComboBox:{isError:false, errorMessage:''},
        testSelectionMulti:{isError:false, errorMessage:''},
        testTags:{isError:false, errorMessage:''},
        testDate:{isError:false, errorMessage:''},
        testDateTime:{isError:false, errorMessage:''},
        testDateMultiple:{isError:false, errorMessage:''},
        testDateRange:{isError:false, errorMessage:''},
        testColor:{isError:false, errorMessage:''},
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

    const listSelection = useMemo(()=>{
        return[...indonesiaProvinces]
    },[])
    const listTag = useMemo(()=>{
        return[...contentTags]
    },[])
    const listCheckbox = useMemo(()=>{
        return[...menues]
    },[])
    const [isSwitchActive, setIsSwitchActive] = useState(false) 


    const colorPaletComponent = useMemo(()=>{
        return(
            <>
                {
                    colors.map((clr)=>(
                        <div key={clr} style={{display:'flex'}}>
                            {
                                colorLevel.map((lvl)=>(
                                    <div key={`${lvl}`} style={{height:'15px',width:'15px',background:`var(--clr-${clr}-${lvl})`, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                        <span style={{color:(appTheme.globalTheme.includes('light')?((lvl<=600)?('var(--clr-text)'):('var(--clr-text-rev)')):((lvl<=400)?('var(--clr-text)'):('var(--clr-text-rev)')))}}>o</span>
                                    </div>
                                ))
                            }
                            {
                                surfaceLevel.map((sfLvl)=>(
                                    <div key={`${sfLvl}`} style={{height:'15px',width:'15px',background:`var(--clr-surface-${clr}-${sfLvl})`, display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </>
        )
    },[appTheme.globalTheme])

    const [isShow, setIsShow] = useState(false)
    const [modalSize, setModalSize] = useState<'small' | 'medium' | 'large'>('small')
    const [isShowBottomSheet, setIsShowBottomSheet] = useState(false)

    const [listAccordionOpen, setListAccordionOpen] = useState<string[]>([])

    const [codeContent, setCodeContent] = useState('')
    const [codeContentError, setCodeContentError] = useState<fieldErrorType>({isError:false, errorMessage:''})

    const presetCodeContent = () => {
        setCodeContent(`<>
    <Button 
        txtLabel='Hello World'
        isLoading={true}
    />
    <Button 
        txtLabel='Hello World'
        isDisabled
        isLoading={isButtonLoading}
    />
    <Button 
        txtLabel='Hello World'
        isSelected
        isLoading={isButtonLoading}
    />
</>`);
    };

    const [content, setContent] = useState<Delta | undefined>(undefined);
    const [contentError, setContentError] = useState<fieldErrorType>({isError:false, errorMessage:''})
    const contentHtml = useMemo(()=>{
        if(content){
            return QuillHtmlUtils.deltaToHtml(content)
        }
    },[content])

    const presetContent = () => {
        setContent(sampleContent as Delta);
    };

    const [valueDt, setValueDt] = useState< validCalendarValue >(undefined)
    const [valueDtTm, setValueDtTm] = useState< validCalendarValue >(undefined)
    const [valueDtRange, setValueDtRange] = useState< validCalendarValue >(undefined)
    const [valueDtMultiple, setValueDtMultiple] = useState< validCalendarValue >(undefined)
    const disabledDates = useMemo<validCalendarDisabledValue[]>(()=>{
        return([
            {from:subDays(new Date(), 30), to:subDays(new Date(), 27)}
        ])
    },[])
    useEffect(()=>{
        console.log('valueDt', valueDt)
    },[valueDt])
    useEffect(()=>{
        console.log('valueDtTm', valueDtTm)
    },[valueDtTm])
    useEffect(()=>{
        console.log('valueDtRange', valueDtRange)
    },[valueDtRange])
    useEffect(()=>{
        console.log('valueDtMultiple', valueDtMultiple)
    },[valueDtMultiple])

    const [valueCheckbox, setValueCheckbox] = useState<string[]>([])
    
    const allDataTable = useMemo(()=>{
        return generateDataDummy(300)
    },[])
    const [tableData, setTableData] = useState<tableRowDataType[]>([])
    const tableColumn = useMemo<tableColumnType[]>(()=>{
        return tableColumnDummy
    },[])
    const [tabelChecked, setTableChecked] = useState<string[]>([])

    const [isTableLoading, setIsTableLoading] = useState(false)
    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        maxRow:10,
        currentPage:1,
        countPage:1,
        totalData:0,

        sortBy:'label3',
        isSortDesc:false
    })

    const doGetDataTable = () => {
        setIsTableLoading(true)

        const { maxRow, currentPage, sortBy, isSortDesc } = tableConfig;
        // 1. Sort data
        const sortedData = [...allDataTable].sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];

            // Handle if values are numbers or strings
            if (typeof valA === 'number' && typeof valB === 'number') {
                return isSortDesc ? valB - valA : valA - valB;
            }
            return isSortDesc
                ? String(valB).localeCompare(String(valA))
                : String(valA).localeCompare(String(valB));
        });

        // 2. Paginate
        const startIndex = (currentPage - 1) * maxRow;
        const endIndex = startIndex + maxRow;

        setTableConfig((prev) => ({
            ...prev,
            totalData: allDataTable.length,
            countPage: Math.ceil(allDataTable.length / prev.maxRow)
        }));
        
        setTableData(sortedData.slice(startIndex, endIndex))
        setTimeout(() => {
            setIsTableLoading(false)
        }, 800);
    };

    useEffect(()=>{
        doGetDataTable()
    },[JSON.stringify(tableConfig)])


    const tabItems = useMemo<tabItem[]>(()=>{
        return [
            {id:'dashboard', txtLabel:'Dashboard', iconBefore:(<PiHouseBold className='global-icon'/>), iconAfter:(<PiCircleFill color='var(--clr-primary-700)' size={8}/>)},
            {id:'projects', txtLabel:'Projects', iconBefore:(<PiStackBold className='global-icon'/>)},
            {id:'chat', txtLabel:'Chat', iconBefore:(<PiChatBold className='global-icon'/>), isDisabled:true},
        ]
    },[])
    const [tabSelected, setTabSelected] = useState('dashboard')


    const [isShowLeftPanel, setIsShowLeftPanel] = useState(true)


    const [colorSoild, setColorSolid] = useState('')
    const [colorAlpha, setColorAlpha] = useState('')

    return (
        <div>
            <p>Level one surface</p>
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
                }}
            >
                <p>Level two surface</p>
                <div
                    style={{
                        backgroundColor:'var(--clr-surface-3)',
                        border:'0px solid var(--clr-border)',
                        padding:'20px',
                        minWidth:'200px',
                        borderRadius:'10px'
                    }}
                >
                    <p style={{marginBottom:'var(--space-300)'}}>Level three surface</p>
                    <div style={{display:'flex', flexWrap:'wrap'}}>
                        <SplitButton
                            txtLabel='Toggle Theme'
                            options={[
                                {id:'circle', txtLabel:'Circle', txtSublabel:'Toggle global shape to circle', icon:<PiCircleBold className='global-icon'/>},
                                {id:'rounded', txtLabel:'Rounded', txtSublabel:'Toggle global shape to rounded', icon:<BiSquareRounded className='global-icon'/>},
                                {id:'box', txtLabel:'Box', txtSublabel:'Toggle global shape to boxed', icon:<BiSquare className='global-icon'/>},
                            ]}
                            appearance='neutral'
                            optionSelected={[appTheme.globalShape]}
                            onClick={()=>{
                                toggleGlobalTheme()
                            }}
                            onOptionClick={(id)=>{toggleGlobalShape(id as globalShapeType)}}
                        />
                        <DropdownMenu
                            trigger={
                                <Button
                                    txtLabel={'Font Size'}
                                    iconAfter={<PiCaretDownBold/>}
                                />
                            }
                            options={[
                                {id:'small', txtLabel:'Small', txtSublabel:'Toggle global font size to Small'},
                                {id:'medium', txtLabel:'Medium', txtSublabel:'Toggle global font size to Medium'},
                                {id:'large', txtLabel:'Large', txtSublabel:'Toggle global font size to Large'},
                            ]}
                            optionSelected={[appTheme.globalFontSize]}
                            onClick={(id)=>{
                                toggleGlobalFontSize(id)
                            }}
                            
                        />
                    </div>
                    
                    <p className='hello'>{appTheme.globalTheme??'-'}</p>
                    <p className='hello'>{appTheme.globalTone??'-'}</p>
                    <p className='hello'>{appTheme.globalPrimary??'-'}</p>
                    <p className='hello'>shape_{appTheme.globalShape??'-'}</p>
                    <p className='hello'>font_size_{appTheme.globalFontSize??'-'}</p>
                    <div
                        style={{
                            display:'grid',
                            gridTemplateColumns:screenSize==='laptop'?('1fr 1fr 1fr'):screenSize==='tablet'?('1fr 1fr'):('1fr'),
                            gap:'var(--space-500)',
                            marginTop:"var(--space-300)"
                        }}
                    >
                        <div>
                            <p>Global Tone Color:</p>
                            <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)', justifyContent:'center', alignItems:'center'}}>
                                {
                                    colors.map((clr)=>(
                                        <div 
                                            key={clr} 
                                            style={{
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                height:'40px',
                                                width:'40px',
                                                background:`var(--clr-${clr}-500)`,
                                                border:`2px solid ${appTheme.globalTone===`tonal_${clr}`?'var(--surface-3)':'transparent'}`,
                                                color:`${appTheme.globalTone===`tonal_${clr}`?'var(--clr-text-3)':'transparent'}`
                                            }}
                                            onClick={()=>{toggleGlobalTone(clr)}}
                                        >
                                            <PiCheckCircleBold size={24}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        
                        <div>
                            <p>Global Primary Color:</p>
                            <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)', justifyContent:'center', alignItems:'center'}}>
                                {
                                    colors.map((clr)=>(
                                        <div 
                                            key={clr} 
                                            style={{
                                                display:'flex',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                height:'40px',
                                                width:'40px',
                                                background:`var(--clr-${clr}-500)`,
                                                border:`2px solid ${appTheme.globalPrimary===`primary_${clr}`?'var(--surface-3)':'transparent'}`,
                                                color:`${appTheme.globalPrimary===`primary_${clr}`?'var(--clr-text-3)':'transparent'}`
                                            }}
                                            onClick={()=>{toggleGlobalPrimary(clr)}}
                                        >
                                            <PiCheckCircleBold size={24}/>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <p>Text Contrast Test:</p>
                            {
                                colorPaletComponent
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{padding:"var(--space-300)", display:'flex', gap:"var(--space-100)", alignItems:'center'}}>
                <Spinner size='small'/>
                <Spinner size='medium'/>
                <Spinner size='large'/>
            </div>
            <div style={{padding:"var(--space-300)"}}>
                <Skeleton width={'20vw'}/>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <div style={{display:'flex', gap:'var(--space-100)', justifyContent:"end"}}>
                    <Skeleton width={'80px'} height={'26px'} style={{margin:'0px'}}/>
                    <Skeleton width={'80px'} height={'26px'} style={{margin:'0px'}}/>
                </div>

            </div>
            <div style={{padding:"var(--space-300)"}}>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                    <Button 
                        txtLabel='Hello World'
                        isLoading={true}
                    />
                    <Button 
                        txtLabel='Hello World'
                        isDisabled
                        isLoading={isButtonLoading}
                    />
                    <Button 
                        txtLabel='Hello World'
                        isSelected
                        isLoading={isButtonLoading}
                    />
                    <Button 
                        txtLabel='Hello World'
                        onClick={()=>{
                            onChange('testText', 'hello world')
                            onChange('testPassword', 'He!!0world')
                            onChange('testSelectionMulti', [
                                "aceh",
                                'sumatera-utara',
                                'sumatera-barat',
                            ])
                            onChange('testTags', [
                                'helloWorld',
                                'Content Management System'
                            ])
                        }}
                        isLoading={isButtonLoading}
                    />
                    <Button 
                        txtLabel='Hello World'
                        appearance='primary'
                        onClick={()=>{
                            const now = new Date()
                            setValueDt(now)
                            setValueDtMultiple([now, addDays(now, 4), addDays(now, 8), subDays(now, 5)])
                            setValueDtRange({from:now, to:addDays(now, 5)})
                        }}
                        isLoading={isButtonLoading}
                    />
                    <Button 
                        txtLabel='Hello World'
                        appearance='subtle'
                        onClick={()=>{
                            setIsButtonLoading(true)
                            setTimeout(() => {
                                setIsButtonLoading(false)
                            }, 3000);
                        }}
                        isLoading={isButtonLoading}
                    />
                </div>
                
                <div style={{display:'flex'}}>
                    <Button
                        iconBefore={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello'
                        isLoading={isButtonLoading}
                    />
                    <Button
                        iconAfter={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello'
                        isLoading={isButtonLoading}
                    />
                </div>
                <div style={{display:'flex'}}>
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isLoading={true}
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isDisabled
                        isLoading={isButtonLoading}
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isSelected
                        isLoading={isButtonLoading}
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        isLoading={isButtonLoading}
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        appearance='primary'
                        isLoading={isButtonLoading}
                    />
                    <IconButton 
                        icon={<PiStarFourBold className='global-icon'/>}
                        txtLabel='Hello World'
                        appearance='subtle'
                        isLoading={isButtonLoading}
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
                        optionSelected={['modified']}
                        options={[
                            {id:'duplicate', txtLabel:'Duplicate', icon:<PiCopyBold className='global-icon'/>, isDisabled:true},
                            {id:'edit', txtLabel:'Edit', icon:<PiPencilBold className='global-icon'/>},
                            {id:'hide', txtLabel:'Hide', icon:<PiCircleDashedBold className='global-icon'/>},

                            {id:"separator", type:"separator", txtLabel:''},
                            {id:'delete', txtLabel:'Delete', icon:<PiXCircleBold className='global-icon'/>},
                            {
                                id:'other', 
                                txtLabel:'Others', 
                                icon:<PiDotsThreeBold className='global-icon'/>, 
                                childOption:[
                                    {id:'a', txtLabel:'A'},
                                    {id:'b', txtLabel:'B'},
                                    {id:'c', txtLabel:'C'},
                                    {
                                        id:'d', 
                                        txtLabel:'D',
                                        childOption:[
                                            {id:'a', txtLabel:'A'},
                                            {id:'b', txtLabel:'B'},
                                            {id:'c', txtLabel:'C'},
                                        ]
                                    },
                                ]
                            },
                            {id:"separator2", type:"separator", txtLabel:''},
                            {id:'modified', type:'option', txtLabel:'Modified', icon:<PiCircleDashedBold className='global-icon'/>},
                            {id:'modified', type:'option', txtLabel:'Modified', icon:<PiCircleDashedBold className='global-icon'/>},
                            {id:'modified', type:'option', txtLabel:'Modified', icon:<PiCircleDashedBold className='global-icon'/>},
                            
                        ]}
                        trigger={
                            <Button
                                txtLabel={"Hello"}
                            />
                        }
                        onClick={(idButton)=>{console.log(idButton)}}
                        floatingConfig={{
                            isWithCheckmark:true
                        }}
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
                        }}
                    />
                    <InputText
                        type='text'
                        txtPlaceholder='Enter test text...'
                        value={form['testText']}
                        isDisabled={true}
                    />
                    <InputPassword
                        txtPlaceholder='Enter password...'
                        value={form['testPassword']}
                        onChange={(newValue)=>{onChange('testPassword', newValue)}}
                        onValidate={(error)=>{onValidate('testPassword', error)}}
                        error={formError['testPassword']}
                        config={{
                            isRequired:true,
                            validRegex: [
                                [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least 8 characters with one uppercase, one lowercase, one number, and one special character (@$!%*?&)']
                            ]
                        }}
                    />
                    <InputText
                        type='text-no-space'
                        txtPlaceholder='Enter test text nospace...'
                        value={form['testTextNoSpace']}
                        onChange={(newValue)=>{onChange('testTextNoSpace', newValue)}}
                        config={{
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
                            maxLength:42,
                            minValue:10,
                            maxValue:1000,
                            prefixElement:'Rp.'
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
                            maxLength:42
                        }}
                    />
                    <InputTextarea
                        type='text'
                        txtPlaceholder='Enter test text...'
                        value={form['testTextArea']}
                        onChange={(newValue)=>{onChange('testTextArea', newValue)}}
                        onValidate={(error)=>{onValidate('testTextArea', error)}}
                        error={formError['testTextArea']}
                        config={{
                            isRequired:true,
                            maxLines:15,
                        }}
                    />
                    <InputSelection
                        type='single'
                        txtPlaceholder='Select city...'
                        value={form['testSelection']}
                        onChange={(newValue)=>{onChange('testSelection', newValue)}}
                        onValidate={(error)=>{
                            onValidate('testSelection', error)
                        }}
                        error={formError['testSelection']}
                        option={listSelection}
                        config={{
                            isCombobox:true,
                            isRequired:true,
                            prefixElement:<PiCityBold className='global-icon'/>
                        }}
                    />
                    <InputSelection
                        type='multiple'
                        txtPlaceholder='Select city...'
                        value={form['testSelectionMulti']}
                        onChange={(newValue)=>{onChange('testSelectionMulti', newValue)}}
                        onValidate={(error)=>{onValidate('testSelectionMulti', error)}}
                        error={formError['testSelectionMulti']}
                        option={listSelection}
                        config={{
                            isCombobox:true,
                            maxValue:10,
                            isRequired:true,
                        }}
                    />
                    <InputTag
                        type='text-no-space'
                        txtPlaceholder='Select tag...'
                        value={form['testTags']}
                        onChange={(newValue)=>{onChange('testTags', newValue)}}
                        onValidate={(error)=>{onValidate('testTags', error)}}
                        error={formError['testTags']}
                        options={listTag}
                        config={{
                            isRequired:true,
                        }}
                    />
                    <InputDateTime
                        type='single'
                        txtPlaceholder='Select date...'
                        value={form['testDate']}
                        onChange={(newValue)=>{onChange('testDate', newValue)}}
                        onValidate={(error)=>{onValidate('testDate', error)}}
                        error={formError['testDate']}
                        config={{
                            isRequired:true,
                        }}
                    />
                    <InputDateTime
                        type='single-with-time'
                        txtPlaceholder='Select date with time...'
                        value={form['testDateTime']}
                        onChange={(newValue)=>{onChange('testDateTime', newValue)}}
                        onValidate={(error)=>{onValidate('testDateTime', error)}}
                        error={formError['testDateTime']}
                        config={{
                            isRequired:true
                        }}
                    />
                    <InputDateTime
                        type='multiple'
                        txtPlaceholder='Select date multiple...'
                        value={form['testDateMultiple']}
                        onChange={(newValue)=>{onChange('testDateMultiple', newValue)}}
                        onValidate={(error)=>{onValidate('testDateMultiple', error)}}
                        error={formError['testDateMultiple']}
                        config={{
                            isRequired:true,
                            minSelected:3,
                            maxSelected:7
                        }}
                    />
                    <InputDateTime
                        type='range'
                        txtPlaceholder='Select date range...'
                        value={form['testDateRange']}
                        onChange={(newValue)=>{onChange('testDateRange', newValue)}}
                        onValidate={(error)=>{onValidate('testDateRange', error)}}
                        error={formError['testDateRange']}
                        config={{
                            isRequired:true,
                            minSelected:3,
                            maxSelected:7
                        }}
                    />
                    <InputColor
                        txtPlaceholder='Select color...'
                        value={form['testColor']}
                        onChange={(newValue)=>{onChange('testColor', newValue)}}
                        onValidate={(error)=>{onValidate('testColor', error)}}
                        error={formError['testColor']}
                        config={{
                            isAllowAlpha:true,
                            isRequired:true,
                        }}
                    />
                    <div>
                        <RadioButton
                            isSelected={true}
                        />
                        <RadioButton
                            isSelected={true}
                            txtLabel='Hello World'
                            txtSublabel='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, exercitationem laboriosam! Porro ducimus sapiente qui sit asperiores, modi reiciendis quo tempora dolor at nesciunt harum suscipit laudantium, nam eos doloribus.'
                        />
                        <RadioButton
                            isSelected={true}
                            isDisabled={true}
                        />
                    </div>
                    <div>
                        <RadioGroup
                            selectedId={form['radioStatus']}
                            onChange={(newValue)=>{onChange('radioStatus', newValue)}}
                            options={[
                                {id:'new', txtLabel:'New'},
                                {id:'pending', txtLabel:'Pending'},
                                {id:'in-progress', txtLabel:'In Progress'},
                                {id:'done', txtLabel:'Done'},
                                {id:'closed', txtLabel:'Closed', isDisabled:true},
                            ]}
                        />
                    </div>
                    <div>
                        <CheckboxButton
                            isSelected={true}
                        />
                        <CheckboxButton
                            isSelected={true}
                            txtLabel='Hello World'
                            txtSublabel='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, exercitationem laboriosam! Porro ducimus sapiente qui sit asperiores, modi reiciendis quo tempora dolor at nesciunt harum suscipit laudantium, nam eos doloribus.'
                        />
                        <CheckboxButton
                            isSelected={true}
                            isDisabled={true}
                        />
                    </div>
                    <div>
                        <CheckboxGroup
                            isDisabled={false}
                            options={listCheckbox}
                            selectedList={valueCheckbox}
                            isDefaultCollapse={false}
                            onChange={(newValue) => setValueCheckbox(newValue)}
                        />
                    </div>
                    <div>
                        <SwitchButton
                            isSelected={isSwitchActive}
                            onClick={()=>{
                                setIsSwitchActive(!isSwitchActive)
                            }}
                        />
                        <SwitchButton
                            isSelected={isSwitchActive}
                            onClick={()=>{
                                setIsSwitchActive(!isSwitchActive)
                            }}
                            txtLabel='Hello World'
                            txtSublabel='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, exercitationem laboriosam! Porro ducimus sapiente qui sit asperiores, modi reiciendis quo tempora dolor at nesciunt harum suscipit laudantium, nam eos doloribus.'
                        />
                        <SwitchButton
                            isSelected={isSwitchActive}
                            isDisabled={true}
                            onClick={()=>{
                                setIsSwitchActive(!isSwitchActive)
                            }}
                        />
                    </div>
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
            <div style={{
                display:"grid",
                padding:'var(--space-100)', 
                gap:'var(--space-400)',
                gridTemplateColumns:screenSize!=='laptop'?('fit-content(100%)'):('fit-content(50%) fit-content(50%) fit-content(50%) fit-content(50%)'),
                justifyContent:'center',
            }}>
                <Calendar
                    type='single'
                    value={valueDt}
                    onChange={setValueDt}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='single-with-time'
                    value={valueDtTm}
                    onChange={setValueDtTm}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='multiple'
                    value={valueDtMultiple}
                    onChange={setValueDtMultiple}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='range'
                    value={valueDtRange}
                    onChange={setValueDtRange}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
            </div>
            <div  style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-300)', justifyContent:'space-around', width:'100%'}}>
                    <ColorPicker value={colorAlpha} onChange={(newValue)=>{setColorAlpha(newValue)}}/>
                    <ColorPicker value={colorSoild} onChange={(newValue)=>{setColorSolid(newValue)}} isAllowAlpha={true}/>
                </div>
                <div>
                    <Button 
                        txtLabel='Change to Green'
                        onClick={()=>{
                            setColorAlpha('#16824C8C')
                            setColorSolid('#16824C')
                        }}
                    />
                </div>
            </div>
            <div style={{padding:'var(--space-100) var(--space-100)', height:'80vh', maxHeight:'80vh'}}>
                <TableData
                    tableData={tableData}
                    tableColumn={tableColumn}
                    tableConfig={tableConfig}

                    isLoading={isTableLoading}
                    isFillContainer={true}
                    
                    onClickSortColumn={(newSortBy, newIsDesc)=>{
                        setTableConfig((prev)=>{
                            const tamp:tableConfigType = {
                                ...prev,
                                sortBy:newSortBy,
                                isSortDesc:newIsDesc
                            }
                            return tamp
                        })
                    }}
                    onSelectMaxRow={(newMaxRow)=>{
                        setTableConfig((prev)=>{
                            const tamp:tableConfigType = {
                                ...prev,
                                maxRow:newMaxRow,
                                currentPage:1
                            }
                            return tamp
                        })
                    }}
                    onClickPagination={(newCurrentPage)=>{
                        setTableConfig((prev)=>{
                            const tamp:tableConfigType = {
                                ...prev,
                                currentPage:newCurrentPage
                            }
                            return tamp
                        })
                    }}

                    onClickRow={(rowData:tableRowDataType)=>{console.log(rowData)}}
                    onClickRowAction={(idButton, rowData)=>{
                        console.log(idButton, rowData)
                    }}
                    selectedRow={tabelChecked}
                    onClickRowCheckbox={(selectedList)=>{
                        setTableChecked(selectedList)
                    }}
                    isColumnSwapable={true}
                    isShowFooter={true}
                    isCheckbox={true}
                    isExpandable={true}
                />
            </div>
            <div style={{padding:'var(--space-300)', height:'400px'}}>
                <Button txtLabel={'Preset'} onClick={()=>{presetCodeContent()}}/>
                <InputCode
                    lang='tsx'
                    txtPlaceholder='Start typing...'
                    value={codeContent}
                    onChange={(newValue)=>{setCodeContent(newValue)}}
                    onValidate={(error)=>{
                        setCodeContentError(error)
                    }}  
                    isDisabled={false}
                    error={codeContentError}
                    config={{
                        isRequired:true,
                        isAsPreview:false
                    }}
                />
            </div>
            <div style={{padding:'var(--space-300)', height:'400px'}}>
                <Button txtLabel={'Preset'} onClick={()=>{presetContent()}}/>
                <Wysiwyg
                    value={content}
                    onChange={(newValue)=>{setContent(newValue)}}
                    onValidate={(error)=>{setContentError(error)}}
                    isDisabled={false}
                    txtPlaceholder="Start typing..."
                    error={contentError}
                    config={{
                        isRequired:true,
                    }}
                />
                
            </div>
            <div style={{padding:'var(--space-300)'}}>
                <div>
                    <p>Value:</p>
                    <div
                        style={{
                            maxHeight:"300px",
                            width:"100%",
                            overflow:'auto',
                            whiteSpace:'pre'
                        }}
                    >
                        {JSON.stringify(content, null, 4)}
                    </div>
                </div>
                <div>
                    <p>Value HTML inside iframe:</p>
                    <iframe 
                        style={{
                            backgroundColor:"white",
                            width:"100%",
                            marginTop:'var(--space-300)',
                            height:"300px"
                        }}
                        srcDoc={contentHtml}
                    ></iframe>
                </div>
            </div>
            <div style={{padding:"var(--space-100)"}}>
                <Tabs
                    tabItem={tabItems}
                    selectedItem={tabSelected}
                    onClickTabItem={(id:string)=>{
                        setTabSelected(id)
                    }}
                />
                <div
                    className={`global-${appTheme.globalShape} global-radius`}
                    style={{
                        border:'1px solid var(--clr-border)',
                        height:"200px",
                        maxHeight:"200px",
                        overflow:'auto',
                        marginTop:'var(--space-100)',
                        padding:'var(--space-200)',
                    }}
                >
                    {
                        (tabSelected==='dashboard')&&(
                            <>
                                <h1>Dashboard</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                </p>
                            </>
                        )
                    }
                    {
                        (tabSelected==='projects')&&(
                            <>
                                <h1>Projects</h1>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.</p>
                                <div style={{display:'flex', marginTop:"var(--space-400)"}}>
                                    <Button
                                        txtLabel={'Hello'}
                                        appearance='primary'
                                    />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div style={{padding:"var(--space-100)"}}>
                <Tabs
                    appearance='flush'
                    tabItem={tabItems}
                    selectedItem={tabSelected}
                    onClickTabItem={(id:string)=>{
                        setTabSelected(id)
                    }}
                />
                <div
                    className={`global-${appTheme.globalShape} global-radius`}
                    style={{
                        borderTopLeftRadius:'0px',
                        borderTopRightRadius:'0px',
                        border:'1px solid var(--clr-border)',
                        height:"200px",
                        maxHeight:"200px",
                        overflow:'auto',
                        padding:'var(--space-200)',
                    }}
                >
                    {
                        (tabSelected==='dashboard')&&(
                            <>
                                <h1>Dashboard</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae culpa officiis numquam nam tenetur temporibus similique, qui cum veritatis, voluptatum velit cumque ab voluptate consectetur vero quam aliquam eveniet!
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.
                                </p>
                            </>
                        )
                    }
                    {
                        (tabSelected==='projects')&&(
                            <>
                                <h1>Projects</h1>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum exercitationem eligendi aspernatur porro iusto omnis, quis dignissimos veniam soluta illo necessitatibus aut! Ipsa, libero omnis amet ut saepe vitae repudiandae.</p>
                                <div style={{display:'flex', marginTop:"var(--space-400)"}}>
                                    <Button
                                        txtLabel={'Hello'}
                                        appearance='primary'
                                    />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div style={{padding:"var(--space-300)"}}>
                <SplitButton
                    txtLabel='Modal Open'
                    options={[
                        {id:'small', txtLabel:'Small Modal'},
                        {id:'medium', txtLabel:'Medium Modal'},
                        {id:'large', txtLabel:'Large Modal'},
                        {id:'full', txtLabel:'Full Modal'}
                    ]}
                    optionSelected={modalSize?([modalSize]):([])}
                    onOptionClick={(idButton)=>{setModalSize(idButton as 'small' | 'medium' | 'large')}}
                    onClick={()=>{setIsShow(!isShow)}}
                />
                <Modal
                    isOpen={isShow}
                    setIsOpen={setIsShow}
                    txtTitle='Modal Controlled'
                    iconTitle={<PiAppWindowFill className='global-icon'/>}
                    size={modalSize}
                    elementHeader={
                        <div>
                            <p>hello world</p>
                        </div>
                    }
                    elementFooter={
                        <div 
                            style={{
                                display:"flex",
                                gap:'var(--space=100)',
                                justifyContent:'end'
                            }}
                        >
                            <Button
                                txtLabel={'Cancel'}
                                appearance='subtle'
                                onClick={()=>{setIsShow(false)}}
                            />
                            <Button
                                txtLabel={'Apply'}
                                appearance='primary'
                            />
                        </div>
                    }
                    onOpen={()=>{
                        console.log('onOpen')
                    }}
                    onClose={()=>{
                        console.log('onClose')
                    }}
                >
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                    </p>
                </Modal>
                <Dropdown
                    trigger={<Button txtLabel={'Dropdown Open'}/>}
                    elementHeader={
                        <div>
                            <p>helloworld</p>
                        </div>
                    }
                    elementFooter={
                        <div 
                            style={{
                                display:"flex",
                                gap:'var(--space=100)',
                                justifyContent:'end'
                            }}
                        >
                            <Button
                                txtLabel={'Cancel'}
                            />
                            <Button
                                txtLabel={'Apply'}
                                appearance='primary'
                            />
                        </div>
                    }
                    floatingConfig={{
                        isLockScroll:true
                    }}
                >
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                    </p>
                </Dropdown>
                <Button
                    txtLabel={'Bottom Sheet'}
                    onClick={()=>{setIsShowBottomSheet(!isShowBottomSheet)}}
                />
                <BottomSheet
                    isOpen={isShowBottomSheet}
                    setIsOpen={setIsShowBottomSheet}
                    txtTitle='Bottom Sheets'
                    iconTitle={<PiMonitorArrowUpFill className='global-icon'/>}
                    onOpen={()=>{
                        console.log('onOpen')
                    }}
                    onClose={()=>{
                        console.log('onClose')
                    }}
                    elementHeader={
                        <div>
                            <p>helloworld</p>
                        </div>
                    }
                    elementFooter={
                        <div 
                            style={{
                                display:"flex",
                                gap:'var(--space=100)',
                                justifyContent:'end'
                            }}
                        >
                            <Button
                                txtLabel={'Cancel'}
                                onClick={()=>{setIsShowBottomSheet(false)}}
                            />
                            <Button
                                txtLabel={'Apply'}
                                appearance='primary'
                            />
                        </div>
                    }
                >
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit qddduia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quiad magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectdddddetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magaaanam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quia magnam earum deserunt voluptatem ea dolorem rerum, aperiam eligendi recusandae obcaecati sint libero. Eum, qui natus itaque asperiores et tempora.
                    </p>
                </BottomSheet>
            </div>
            <AccordionGroup
                listOpen={listAccordionOpen}
                setListOpen={setListAccordionOpen}
            >
                <Accordion
                    id='1'
                    onClose={()=>{console.log('accordion close 1')}}
                    onOpen={()=>{console.log('accordion open 1')}}
                    iconBefore={<PiStarFourBold className='global-icon'/>}
                    txtLabel='Accordion One'
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                    </p>
                </Accordion>
                <Accordion
                    id='2'
                    onClose={()=>{console.log('accordion close 2')}}
                    onOpen={()=>{console.log('accordion open 2')}}
                    iconBefore={<PiStarFourBold className='global-icon'/>}
                    txtLabel='Accordion Two'
                    isDisabled={true}
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                    </p>
                </Accordion>
                <Accordion
                    id='3'
                    onClose={()=>{console.log('accordion close 3')}}
                    onOpen={()=>{console.log('accordion open 3')}}
                    iconBefore={<PiStarFourBold className='global-icon'/>}
                    txtLabel='Accordion Three'
                >
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam recusandae non ullam adipisci rem sequi eum libero numquam animi facilis, porro asperiores, vero corporis. Ipsa repudiandae delectus eveniet mollitia sint.
                    </p>
                </Accordion>
            </AccordionGroup>
            <div style={{padding:"var(--space-300)"}}>
                <Carousel
                    autoRunInterval={3000}
                    isAutoRunning={true}
                    height='60vh'
                    indicatorPosition='end'
                >
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>
                                Page 1
                            </p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>
                                Page 2
                            </p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>
                                Page 3
                            </p>
                        </div>
                    </CarouselChild>
                    <CarouselChild>
                        <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', border:'1px dashed var(--clr-border)', boxSizing:'border-box'}}>
                            <p>
                                Page 4
                            </p>
                        </div>
                    </CarouselChild>
                </Carousel>
            </div>
            <div style={{height:'80vh', border:'1px solid var(--clr-border)', margin:'var(--space-300)'}}>
                <Resizable isSavePanelSize={true} direction={(appTheme.screenSize!=='laptop')?('vertical'):('horizontal')}>
                    {
                        isShowLeftPanel&&(
                            <>
                                <ResizablePanel order={1} minPanelSize={0} defaultPanelSize={20}>
                                    <div>
                                        <h1>Resizable Panels</h1>
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nesciunt nisi, fugit consequuntur cupiditate, aspernatur odit iste, mollitia deleniti cumque quo. Mollitia quod voluptatem voluptas obcaecati quas sit quo. Odio.</p>
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle direction={(appTheme.screenSize!=='laptop')?('vertical'):('horizontal')}/>
                            </>

                        )
                    }
                    <ResizablePanel order={2}>
                        <Resizable direction='vertical'>
                            <ResizablePanel minPanelSize={20}>
                                <div>
                                    <h1>Resizable Panels</h1>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nesciunt nisi, fugit consequuntur cupiditate, aspernatur odit iste, mollitia deleniti cumque quo. Mollitia quod voluptatem voluptas obcaecati quas sit quo. Odio.</p>
                                    <div style={{display:'flex', alignItems:"center", marginTop:"var(--space-300)"}}>
                                        <Button
                                            txtLabel={'Show Right Panel'}
                                            onClick={()=>{setIsShowLeftPanel(!isShowLeftPanel)}}
                                        />
                                        <span>isShowLeft Panel:{`${isShowLeftPanel}`}</span>
                                    </div>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle direction='vertical'/>
                            <ResizablePanel minPanelSize={20}>
                                <Resizable direction='horizontal'>
                                    <ResizablePanel minPanelSize={20} minContentWidth='10vw'>
                                        <>
                                            <h1>Resizable Panels</h1>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nesciunt nisi, fugit consequuntur cupiditate, aspernatur odit iste, mollitia deleniti cumque quo. Mollitia quod voluptatem voluptas obcaecati quas sit quo. Odio.</p>
                                        </>
                                    </ResizablePanel>
                                    <ResizableHandle direction='horizontal'/>
                                    <ResizablePanel minPanelSize={20} minContentWidth='10vw'>
                                        <>
                                            <h1>Resizable Panels</h1>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nesciunt nisi, fugit consequuntur cupiditate, aspernatur odit iste, mollitia deleniti cumque quo. Mollitia quod voluptatem voluptas obcaecati quas sit quo. Odio.</p>
                                        </>
                                    </ResizablePanel>
                                </Resizable>
                            </ResizablePanel>
                        </Resizable>
                    </ResizablePanel>
                </Resizable>
            </div>
        </div>
    )
}

export default PlaygroundModule


const tableColumnDummy: tableColumnType[] = [
    {key:'label1', txtLabel:'Label 1', size:{size:'30%', min:'200px'}, isCanSort:true, horizontalAlign:'start', isDefaultSort:true},
    {key:'label2', txtLabel:'Label 2', size:{size:'60%', min:'280px'}, isCanSort:false, horizontalAlign:'start'},
    {key:'label3', txtLabel:'Label 3', size:{size:'10%', min:'120px'}, isCanSort:true, horizontalAlign:'end'},
    {key:'label4', txtLabel:'Label 4', size:{size:'10%', min:'120px'}, isCanSort:false, horizontalAlign:'start'},
    {key:'action', type:'row-action', txtLabel:'Action', size:{size:'0%', min:'154px'}, horizontalAlign:'center', actionButtonList:[
        {id:"edit", type:'button', txtLabel:'Edit', icon:<PiPencil className='global-icon'/>},
        {id:"delete", type:'icon-button', txtLabel:'Delete', icon:<PiTrashBold className='global-icon'/>},
        {
            id:"option", 
            type:'dropdown-menu', 
            txtLabel:'Option', 
            icon:<PiDotsThreeBold className='global-icon'/>, 
            option:[
                {
                    id:"download-csv", 
                    txtLabel:"Download as CSV", 
                    icon:<PiDownloadBold className='global-icon'/>,
                },
                {
                    id:"download-xlsx", 
                    txtLabel:"Download as XLSX", 
                    icon:<PiDownloadBold className='global-icon'/>
                }
            ]
        },
    ]},
]
const statuses = [
    { appearance: 'success', label: 'Success', icon: <PiCheckCircleBold className='global-icon'/> },
    { appearance: 'warning', label: 'Pending', icon: <PiHourglassBold className='global-icon'/> },
    { appearance: 'danger', label: 'Canceled', icon: <PiXSquareBold className='global-icon'/> }
];

const generateRandomNumber = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
};

const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

const generateDataDummy = (length:number) =>{
    const tableDataDummy: tableRowDataType[] = Array.from({ length: length??25 }, (_, index) => {
        const status = statuses[index % statuses.length];
        const tamp:tableRowDataType = {
            id: String(index + 1),
            label1: [
                `Data Row ${index + 1}`,
                (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-50)' }}>
                        <Tag txtLabel={`tag-${index + 1}`} iconBefore={<PiTagBold className='global-icon' />} onClick={(_, textLabel) => console.log(textLabel)} />
                        <Tag txtLabel={`tag-${index + 10}`} iconBefore={<PiTagBold className='global-icon' />} onClick={(_, textLabel) => console.log(textLabel)} />
                        <Tag txtLabel={`tag-${index + 11}`} iconBefore={<PiTagBold className='global-icon' />} onClick={(_, textLabel) => console.log(textLabel)} />
                    </div>
                )
            ],
            label2: loremText,
            label3: generateRandomNumber(1000, 1000000),
            label4: (
                <Tag
                    appearance={status.appearance as any}
                    txtLabel={status.label}
                    iconBefore={status.icon}
                />
            ),
            expandedPage:(<TableExpandPage index={index+1}/>)
        }
        return tamp;
    })
    return tableDataDummy
}

const TableExpandPage = ({index}:{index:number}) =>{
    return(
        <div style={{maxHeight:'50vh', overflow:'auto'}}>
            <p>{`helloworld ${index}`}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolorem sunt, nihil facere voluptas natus voluptate eligendi. Minus fuga blanditiis temporibus officiis dolorem iusto voluptate labore, quasi quis mollitia ipsa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi veritatis consectetur tenetur odit quae, error vel consequuntur distinctio, sit commodi illo architecto facilis sunt? Provident cum corrupti maiores aliquid aspernatur.</p>
        </div>
    )
}

const indonesiaProvinces:optionItemType[] = [
    {id:'aceh', txtLabel:'Aceh', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-utara', txtLabel:'Sumatera Utara', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-barat', txtLabel:'Sumatera Barat', type:'option', icon:<PiCityBold/>},
    {id:'riau', txtLabel:'Riau', type:'option', icon:<PiCityBold/>},
    {id:'kepulauan-riau', txtLabel:'Kepulauan Riau', type:'option', icon:<PiCityBold/>},
    {id:'jambi', txtLabel:'Jambi', type:'option', icon:<PiCityBold/>},
    {id:'sumatera-selatan', txtLabel:'Sumatera Selatan', type:'option', icon:<PiCityBold/>},
    {id:'kepulauan-bangka-belitung', txtLabel:'Kepulauan Bangka Belitung', type:'option', icon:<PiCityBold/>},
    {id:'bengkulu', txtLabel:'Bengkulu', type:'option', icon:<PiCityBold/>},
    {id:'lampung', txtLabel:'Lampung', type:'option', icon:<PiCityBold/>},
    {id:'dki-jakarta', txtLabel:'DKI Jakarta', type:'option', icon:<PiCityBold/>},
    {id:'jawa-barat', txtLabel:'Jawa Barat', type:'option', icon:<PiCityBold/>},
    {id:'banten', txtLabel:'Banten', type:'option', icon:<PiCityBold/>},
    {id:'jawa-tengah', txtLabel:'Jawa Tengah', type:'option', icon:<PiCityBold/>},
    {id:'di-yogyakarta', txtLabel:'DI Yogyakarta', type:'option', icon:<PiCityBold/>},
    {id:'jawa-timur', txtLabel:'Jawa Timur', type:'option', icon:<PiCityBold/>},
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

const contentTags: optionItemType[] = [
    {id:'1', txtLabel:'Content Management System', type:'option', icon:<PiTagBold/>, alias:'cms'},
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

const menues:optionItemType[] =  [
    {
        id:'1', 
        txtLabel:'Sumatera',
        icon:<PiCityBold className='global-icon'/>,
        childOption:[
            {id:'1.1', icon:<PiCityBold className='global-icon'/>, txtLabel:'Aceh',childOption:[
                {id:'1.1.1', txtLabel:'Aceh Utara'},
                {id:'1.1.2', txtLabel:'Aceh Selatan'},
                {id:'1.1.3', txtLabel:'Aceh Barat', isDisabled:true},
                {id:'1.1.4', txtLabel:'Aceh Timur'},
            ]},
            {id:'1.2', icon:<PiCityBold className='global-icon'/>, txtLabel:'Sumatera Utara', childOption:[
                {id:'1.2.1', txtLabel:'Sumatera Utara Selatan'},
                {id:'1.2.2', txtLabel:'Sumatera Utara Barat'},
                {id:'1.2.3', txtLabel:'Sumatera Utara Timur'},
            ]},
            {id:'1.3', icon:<PiCityBold className='global-icon'/>, txtLabel:'Sumatera Barat'},
            {id:'1.4', icon:<PiCityBold className='global-icon'/>, txtLabel:'Sumatera Selatan'},
            {id:'1.5', icon:<PiCityBold className='global-icon'/>, txtLabel:'Riau'},
            {id:'1.6', icon:<PiCityBold className='global-icon'/>, txtLabel:'Jambi', isDisabled:true},
            {id:'1.7', icon:<PiCityBold className='global-icon'/>, txtLabel:'Lampung'},
        ]
    },
    {id:'2', txtLabel:'Jawa', icon:<PiCityBold className='global-icon'/>,},
    {id:'3', txtLabel:'Kalimanta', icon:<PiCityBold className='global-icon'/>,},
    {id:'4', txtLabel:'Sulawesi', icon:<PiCityBold className='global-icon'/>, isDisabled:true},
]
const sampleContent = {
    "ops": [
        {
            "attributes": {
                "height": "50px",
                "width": "50px",
                "background": "transparent",
                "color": "#21201c"
            },
            "insert": {
                "image": "https://quilljs.com/assets/images/brand-asset.png"
            }
        },
        {
            "attributes": {
                "align": "center"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "Delta"
        },
        {
            "attributes": {
                "header": 1
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "Deltas are a simple, yet expressive format that can be used to describe Quill's contents and changes. The format is a strict subset of JSON, is human readable, and easily parsible by machines. Deltas can describe any Quill document, includes all text and formatting information, without the ambiguity and complexity of HTML."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "italic": true,
                "background": "transparent",
                "color": "#2e96ba",
                "bold": true
            },
            "insert": "Note"
        },
        {
            "attributes": {
                "blockquote": true
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "Don't be confused by its name "
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000",
                "italic": true
            },
            "insert": "Delta"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "—Deltas represents both documents and changes to documents. If you think of Deltas as the instructions from going from one document to another, the way Deltas represent a document is by expressing the instructions starting from an empty document."
        },
        {
            "attributes": {
                "blockquote": true
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "Deltas are implemented as a separate "
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#f46b0c",
                "link": "https://github.com/quilljs/delta/"
            },
            "insert": "standalone library"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": ", allowing its use outside of Quill. It is suitable for "
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#f46b0c",
                "link": "https://en.wikipedia.org/wiki/Operational_transformation"
            },
            "insert": "Operational Transform"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": " and can be used in realtime, Google Docs like applications. For a more in depth explanation behind Deltas, see "
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#f46b0c",
                "link": "https://quilljs.com/guides/designing-the-delta-format"
            },
            "insert": "Designing the Delta Format"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "italic": true,
                "background": "transparent",
                "color": "#2e96ba",
                "bold": true
            },
            "insert": "Note"
        },
        {
            "attributes": {
                "blockquote": true
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "transparent",
                "color": "#000000"
            },
            "insert": "It is not recommended to construct Deltas by hand—rather use the chainable insert(), delete(), and retain() methods to create new Deltas. You can use import() to access Delta from Quill."
        },
        {
            "attributes": {
                "blockquote": true
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Document"
        },
        {
            "attributes": {
                "header": 2
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "The Delta format is almost entirely self-explanatory—the example below describes the string \"Gandalf the Grey\" where \"Gandalf\" is bolded and \"Grey\" is colored #cccccc."
        },
        {
            "insert": "\n{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ops: ["
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: 'Gandalf', attributes: { bold: true } },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: ' the ' },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: 'Grey', attributes: { color: '#cccccc' } }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "}"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "As its name would imply, describing content is actually a special case for Deltas. The above example is more specifically instructions to insert a bolded string \"Gandalf\", an unformatted string \" the \", followed by the string \"Grey\" colored #cccccc. When Deltas are used to describe content, it can be thought of as the content that would be created if the Delta was applied to an empty document."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Since Deltas are a data format, there is no inherent meaning to the values of "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "attribute"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " keypairs. For example, there is nothing in the Delta format that dictates color value must be in hex—this is a choice that Quill makes, and can be modified if desired with "
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#f46b0c",
                "link": "https://github.com/quilljs/parchment/"
            },
            "insert": "Parchment"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Embeds"
        },
        {
            "attributes": {
                "header": 3
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "For non-text content such as images or formulas, the insert key can be an object. The object should have one key, which will be used to determine its type. This is the "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "blotName"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " if you are building custom content with "
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#f46b0c",
                "link": "https://github.com/quilljs/parchment/"
            },
            "insert": "Parchment"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": ". Like text, embeds can still have an "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "attributes"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " key to describe formatting to be applied to the embed. All embeds have a length of one."
        },
        {
            "insert": "\n{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ops: [{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    // An image link"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    insert: {"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "      image: 'https://quilljs.com/assets/images/icon.png'"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    attributes: {"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "      link: 'https://quilljs.com'"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  }]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "}"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Line Formatting"
        },
        {
            "attributes": {
                "header": 3
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Attributes associated with a newline character describes formatting for that line."
        },
        {
            "insert": "\n{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ops: ["
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: 'The Two Towers' },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: '\\n', attributes: { header: 1 } },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: 'Aragorn sped on up the hill.\\n' }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "}"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Changes"
        },
        {
            "attributes": {
                "header": 2
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "When you register a listener for Quill's "
        },
        {
            "attributes": {
                "color": "#000000"
            },
            "insert": "text-change"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " event, one of the arguments you will get is a Delta describing what changed. In addition to "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "insert"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operations, this Delta might also have "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "delete"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " or "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "retain"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operations."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Delete"
        },
        {
            "attributes": {
                "header": 3
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "The "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "delete"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operation instructs exactly what it implies: delete the next number of characters."
        },
        {
            "insert": "\n{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ops: ["
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { delete: 10 } // Delete the next 10 characters"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "}"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Since "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "delete"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operations do not include "
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000",
                "italic": true
            },
            "insert": "what"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " was deleted, a Delta is not reversible."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Retain"
        },
        {
            "attributes": {
                "header": 3
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "A "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "retain"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operation simply means keep the next number of characters, without modification. If "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "attributes"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " is specified, it still means keep those characters, but apply the formatting specified by the "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "attributes"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " object. A "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "null"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " value for an attributes key is used to specify format removal."
        },
        {
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Starting with the above \"Gandalf the Grey\" example:"
        },
        {
            "insert": "\n// {"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "//   ops: ["
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "//     { insert: 'Gandalf', attributes: { bold: true } },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "//     { insert: ' the ' },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "//     { insert: 'Grey', attributes: { color: '#cccccc' } }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "//   ]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "// }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n\n"
        },
        {
            "insert": "{"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ops: ["
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    // Unbold and italicize \"Gandalf\""
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { retain: 7, attributes: { bold: null, italic: true } },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n\n"
        },
        {
            "insert": "    // Keep \" the \" as is"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { retain: 5 },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n\n"
        },
        {
            "insert": "    // Insert \"White\" formatted with color #fff"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { insert: 'White', attributes: { color: '#fff' } },"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n\n"
        },
        {
            "insert": "    // Delete \"Grey\""
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "    { delete: 4 }"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "  ]"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "insert": "}"
        },
        {
            "attributes": {
                "code-block": "plain"
            },
            "insert": "\n"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": "Note that a Delta's instructions always starts at the beginning of the document. And because of plain "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "retain"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operations, we never need to specify an index for a "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "delete"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " or "
        },
        {
            "attributes": {
                "background": "#f1f1f1",
                "color": "#000000",
                "code": true
            },
            "insert": "insert"
        },
        {
            "attributes": {
                "background": "#ffffff",
                "color": "#000000"
            },
            "insert": " operation."
        },
        {
            "insert": "\n"
        }
    ]
};