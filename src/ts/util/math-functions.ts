export function add(n1: number, n2: number): number {
  return n1 + n2;
}

export function subtract(n1: number, n2: number): number {
  return n1 - n2;
}

export function multiply(n1: number, n2: number): number {
  return n1 * n2;
}

export function divide(n1: number, n2: number): number {
  if (n2 === 0) throw new Error("Can't divide by 0!");
  return n1 / n2;
}
