import clsx from "clsx";
import c from "./AdminButton.module.scss";
import type { SVGProps } from "react";

type AdminButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "white";
  Icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
} & React.HTMLAttributes<HTMLButtonElement>;

const AdminButton = ({
  children,
  variant = "primary",
  Icon,
  iconPosition = "left",
  ...props
}: AdminButtonProps) => {
  return (
    <button {...props} className={clsx(c.adminButton, c[variant])}>
      {iconPosition === "left" && Icon && <Icon className={c.icon} />}
      {children}
      {iconPosition === "right" && Icon && <Icon className={c.icon} />}
    </button>
  );
};

export default AdminButton;
