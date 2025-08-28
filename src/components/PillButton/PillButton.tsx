import c from "./PillButton.module.scss";
import clsx from "clsx";

type PillButtonProps = {
  children?: React.ReactNode;
  variant?: "primary" | "captain";
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
        [c.captain]: variant === "captain",
      })}
      {...handlers}
    >
      <div className={c.content}>
        {icon ? <img src={icon} alt="" /> : null}
        {children ? <span>{children}</span> : null}
      </div>
    </button>
  );
};

export default PillButton;
