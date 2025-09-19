import c from "./CodeModal.module.scss";
import Button from "../Button/Button";
import ArrowIcon from "../../assets/icons/arrow-right.svg?react";
import CodeInputs from "./CodeInputs";
import { useState } from "react";
import { formatDate } from "../../dateHelpers";

type CodeModalProps = {
  date: Date | string;
  isOpen: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const CodeModal: React.FC<CodeModalProps> = ({ date, isOpen }) => {
  const [code, setCode] = useState("");
  function onCodeChange(code: string) {
    setCode(code);
    console.log(code);
  }

  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h1>Unos kȏda</h1>
          <h2>Kviz općeg znanja</h2>
          <h3>{formatDate(date)}</h3>
        </header>
        <div className={c.content}>
          <div className={c.inputContainer}>
            <CodeInputs length={5} onCodeChange={onCodeChange} />
          </div>
          <Button
            variant="primary"
            icon={<ArrowIcon />}
            onClick={() => console.log("Submitted code:", code)}
          >
            Unesi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
