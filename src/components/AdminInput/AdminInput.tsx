import clsx from "clsx";
import c from "./AdminInput.module.scss";

const AdminInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input {...props} className={clsx(props.className, c.input)} />;
};

export default AdminInput;
