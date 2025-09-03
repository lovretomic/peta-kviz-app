export const toNumber = (v: unknown) => {
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
};
