import c from './Button.module.scss';
import clsx from 'clsx';

export default function Button() {
    return <button className={clsx(c.button, c.white)}>Click me</button>;
}