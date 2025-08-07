import c from "./Input.module.scss";
import clsx from "clsx";

type InputProps = {
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...handlers }) => {
  return <input className={clsx(c.input, className)} {...handlers} />;
};
export default Input;
