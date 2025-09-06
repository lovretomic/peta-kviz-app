import { useState } from "react";
import AdminButton from "../../AdminButton";
import type { AdminTableColumn, FilterDesc, SortKey } from "../types";
import c from "./AdminTableModal.module.scss";
import CloseIcon from "../../../assets/icons/close.svg?react";
import FilterPart from "./FilterPart";

type AdminTableModalProps = {
  action: "sort" | "filter";
  columns: AdminTableColumn<any>[];
  filterAndSort: () => void;
  filterDescs: FilterDesc<any>[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sortKeys: SortKey<any>[];
  setFilterDescs: (descs: FilterDesc<any>[]) => void;
  setSortKeys: (keys: SortKey<any>[]) => void;
};

const AdminTableModal = ({
  action,
  filterAndSort,
  columns,
  isOpen,
  setIsOpen,
  sortKeys,
  setSortKeys,
  filterDescs,
  setFilterDescs,
}: AdminTableModalProps) => {
  const SortingContent = () => {
    const [newSortKey, setNewSortKey] = useState<SortKey<any> | null>(null);

    const addSortKey = () => {
      if (newSortKey) {
        setSortKeys([...sortKeys, newSortKey]);
        setNewSortKey(null);
      }
    };

    const removeSortKey = (id: keyof any) => {
      setSortKeys(sortKeys.filter((key) => key.id !== id));
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
              .filter((c) => !sortKeys.find((key) => key.id === c.id))
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
          {sortKeys.map((sortKey) => (
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
              if (filterAndSort) filterAndSort();
              setIsOpen(false);
            }}
          >
            Sortiraj
          </AdminButton>
        </div>
      </>
    );
  };

  const FilteringContent = () => {
    const [newFilterDesc, setNewFilterDesc] = useState<FilterDesc<any> | null>(
      null
    );

    const addFilterDesc = () => {
      if (newFilterDesc) {
        setFilterDescs([...filterDescs, newFilterDesc]);
        setNewFilterDesc(null);
      }
    };

    const removeFilterDesc = (id: keyof any) => {
      setFilterDescs(filterDescs.filter((desc) => desc.id !== id));
    };

    return (
      <>
        <div className={c.addFilter}>
          <select
            name="filterColumn"
            id="filterColumn"
            value={(newFilterDesc?.id as string) || ""}
            onChange={(e) => {
              setNewFilterDesc({
                id: e.target.value,
                type: "string",
                op: "contains",
                value: "",
              });
            }}
          >
            <option value="">Odaberi stupac</option>
            {columns
              .filter((c) => !filterDescs.find((desc) => desc.id === c.id))
              .map((column) => (
                <option key={column.id as string} value={column.id as string}>
                  {column.label} ({column.type})
                </option>
              ))}
          </select>

          <button onClick={addFilterDesc}>Dodaj</button>
        </div>
        <div className={c.filteringList}>
          {filterDescs.length === 0 && <p>Nema aktivnih filtera.</p>}
          {filterDescs.map((filterDesc) => {
            if (!filterDesc) return null;
            const column = columns.find((c) => c.id === filterDesc.id);
            if (!column) return null;

            if (filterDesc.type === "string")
              return (
                <FilterPart
                  key={filterDesc.id as string}
                  type={"string"}
                  label={column.label}
                  descriptor={filterDesc}
                  remove={() => removeFilterDesc(filterDesc.id)}
                />
              );
            if (filterDesc.type === "number")
              return (
                <FilterPart
                  key={filterDesc.id as string}
                  type={"number"}
                  label={column.label}
                  descriptor={filterDesc}
                  remove={() => removeFilterDesc(filterDesc.id)}
                />
              );
          })}
        </div>
        <div className={c.buttons}>
          <AdminButton variant="secondary" onClick={() => setIsOpen(false)}>
            Odustani
          </AdminButton>
          <AdminButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Filtriraj
          </AdminButton>
        </div>
      </>
    );
  };

  return (
    <div className={c.background} style={{ display: isOpen ? "flex" : "none" }}>
      <div className={c.modal}>
        <header className={c.header}>
          <h2>{action === "sort" ? "Sortiraj" : "Filtriraj"} tablicu</h2>
          <CloseIcon
            className={c.closeButton}
            onClick={() => setIsOpen(false)}
          />
        </header>
        <div className={c.content}>
          {action === "sort" ? <SortingContent /> : <FilteringContent />}
        </div>
      </div>
    </div>
  );
};

export default AdminTableModal;
