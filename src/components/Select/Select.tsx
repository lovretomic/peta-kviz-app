import { useEffect, useRef, useState } from "react";
import c from "./Select.module.scss";

import KeyboardArrowDownIcon from "../../assets/icons/keyboard-arrow-down.svg?react";

type SelectOption = {
  key?: string;
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  onChange?: (option?: SelectOption) => void;
};

const Select = ({
  options,
  defaultValue,
  placeholder,
  onChange,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    options.find((option) => option.value === defaultValue) || null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionChange = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const selectRef = useRef<HTMLDivElement>(null);

  function getTopOffset() {
    if (!selectRef.current) return 0;
    const rect = selectRef.current.getBoundingClientRect();
    const top = rect.top + rect.height + window.scrollY;
    return top + 4;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={c.select} ref={selectRef}>
      <div
        className={c.selectedOption}
        ref={selectRef}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption?.label || placeholder}
        <KeyboardArrowDownIcon />
      </div>
      {isOpen && (
        <div
          className={c.options}
          style={{
            top: getTopOffset(),
          }}
        >
          {options.map((option) => (
            <div
              key={option.key || option.value}
              className={c.option}
              onClick={() => handleOptionChange(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
