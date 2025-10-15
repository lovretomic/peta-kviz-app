import { useState } from "react";
import c from "./AdminPillInput.module.scss";
import clsx from "clsx";
import CloseIcon from "../../../../assets/icons/close.svg?react";

type AdminPillInputProps = {
  children?: React.ReactNode;
  removeMember?: (name: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const AdminPillInput: React.FC<AdminPillInputProps> = ({
  children,
  className,
  removeMember,
  ...handlers
}) => {
  const [showClose, setShowClose] = useState(false);

  return <input placeholder="upisi" />;
};

export default AdminPillInput;
