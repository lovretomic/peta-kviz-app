import c from './Button.module.scss';
import clsx from 'clsx';

export default function Button() {
    return <button className={clsx(c.button, c.transparent)}>Click me</button>;
}