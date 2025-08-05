import c from "./Button.module.scss";
import clsx from "clsx";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outlined";
  icon?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  icon,
  ...handlers
}) => {
  if (icon && !children) {
    return (
      <button
        className={clsx(c.button, c.iconOnly, {
          [c.primary]: variant === "primary",
          [c.secondary]: variant === "secondary",
          [c.outlined]: variant === "outlined",
        })}
        {...handlers}
      >
        <div className={c.content}>
          <img className={c.icon} src={icon} alt="" />
        </div>
      </button>
    );
  }

  return (
    <button
      className={clsx(c.button, className, {
        [c.primary]: variant === "primary",
        [c.secondary]: variant === "secondary",
        [c.outlined]: variant === "outlined",
      })}
      {...handlers}
    >
      <div className={c.content}>
        <span>{children}</span>
        {icon ? <img className={c.icon} src={icon} alt="" /> : null}
      </div>
    </button>
  );
};
export default Button;
