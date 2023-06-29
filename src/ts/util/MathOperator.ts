import { MathOperation, operate as mathOperate } from "./MathOperation";

export class MathOperator {
  private _numberExp: string = "0";
  private _resultExp: string = "";

  private _result: number | null = null;
  private _number1: number | null = null;
  private _number2: number | null = null;
  private _operation: MathOperation | null = null;

  get numberExpression(): string {
    return this._numberExp;
  }

  get resultExpression(): string {
    return this._resultExp;
  }

  appendNumber: (number: string) => MathOperator = (number) => {
    if (this._numberExp == undefined) this._numberExp = "0";
    if (Number.isNaN(+number) && number !== ".") {
      return this;
    }

    if (!Number.isNaN(+number)) {
      if (this._numberExp === "0") {
        this._numberExp = number;
      } else {
        this._numberExp += number;
      }
    } else if (!this._numberExp.includes(".")) {
      this._numberExp += number;
    }
    return this;
  };

  negate: () => MathOperator = () => {
    if (this._numberExp !== "0") {
      this._numberExp = this._numberExp.includes("-") ? this._numberExp.replace("-", "") : "-".concat(this._numberExp);
    }
    return this;
  };

  backspace: () => MathOperator = () => {
    this._numberExp = this._numberExp.slice(0, this._numberExp.length - 1);
    if (this._numberExp === "") this._numberExp = "0";
    return this;
  };

  clearNumber: () => MathOperator = () => {
    this._numberExp = "0";
    return this;
  };

  reInit: () => MathOperator = () => {
    this._reset();
    this._resultExp = "";
    return this;
  };

  appendOperation: (operationName: string) => MathOperator = (operationName) => {
    try {
      const operationIsValid = this._isOperationValid(operationName);
      if (operationIsValid) {
        if (this._result === null) {
          this._result = +this._numberExp;
          this._operation = this._getOperation(operationName);
        } else {
          this._calculate();

          this._operation = this._getOperation(operationName);
        }

        this._resultExp = this._result.toString() + " " + this._operation?.toString();
        this._numberExp = "0";
      }
    } catch (err) {
      this._resultExp = err as string;
      this._reset();
    }

    return this;
  };

  result: () => MathOperator = () => {
    if (this._result !== null && this._operation !== null) {
      try {
        this._calculate()._resultExp = `${this._number1} ${this._operation?.toString()} ${this._number2} = ${this._result}`;
      } catch (err) {
        this._resultExp = err as string;
        this._reset();
      }
    } else {
      this._resultExp = `${+this._numberExp} = ${+this._numberExp}`;
    }
    this._numberExp = this._result?.toString() as string;
    this._result = null;
    return this;
  };

  private _reset: () => void = () => {
    this._numberExp = "0";
    this._result = null;
    this._number1 = null;
    this._number2 = null;
    this._operation = null;
  };

  private _calculate: () => MathOperator = () => {
    this._number1 = this._result as number;
    this._number2 = +this._numberExp;
    try {
      this._result = mathOperate(this._number1, this._number2, this._operation as MathOperation);
    } catch (err) {
      throw err;
    }
    return this;
  };

  private _isOperationValid: (operationName: string) => boolean = (operationName) => {
    let operationIsValid = true;
    switch (operationName) {
      case "add":
        break;
      case "subtract":
        break;
      case "multiply":
        break;
      case "divide":
        break;
      default:
        operationIsValid = false;
        break;
    }
    return operationIsValid;
  };

  private _getOperation: (operationName: string) => MathOperation = (operationName) => {
    let operation: MathOperation | null;
    switch (operationName) {
      case "add":
        operation = MathOperation.add;
        break;
      case "subtract":
        operation = MathOperation.subtract;
        break;
      case "multiply":
        operation = MathOperation.multiply;
        break;
      case "divide":
        operation = MathOperation.divide;
        break;
      default:
        operation = null;
        break;
    }
    return operation as MathOperation;
  };
}
