export type ColumnType =
  | "string"
  | "number"
  | "action"
  | "timestamp"
  | "stringArray";

export type AdminTableColumn<T> = {
  id: string | keyof T;
  label: string;
  actionName?: string;
  notAddable?: boolean;
  notSortable?: boolean;
  notEditable?: boolean;
  labelHidden?: boolean;
  hiddenByDefault?: boolean;
  type: ColumnType;
  width?: number | string;
  isDeletionItemLabel?: boolean;
  getSearchValue?: (item: T) => string;
  render?: (item: T) => React.ReactNode;
  accessor?: (item: T) => any;
  onAction?: (item: T) => void;
};

export type StringFilterDesc<T> = {
  id: keyof T;
  type: "string";
  op: "contains" | "equals" | "startsWith" | "endsWith";
  value: string;
};

export type CustomizationState = {
  sortKeys: SortKey<any>[];
  filterDescs: FilterDesc<any>[];
  searchTerm: string;
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

export type TimestampFilterDesc<T> = {
  id: keyof T;
  type: "timestamp";
  op: "eq" | "gt" | "gte" | "lt" | "lte" | "between";
  a?: Date;
  b?: Date;
};

export type StringArrayFilterDesc<T> = {
  id: keyof T;
  type: "stringArray";
  op:
    | "contains"
    | "equals"
    | "startsWith"
    | "endsWith"
    | "countEq"
    | "countGt"
    | "countGte"
    | "countLt"
    | "countLte"
    | "countBetween";
  value: string;
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

export const TimestampFilterOps = [
  { value: "eq", label: "jednako" },
  { value: "gt", label: "nakon" },
  { value: "gte", label: "nakon ili jednako" },
  { value: "lt", label: "prije" },
  { value: "lte", label: "prije ili jednako" },
  { value: "between", label: "između" },
];

export const StringArrayFilterOps = [
  { value: "contains", label: "sadrži" },
  { value: "equals", label: "jednako" },
  { value: "startsWith", label: "počinje s" },
  { value: "endsWith", label: "završava s" },
  { value: "countEq", label: "broj elemenata jednako" },
  { value: "countGt", label: "broj elemenata veće od" },
  { value: "countGte", label: "broj elemenata veće ili jednako" },
  { value: "countLt", label: "broj elemenata manje od" },
  { value: "countLte", label: "broj elemenata manje ili jednako" },
  { value: "countBetween", label: "broj elemenata između" },
];

export type FilterDesc<T> =
  | StringFilterDesc<T>
  | NumberFilterDesc<T>
  | TimestampFilterDesc<T>
  | StringArrayFilterDesc<T>;

export type SortKey<T> = {
  id: keyof T;
  type: ColumnType;
  direction: "asc" | "desc";
  nulls?: "first" | "last";
};
