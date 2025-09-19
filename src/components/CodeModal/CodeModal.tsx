import c from "./CodeModal.module.scss";
import clsx from "clsx";
import Input from "../Input";
import Button from "../Button/Button";
import ArrowIcon from "../../assets/icons/arrow-right.svg?react";
import CodeInputs from "./CodeInputs";

type CodeModalProps = {
  date: Date | string;
  code?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    return Date.parse(date) ? date : "Neispravan datum";
  }
  return date.toLocaleDateString("hr-HR", {
    weekday: "long",
    year: "numeric",
    month: "narrow",
    day: "numeric",
  });
}

function onCodeChange(code: string) {
  console.log(code);
}

const CodeModal: React.FC<CodeModalProps> = ({
  date,
  code,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h1>Unos kȏda {code}</h1>
          <h2>Kviz općeg znanja</h2>
          <h3>{formatDate(date)}</h3>
        </header>
        <div className={c.content}>
          <div className={c.inputContainer}>
            <CodeInputs length={5} onCodeChange={onCodeChange} />
          </div>
          <Button variant="primary" icon={<ArrowIcon />}>
            Unesi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
