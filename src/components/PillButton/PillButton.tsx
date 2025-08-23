import c from "./PillButton.module.scss";
import clsx from "clsx";

type PillButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "captian";
  icon?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = "primary",
  className,
  icon,
  ...handlers
}) => {
  return (
    <button
      className={clsx(c.pillButton, className, {
        [c.primary]: variant === "primary",
        [c.captian]: variant === "captian",
      })}
      {...handlers}
    >
      <div className={c.content}>
        {children ? <span>{children}</span> : null}
        {icon ? <img className={c.icon} src={icon} alt="" /> : null}
      </div>
    </button>
  );
};

export default PillButton;
