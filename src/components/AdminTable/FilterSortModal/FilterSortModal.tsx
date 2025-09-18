import type { AdminTableColumn, FilterDesc, SortKey } from "../types";
import c from "./FilterSortModal.module.scss";
import SortingContent from "./SortingContent";
import FilteringContent from "./FilteringContent";
import AdminModal from "../../AdminModal";

type FilterSortModalProps = {
  action: "sort" | "filter";
  columns: AdminTableColumn<any>[];
  filterDescs: FilterDesc<any>[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  sortKeys: SortKey<any>[];
  setFilterDescs: (descs: FilterDesc<any>[]) => void;
  setSortKeys: (keys: SortKey<any>[]) => void;
};

const FilterSortModal = ({
  action,
  columns,
  isOpen,
  setIsOpen,
  sortKeys,
  setSortKeys,
  filterDescs,
  setFilterDescs,
}: FilterSortModalProps) => {
  return (
    <AdminModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={action === "sort" ? "Sortiranje" : "Filtriranje"}
    >
      <div className={c.content}>
        {action === "sort" ? (
          <SortingContent
            columns={columns}
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
          />
        )}
      </div>
    </AdminModal>
  );
};

export default FilterSortModal;
