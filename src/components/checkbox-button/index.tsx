import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';
import { FaCheck, FaMinus } from 'react-icons/fa';
import Button from '../button';

const CheckboxButton = ({
    className = undefined,
    shape = undefined,
    txtLabel = undefined,
    txtSublabel = undefined,
    icon = undefined,
    isSelected = false,
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
        <Button
            className={clsx(
                "checkbox-button",
                (shape)?(shape):(globalShape),
                className
            )}
            isSelected={isSelected||isIndeterminate}
            isDisabled={isDisabled}
            onClick={(e)=>{
                ctrl.onCheckboxClicked(!isSelected, e, onClick)
            }}
            txtLabel={
                <>
                    {
                        (txtLabel || txtSublabel)&&(
                            <div className='text-label-box'>
                                <p className='text-label'>{txtLabel}</p>
                                {
                                    (txtSublabel)&&(
                                        <p className='text-sublabel'>{txtSublabel??''}</p>
                                    )
                                }
                            </div>
                        )
                    }
                </>
            }
            iconBefore={
                <div style={{display:'flex', gap:'var(--space-200)'}}>
                    <div
                        className={clsx(
                            'square-indicator',
                            (isSelected||isIndeterminate)?('square-on'):('square-off'),
                            {
                                ['full-on']:(isSelected)
                            }
                        )}
                    >
                        {
                            (isIndeterminate)?(
                                <FaMinus className='icon-check' size={8}/>
                            ):(isSelected)?(
                                <FaCheck className='icon-check' size={8}/>
                            ):(<></>)
                        }
                    </div>
                    {icon}
                </div>
            }
            appearance='subtle'
        />
    )
}

export default CheckboxButton

interface _CheckboxButton {
    className?:string,
    style?:checkboxButtonStyleType;
    shape?:globalShapeType;
    txtLabel?:string
    txtSublabel?:string,
    icon?:JSX.Element,
    isSelected:boolean,
    onClick?:(newValue:boolean, e:React.MouseEvent<HTMLButtonElement>)=>void
    isDisabled?:boolean
    isIndeterminate?:boolean
}

type checkboxButtonStyleType = {

}