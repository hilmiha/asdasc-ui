import './styles.scss';
import clsx from "clsx"

const Radio = ({
    isSelected = false,
}:{
    isSelected:boolean
}) =>{
    return(
        <div
            className={clsx(
                'radio-circle-indicator',
                (isSelected)?('circle-on'):('circle-off'),
                {
                    ['full-on']:(isSelected)
                }
            )}
        >
        </div>
    )
}

export default Radio