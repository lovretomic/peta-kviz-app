import c from "./Input.module.scss";
import clsx from "clsx";

type InputProps = {
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<InputProps> = ({ children, className, ...handlers }) => {
  return (
    <input className={clsx(c.input, className)} {...handlers}>
      {children}
    </input>
  );
};
export default Input;
