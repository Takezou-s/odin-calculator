import * as operations from "./math-functions";

export enum MathOperation {
  add = "+",
  subtract = "-",
  multiply = "×",
  divide = "÷",
}

export function operate(number1: number, number2: number, operation: MathOperation): number {
  let func: (number1: number, number2: number) => number;
  switch (operation) {
    case MathOperation.add:
      func = operations.add;
      break;
    case MathOperation.subtract:
      func = operations.subtract;
      break;
    case MathOperation.multiply:
      func = operations.multiply;
      break;
    case MathOperation.divide:
      func = operations.divide;
      break;
  }
  try {
    return func(number1, number2);
  } catch (err) {
    throw err;
  }
}
