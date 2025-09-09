import { useState } from "react";
import AdminButton from "../../../AdminButton";
import FilterPart from "./FilterPart";
import type { AdminTableColumn, FilterDesc } from "../../types";
import { getDefaultFilterDesc } from "../../helpers";

import c from "../FilterSortModal.module.scss";

type FilteringContentProps = {
  columns: AdminTableColumn<any>[];
  filterAndSort: () => void;
  filterDescs: FilterDesc<any>[];
  setFilterDescs: (descs: FilterDesc<any>[]) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const FilteringContent = ({
  filterDescs,
  setFilterDescs,
  columns,
  setIsOpen,
  filterAndSort,
}: FilteringContentProps) => {
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

  const editFilterDesc = (id: keyof any, desc: FilterDesc<any>) => {
    setFilterDescs(filterDescs.map((d) => (d.id === id ? desc : d)));
  };

  return (
    <>
      <div className={c.addFilter}>
        <select
          name="filterColumn"
          id="filterColumn"
          value={(newFilterDesc?.id as string) || ""}
          onChange={(e) => {
            const selectedId = e.target.value;
            const column = columns.find((c) => c.id === selectedId);
            if (column) {
              setNewFilterDesc(getDefaultFilterDesc(column));
            }
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
        <button onClick={() => console.log(filterDescs)}>log</button>
      </div>
      <div className={c.filteringList}>
        {filterDescs.length === 0 && <p>Nema aktivnih filtera.</p>}
        {filterDescs.map((filterDesc) => {
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
                edit={(desc) => editFilterDesc(filterDesc.id, desc)}
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
                edit={(desc) => editFilterDesc(filterDesc.id, desc)}
              />
            );
          if (filterDesc.type === "timestamp")
            return (
              <FilterPart
                key={filterDesc.id as string}
                type={"timestamp"}
                label={column.label}
                descriptor={filterDesc}
                remove={() => removeFilterDesc(filterDesc.id)}
                edit={(desc) => editFilterDesc(filterDesc.id, desc)}
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
            filterAndSort();
            setIsOpen(false);
          }}
        >
          Filtriraj
        </AdminButton>
      </div>
    </>
  );
};

export default FilteringContent;
