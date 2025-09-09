export function formatDate(
  input: Date | string | number | null | undefined
): string {
  const d =
    input instanceof Date
      ? input
      : typeof input === "string" || typeof input === "number"
      ? new Date(input)
      : null;

  if (!d || Number.isNaN(d.getTime())) return "N/A";

  const day = String(d.getDate());
  const month = String(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return `${day}. ${month}. ${year}. u ${hours}:${minutes}:${seconds}`;
}

export function toLocalInputValue(date: Date): string {
  const off = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - off).toISOString().slice(0, 16);
}

export function normalizeEpochMs(n: number) {
  return n < 1e12 ? n * 1000 : n;
}

export function getTimestampMs(v: unknown): number | undefined {
  if (v == null) return undefined;

  if (v instanceof Date) {
    const ms = v.getTime();
    return Number.isFinite(ms) ? ms : undefined;
  }

  if (typeof v === "number") {
    const ms = normalizeEpochMs(v);
    return Number.isFinite(ms) ? ms : undefined;
  }

  if (typeof v === "string") {
    const asNum = Number(v);
    if (Number.isFinite(asNum)) return normalizeEpochMs(asNum);
    const ms = Date.parse(v);
    return Number.isFinite(ms) ? ms : undefined;
  }

  return undefined;
}
