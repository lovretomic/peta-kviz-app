import c from "./Input.module.scss";
import clsx from "clsx";

type InputProps = {
  placeholderText?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<InputProps> = ({
  className,
  placeholderText,
  ...handlers
}) => {
  return (
    <input
      placeholder={placeholderText}
      className={clsx(c.input, className)}
      {...handlers}
    ></input>
  );
};
export default Input;
