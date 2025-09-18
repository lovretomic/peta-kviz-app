import c from "./Input.module.scss";
import clsx from "clsx";

type InputProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ className, ...handlers }) => {
  (props, ref) => {
    return <input className={clsx(c.input, className)} {...handlers} />;
  };
};
export default Input;
