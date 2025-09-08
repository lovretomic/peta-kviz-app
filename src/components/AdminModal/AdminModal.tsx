import c from "./AdminModal.module.scss";

import CloseIcon from "../../assets/icons/close.svg?react";

type AdminModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

const AdminModal = ({
  title,
  isOpen,
  setIsOpen,
  children,
}: AdminModalProps) => {
  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h2>{title}</h2>
          <CloseIcon
            className={c.closeButton}
            onClick={() => setIsOpen(false)}
          />
        </header>
        {children}
      </div>
    </div>
  );
};

export default AdminModal;
