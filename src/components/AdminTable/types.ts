export type ColumnType = "string" | "number";

export type AdminTableColumn<T> = {
  id: keyof T;
  notSortable?: boolean;
  label: string;
  render: (item: T) => React.ReactNode;
  type: ColumnType;
  width?: number | string;
};

export type StringFilterDesc<T> = {
  id: keyof T;
  type: "string";
  op: "contains" | "equals" | "startsWith" | "endsWith";
  value: string;
};

export type NumberFilterDesc<T> = {
  id: keyof T;
  type: "number";
  op: "eq" | "gt" | "gte" | "lt" | "lte" | "between";
  a?: number;
  b?: number;
};

export type FilterDesc<T> = StringFilterDesc<T> | NumberFilterDesc<T>;

export type SortKey<T> = {
  id: keyof T;
  type: ColumnType;
  direction: "asc" | "desc";
  nulls?: "first" | "last";
};
