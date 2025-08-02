export default function isObjectEffectivelyEmpty(obj: object): boolean {
  return Object.values(obj).every(
    (value) =>
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === ""),
  );
}
