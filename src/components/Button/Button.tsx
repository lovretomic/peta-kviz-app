import c from './Button.module.scss';
import clsx from 'clsx';
import trashIcon from '../../assets/icons/trash.svg'

export default function Button() {
    return <button className={clsx(c.button, c.white)}>Click me</button>;
}