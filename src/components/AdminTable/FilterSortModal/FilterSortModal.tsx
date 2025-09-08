import type { AdminTableColumn, FilterDesc, SortKey } from "../types";
import c from "./AdminTableModal.module.scss";
import CloseIcon from "../../../assets/icons/close.svg?react";
import SortingContent from "./SortingContent";
import FilteringContent from "./FilteringContent";

type FilterSortModalProps = {
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

const FilterSortModal = ({
  action,
  filterAndSort,
  columns,
  isOpen,
  setIsOpen,
  sortKeys,
  setSortKeys,
  filterDescs,
  setFilterDescs,
}: FilterSortModalProps) => {
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
          {action === "sort" ? (
            <SortingContent
              columns={columns}
              filterAndSort={filterAndSort}
              setIsOpen={setIsOpen}
              setSortKeys={setSortKeys}
              sortKeys={sortKeys}
            />
          ) : (
            <FilteringContent
              columns={columns}
              setIsOpen={setIsOpen}
              filterDescs={filterDescs}
              setFilterDescs={setFilterDescs}
              filterAndSort={filterAndSort}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSortModal;
