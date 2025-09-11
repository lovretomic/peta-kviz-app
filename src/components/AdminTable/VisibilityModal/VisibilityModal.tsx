import { useState } from "react";
import AdminModal from "../../AdminModal";
import type { AdminTableColumn } from "../types";

import c from "./VisibilityModal.module.scss";
import AdminButton from "../../AdminButton";

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
  const [displayedColumnsToAdd, setDisplayedColumnsToAdd] = useState<
    AdminTableColumn<any>[]
  >(displayedColumns || []);

  const [selectAll, setSelectAll] = useState(false);

  return (
    <AdminModal title="Uredi prikaz" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={c.content}>
        <div key={"select-all"} className={c.row}>
          <input
            type="checkbox"
            id={"select-all"}
            checked={selectAll}
            onChange={(e) => {
              setSelectAll(e.target.checked);
            }}
          />
          <label htmlFor={"select-all"}>Izaberi sve</label>
        </div>
        <hr />
        {columns?.map((column, index) => (
          <div key={column.id as string} className={c.row}>
            <input
              type="checkbox"
              id={`${column.id as string}-${index}`}
              defaultChecked={displayedColumnsToAdd?.some(
                (c) => c.id === column.id
              )}
              checked={
                selectAll ||
                displayedColumnsToAdd?.some((c) => c.id === column.id)
              }
              disabled={
                selectAll ||
                (displayedColumnsToAdd.length <= 1 &&
                  displayedColumnsToAdd?.some((c) => c.id === column.id))
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setDisplayedColumnsToAdd([...displayedColumnsToAdd, column]);
                } else {
                  setDisplayedColumnsToAdd(
                    displayedColumnsToAdd.filter((c) => c.id !== column.id)
                  );
                }
              }}
            />
            <label htmlFor={`${column.id as string}-${index}`}>
              {column.label}
            </label>
          </div>
        ))}
        <div className={c.buttons}>
          <AdminButton onClick={() => setIsOpen(false)} variant="secondary">
            Odustani
          </AdminButton>
          <AdminButton
            onClick={() => {
              setDisplayedColumns(selectAll ? columns : displayedColumnsToAdd);
              setIsOpen(false);
            }}
          >
            Spremi
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
};

export default VisibilityModal;
