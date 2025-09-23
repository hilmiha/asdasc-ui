import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { globalAppearanceType, globalShapeType } from 'src/components/_types';
import { useContext, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';
import Spinner from '../spinner';

const Button = ({
    ref = undefined,
    id = undefined,
    className = undefined,
    style = undefined,
    appearance = 'neutral',
    shape = undefined,
    txtLabel = '',
    iconBefore = undefined,
    iconAfter = undefined,
    isSelected = false,
    isDisabled = false,
    isLoading = false,
    onClick = undefined,
    tabIndex = undefined
}:_Button) =>{
    
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    return(
        <button
            ref={ref}
            tabIndex={tabIndex}
            id={id}
            className={
                clsx(
                    'button',
                    appearance,
                    (shape)?(shape):(globalShape),
                    {
                        ['selected']:(isSelected),
                        ['disabled']:(isDisabled),
                        ['loading']:(isLoading)
                    },
                    className
                )
            }
            style={style?.button}
            onClick={(e)=>{
                if(!isDisabled && !isLoading){
                    ctrl.thisOnClick(e, onClick)
                }
            }}
            disabled={isDisabled}
        >
            {
                (iconBefore || isLoading)&&(
                    <div 
                        className='icon-before'
                        style={style?.iconBefore}
                    >
                        {
                            (isLoading)&&(
                                <Spinner size='small'/>
                            )
                        }
                        {iconBefore}
                    </div>
                )
            }
            {
                (typeof txtLabel === 'string')?(
                    <div 
                        className='text-label-box'
                    >
                        <span className='text-label' style={style?.textLabel}>{txtLabel}</span>
                    </div>
                ):(
                    <>{txtLabel}</>
                )
            }
            {
                (iconAfter)&&(
                    <div 
                        className='icon-after'
                        style={style?.iconAfter}
                    >
                        {iconAfter}
                    </div>
                )
            }
        </button>
    )
}

export default Button

interface _Button {
    ref?:React.Ref<HTMLButtonElement>;
    id?:string
    className?:string;
    style?:buttonStyleType;
    appearance?:globalAppearanceType;
    shape?:globalShapeType;
    txtLabel:JSX.Element | string;
    iconBefore?:JSX.Element;
    iconAfter?:JSX.Element;
    isSelected?:boolean;
    isDisabled?:boolean;
    isLoading?:boolean;
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    tabIndex?:number
};

export type buttonStyleType = {
    button?:React.CSSProperties,
    textLabelBox?:React.CSSProperties,
    textLabel?:React.CSSProperties,
    iconBefore?:React.CSSProperties,
    iconAfter?:React.CSSProperties
}