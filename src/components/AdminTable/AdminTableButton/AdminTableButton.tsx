import c from "./AdminTableButton.module.scss";

const AdminTableButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...handlers }) => {
  return (
    <button className={c.button} {...handlers}>
      {children}
    </button>
  );
};

export default AdminTableButton;
