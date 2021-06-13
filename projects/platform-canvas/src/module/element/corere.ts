export function coerceNumber(value: string | number, context?) {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    let reg = value.match(/^((\d+)\.?(\d+))?px$/);
    if (reg) {
      return +reg[1];
    }
  }
  return undefined;
}
