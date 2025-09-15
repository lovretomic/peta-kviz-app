import clsx from "clsx";
import c from "./Select.module.scss";

type SelectProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLSelectElement>;

const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select className={clsx(c.select, className)} {...props}>
      {children}
    </select>
  );
};

export default Select;
