export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}. ${month}. ${year}. u ${hours}:${minutes}`;
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
