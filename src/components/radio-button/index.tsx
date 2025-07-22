import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';

const RadioButton = ({
    className = undefined,
    shape = undefined,
    txtLabel = undefined,
    txtSublabel = undefined,
    value = false,
    onClick = undefined,
    isDisabled = false
}:_RadioButton) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    return(
        <button 
            className={clsx(
                "radio-button",
                (shape)?(shape):(globalShape),
                {
                    ['disabled']:(isDisabled),
                    ['selected']:(value)
                },
                className
            )}
            onClick={(e)=>{
                ctrl.onRadioClicked(!value, e, onClick)
            }}
            disabled={isDisabled}
        >
            <div 
                className={clsx(
                    'circle-indicator',
                    (value)?('circle-on'):('circle-off')
                )}
            ></div>
            {
                (txtLabel || txtSublabel)&&(
                    <div className='label-box'>
                        <p className='text-label'>{txtLabel}</p>
                        {
                            (txtSublabel)&&(
                                <p className='text-sublabel'>{txtSublabel}</p>
                            )
                        }
                    </div>
                )
            }
        </button>
    )
}

export default RadioButton

interface _RadioButton {
    className?:string,
    style?:radioButtonStyleType;
    shape?:globalShapeType;
    txtLabel?:string
    txtSublabel?:string,
    value:boolean,
    onClick?:(newValue:boolean, e:React.MouseEvent<HTMLButtonElement>)=>void
    isDisabled?:boolean
}

type radioButtonStyleType = {

}