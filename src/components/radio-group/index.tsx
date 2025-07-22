import './styles.scss';
import clsx from 'clsx';
import * as ctrl from './controller';
import RadioButton from '../radio-button';

const RadioGroup = ({
    className = undefined,
    options = [],
    value = '',
    onChange = undefined
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
                        value={i.id===value}
                        txtLabel={i.txtLabel}
                        txtSublabel={i.txtSublabel}
                        onClick={(_, e)=>{ctrl.onRadioClicked(i, e, onChange)}}
                        isDisabled={i.isDisabled}
                    />
                ))
            }
        </div>
    )
}

export default RadioGroup

interface _RadioGroup{
    className?:string
    options:dropdownMenuOptionType[]
    value?:string,
    onChange?:(newValue:string, option:dropdownMenuOptionType, e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

export type dropdownMenuOptionType = {
    id:string,
    txtLabel:string,
    txtSublabel?:string,
    isDisabled?:boolean,
};