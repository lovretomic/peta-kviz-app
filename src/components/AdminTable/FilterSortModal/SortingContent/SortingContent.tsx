import { useState } from "react";
import AdminButton from "../../../AdminButton";
import type { AdminTableColumn, SortKey } from "../../types";

import c from "../FilterSortModal.module.scss";

type SortingContentProps = {
  columns: AdminTableColumn<any>[];
  setIsOpen: (isOpen: boolean) => void;
  setSortKeys: (keys: SortKey<any>[]) => void;
  sortKeys: SortKey<any>[];
};

const SortingContent = ({
  sortKeys,
  setSortKeys,
  columns,
  setIsOpen,
}: SortingContentProps) => {
  const [sortKeysToAdd, setSortKeysToAdd] = useState<SortKey<any>[]>(
    sortKeys || []
  );
  const [newSortKey, setNewSortKey] = useState<SortKey<any> | null>(null);

  const addSortKey = () => {
    if (newSortKey) {
      setSortKeysToAdd([...sortKeysToAdd, newSortKey]);
      setNewSortKey(null);
    }
  };

  const removeSortKey = (id: keyof any) => {
    setSortKeysToAdd(sortKeysToAdd.filter((key) => key.id !== id));
  };

  return (
    <>
      <div className={c.addSort}>
        <select
          name="sortColumn"
          id="sortColumn"
          value={(newSortKey?.id as string) || ""}
          onChange={(e) => {
            const column = columns.find((c) => c.id === e.target.value);
            setNewSortKey({
              id: e.target.value,
              type: column?.type ?? "string",
              direction: "asc",
            });
          }}
        >
          <option value="">Odaberi stupac</option>
          {columns
            .filter((c) => !c.notSortable)
            .filter((c) => !sortKeysToAdd.find((key) => key.id === c.id))
            .map((column) => (
              <option key={column.id as string} value={column.id as string}>
                {column.label}
              </option>
            ))}
        </select>
        <select
          name="sortDirection"
          id="sortDirection"
          value={newSortKey?.direction}
          onChange={(e) => {
            if (newSortKey) {
              setNewSortKey({
                ...newSortKey,
                direction: e.target.value as "asc" | "desc",
              });
            }
          }}
        >
          <option value="asc">Uzlazno</option>
          <option value="desc">Silazno</option>
        </select>
        <button onClick={addSortKey}>Dodaj</button>
      </div>
      <div className={c.sortingList}>
        {sortKeysToAdd.map((sortKey) => (
          <div key={sortKey.id as string} className={c.column}>
            <span>
              {columns.find((c) => c.id === sortKey.id)?.label}:{" "}
              {sortKey.direction === "asc" ? "Uzlazno" : "Silazno"}
            </span>
            <button onClick={() => removeSortKey(sortKey.id)}>Ukloni</button>
          </div>
        ))}
      </div>
      <div className={c.buttons}>
        <AdminButton variant="secondary" onClick={() => setIsOpen(false)}>
          Odustani
        </AdminButton>
        <AdminButton
          onClick={() => {
            setSortKeys(sortKeysToAdd);
            setIsOpen(false);
          }}
        >
          Sortiraj
        </AdminButton>
      </div>
    </>
  );
};

export default SortingContent;
