import { useRef, useEffect, useCallback } from "react";
import c from "./AdminPillInput.module.scss";
import CloseIconBlack from "../../../../assets/icons/close-black.svg?react";

type AdminPillInputProps = {
  removeMember?: (name: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AdminPillInput: React.FC<AdminPillInputProps> = ({
  removeMember,
  onChange,
  placeholder,
  value,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);

  const updateInputWidth = useCallback(() => {
    if (hiddenSpanRef.current && inputRef.current) {
      const text = inputRef.current.value || placeholder || "";
      hiddenSpanRef.current.textContent = text;

      const newWidth = hiddenSpanRef.current.offsetWidth + 8;

      inputRef.current.style.width = `${Math.max(newWidth, 60)}px`;

      if (containerRef.current) {
        const closeIconWidth = removeMember ? 24 : 0;
        const padding = 16;
        containerRef.current.style.width = `${
          newWidth + closeIconWidth + padding
        }px`;
      }
    }
  }, [placeholder, removeMember]);

  useEffect(() => {
    updateInputWidth();
  }, [value, placeholder, updateInputWidth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <span ref={hiddenSpanRef} className={c.hiddenSpan} />
      <div ref={containerRef} className={c.pillInputContainer}>
        <input
          ref={inputRef}
          className={c.pillInput}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {removeMember && (
          <CloseIconBlack
            onClick={() => {
              if (typeof value === "string") {
                removeMember(value);
              } else {
                console.error("Value is not a string");
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default AdminPillInput;
