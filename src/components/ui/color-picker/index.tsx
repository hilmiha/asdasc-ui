import './styles.scss'
import * as ctrl from './controller';
import clsx from 'clsx'
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context'
import { useCallback, useContext, useEffect, useState } from 'react'
import type { globalShapeType } from 'src/components/_types'
import {
    RgbaColorPicker,
    HexColorPicker,
    type RgbaColor
} from "react-colorful";
import InputText from '../input-text';
import { debounce } from 'lodash';
import IconButton from '../icon-button';
import { PiCaretUpDownBold } from 'react-icons/pi';
import ColorPreview from './color-preview';

interface _ColorPicker {
    className?: string;
    shape?: globalShapeType;
    value?:string,
    onChange?: (color: string) => void;
    initMode?:colorPickerModeType
    onModeChange?: (mode:colorPickerModeType)=>void
    isAllowAlpha?: boolean;
}

export type colorPickerModeType = "hex" | "rgb";

const ColorPicker = ({
    className,
    shape,
    value = '',
    onChange,
    initMode,
    onModeChange,
    isAllowAlpha = false,
}: _ColorPicker) => {
    const { globalShape, appTheme } = useContext(GlobalContext) as _GlobalContextType;

    const [color, setColor] = useState<RgbaColor>((value)?(ctrl.hexToRgba(value, isAllowAlpha)):({r:0, g:0, b:0, a:1}));
    const [mode, setMode] = useState<colorPickerModeType>(initMode??"hex");

    //rgb input state
    const [rinput, setRinput] = useState(`${color.r}`)
    const [isRinputFocus, setIsRinputFocus] = useState(false)
    const [ginput, setGinput] = useState(`${color.g}`)
    const [isGinputFocus, setIsGinputFocus] = useState(false)
    const [binput, setBinput] = useState(`${color.g}`)
    const [isBinputFocus, setIsBinputFocus] = useState(false)
    const [ainput, setAinput] = useState(`${(color.a*100).toFixed(0)}`)
    const [isAinputFocus, setIsAinputFocus] = useState(false)

    //hext input state
    const [hexInput, setHexInput] = useState(ctrl.rgbaToHex(color, isAllowAlpha))
    const [isHexInputFocus, setHexInputFocus] = useState(false)

    const debouncedColorChange = useCallback(
        debounce((color:RgbaColor) => {
            if(!isHexInputFocus){
                setHexInput(ctrl.rgbaToHex(color, isAllowAlpha))
            }
            if(!isRinputFocus){
                setRinput(`${color.r}`)
            }
            if(!isGinputFocus){
                setGinput(`${color.g}`)
            }
            if(!isBinputFocus){
                setBinput(`${color.b}`)
            }
            if(!isAinputFocus){
                setAinput(`${(color.a*100).toFixed(0)}`)
            }
        }, 10),
    [setHexInput, setRinput, setGinput]);

    const debounceDoChangeValue = useCallback(
        debounce((color:RgbaColor, isAllowAlpha?:boolean) => {
            if(onChange){
                onChange(ctrl.rgbaToHex(color, isAllowAlpha))
            }
        }, 300),
    [onChange]);

    useEffect(()=>{
        debouncedColorChange(color)
        debounceDoChangeValue(color, isAllowAlpha)
    },[JSON.stringify(color)])

    useEffect(()=>{
        if(value && value!==ctrl.rgbaToHex(color, isAllowAlpha)){
            setColor(ctrl.hexToRgba(value, isAllowAlpha))
        }
    },[value])

    return (
        <div
            className={clsx(
                "color-picker",
                shape ? shape : globalShape,
                appTheme.globalTheme,
                className
            )}
        >
            <div style={{padding:'12px'}}>
                {isAllowAlpha ? (
                    // Picker switches based on isAllowAlpha
                    <RgbaColorPicker 
                        className='color-picker-box'
                        color={color} 
                        onChange={setColor} 
                    />
                ) : (
                    // RGB only picker (no alpha slider)
                    <HexColorPicker
                        className='color-picker-box'
                        color={ctrl.rgbaToHex(color, isAllowAlpha)}
                        onChange={(hex) => setColor(ctrl.hexToRgba(hex, isAllowAlpha))}
                    />
                )}
            </div>
            
            {/* Input & Toggle */}
            <div
                className='color-input-box'
            >
                <div style={{marginTop:'var(--space-25)'}}>
                    <ColorPreview
                        value={hexInput}
                        isAllowAlpha={isAllowAlpha}
                    />
                </div>
                <div style={{flexGrow:'1'}}>
                    {
                        (mode==='hex')&&(
                            <InputText
                                className='hex-input'
                                type='text'
                                value={hexInput}
                                onChange={(newValue)=>{
                                    setHexInput(newValue)
                                }}
                                onFocus={()=>{
                                    setHexInputFocus(true)
                                }}
                                onBlur={(_, newValue)=>{
                                    setHexInputFocus(false)
                                    const hexRegex = isAllowAlpha ? /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i : /^#([0-9A-F]{3}|[0-9A-F]{6})$/i;
                                    if (hexRegex.test(newValue)){
                                        setColor(ctrl.hexToRgba(newValue, isAllowAlpha))
                                    }else{
                                        setTimeout(() => {
                                            setHexInput(ctrl.rgbaToHex(color, isAllowAlpha))
                                        }, 500);
                                    }
                                }}  
                                config={{
                                    isHideClear:true
                                }}
                            />
                        )
                    }
                    {
                        (mode==='rgb')&&(
                            <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-100)'}}>
                                <InputText
                                    className='rgba-input'
                                    type='number-text'
                                    value={rinput}
                                    onChange={(newValue)=>{
                                        setRinput(newValue)
                                    }}
                                    onFocus={()=>{setIsRinputFocus(true)}}
                                    onBlur={(_, newValue)=>{
                                        setIsRinputFocus(false)
                                        const number = parseInt(newValue)
                                        if(number <= 255){
                                            setColor((prev)=>{
                                                return({...prev, r:number})
                                            })
                                        }else{
                                            setTimeout(() => {
                                                setRinput(`${color.r}`)
                                            }, 500);
                                        }
                                    }}
                                    config={{prefixElement:'R', isHideClear:true, maxLength:3}}
                                />
                                <InputText
                                    className='rgba-input'
                                    type='number-text'
                                    value={ginput}
                                    onChange={(newValue)=>{setGinput(newValue)}}
                                    onFocus={()=>{setIsGinputFocus(true)}}
                                    onBlur={(_, newValue)=>{
                                        setIsGinputFocus(false)
                                        const number = parseInt(newValue)
                                        if(number <= 255){
                                            setColor((prev)=>{
                                                return({...prev, g:number})
                                            })
                                        }else{
                                            setTimeout(() => {
                                                setGinput(`${color.g}`)
                                            }, 500);
                                        }
                                    }}
                                    config={{prefixElement:'G', isHideClear:true, maxLength:3}}
                                />
                                <InputText
                                    className='rgba-input'
                                    type='number-text'
                                    value={binput}
                                    onChange={(newValue)=>{setBinput(newValue)}}
                                    onFocus={()=>{setIsBinputFocus(true)}}
                                    onBlur={(_, newValue)=>{
                                        setIsBinputFocus(false)
                                        const number = parseInt(newValue)
                                        if(number <= 255){
                                            setColor((prev)=>{
                                                return({...prev, b:number})
                                            })
                                        }else{
                                            setTimeout(() => {
                                                setBinput(`${color.b}`)
                                            }, 500);
                                        }
                                    }}
                                    config={{prefixElement:'B', isHideClear:true, maxLength:3}}
                                />
                                {
                                    (isAllowAlpha)&&(
                                        <InputText
                                            className='rgba-input'
                                            type='number-text'
                                            value={ainput}
                                            onChange={(newValue)=>{setAinput(newValue)}}
                                            onFocus={()=>{setIsAinputFocus(true)}}
                                            onBlur={(_, newValue)=>{
                                                setIsAinputFocus(false)
                                                const number = parseInt(newValue)
                                                if(number <= 225){
                                                    setColor((prev)=>{
                                                        return({...prev, a:number/100})
                                                    })
                                                }else{
                                                    setTimeout(() => {
                                                        setAinput(`${(color.a*100).toFixed(0)}`)
                                                    }, 500);
                                                }
                                            }}
                                            config={{prefixElement:'A', sufixElement:'%', isHideClear:true, maxLength:3}}
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div style={{maxWidth:'100%'}}>
                    <IconButton
                        className='toggle-mode-button'
                        icon={<PiCaretUpDownBold/>}
                        txtLabel='input mode'
                        isShowtooltip={false}
                        appearance='subtle'
                        onClick={() => {
                            setMode(mode === "hex" ? "rgb" : "hex")
                            if(onModeChange){
                                onModeChange(mode === "hex" ? "rgb" : "hex")
                            }
                        }}
                    />
                </div>
                
            </div>
        </div>
    );
};

export default ColorPicker
