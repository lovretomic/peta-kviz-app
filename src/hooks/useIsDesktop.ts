import useViewport from "./useViewport";

export function useIsDesktop() {
  const { width } = useViewport();
  return width >= 768;
}
