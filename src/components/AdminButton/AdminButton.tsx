import clsx from "clsx";
import c from "./AdminButton.module.scss";

type AdminButtonProps = {
  variant?: "primary" | "secondary";
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
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
    <button className={clsx(c.adminButton, c[variant])} {...props}>
      {iconPosition === "left" && Icon && <Icon className={c.icon} />}
      {children}
      {iconPosition === "right" && Icon && <Icon className={c.icon} />}
    </button>
  );
};

export default AdminButton;
