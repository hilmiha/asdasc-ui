import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import RadioButton from '../radio-button';
import type { optionItemType } from 'src/components/_types';

const RadioGroup = ({
    className = undefined,
    options = [],
    selectedId = '',
    isDisabled = false,
    onChange = undefined,
}:_RadioGroup) =>{
    return(
        <div
            className={clsx(
                'radio-group-box',
                className
            )}
        >
            {
                options.map((i)=>(
                    <RadioButton
                        key={i.id}
                        isSelected={selectedId===i.id}
                        txtLabel={i.txtLabel}
                        txtSublabel={i.txtSublabel}
                        onClick={(_, e)=>{ctrl.onRadioClicked(i, selectedId, e, onChange)}}
                        isDisabled={(i.isDisabled)??(isDisabled)}
                    />
                ))
            }
        </div>
    )
}

export default RadioGroup

interface _RadioGroup{
    className?:string
    options:optionItemType[]
    selectedId?: string; 
    isDisabled?:boolean
    onChange?:(newValue:string, option:optionItemType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}