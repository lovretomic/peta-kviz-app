import c from './Button.module.scss';
import clsx from 'clsx';

    type ButtonProps = {
        children?: React.ReactNode;
        variant?: 'default' | 'white';
        icon?: string;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>;

    const Button: React.FC<ButtonProps> = ({
        children,
        variant='default',
        className,
        icon,
        ...handlers
    }) => {

        if (icon && !children){
            return(
            <button className={
                clsx(c.button, c.iconOnly, {
                    [c.white]: variant === 'white',
                })}
                {...handlers}> 
                <div className={c.content}>
                    <img className={c.icon} src={icon} alt='' />
                </div>  
            </button>
            );
        }

        if (icon) {
            return(
            <button className={
                clsx(c.button, className, {
                    [c.white]: variant === 'white',
                })}
                {...handlers}> 
                <div className={c.content}>
                    <span>{children}</span>
                    <img className={c.icon} src={icon} alt='' />
                </div>  
            </button>
            );
        };

        return (
            <button className={
                clsx(c.button, className, {
                    [c.white]: variant === 'white',
                })}
                {...handlers}>      
                <div className={c.content}>
                    <span>{children}</span>
                </div>
            </button>
        );
    };
export default Button;