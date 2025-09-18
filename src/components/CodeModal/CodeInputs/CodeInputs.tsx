import { useRef } from "react";
import Input from "../../Input";

type CodeInputsProps = {
  length?: number;
};

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
    <div style={{ display: "flex", gap: "8px" }}>
      {Array.from({ length }).map((_, idx) => (
        <Input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el!;
          }}
          maxLength={1}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          style={{ textAlign: "center", width: "40px" }}
        />
      ))}
    </div>
  );
};

export default CodeInputs;
