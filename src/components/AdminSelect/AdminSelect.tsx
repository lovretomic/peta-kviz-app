import clsx from "clsx";
import c from "./AdminSelect.module.scss";

const AdminSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (
  props
) => {
  return (
    <select {...props} className={clsx(props.className, c.select)}>
      {props.children}
    </select>
  );
};

export default AdminSelect;
