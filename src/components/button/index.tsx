import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import type { globalAppearanceType, globalShapeType } from '../_types';
import { useContext, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';

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
    onClick = undefined
}:_Button) =>{
    
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    return(
        <button
            ref={ref}
            id={id}
            className={
                clsx(
                    'button',
                    appearance,
                    (shape)?(shape):(globalShape),
                    {
                        ['selected']:(isSelected),
                        ['disabled']:(isDisabled)
                    },
                    className
                )
            }
            style={style?.button}
            onClick={(e)=>{
                if(!isDisabled){
                    ctrl.thisOnClick(e, onClick)
                }
            }}
            disabled={isDisabled}
        >
            {
                (iconBefore)&&(
                    <div 
                        className='icon-before'
                        style={style?.iconBefore}
                    >
                        {iconBefore}
                    </div>
                )
            }
            <div 
                className='text-label'
                style={style?.textLabel}
            >
                {txtLabel}
            </div>
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
    onClick?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
};

export type buttonStyleType = {
    button?:React.CSSProperties,
    textLabel?:React.CSSProperties,
    iconBefore?:React.CSSProperties,
    iconAfter?:React.CSSProperties
}