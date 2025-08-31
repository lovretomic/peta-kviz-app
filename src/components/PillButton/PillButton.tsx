import { useState } from "react";
import c from "./PillButton.module.scss";
import clsx from "clsx";
import closeIcon from "../../assets/icons/close.svg";

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
  const [showClose, setShowClose] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }
  return (
    <button
      onClick={() => setShowClose(!showClose)}
      className={clsx(c.pillButton, className, {
        [c.primary]: variant === "primary",
        [c.captain]: variant === "captain",
      })}
      {...handlers}
      disabled={variant === "captain"}
    >
      <div className={c.content}>
        {icon ? <img src={icon} alt="" /> : null}
        {children ? <span>{children}</span> : null}
        {showClose && variant != "captain" ? (
          <button
            className={c.close}
            onClick={() => {
              setIsVisible(false);
            }}
          >
            <img src={closeIcon} alt="" className={c.icon} />
          </button>
        ) : null}
      </div>
    </button>
  );
};

export default PillButton;
