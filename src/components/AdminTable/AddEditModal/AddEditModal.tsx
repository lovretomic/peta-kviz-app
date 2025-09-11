import { toLocalInputValue } from "../../../helpers";
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
          if (column.inputHidden) return null;
          switch (column.type) {
            case "string":
              return (
                <div key={column.id as string}>
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
                <div key={column.id as string}>
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
            case "timestamp":
              return (
                <div key={column.id as string}>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input
                    type="datetime-local"
                    id={column.id as string}
                    defaultValue={toLocalInputValue(
                      dataToEdit?.[column.id as keyof typeof dataToEdit] as Date
                    )}
                    disabled={dataToEdit && column.notEditable}
                  />
                </div>
              );

            case "stringArray":
              return (
                <div key={column.id as string} className={c.stringArray}>
                  <label>{column.label}</label>
                  {dataToEdit &&
                    dataToEdit[column.id as keyof typeof dataToEdit].map(
                      (value: string, index: number) => (
                        <div key={index}>
                          <input
                            key={index}
                            type="text"
                            defaultValue={value}
                            disabled={dataToEdit && column.notEditable}
                          />
                          <button>Ukloni</button>
                        </div>
                      )
                    )}
                  <button>Dodaj</button>
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
