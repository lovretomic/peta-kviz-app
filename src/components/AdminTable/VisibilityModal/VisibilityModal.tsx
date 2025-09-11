import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./VisibilityModal.module.scss";

type VisibilityModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  columns: AdminTableColumn<any>[];
  displayedColumns: AdminTableColumn<any>[];
  setDisplayedColumns: (columns: AdminTableColumn<any>[]) => void;
};

const VisibilityModal = ({
  isOpen,
  setIsOpen,
  columns,
  displayedColumns,
  setDisplayedColumns,
}: VisibilityModalProps) => {
  return (
    <AdminModal title="Uredi prikaz" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={c.content}>
        {columns?.map((column, index) => (
          <div key={column.id as string} className={c.row}>
            <input
              type="checkbox"
              id={`${column.id as string}-${index}`}
              defaultChecked={displayedColumns?.some((c) => c.id === column.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setDisplayedColumns([...displayedColumns, column]);
                } else {
                  setDisplayedColumns(
                    displayedColumns.filter((c) => c.id !== column.id)
                  );
                }
              }}
            />
            <label htmlFor={`${column.id as string}-${index}`}>
              {column.label}
            </label>
          </div>
        ))}
      </div>
    </AdminModal>
  );
};

export default VisibilityModal;
