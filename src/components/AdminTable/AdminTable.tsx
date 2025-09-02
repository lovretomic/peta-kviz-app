import AdminButton from "../AdminButton";
import c from "./AdminTable.module.scss";

import FilterListIcon from "../../assets/icons/filter-list.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";

import DownloadIcon from "../../assets/icons/download.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";
import clsx from "clsx";

export type AdminTableColumn<T> = {
  id: keyof T;
  label: string;
  render: (item: T) => React.ReactNode;
  type: "string" | "number";
  width?: number | string;
};

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  data: T[];
};

function getWidthStyle(column: AdminTableColumn<any>) {
  if (column.width) {
    if (typeof column.width === "number") {
      return { width: `${column.width}px` };
    }
    return { width: column.width };
  }
  return {};
}

const AdminTable = <T,>({ columns, data }: AdminTableProps<T>) => {
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
      <div className={c.tableWrapper}>
        <table className={c.table}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.id as string} style={getWidthStyle(column)}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.id as string}
                    style={getWidthStyle(column)}
                    className={clsx({
                      [c.number]: column.type === "number",
                    })}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
