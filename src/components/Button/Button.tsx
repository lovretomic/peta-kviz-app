import { isValidElement } from "react";
import c from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outlined";
  icon?: string | React.ReactElement;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  icon,
  ...handlers
}) => {
  const isIconOnly = !!icon && !children;
  return (
    <button
      className={clsx(c.button, className, {
        [c.primary]: variant === "primary",
        [c.secondary]: variant === "secondary",
        [c.outlined]: variant === "outlined",
        [c.iconOnly]: isIconOnly,
      })}
      {...handlers}
    >
      <div className={c.content}>
        {children ? <span>{children}</span> : null}
        {typeof icon === "string" && <img src={icon} alt="button icon" />}
        {isValidElement(icon) && icon}
      </div>
    </button>
  );
};
export default Button;
