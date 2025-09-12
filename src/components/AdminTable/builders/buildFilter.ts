import { getTimestampMs } from "../../../helpers";
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
            default:
              return () => true;
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
            default:
              return () => true;
          }
        };
      }

      case "timestamp": {
        const a = f.a?.getTime();
        const b = f.b?.getTime();

        if (f.op === "between") {
          if (a == null || b == null) return () => true;
        } else {
          if (a == null) return () => true;
        }

        if (f.op === "between") {
          const min = Math.min(a!, b!);
          const max = Math.max(a!, b!);
          return (row: T) => {
            const ts = getTimestampMs(row[key]);
            return ts != null && ts >= min && ts <= max;
          };
        }

        const eqWindowMs = 60_000;

        switch (f.op) {
          case "eq":
            return (row: T) => {
              const ts = getTimestampMs(row[key]);
              return ts != null && ts >= a! && ts < a! + eqWindowMs;
              // If you truly want exact ms equality, use: ts != null && ts === a!
            };
          case "lt":
            return (row: T) => {
              const ts = getTimestampMs(row[key]);
              return ts != null && ts < a!;
            };
          case "lte":
            return (row: T) => {
              const ts = getTimestampMs(row[key]);
              return ts != null && ts <= a!;
            };
          case "gt":
            return (row: T) => {
              const ts = getTimestampMs(row[key]);
              return ts != null && ts > a!;
            };
          case "gte":
            return (row: T) => {
              const ts = getTimestampMs(row[key]);
              return ts != null && ts >= a!;
            };
          default:
            return () => true;
        }
      }
      case "stringArray": {
        const needle = (f.value ?? "").toLowerCase();
        const a = toNumber(f.a);
        const b = toNumber(f.b);
        return (row: T) => {
          const raw = row[key];
          const arr: string[] = Array.isArray(raw)
            ? raw.map((v) => String(v).toLowerCase())
            : [];
          switch (f.op) {
            case "contains":
              return arr.some((s) => s.includes(needle));
            case "equals":
              return arr.some((s) => s === needle);
            case "startsWith":
              return arr.some((s) => s.startsWith(needle));
            case "endsWith":
              return arr.some((s) => s.endsWith(needle));
            case "countEq":
              return a !== undefined && arr.length === a;
            case "countGt":
              return a !== undefined && arr.length > a;
            case "countGte":
              return a !== undefined && arr.length >= a;
            case "countLt":
              return a !== undefined && arr.length < a;
            case "countLte":
              return a !== undefined && arr.length <= a;
            case "countBetween":
              return (
                a !== undefined &&
                b !== undefined &&
                arr.length >= a &&
                arr.length <= b
              );
            default:
              return () => true;
          }
        };
      }
    }
  });

  return (row: T) => fns.every((fn) => fn(row));
}
