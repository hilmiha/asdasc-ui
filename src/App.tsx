import './App.scss'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Button from './components/button';
import { PiAppWindowFill, PiCircleBold, PiCircleDashedBold, PiCityBold, PiCopyBold, PiDotsThreeBold, PiMonitorArrowUpFill, PiPencilBold, PiStarFourBold, PiTagBold, PiXCircleBold } from 'react-icons/pi';
import IconButton from './components/icon-button';
import { GlobalContext, type _GlobalContextType } from './context/global-context';
import { BiSquare, BiSquareRounded } from 'react-icons/bi';
import SplitButton from './components/split-button';
import DropdownMenu from './components/dropdown-menu';
import InputText from './components/input-text';
import type { fieldErrorType, globalShapeType, optionItemType } from './components/_types';
import InputPassword from './components/input-password';
import InputSelection from './components/input-selection';
import InputTag from './components/input-tag';
import RadioGroup from './components/radio-group';
import BottomSheet from './components/bottom-sheet';
import Dropdown from './components/dropdown';
import Modal from './components/modal';
import InputTextarea from './components/input-textarea';
import Accordion from './components/accordion';
import AccordionGroup from './components/accordion-group';
import Wysiwyg from './components/wysiwyg';
import type { Delta } from 'quill';
import { QuillHtmlUtils } from './components/wysiwyg/utils/utils';
import CheckboxButton from './components/checkbox-button';
import RadioButton from './components/radio-button';
import CheckboxGroup from './components/checkbox-group';
import Calendar, { type validCalendarDisabledValue } from './components/calendar';
import type { DateRange } from 'react-day-picker';
import { addDays, subDays, subMonths } from 'date-fns';

function App() {
    const {
        appTheme,
        toggleGlobalPrimary,
        toggleGlobalTheme,
        toggleGlobalTone,
        toggleGlobalShape,
        screenSize
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
        testTextArea:'',
        testSelection:[],
        testSelectionComboBox:[],
        testSelectionMulti:[],
        testTags:[],
        isRadio:false,
        radioStatus:'',
        checkboxStatus:[],
    })
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
        isRadio:{isError:false, errorMessage:''},
        radioStatus:{isError:false, errorMessage:''},
        checkboxStatus:{isError:false, errorMessage:''},
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

    const [content, setContent] = useState<Delta | undefined>(undefined);
    const [contentError, setContentError] = useState<fieldErrorType>({isError:false, errorMessage:''})
    const contentHtml = useMemo(()=>{
        if(content){
            console.log(content)
            return QuillHtmlUtils.deltaToHtml(content)
        }
    },[content])

    const presetContent = () => {
        setContent(sampleContent as Delta);
    };

    const [valueDt, setValueDt] = useState< Date | undefined>(undefined)
    const [valueDtTm, setValueDtTm] = useState< Date | undefined>(undefined)
    const [valueDtRange, setValueDtRange] = useState< DateRange | undefined>(undefined)
    const [valueDtMultiple, setValueDtMultiple] = useState< Date[] | undefined>(undefined)
    const disabledDates = useMemo<validCalendarDisabledValue[]>(()=>{
        return([
            {from:subDays(new Date(), 30), to:subDays(new Date(), 27)}
        ])
    },[])
    useEffect(()=>{
        console.log(valueDt)
    },[valueDt])
    useEffect(()=>{
        console.log(valueDtTm)
    },[valueDtTm])
    useEffect(()=>{
        console.log(valueDtRange)
    },[valueDtRange])
    useEffect(()=>{
        console.log(valueDtMultiple)
    },[valueDtMultiple])

    const [valueCheckbox, setValueCheckbox] = useState<string[]>([])
    
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
                            maxLines:5,
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
                    <div>
                        <RadioButton
                            isSelected={true}
                        />
                        <RadioButton
                            isSelected={true}
                            txtLabel='Hello World'
                            txtSublabel='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, exercitationem laboriosam! Porro ducimus sapiente qui sit asperiores, modi reiciendis quo tempora dolor at nesciunt harum suscipit laudantium, nam eos doloribus.'
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
                    setValue={setValueDt}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='single-with-time'
                    value={valueDtTm}
                    setValue={setValueDtTm}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='multiple'
                    value={valueDtMultiple}
                    setValue={setValueDtMultiple}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
                <Calendar
                    type='range'
                    value={valueDtRange}
                    setValue={setValueDtRange}
                    isDisabled={false}
                    disabledDates={disabledDates}
                />
            </div>
            <div style={{padding:'var(--space-300)'}}>
                <Button txtLabel={'Preset'} onClick={()=>{presetContent()}}/>
                <Wysiwyg
                    value={content}
                    onChange={(newValue)=>{setContent(newValue)}}
                    onValidate={(error)=>{setContentError(error)}}
                    onBlur={()=>{console.log('here')}}
                    isDisabled={false}
                    placeholder="Start typing..."
                    error={contentError}
                    config={{
                        isRequired:true,
                    }}
                />
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
            <div>
                <SplitButton
                    txtLabel='Modal Open'
                    options={[
                        {id:'small', txtLabel:'Small Modal'},
                        {id:'medium', txtLabel:'Medium Modal'},
                        {id:'large', txtLabel:'Large Modal'}
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
                    floatingConfig={{
                        isDisableDismiss:false
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
                    <p className='hello'>{appTheme.globalTheme??'-'}</p>
                    <p className='hello'>{appTheme.globalTone??'-'}</p>
                    <p className='hello'>{appTheme.globalPrimary??'-'}</p>
                    <p className='hello'>{appTheme.globalShape??'-'}</p>
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
                                            border:`2px solid ${appTheme.globalTone===`tonal_${clr}`?'var(--surface-3)':'transparent'}`
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
                                            border:`2px solid ${appTheme.globalPrimary===`primary_${clr}`?'var(--surface-3)':'transparent'}`
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
                    colorPaletComponent
                }
            </div>
        </div>
    )
}

export default App


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