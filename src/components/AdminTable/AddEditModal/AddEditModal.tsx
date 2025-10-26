import { useEffect, useState } from "react";
import { toLocalInputValue } from "../../../helpers";
import AdminButton from "../../AdminButton";
import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./AddEditModal.module.scss";
import AdminInput from "../../AdminInput";
import AdminMemberList from "../../AdminMemberList";

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

  const handleStringArrayChange = (
    columnId: string,
    index: number,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [columnId]: ((prev[columnId as keyof typeof prev] as string[]) || []).map(
        (item, i) => (i === index ? value : item)
      ),
    }));
  };

  const handleStringArrayRemove = (columnId: string, index: number) => {
    setFormState((prev) => ({
      ...prev,
      [columnId]: (
        (prev[columnId as keyof typeof prev] as string[]) || []
      ).filter((_, i) => i !== index),
    }));
  };

  const handleStringArrayAdd = (columnId: string) => {
    setFormState((prev) => ({
      ...prev,
      [columnId]: [
        ...((prev[columnId as keyof typeof prev] as string[]) || []),
        "",
      ],
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
                <div key={column.id as string} className={c.inputGroup}>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <AdminInput
                    type="text"
                    variant="small"
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
                <div key={column.id as string} className={c.inputGroup}>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <AdminInput
                    type="number"
                    variant="small"
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
                <div key={column.id as string} className={c.inputGroup}>
                  <label htmlFor={column.id as string}>{column.label}</label>
                  <AdminInput
                    variant="small"
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
                  <AdminMemberList
                    column={column}
                    items={
                      (formState[
                        column.id as keyof typeof formState
                      ] as string[]) || []
                    }
                    disabled={dataToEdit && column.notEditable}
                    onAdd={() => handleStringArrayAdd(column.id as string)}
                    onRemove={(index) =>
                      handleStringArrayRemove(column.id as string, index)
                    }
                    onChange={(index, value) =>
                      handleStringArrayChange(column.id as string, index, value)
                    }
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
