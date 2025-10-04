import type { AdminTableColumn, FilterDesc, CustomizationState } from "./types";

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
    const parsed = JSON.parse(saved);

    const reviveDates = (obj: any): any => {
      if (obj === null || obj === undefined) return obj;

      if (typeof obj === "string") {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (isoDateRegex.test(obj)) {
          return new Date(obj);
        }
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map(reviveDates);
      }

      if (typeof obj === "object") {
        const revived: any = {};
        for (const [key, value] of Object.entries(obj)) {
          revived[key] = reviveDates(value);
        }
        return revived;
      }

      return obj;
    };

    return reviveDates(parsed) as T;
  } catch {
    console.warn(`Could not parse localStorage key: ${key}`);
    return undefined;
  }
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
