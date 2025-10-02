import type { AdminTableColumn, FilterDesc } from "./types";

export const getDefaultFilterDesc = (column: AdminTableColumn<any>) => {
  switch (column.type) {
    case "string":
      return {
        id: column.id,
        type: "string",
        op: "contains",
        value: "",
      } as FilterDesc<any>;
    case "number":
      return {
        id: column.id,
        type: "number",
        op: "eq",
        a: 0,
      } as FilterDesc<any>;
    case "timestamp":
      return {
        id: column.id,
        type: "timestamp",
        op: "eq",
        a: new Date(),
      } as FilterDesc<any>;
    case "stringArray":
      return {
        id: column.id,
        type: "stringArray",
        op: "contains",
        value: "",
      } as FilterDesc<any>;
    default:
      throw new Error("Unsupported column type");
  }
};

export const loadFromLocalStorage = <T>(key: string): T | undefined => {
  const saved = localStorage.getItem(key);
  if (!saved) return undefined;
  try {
    return JSON.parse(saved) as T;
  } catch {
    console.warn(`Could not parse localStorage key: ${key}`);
    return undefined;
  }
};
