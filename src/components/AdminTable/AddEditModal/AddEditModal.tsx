import { useEffect, useState } from "react";
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
  addFn?: (item: Omit<T, "id">) => void;
  editFn?: (item: Partial<T>) => void;
};

const AddEditModal = <T extends { id?: string }>({
  isOpen,
  setIsOpen,
  columns,
  dataToEdit,
  addFn,
  editFn,
}: AddEditModalProps<any>) => {
  const [formState, setFormState] = useState<Partial<T>>(dataToEdit || {});

  useEffect(() => {
    if (dataToEdit) {
      setFormState(dataToEdit);
    }
    if (!isOpen) {
      setFormState({});
    }
  }, [dataToEdit, isOpen]);

  const close = () => {
    setIsOpen(false);
    setFormState({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (addFn) {
      addFn(formState as Omit<T, "id">);
    }
  };

  const handleEdit = () => {
    if (editFn && dataToEdit) {
      editFn({ ...formState, id: dataToEdit.id } as Partial<T>);
    }
  };

  return (
    <AdminModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={dataToEdit ? "Uredi" : "Dodaj"}
    >
      <div className={c.content}>
        {columns.map((column) => {
          if (column.notAddable) return null;
          switch (column.type) {
            case "string":
              return (
                <div key={column.id as string}>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <input
                    type="text"
                    id={column.id as string}
                    name={column.id as string}
                    value={
                      (formState[
                        column.id as keyof typeof formState
                      ] as string) || ""
                    }
                    onChange={handleInputChange}
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
                    name={column.id as string}
                    value={
                      (formState[
                        column.id as keyof typeof formState
                      ] as number) || 0
                    }
                    onChange={handleInputChange}
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
                    name={column.id as string}
                    value={toLocalInputValue(
                      formState?.[column.id as keyof typeof formState] as Date
                    )}
                    onChange={handleInputChange}
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
                          <button disabled={dataToEdit && column.notEditable}>
                            Ukloni
                          </button>
                        </div>
                      )
                    )}
                  <button disabled={dataToEdit && column.notEditable}>
                    Dodaj
                  </button>
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
              if (!dataToEdit) handleAdd();
              else handleEdit();

              close();
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
