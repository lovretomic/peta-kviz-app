import AdminButton from "../../AdminButton";
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
  const SortingContent = () => {
    return (
      <div>
        {columns.map((column) => (
          <div key={column.id as string} className={c.column}>
            <label>{column.label}</label>
            <select>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        ))}
        <AdminButton>Sortiraj</AdminButton>
      </div>
    );
  };

  const FilteringContent = () => {
    return <p>Uskoro</p>;
  };

  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h2>{action === "sort" ? "Sortiraj" : "Filtriraj"} tablicu</h2>
          <button className={c.closeButton} onClick={() => setIsOpen(false)}>
            X
          </button>
        </header>
        <div className={c.content}>
          {action === "sort" ? <SortingContent /> : <FilteringContent />}
        </div>
      </div>
    </div>
  );
};

export default AdminTableModal;
