import type { FilterDesc } from "../types";
import { toNumber } from "./helpers";

export function buildFilter<T>(filters: FilterDesc<T>[]): (row: T) => boolean {
  if (!filters.length) return () => true;

  const fns = filters.map((f) => {
    const key = f.id as keyof T;

    switch (f.type) {
      case "string": {
        const needle = (f.value ?? "").toLowerCase();
        return (row: T) => {
          const raw = row[key];
          const s = String(raw ?? "").toLowerCase();
          switch (f.op) {
            case "contains":
              return s.includes(needle);
            case "equals":
              return s === needle;
            case "startsWith":
              return s.startsWith(needle);
            case "endsWith":
              return s.endsWith(needle);
          }
        };
      }

      case "number": {
        const a = toNumber(f.a);
        const b = toNumber(f.b);
        return (row: T) => {
          const n = toNumber(row[key]);
          if (n === undefined) return false;

          switch (f.op) {
            case "eq":
              return a !== undefined && n === a;
            case "lt":
              return a !== undefined && n < a;
            case "lte":
              return a !== undefined && n <= a;
            case "gt":
              return a !== undefined && n > a;
            case "gte":
              return a !== undefined && n >= a;
            case "between":
              return a !== undefined && b !== undefined && n >= a && n <= b;
          }
        };
      }
    }
  });

  return (row: T) => fns.every((fn) => fn(row));
}
