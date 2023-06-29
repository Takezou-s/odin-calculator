import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import $ from "jquery";

import { MathOperator } from "./util/MathOperator";
import { KeyAction, KeyActionBuilder, KeyData } from "./util/key-ops";
//#region Variables
const mathOperator = new MathOperator();

const builder = new KeyActionBuilder();
const keyActions = [
  builder
    .reset()
    .predicate((data) => !Number.isNaN(+data.key) || data.key === ".")
    .action((data) => appendNumber(data.key))
    .getObj(),
  builder
    .reset()
    .predicate("+")
    .action((data) => appendOperation("add"))
    .getObj(),
  builder
    .reset()
    .predicate("-")
    .action((data) => appendOperation("subtract"))
    .getObj(),
  builder
    .reset()
    .predicate("*")
    .action((data) => appendOperation("multiply"))
    .getObj(),
  builder
    .reset()
    .predicate("/")
    .action((data) => appendOperation("divide"))
    .getObj(),
  builder
    .reset()
    .predicate("-")
    .modifierKeys(false, true, false)
    .action((data) => negate())
    .getObj(),
  builder
    .reset()
    .predicate("Backspace")
    .action((data) => backspace())
    .getObj(),
  builder
    .reset()
    .predicate("Delete")
    .action((data) => clearNumber())
    .getObj(),
  builder
    .reset()
    .predicate("Delete")
    .modifierKeys(false, true, false)
    .action((data) => reset())
    .getObj(),
  builder
    .reset()
    .predicate("Enter")
    .action((data) => equals())
    .getObj(),
];
//#endregion

//#region DOM refs
const numberButtonEls = $("button[data-num='true']");
const operationButtonEls = $("button[data-op]");
const backspaceButtonEl = $("#btnBackspace");
const equalsButtonEl = $("#btnEquals");
const negateButtonEl = $("#btnNegate");
const numberDisplayEl = $("#numberDisplay");
const resultDisplayEl = $("#resultDisplay");
const btnCE = $("#btnCE");
const btnC = $("#btnC");
//#endregion

//#region Event subscriptions
numberButtonEls.on("click", (event) => appendNumber(event.target.textContent as string));

operationButtonEls.on("click", (event) => appendOperation($(event.target as any).attr("data-op") as string));

backspaceButtonEl.on("click", () => backspace());

equalsButtonEl.on("click", () => equals());

negateButtonEl.on("click", () => negate());

btnCE.on("click", () => clearNumber());

btnC.on("click", () => {
  reset();
});

window.addEventListener("keydown", (event) => {
  // event.preventDefault();
  keyActions.forEach((keyAction) => keyAction.act(event));
  // console.log(event.key);
});
//#endregion

//#region Functions
function reset(): void {
  mathOperator.reInit();
  numberDisplayEl.text(mathOperator.numberExpression);
  resultDisplayEl.text(mathOperator.resultExpression);
}

function clearNumber(): void {
  numberDisplayEl.text(mathOperator.clearNumber().numberExpression);
}

function negate(): void {
  numberDisplayEl.text(mathOperator.negate().numberExpression);
}

function equals(): void {
  resultDisplayEl.text(mathOperator.result().resultExpression);
}

function backspace(): void {
  numberDisplayEl.text(mathOperator.backspace().numberExpression);
}

function appendOperation(operation: string): void {
  resultDisplayEl.text(mathOperator.appendOperation(operation).resultExpression);
}

function appendNumber(number: string): void {
  numberDisplayEl.text(mathOperator.appendNumber(number).numberExpression);
}
//#endregion
