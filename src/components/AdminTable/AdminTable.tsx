import AdminButton from "../AdminButton";
import c from "./AdminTable.module.scss";

import FilterListIcon from "../../assets/icons/filter-list.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";

import clsx from "clsx";

import { useEffect, useRef, useState } from "react";
import type { AdminTableColumn, FilterDesc, SortKey } from "./types";
import { buildComparator } from "./builders/buildComparator";
import { buildFilter } from "./builders/buildFilter";

import * as XLSX from "xlsx";
import FilterSortModal from "./FilterSortModal";
import AddEditModal from "./AddEditModal";

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  data: T[];
  title: string;
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

const AdminTable = <T,>({ columns, data, title }: AdminTableProps<T>) => {
  const [isFilterSortModalOpen, setIsFilterSortModalOpen] = useState(false);
  const [filterSortModalAction, setFilterSortModalAction] = useState<
    "sort" | "filter"
  >("filter");

  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  const [sortKeys, setSortKeys] = useState<SortKey<any>[]>([]);
  const [filterDescs, setFilterDescs] = useState<FilterDesc<any>[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [displayedData, setDisplayedData] = useState<T[]>(data);

  const tableRef = useRef<HTMLTableElement>(null);

  const downloadXLSX = () => {
    if (!tableRef.current) return;
    const table = tableRef.current;
    const workbook = XLSX.utils.table_to_book(table);

    const options: XLSX.WritingOptions = {
      type: "file",
      bookType: "xlsx",
    };

    XLSX.writeFile(workbook, `${title}.xlsx`, options);
  };

  const filterAndSort = () => {
    let newData = [...data];

    if (filterDescs.length === 0 && sortKeys.length === 0 && !searchTerm) {
      setDisplayedData(newData);
      return;
    }

    if (filterDescs.length > 0) {
      newData = newData.filter(buildFilter(filterDescs));
    }

    if (sortKeys.length > 0) {
      newData.sort(buildComparator(sortKeys));
    }

    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      newData = newData.filter((item) =>
        columns.some((column) => {
          const raw = column.getSearchValue?.(item);
          if (raw === undefined) return false;

          return raw.toLowerCase().includes(trimmed);
        })
      );
    }

    setDisplayedData(newData);
  };

  useEffect(() => {
    filterAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className={c.adminTable}>
      <FilterSortModal
        action={filterSortModalAction}
        filterAndSort={filterAndSort}
        columns={columns}
        isOpen={isFilterSortModalOpen}
        setIsOpen={setIsFilterSortModalOpen}
        sortKeys={sortKeys}
        setSortKeys={setSortKeys}
        filterDescs={filterDescs}
        setFilterDescs={setFilterDescs}
      />
      <AddEditModal
        isOpen={isAddEditModalOpen}
        setIsOpen={setIsAddEditModalOpen}
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
              setFilterSortModalAction("filter");
              setIsFilterSortModalOpen(true);
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
              setFilterSortModalAction("sort");
              setIsFilterSortModalOpen(true);
            }}
          >
            <SortIcon className={c.icon} /> Sortiraj
            {sortKeys.length !== 0 && (
              <div className={c.indicator}>{sortKeys.length}</div>
            )}
          </button>
          <input
            type="text"
            placeholder="Pretraži"
            className={c.searchInput}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <AdminButton
            variant="secondary"
            Icon={DownloadIcon}
            onClick={downloadXLSX}
          >
            Izvezi
          </AdminButton>
          <AdminButton
            Icon={AddIcon}
            onClick={() => setIsAddEditModalOpen(true)}
          >
            Dodaj
          </AdminButton>
        </div>
      </div>
      <div className={c.tableWrapper}>
        <table className={c.table} ref={tableRef}>
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
