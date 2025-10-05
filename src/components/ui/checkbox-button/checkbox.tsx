import { FaCheck, FaMinus } from 'react-icons/fa';
import './styles.scss';
import clsx from "clsx"
import type { globalShapeType } from 'src/components/_types';
import { useContext } from 'react';
import { GlobalContext, type _GlobalContextType } from 'src/context/global-context';

const Checkbox = ({
    isSelected = false,
    isIndeterminate = false,
    shape = undefined,
}:{
    isSelected:boolean;
    isIndeterminate:boolean;
    shape?:globalShapeType;    
}) =>{
    //Context start ====
    const {
        globalShape
    } = useContext(GlobalContext) as _GlobalContextType
    //Context end ====

    return(
        <div
            className={clsx(
                'checkbox-square-indicator',
                (isSelected||isIndeterminate)?('square-on'):('square-off'),
                (shape)?(shape):(globalShape),
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
    )
}

export default Checkbox