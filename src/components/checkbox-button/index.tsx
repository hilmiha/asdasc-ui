import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';
import { FaCheck, FaMinus } from 'react-icons/fa';

const CheckboxButton = ({
    className = undefined,
    shape = undefined,
    txtLabel = undefined,
    txtSublabel = undefined,
    value = false,
    onClick = undefined,
    isDisabled = false,
    isIndeterminate = false
}:_CheckboxButton) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    return(
        <button 
            className={clsx(
                "checkbox-button",
                (shape)?(shape):(globalShape),
                {
                    ['disabled']:(isDisabled),
                    ['selected']:(value)
                },
                className
            )}
            onClick={(e)=>{
                ctrl.onCheckboxClicked(!value, e, onClick)
            }}
            disabled={isDisabled}
        >
            <div 
                className={clsx(
                    'square-indicator',
                    (value)?('square-on'):('square-off')
                )}
            >
                {
                    (value&&isIndeterminate)?(
                        <FaMinus className='icon-check' size={8}/>
                    ):(value)?(
                        <FaCheck className='icon-check' size={8}/>
                    ):(<></>)
                }
            </div>
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

export default CheckboxButton

interface _CheckboxButton {
    className?:string,
    style?:checkboxButtonStyleType;
    shape?:globalShapeType;
    txtLabel?:string
    txtSublabel?:string,
    value:boolean,
    onClick?:(newValue:boolean, e:React.MouseEvent<HTMLButtonElement>)=>void
    isDisabled?:boolean
    isIndeterminate?:boolean
}

type checkboxButtonStyleType = {

}