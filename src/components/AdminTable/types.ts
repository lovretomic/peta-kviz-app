export type ColumnType = "string" | "number" | "action";

export type AdminTableColumn<T> = {
  id: keyof T;
  label: string;
  notSortable?: boolean;
  notEditable?: boolean;
  type: ColumnType;
  width?: number | string;
  getSearchValue?: (item: T) => string;
  render: (item: T) => React.ReactNode;
};

export type StringFilterDesc<T> = {
  id: keyof T;
  type: "string";
  op: "contains" | "equals" | "startsWith" | "endsWith";
  value: string;
};

export const StringFilterOps = [
  { value: "contains", label: "sadrži" },
  { value: "equals", label: "jednako" },
  { value: "startsWith", label: "počinje s" },
  { value: "endsWith", label: "završava s" },
];

export type NumberFilterDesc<T> = {
  id: keyof T;
  type: "number";
  op: "eq" | "gt" | "gte" | "lt" | "lte" | "between";
  a?: number;
  b?: number;
};

export const NumberFilterOps = [
  { value: "eq", label: "jednako" },
  { value: "gt", label: "veće od" },
  { value: "gte", label: "veće ili jednako" },
  { value: "lt", label: "manje od" },
  { value: "lte", label: "manje ili jednako" },
  { value: "between", label: "između" },
];

export type FilterDesc<T> = StringFilterDesc<T> | NumberFilterDesc<T>;

export type SortKey<T> = {
  id: keyof T;
  type: ColumnType;
  direction: "asc" | "desc";
  nulls?: "first" | "last";
};
