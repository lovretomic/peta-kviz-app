import AdminButton from "../../AdminButton";
import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./AddEditModal.module.scss";

type AddEditModalProps<T> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  columns: AdminTableColumn<T>[];
  dataToEdit?: T;
};

const AddEditModal = ({
  isOpen,
  setIsOpen,
  columns,
  dataToEdit,
}: AddEditModalProps<any>) => {
  return (
    <AdminModal isOpen={isOpen} setIsOpen={setIsOpen} title="AddEditModal">
      <div className={c.content}>
        {columns.map((column) => {
          switch (column.type) {
            case "string":
              return (
                <div>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input
                    type="text"
                    id={column.id as string}
                    defaultValue={
                      dataToEdit?.[column.id as keyof typeof dataToEdit]
                    }
                    disabled={dataToEdit && column.notEditable}
                  />
                </div>
              );
            case "number":
              return (
                <div>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input
                    type="number"
                    id={column.id as string}
                    defaultValue={
                      dataToEdit?.[column.id as keyof typeof dataToEdit]
                    }
                    disabled={dataToEdit && column.notEditable}
                  />
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
            {dataToEdit ? "Spremi" : "Dodaj"}
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};

export default AddEditModal;
