import c from "./CodeModal.module.scss";
import clsx from "clsx";
import Input from "../Input";

type CodeModalProps = {
  date: Date | string;
  code?: string;
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

const CodeModal: React.FC<CodeModalProps> = ({ date, code }) => {
  return <div className={c.modalBackground}>{code}</div>;
};

export default CodeModal;
