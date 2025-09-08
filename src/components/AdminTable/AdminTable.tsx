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
import type { AdminTableColumn, FilterDesc, SortKey } from "./types";
import { buildComparator } from "./builders/buildComparator";
import { buildFilter } from "./builders/buildFilter";

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
  const [filterDescs, setFilterDescs] = useState<FilterDesc<any>[]>([]);

  const [displayedData, setDisplayedData] = useState<T[]>(data);

  const filterAndSort = () => {
    let newData = [...data];

    if (filterDescs.length === 0 && sortKeys.length === 0) {
      setDisplayedData(newData);
      return;
    }

    if (filterDescs.length > 0) {
      newData = newData.filter(buildFilter(filterDescs));
    }

    if (sortKeys.length > 0) {
      newData.sort(buildComparator(sortKeys));
    }

    setDisplayedData(newData);
  };

  return (
    <div className={c.adminTable}>
      <AdminTableModal
        action={modalAction}
        filterAndSort={filterAndSort}
        columns={columns}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        sortKeys={sortKeys}
        setSortKeys={setSortKeys}
        filterDescs={filterDescs}
        setFilterDescs={setFilterDescs}
      />
      <div className={c.options}>
        {displayedData.length !== data.length && (
          <p className={c.rowCount}>
            Broj prikazanih redova: {displayedData.length}/{data.length}
          </p>
        )}
        {displayedData.length === data.length && (
          <p className={c.rowCount}>Broj redova: {data.length}</p>
        )}
        <div className={c.rightWrapper}>
          <button
            className={c.optionButton}
            onClick={() => {
              setModalAction("filter");
              setIsModalOpen(true);
            }}
          >
            <FilterListIcon className={c.icon} /> Filtriraj
            {filterDescs.length !== 0 && (
              <div className={c.indicator}>{filterDescs.length}</div>
            )}
          </button>
          <button
            className={c.optionButton}
            onClick={() => {
              setModalAction("sort");
              setIsModalOpen(true);
            }}
          >
            <SortIcon className={c.icon} /> Sortiraj
            {sortKeys.length !== 0 && (
              <div className={c.indicator}>{sortKeys.length}</div>
            )}
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
