export function isEmptyObject(obj: Record<string | number, any>) {
  return Boolean(obj && Object.keys(obj).length === 0 && obj.constructor === Object)
}
