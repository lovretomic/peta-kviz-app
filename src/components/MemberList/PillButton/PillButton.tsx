import { useState } from "react";
import c from "./PillButton.module.scss";
import clsx from "clsx";
import closeIcon from "../../../assets/icons/close.svg";
import captainIcon from "../../../assets/icons/person-with-shield.svg";
import personIcon from "../../../assets/icons/person.svg";

type PillButtonProps = {
  children?: React.ReactNode;
  variant?: "default" | "captain";
  removeMember?: (name: string) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PillButton: React.FC<PillButtonProps> = ({
  children,
  variant = "default",
  className,
  removeMember,
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
        [c.default]: variant === "default",
        [c.captain]: variant === "captain",
      })}
      {...handlers}
      disabled={variant === "captain"}
    >
      <div className={c.content}>
        <img src={variant === "captain" ? captainIcon : personIcon} alt="" />
        {children ? <span>{children}</span> : null}
        {showClose && variant != "captain" ? (
          <img
            className={c.close}
            src={closeIcon}
            alt=""
            onClick={() => {
              if (removeMember) {
                removeMember(children as string);
                setIsVisible(false);
              }
            }}
          />
        ) : null}
      </div>
    </button>
  );
};

export default PillButton;
