import { useMemo } from "react";
import * as ctrl from './controller';

const ColorPreview = ({
    value,
    isAllowAlpha,
    height,
    width,
}:{
    value:string,
    isAllowAlpha?:boolean,
    height?:string,
    width?:string,
}) =>{
    
        const color = useMemo(()=>{
            return ctrl.hexToRgba(value, isAllowAlpha)
        },[value])
    
    return(
        <div style={{position:'relative'}}>
            <div
                className='global-radius'
                style={{
                    position:'absolute',
                    height:height??'31.6px',
                    width:width??'31.6px',
                    backgroundColor: isAllowAlpha
                    ? `rgba(${color.r},${color.g},${color.b},${color.a})`
                    : `rgb(${color.r},${color.g},${color.b})`
                }}
            />
            <div
                className='global-radius checkered-background'
                style={{
                    height:height??'31.6px',
                    width:width??'31.6px',
                }}
            />
        </div>
    )
}

export default ColorPreview