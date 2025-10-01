import clsx from "clsx";
import c from "./AdminInput.module.scss";

type AdminInputProps = {
  variant?: "normal" | "small";
} & React.InputHTMLAttributes<HTMLInputElement>;

const AdminInput: React.FC<AdminInputProps> = ({
  variant = "normal",
  ...props
}) => {
  return (
    <input {...props} className={clsx(props.className, c.input, c[variant])} />
  );
};

export default AdminInput;
