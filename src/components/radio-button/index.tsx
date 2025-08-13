import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import { useContext, type JSX } from 'react';
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';
import type { globalShapeType } from '../_types';
import Button from '../button';

const RadioButton = ({
    className = undefined,
    shape = undefined,
    txtLabel = undefined,
    txtSublabel = undefined,
    icon = undefined,
    isSelected = false,
    onClick = undefined,
    isDisabled = false,
}:_RadioButton) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====
    return(
        <Button
            className={clsx(
                "radio-button",
                (shape)?(shape):(globalShape),
                className
            )}
            isSelected={isSelected}
            isDisabled={isDisabled}
            onClick={(e)=>{
                ctrl.onRadioClicked(!isSelected, e, onClick)
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
                            'circle-indicator',
                            (isSelected)?('circle-on'):('circle-off'),
                            {
                                ['full-on']:(isSelected)
                            }
                        )}
                    >
                    </div>
                    {icon}
                </div>
            }
            appearance='subtle'
        />
    )
}

export default RadioButton

interface _RadioButton {
    className?:string,
    style?:radioButtonStyleType;
    shape?:globalShapeType;
    txtLabel?:string
    txtSublabel?:string,
    icon?:JSX.Element,
    isSelected:boolean,
    onClick?:(newValue:boolean, e:React.MouseEvent<HTMLButtonElement>)=>void
    isDisabled?:boolean
    isIndeterminate?:boolean
}

type radioButtonStyleType = {

}