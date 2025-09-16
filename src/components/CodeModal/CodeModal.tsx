import c from "./CodeModal.module.scss";
import clsx from "clsx";
import Input from "../Input";

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

const CodeModal: React.FC<CodeModalProps> = ({
  date,
  code,
  isOpen = true,
  setIsOpen,
}) => {
  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h1>Unos kȏda</h1>
          <h2>Kviz općeg znanja</h2>
          <h3>{formatDate(date)}</h3>
        </header>
      </div>
    </div>
  );
};

export default CodeModal;
