export function transformInvalidInUndefined<T>(arg: T | null): T | undefined {
  if (arg == null) return;
  if (arg === "") return;
  return arg;
}
