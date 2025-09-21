import { isValidElement } from "react";
import c from "./Button.module.scss";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outlined";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  icon?: string | React.ReactElement;
  iconPosition?: "left" | "right";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  icon,
  iconPosition = "right",
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
        [c.disabled]: handlers.disabled,
      })}
      {...handlers}
    >
      <div className={c.content}>
        {iconPosition === "left" && icon ? (
          typeof icon === "string" ? (
            <img src={icon} alt="button icon" />
          ) : isValidElement(icon) ? (
            icon
          ) : null
        ) : null}

        {children ? <span>{children}</span> : null}

        {iconPosition === "right" && icon ? (
          typeof icon === "string" ? (
            <img src={icon} alt="button icon" />
          ) : isValidElement(icon) ? (
            icon
          ) : null
        ) : null}
      </div>
    </button>
  );
};
export default Button;
