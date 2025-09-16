import clsx from 'clsx';
import './styles.scss'

const Spinner = ({
    size = 'small'
}:{
    size?: 'small' | 'medium' | 'large'
}) => {
    return (
        <span className={clsx("loader", size)}></span>
    );
};

export default Spinner