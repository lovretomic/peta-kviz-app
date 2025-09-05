import type { SortKey } from "../types";
import { toNumber } from "./helpers";

function cmpNumbers(a: unknown, b: unknown) {
  const na = toNumber(a),
    nb = toNumber(b);
  if (na === undefined && nb === undefined) return 0;
  if (na === undefined) return -1;
  if (nb === undefined) return 1;
  return na - nb;
}

function cmpStrings(a: unknown, b: unknown) {
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    sensitivity: "base",
  });
}

export function buildComparator<T>(keys: SortKey<T>[]): (a: T, b: T) => number {
  if (!keys.length) return () => 0;

  const parts = keys.map((k) => {
    const dir = k.direction === "asc" ? 1 : -1;
    const key = k.id as keyof T;

    const base = (() => {
      switch (k.type) {
        case "number":
          return (a: T, b: T) => cmpNumbers(a[key], b[key]);
        case "string":
          return (a: T, b: T) => cmpStrings(a[key], b[key]);
        default:
          return (a: T, b: T) => cmpStrings(a[key], b[key]);
      }
    })();

    const bullBias = k.nulls ?? "last";
    const nullCmp = (a: T, b: T) => {
      const av = a[key];
      const bv = b[key];

      const aNull = av == null || av === "";
      const bNull = bv == null || bv === "";

      if (aNull && bNull) return 0;
      if (aNull) return bullBias === "first" ? -1 : 1;
      if (bNull) return bullBias === "first" ? 1 : -1;
      return 0;
    };

    return (a: T, b: T) => {
      const nc = nullCmp(a, b);
      if (nc !== 0) return nc;

      const c = base(a, b);
      return dir * c;
    };
  });

  return (a: T, b: T) => {
    for (const part of parts) {
      const cmp = part(a, b);
      if (cmp !== 0) return cmp;
    }
    return 0;
  };
}
