import AdminButton from "../../AdminButton";
import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./AddEditModal.module.scss";

type AddEditModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  columns: AdminTableColumn<any>[];
};

const AddEditModal = ({ isOpen, setIsOpen, columns }: AddEditModalProps) => {
  return (
    <AdminModal isOpen={isOpen} setIsOpen={setIsOpen} title="AddEditModal">
      <div className={c.content}>
        {columns.map((column) => {
          switch (column.type) {
            case "string":
              return (
                <div>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input type="text" id={column.id as string} />
                </div>
              );
            case "number":
              return (
                <div>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input type="number" id={column.id as string} />
                </div>
              );
            default:
              return null;
          }
        })}
        <div className={c.buttons}>
          <AdminButton variant="secondary" onClick={() => setIsOpen(false)}>
            Odustani
          </AdminButton>
          <AdminButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Dodaj
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};

export default AddEditModal;
