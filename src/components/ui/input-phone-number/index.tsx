import './styles.scss'
import { PiEmpty, PiGlobeBold, PiMagnifyingGlassBold } from "react-icons/pi"
import DropdownMenu, { type dropdownMenuStyleType } from "../dropdown-menu"
import IconButton, { type iconButtonStyleType } from "../icon-button"
import { useEffect, useMemo, useRef, useState } from "react"
import type { fieldErrorType, globalShapeType } from "src/components/_types"
import InputText, { type inputTextConfigType, type inputTextStyleType } from "../input-text"
import { useDeepCompareMemo } from "src/hook/useDeepCompareMemo"
import * as ctrl from './controller';
import clsx from 'clsx'
import { countryCodeList, detectPhoneNumber } from 'src/helper/inter-phone-number-helper'


type inputPhoneNumberStyleType = {
    input : inputTextStyleType;
    countryButton: iconButtonStyleType;
    dropdownMenu: dropdownMenuStyleType
}


const InputPhoneNumber = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    shape = undefined,
    txtPlaceholder = undefined,
    value = '',
    isDisabled = false,
    onChange = undefined,
    onKeyDown = undefined,
    error = undefined,
    onValidate = undefined,
    triggerValidate = 0,
    config = undefined,
}:{
    ref?:React.Ref<HTMLInputElement>;
    id?:string
    className?:string;
    style?:inputPhoneNumberStyleType;
    shape?:globalShapeType;
    txtPlaceholder?:string;
    value?:string;
    isDisabled?:boolean
    onChange?:(newValue:string, e:React.ChangeEvent<HTMLInputElement>|React.MouseEvent<HTMLButtonElement, MouseEvent>|undefined)=>void
    onKeyDown?:(e:React.KeyboardEvent<HTMLInputElement>, value:string)=>void;
    error?:fieldErrorType;
    onValidate?:(error:fieldErrorType, newValue:string)=>void;
    triggerValidate?:0|1;
    config?:inputTextConfigType;
}) =>{
    const [countrySelected, setCountrySelected] = useState<{id:string, flag:any, code:string}>({id:'', code:'', flag:''})
    const searchBarRef = useRef<HTMLInputElement>(null);
    const [searchParam, setSearchParam] = useState('')
    const countryCodeListLov = useMemo(()=>{
        return countryCodeList.map((i)=>{
            return({
                id:i.id,
                icon:(<p className="text-lg">{i.flag}</p>),
                txtLabel: `${i.name} ${i.dialCode}`,
                alias:`${i.name}${i.dialCode}`,
                data:{
                    "dialCode": i.dialCode,
                    "flag": i.flag
                }
            })
        })
    },[])
    
    const optionTamp = useDeepCompareMemo(()=>{
        return ctrl.getProcessedOption(searchParam, countryCodeListLov)
    },[searchParam])

    const [phoneNumber, setPhoneNumber] = useState('')
    useEffect(() => {
        setCountrySelected(detectPhoneNumber(phoneNumber))
    }, [phoneNumber]);

    useEffect(()=>{
        if(value && value!==phoneNumber){
            setPhoneNumber(value)
        }
    },[value])
    
    return(
        <InputText
            type='tel'
            ref={ref}
            id={id}
            className={clsx('input-phone-number', className)}
            value={value||phoneNumber}
            shape={shape}
            style={style?.input}
            txtPlaceholder={txtPlaceholder}
            isDisabled={isDisabled}
            onChange={(newValue, e)=>{
                setPhoneNumber(`${newValue}`)
                if(onChange){
                    onChange(newValue, e)
                }
            }}
            onValidate={onValidate}
            triggerValidate={triggerValidate}
            onKeyDown={onKeyDown}
            config={config}
            error={error}

            beforeElement={
                <DropdownMenu
                    className={'country-option-dropdown'}
                    shape={shape}
                    style={style?.dropdownMenu}
                    trigger={
                        <IconButton 
                            tabIndex={-1}
                            className={clsx((error?.isError)&&('button-error'))}
                            icon={
                                (countrySelected.flag)?(
                                    <p className='text-lg'>{countrySelected.flag}</p>
                                ):(
                                    <PiGlobeBold className="text-lg"/>
                                )
                            } 
                            txtLabel="Country"
                            style={style?.countryButton}
                            isDisabled={isDisabled}
                        />
                    }
                    options={optionTamp}
                    onClick={(_, option, e)=>{
                        setPhoneNumber(option.data?.dialCode||'')
                        if(onChange){
                            onChange(option.data?.dialCode||'', e)
                        }
                        setCountrySelected((prev)=>{
                            return({
                                ...prev,
                                id:option.id,
                                code:option.data?.dialCode,
                                flag:option.data?.flag
                            })
                        })
                    }}
                    onClose={()=>{setSearchParam('')}}
                    optionSelected={countrySelected.id?([countrySelected.id]):([])}
                    elementHeader={
                        <div className='search-bar-box'>
                            <InputText 
                                ref={searchBarRef}
                                type='text'
                                txtPlaceholder='Search...'
                                value={searchParam}
                                onChange={(newValue)=>{setSearchParam(newValue)}}
                                config={{
                                    prefixElement:<PiMagnifyingGlassBold className='global-icon'/>
                                }}
                            />
                        </div>
                    }
                    elementFooter={
                        (searchParam && optionTamp.length===0)?(
                            <div className='empty-box'>
                                <PiEmpty className='global-icon' size={32}/>
                                <div>
                                    <span>No result.</span>
                                    <span>Try other search param!</span>
                                </div>
                            </div>
                        ):(undefined)
                    }
                    floatingConfig={{
                        isCloseOnItemClicked:true,
                        
                    }}
                />
            }
        />
    )
}

export default InputPhoneNumber