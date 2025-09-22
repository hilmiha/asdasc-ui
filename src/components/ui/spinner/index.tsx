import clsx from 'clsx';
import './styles.scss'

const Spinner = ({
    className = undefined,
    size = 'small',
}:{
    className?:string,
    size?: 'small' | 'medium' | 'large',
}) => {
    return (
        <span className={clsx("loader", size, className)}></span>
    );
};

export default Spinner