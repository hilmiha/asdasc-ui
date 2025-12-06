import './styles.scss'
import Button, { type buttonStyleType } from "../button"
import clsx from 'clsx'
import type { fieldErrorType, globalShapeType } from 'src/components/_types'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import { PiCircleFill, PiFileBold, PiWarningBold, PiXBold } from 'react-icons/pi'
import IconButton from '../icon-button'
import { getFileSizeDisplay, getFormatedNumberForDisplay } from 'src/helper/helper'

type inputFileStyleType = {
    triggerButton?:buttonStyleType,
    inputFileBox?:React.CSSProperties,
}

export type inputFileValueType = {
    id:string,
    name?:string,
    size?:number,
    type?:string,
    file?:File
}

type allowedFileTypeType = '.html' | '.jpg' | '.jpeg' | '.png' | '.csv' 
type inputFileConfigType = {
    isRequired?:boolean
    minValue?:number
    maxValue?:number
    allowedFileType?: allowedFileTypeType[];
    maxSizePerFileKB?: number; // in B
}

type inputFileType = 'single' | 'multiple';

const InputFile = ({
    className = undefined,
    style = undefined,
    shape = undefined,

    type = 'single',
    value = [],
    isDisabled = false,
    onChange = undefined,
    error = undefined,
    onValidate = undefined,
    triggerValidate = 0,

    config = undefined,
}:{
    className?:string;
    style?:inputFileStyleType;
    shape?:globalShapeType;

    type:inputFileType;
    value?:inputFileValueType[]
    isDisabled?:boolean;
    onChange?:(newValue:inputFileValueType[], file?:File)=>void
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:inputFileValueType[])=>void;
    triggerValidate?:0|1;
    config?:inputFileConfigType
}) =>{

    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    const inputFileDomRef = useRef<HTMLInputElement>(null)
    const inputFileButtonRef = useRef<HTMLButtonElement>(null)
    const [isDirty, setIsDirty] = useState(false)
    const maxSizePerFile = useMemo(()=>{
        return config?.maxSizePerFileKB?config['maxSizePerFileKB'] * 1024:undefined
    },[config?.maxSizePerFileKB])

    const [fileError, setFileError] = useState<{[key:string]:fieldErrorType}>({})

    const onClickTrigger = (
        inputDomRef:React.RefObject<HTMLInputElement | null>,
        isDisabled:boolean
    ) =>{
        if(!isDisabled && inputDomRef.current){
            inputDomRef.current.click()
        }
    }

    const doChangeValue = (
        newValue:inputFileValueType[],
        selectedValue:File|undefined,
        onChange:(newValue:inputFileValueType[], file?:File)=>void
    ) =>{
        onChange(newValue, selectedValue)
    }
    //validation of value
    const doValidateValue = (
        newValue:inputFileValueType[],
        onValidate:(error:fieldErrorType, newValue:inputFileValueType[])=>void,
        config:inputFileConfigType,
    ) =>{
        let isError = false
        let errorMessage = ''
    
        if(config['isRequired'] && !isError){
            if(newValue.length===0){
                isError = true
                errorMessage = 'This field cannot be empty!'
            }
        }
        if(config['maxValue'] && !isError){
            if(newValue.length > config['maxValue']){
                isError = true
                errorMessage = `Value selected cannot exceed ${getFormatedNumberForDisplay(`${config['maxValue']}`)} items`
            }
        }
    
        if(config['minValue'] && !isError){
            if(newValue.length < config['minValue']){
                isError = true
                errorMessage = `Value must be at least ${getFormatedNumberForDisplay(`${config['minValue']}`)} items`
            }
        }

        if(!isError){
            let isFileError = false
            const sizeCompare = config['maxSizePerFileKB']?config['maxSizePerFileKB'] * 1024:undefined

            newValue.forEach((i)=>{
                if(!config['allowedFileType']?.includes((`.${i.type||''}`) as allowedFileTypeType)){
                    isFileError = true
                    setFileError((prev)=>{
                        const tampFileError = {...prev}
                        tampFileError[i.id] = {isError:true, errorMessage:`The file type isn't supported.`}
                        return tampFileError
                    })
                }else if(i.size && sizeCompare && i.size > sizeCompare){
                    isFileError = true
                    setFileError((prev)=>{
                        const tampFileError = {...prev}
                        tampFileError[i.id] = {isError:true, errorMessage:`The file size is to large!`}
                        return tampFileError
                    })
                }else{
                    setFileError((prev)=>{
                        const tampFileError = {...prev}
                        tampFileError[i.id] = {isError:false, errorMessage:''}
                        return tampFileError
                    })
                }
            })

            if(isFileError){
                isError=true,
                errorMessage = `There's an issue with one of the file(s) selected.`
            }
        }
        
        onValidate({isError:isError, errorMessage:errorMessage},newValue)
    }

    const onSelectFile = (
        event: React.ChangeEvent<HTMLInputElement>,
        oldValue:inputFileValueType[],
        type:inputFileType,
        isDirty:boolean, 
        setIsDirty:(x:boolean)=>void,
        inputFileButtonRef:React.RefObject<HTMLButtonElement | null>,
        config?:inputFileConfigType,
        onChange?:(newValue:inputFileValueType[], file?:File)=>void
    ) =>{
        const files = event.target.files
        if(!files || files.length===0){
            return
        }

        let newValue = [...oldValue]


        if(type==='multiple'){
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const newId = `${new Date().getTime()}-${i}`
                const tampExtension = file.name.split('.').at(-1)

                newValue.push({
                    id:newId,
                    name:file.name,
                    size:file.size,
                    type:tampExtension,
                    file:file
                })
            }
        }else{
            const file = files[0];

            const newId = `${new Date().getTime()}`
            const tampExtension = file.name.split('.').at(-1)
            
            newValue = [{
                id:newId,
                name:file.name,
                size:file.size,
                type:tampExtension,
                file:file
            }]
        }
        
        event.target.value = ''

        if(config?.maxValue && newValue.length > config.maxValue){
            newValue = [...oldValue]
        }

        //send new value out of this component
        if(onChange){
            doChangeValue(newValue, undefined, onChange)
        }

        //Reset validation when user focus on field
        if(onValidate && config){
            doValidateValue(newValue, onValidate , config)
        }

        //set input text dirty after user typing something
        if(!isDirty){
            setIsDirty(true)
        }

        inputFileButtonRef.current?.focus()
    }

    const doRemoveFile = (
        id:string,
        oldValue:inputFileValueType[],
        type:inputFileType,
        isDirty:boolean, 
        setIsDirty:(x:boolean)=>void,
        inputFileButtonRef:React.RefObject<HTMLButtonElement | null>,
        config?:inputFileConfigType,
        onChange?:(newValue:inputFileValueType[], file?:File)=>void
    ) =>{
        let newValue = [...oldValue]
        if(type==='multiple'){
            newValue = newValue.filter(i=>i.id!==id)
        }else{
            newValue = []
        }

        //send new value out of this component
        if(onChange){
            doChangeValue(newValue, undefined, onChange)
        }

        //Reset validation when user focus on field
        if(onValidate && config){
            console.log('hett')
            doValidateValue(newValue, onValidate , config)
        }

        //set input text dirty after user typing something
        if(!isDirty){
            setIsDirty(true)
        }

        inputFileButtonRef.current?.focus()
    }

    useEffect(()=>{
        if(triggerValidate===1){
            if(onValidate && config){
                doValidateValue(value, onValidate, config)
            }
        }
    },[triggerValidate])

    return(
        <div className={clsx("input-file-box", className)}>
            <div style={{display:'flex', gap:"var(--space-150)"}}>
                <Button
                    className={clsx('select-file-button', (error?.isError)&&('error-button'))}
                    ref={inputFileButtonRef}
                    txtLabel={'Browse File'}
                    style={style?.triggerButton}
                    onClick={()=>{onClickTrigger(inputFileDomRef, isDisabled)}}
                    isDisabled={isDisabled || (config?.maxValue)?(value.length===config?.maxValue):(false)}
                />
                {
                    (error?.isError&&error.errorMessage)&&(
                        <div className='error-box'>
                            <PiWarningBold className='global-icon'/>
                            <p>{error?.errorMessage}</p>
                        </div>
                    )
                }
            </div>
            {
                value.map((i)=>(
                    <div 
                        className={clsx(
                            'file-card-box',
                            (shape)?(shape):(globalShape),
                            (fileError[i.id]?.isError)&&('error')
                        )}
                    >
                        <div style={{display:'flex', alignItems:'center', gap:'var(--space-100)'}}>
                            <PiFileBold className='global-icon' color='var(--clr-surface-primary-5)'/>
                            <span className='text-title'>{i.name}</span>
                            {
                                (i.size)&&(
                                    <div style={{display:'flex', alignItems:'center', gap:'var(--space-100)'}}>
                                        <span className='text-sub text-sm'>{`(${getFileSizeDisplay(i.size)})`}</span>
                                    </div>
                                )
                            }
                            <div style={{flexGrow:'1'}}/>
                            {
                                (fileError[i.id] && fileError[i.id].isError && fileError[i.id].errorMessage)&&(
                                    <div className='error-box'>
                                        <PiWarningBold className='global-icon'/>
                                        <p>{fileError[i.id].errorMessage}</p>
                                    </div>
                                )
                            }
                            <IconButton
                                icon={<PiXBold className='global-icon'/>}
                                txtLabel='Remove'
                                appearance='subtle'
                                style={{button:{padding:'0px', height:'fit-content', width:'fit-content', color: 'var(--clr-surface-primary-5)'}}}
                                onClick={()=>{doRemoveFile(i.id, value, type, isDirty, setIsDirty, inputFileButtonRef, config, onChange)}}
                            />
                        </div>
                    </div>
                ))
            }
            <div style={{display:'flex', alignItems:'center', gap:'var(--space-100)', minWidth:'max-content'}}>
                {
                    (config?.maxValue)&&(
                        <span className='text-sub text-sm'>{`File selected: ${value.length}/${config.maxValue}`}</span>
                    )
                }
                {
                    (maxSizePerFile)&&(
                        <>
                            <PiCircleFill size={4} className='display-icon'/>
                            <span className='text-sub text-sm'>{`Max file size ${getFileSizeDisplay(maxSizePerFile)}`}</span>
                        </>
                    )
                }
                {
                    (config?.allowedFileType)&&(
                        <>
                            <PiCircleFill size={4} className='display-icon'/>
                            <span className='text-sub text-sm'>{`Allowed file type ${config.allowedFileType.join(', ')}`}</span>
                        </>
                    )
                }
            </div>
            
            <input 
                ref={inputFileDomRef}
                type="file" 
                style={{display:'none'}}
                disabled={isDisabled}
                accept={config?.allowedFileType?(config.allowedFileType.join(',')):(undefined)}
                onChange={(e)=>{onSelectFile(e, value, type, isDirty, setIsDirty, inputFileButtonRef,config, onChange)}}
            />
        </div>
    )
}

export default InputFile