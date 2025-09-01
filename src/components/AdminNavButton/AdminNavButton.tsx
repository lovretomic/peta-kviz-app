import { useNavigate } from "react-router-dom";
import c from "./AdminNavButton.module.scss";
import clsx from "clsx";

type AdminNavButtonProps = {
  path: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

const AdminNavButton = ({
  children,
  path,
  Icon,
  ...handlers
}: React.HTMLAttributes<HTMLButtonElement> & AdminNavButtonProps) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <button
      className={clsx(c.adminNavButton, { [c.selected]: currentPath === path })}
      {...handlers}
      onClick={() => navigate(path)}
    >
      {Icon && <Icon className={c.icon} />}
      {children}
    </button>
  );
};

export default AdminNavButton;
