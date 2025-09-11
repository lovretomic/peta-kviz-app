import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./VisibilityModal.module.scss";

type VisibilityModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  columns: AdminTableColumn<any>[];
};

const VisibilityModal = ({
  isOpen,
  setIsOpen,
  columns,
}: VisibilityModalProps) => {
  return (
    <AdminModal title="Uredi prikaz" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={c.content}>
        {columns?.map((column, index) => (
          <div key={column.id as string} className={c.row}>
            <input type="checkbox" id={`${column.id as string}-${index}`} />
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
