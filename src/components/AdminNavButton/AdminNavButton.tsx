import c from "./AdminNavButton.module.scss";

const AdminNavButton = ({
  children,
  ...handlers
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={c.adminNavButton} {...handlers}>
      {children}
    </button>
  );
};

export default AdminNavButton;
