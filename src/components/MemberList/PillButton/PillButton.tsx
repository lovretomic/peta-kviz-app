import { useState } from "react";
import c from "./PillButton.module.scss";
import clsx from "clsx";
import CloseIcon from "../../../assets/icons/close.svg?react";
import CaptainIcon from "../../../assets/icons/person-with-shield.svg?react";
import PersonIcon from "../../../assets/icons/person.svg?react";

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
        {variant === "captain" ? <CaptainIcon /> : <PersonIcon />}
        {children ? <span>{children}</span> : null}
        {showClose && variant !== "captain" ? (
          <CloseIcon
            className={c.close}
            onClick={() => {
              if (removeMember) {
                if (typeof children === "string") {
                  removeMember(children as string);
                } else {
                  console.error("Member name is not a string");
                }
              }
            }}
          />
        ) : null}
      </div>
    </button>
  );
};

export default PillButton;
