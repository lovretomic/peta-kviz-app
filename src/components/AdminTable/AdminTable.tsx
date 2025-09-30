import AdminButton from "../AdminButton";
import c from "./AdminTable.module.scss";

import FilterListIcon from "../../assets/icons/filter-list.svg?react";
import SortIcon from "../../assets/icons/sort.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import AddIcon from "../../assets/icons/add.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import VisibilityIcon from "../../assets/icons/visibility.svg?react";

import { useEffect, useRef, useState } from "react";
import type { AdminTableColumn, FilterDesc, SortKey } from "./types";
import { buildComparator } from "./builders/buildComparator";
import { buildFilter } from "./builders/buildFilter";

import * as XLSX from "xlsx";
import FilterSortModal from "./FilterSortModal";
import AddEditModal from "./AddEditModal";
import Render from "./Render/Render";
import VisibilityModal from "./VisibilityModal";
import clsx from "clsx";
import DeleteModal from "./DeleteModal";

type AdminTableProps<T> = {
  columns: AdminTableColumn<T>[];
  data: T[];
  title: string;
  addFn?: (item: Omit<T, "id">) => void;
  editFn?: (item: Partial<T>) => void;
  deleteFn?: (id: string) => void;
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

type ModalsState = {
  filterSort: "filter" | "sort" | null;
  addEdit: "add" | "edit" | null;
  visibility: boolean;
  delete: boolean;
};

type CustomizationState = {
  sortKeys: SortKey<any>[];
  filterDescs: FilterDesc<any>[];
  searchTerm: string;
};

const AdminTable = <T,>({
  columns,
  data,
  title,
  addFn,
  editFn,
  deleteFn,
}: AdminTableProps<T>) => {
  const [modals, setModals] = useState<ModalsState>({
    filterSort: null,
    addEdit: null,
    visibility: false,
    delete: false,
  });

  const [customization, setCustomization] = useState<CustomizationState>({
    sortKeys: [],
    filterDescs: [],
    searchTerm: "",
  });

  const [displayedColumns, setDisplayedColumns] = useState(
    columns.filter((c) => !c.hiddenByDefault)
  );
  const [displayedData, setDisplayedData] = useState<T[]>(data);
  const [dataToEdit, setDataToEdit] = useState<T | null>(null);
  const [dataToDelete, setDataToDelete] = useState<T | null>(null);

  useEffect(() => {
    if (modals.addEdit === null && modals.delete === false) {
      setDataToDelete(null);
      setDataToEdit(null);
    }
  }, [modals.addEdit, modals.delete]);

  useEffect(() => {
    if (modals.addEdit === null) setDataToEdit(null);
  }, [modals.addEdit]);

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

    if (
      customization.filterDescs.length === 0 &&
      customization.sortKeys.length === 0 &&
      !customization.searchTerm
    ) {
      setDisplayedData(newData);
      return;
    }

    if (customization.filterDescs.length > 0) {
      newData = newData.filter(buildFilter(customization.filterDescs));
    }

    if (customization.sortKeys.length > 0) {
      newData.sort(buildComparator(customization.sortKeys));
    }

    const trimmed = customization.searchTerm.trim().toLowerCase();
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
  }, [
    customization.searchTerm,
    customization.sortKeys,
    customization.filterDescs,
    data,
  ]);

  const handleDelete = () => {
    if (!dataToDelete) {
      console.warn("No data to delete");
      return;
    }

    if (!deleteFn) {
      console.warn("No delete function provided");
      return;
    }

    if (!(dataToDelete as any).id) {
      console.warn("No valid id found for deletion");
      return;
    }

    deleteFn((dataToDelete as any).id as string);
  };

  return (
    <div className={c.adminTable}>
      <FilterSortModal
        action={modals.filterSort || "filter"}
        columns={columns}
        isOpen={modals.filterSort !== null}
        setIsOpen={(isOpen) => {
          setModals((prev) => ({
            ...prev,
            filterSort: isOpen ? "filter" : null,
          }));
        }}
        sortKeys={customization.sortKeys}
        setSortKeys={(sortKeys) => {
          setCustomization((prev) => ({
            ...prev,
            sortKeys,
          }));
        }}
        filterDescs={customization.filterDescs}
        setFilterDescs={(filterDescs) => {
          setCustomization((prev) => ({
            ...prev,
            filterDescs,
          }));
        }}
      />
      <AddEditModal
        isOpen={modals.addEdit !== null}
        setIsOpen={(isOpen) => {
          setModals((prev) => ({
            ...prev,
            addEdit: isOpen ? "add" : null,
          }));
        }}
        columns={columns}
        dataToEdit={dataToEdit}
        addFn={addFn}
        editFn={editFn}
      />
      <VisibilityModal
        isOpen={modals.visibility}
        setIsOpen={(isOpen) => {
          setModals((prev) => ({
            ...prev,
            visibility: isOpen,
          }));
        }}
        columns={columns}
        displayedColumns={displayedColumns}
        setDisplayedColumns={setDisplayedColumns}
      />
      <DeleteModal
        isOpen={modals.delete}
        setIsOpen={(isOpen) => {
          setModals((prev) => ({
            ...prev,
            delete: isOpen,
          }));
        }}
        onDelete={handleDelete}
        itemLabel={
          dataToDelete && columns.find((c) => c.isDeletionItemLabel)
            ? columns
                .find((c) => c.isDeletionItemLabel)
                ?.accessor?.(dataToDelete) ?? ""
            : undefined
        }
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
              setModals((prev) => ({
                ...prev,
                filterSort: "filter",
              }));
            }}
          >
            <FilterListIcon className={c.icon} /> Filtriraj
            {customization.filterDescs.length !== 0 && (
              <div className={c.indicator}>
                {customization.filterDescs.length}
              </div>
            )}
          </button>
          <button
            className={c.optionButton}
            onClick={() => {
              setModals((prev) => ({
                ...prev,
                filterSort: "sort",
              }));
            }}
          >
            <SortIcon className={c.icon} /> Sortiraj
            {customization.sortKeys.length !== 0 && (
              <div className={c.indicator}>{customization.sortKeys.length}</div>
            )}
          </button>
          <button
            className={c.optionButton}
            onClick={() => {
              setModals((prev) => ({
                ...prev,
                visibility: true,
              }));
            }}
          >
            <VisibilityIcon className={c.icon} /> Prikaz
            {displayedColumns.length !== columns.length && (
              <div className={clsx(c.indicator, c.visibilityIndicator)}>
                {displayedColumns.length}/{columns.length}
              </div>
            )}
          </button>
          <input
            type="text"
            placeholder="Pretraži"
            className={c.searchInput}
            value={customization.searchTerm}
            onChange={(e) => {
              setCustomization((prev) => ({
                ...prev,
                searchTerm: e.target.value,
              }));
            }}
          />
          <AdminButton
            variant="secondary"
            Icon={DownloadIcon}
            onClick={downloadXLSX}
          >
            Izvezi (.xlsx)
          </AdminButton>
          {addFn && (
            <AdminButton
              Icon={AddIcon}
              onClick={() => {
                setDataToEdit(null);
                setModals((prev) => ({
                  ...prev,
                  addEdit: "add",
                }));
              }}
            >
              Dodaj
            </AdminButton>
          )}
        </div>
      </div>
      <div className={c.tableWrapper}>
        {displayedColumns.length !== 0 && (
          <table className={c.table} ref={tableRef}>
            <thead>
              <tr>
                {displayedColumns.map((column) => (
                  <th key={column.id as string} style={getWidthStyle(column)}>
                    {column.labelHidden ? "" : column.label}
                  </th>
                ))}
                {(editFn || deleteFn) && <th className={c.actions}>Radnje</th>}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  {displayedColumns.map((column) => (
                    <td key={column.id as string} style={getWidthStyle(column)}>
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <Render
                          type={column.type}
                          value={
                            column.accessor ? column.accessor(item) : undefined
                          }
                          actionName={column.actionName}
                          onAction={column.onAction}
                          item={item}
                        />
                      )}
                    </td>
                  ))}
                  {(editFn || deleteFn) && (
                    <td className={c.actions}>
                      {deleteFn && (
                        <DeleteIcon
                          className={c.actionIcon}
                          title="Obriši"
                          onClick={() => {
                            setDataToDelete(item);
                            setModals((prev) => ({ ...prev, delete: true }));
                          }}
                        />
                      )}
                      {editFn && (
                        <EditIcon
                          className={c.actionIcon}
                          title="Uredi"
                          onClick={() => {
                            setDataToEdit(item);
                            setModals((prev) => ({
                              ...prev,
                              addEdit: "edit",
                            }));
                          }}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {displayedData.length === 0 || displayedColumns.length === 0 ? (
          <div className={c.noData}>Nema podataka za prikaz.</div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminTable;
