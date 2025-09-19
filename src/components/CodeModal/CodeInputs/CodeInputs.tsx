import { useRef } from "react";
import Input from "../../Input";
import c from "./CodeInputs.module.scss";

type CodeInputsProps = {
  length?: number;
} & React.HTMLAttributes<HTMLInputElement>;

const CodeInputs: React.FC<CodeInputsProps> = ({ length = 5 }) => {
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value.slice(-1);
    e.target.value = value;

    if (value && idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }

    const code = inputsRef.current.map((i) => i?.value ?? "").join("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !inputsRef.current[idx].value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  return (
    <div className={c.inputContainer}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el!;
          }}
          maxLength={1}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            handleChange(e, idx);
          }}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className={c.codeInput}
        />
      ))}
    </div>
  );
};

export default CodeInputs;
