import AdminButton from "../AdminButton";
import c from "./AdminTable.module.scss";

import FilterListIcon from "../../assets/icons/filter-list.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import SearchIcon from "../../assets/icons/search.svg?react";

import DownloadIcon from "../../assets/icons/download.svg?react";
import UploadIcon from "../../assets/icons/upload.svg?react";
import clsx from "clsx";
import AdminTableModal from "./AdminTableModal";
import { useState } from "react";
import type { AdminTableColumn, SortKey } from "./types";
import { buildComparator } from "./builders/buildComparator";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"sort" | "filter">("filter");

  const [sortKeys, setSortKeys] = useState<SortKey<any>[]>([]);

  const [displayedData, setDisplayedData] = useState<T[]>(data);

  const applySort = () => {
    if (sortKeys.length === 0) setDisplayedData(data);
    setDisplayedData((prevData) => {
      const sortedData = [...prevData].sort(buildComparator<T>(sortKeys));
      return sortedData;
    });
  };

  return (
    <div className={c.adminTable}>
      <AdminTableModal
        action={modalAction}
        applySort={applySort}
        columns={columns}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        sortKeys={sortKeys}
        setSortKeys={setSortKeys}
      />
      <div className={c.options}>
        <button
          className={c.optionButton}
          onClick={() => {
            setModalAction("filter");
            setIsModalOpen(true);
          }}
          style={{ display: "none" }}
        >
          <FilterListIcon className={c.icon} /> Filtriraj
        </button>
        <button
          className={c.optionButton}
          onClick={() => {
            setModalAction("sort");
            setIsModalOpen(true);
          }}
        >
          <SortIcon className={c.icon} /> Sortiraj
          {sortKeys.length > 0 && " (primijenjeno)"}
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
            {displayedData.map((item, index) => (
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
