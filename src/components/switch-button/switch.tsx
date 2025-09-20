import { useContext } from 'react';
import type { globalShapeType } from '../_types';
import './styles.scss';
import clsx from "clsx"
import { GlobalContext, type _GlobalContextType } from '../../context/global-context';

const Switch = ({
    isSelected = false,
    shape = undefined,
}:{
    isSelected:boolean,
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
                'switch-indicator',
                (isSelected)?('circle-on'):('circle-off'),
                (shape)?(shape):(globalShape),
                {
                    ['full-on']:(isSelected)
                }
            )}
        >
        </div>
    )
}

export default Switch