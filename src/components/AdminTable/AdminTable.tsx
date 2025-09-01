import AdminButton from "../AdminButton";
import c from "./AdminTable.module.scss";

import FilterListIcon from "../../assets/icons/filter-list.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";

import DownloadIcon from "../../assets/icons/download.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";

export type AdminTableColumn<T> = {
  id: keyof T;
  label: string;
  render: (item: T) => React.ReactNode;
};

const AdminTable = () => {
  return (
    <div className={c.adminTable}>
      <div className={c.options}>
        <button className={c.optionButton}>
          <FilterListIcon className={c.icon} /> Filtriraj
        </button>
        <button className={c.optionButton}>
          <SortIcon className={c.icon} /> Sortiraj
        </button>
        <button className={c.optionButton}>
          <SearchIcon className={c.icon} /> Pretraži
        </button>
        <AdminButton variant="secondary" Icon={DownloadIcon}>
          Izvezi
        </AdminButton>
        <AdminButton Icon={UploadIcon}>Dodaj</AdminButton>
      </div>
    </div>
  );
};

export default AdminTable;
