import type { AdminTableColumn } from "../types";
import c from "./AdminTableModal.module.scss";

type AdminTableModalProps = {
  action: "sort" | "filter";
  columns: AdminTableColumn<any>[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const AdminTableModal = ({
  action,
  columns,
  isOpen,
  setIsOpen,
}: AdminTableModalProps) => {
  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header>
          <h2>{action === "sort" ? "Sortiraj" : "Filtriraj"} tablicu</h2>
          {columns.map((column) => (
            <div key={column.id as string} className={c.column}>
              <label>{column.label}</label>
              <input type="text" />
            </div>
          ))}
          <button className={c.closeButton} onClick={() => setIsOpen(false)}>
            X
          </button>
        </header>
      </div>
    </div>
  );
};

export default AdminTableModal;
