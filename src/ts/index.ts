import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
import $ from "jquery";

import { MathOperator } from "./util/MathOperator";

const mathOperator = new MathOperator();

const numberButtonEls = $("button[data-num='true']");
const operationButtonEls = $("button[data-op]");
const backspaceButtonEl = $("#btnBackspace");
const equalsButtonEl = $("#btnEquals");
const negateButtonEl = $("#btnNegate");
const numberDisplayEl = $("#numberDisplay");
const resultDisplayEl = $("#resultDisplay");
const btnCE = $("#btnCE");
const btnC = $("#btnC");

numberButtonEls.on("click", (event) =>
  numberDisplayEl.text(mathOperator.appendNumber(event.target.textContent as string).numberExpression)
);

operationButtonEls.on("click", (event) =>
  resultDisplayEl.text(mathOperator.appendOperator($(event.target as any).attr("data-op") as string).resultExpression)
);

backspaceButtonEl.on("click", () => numberDisplayEl.text(mathOperator.backspace().numberExpression));

equalsButtonEl.on("click", () => resultDisplayEl.text(mathOperator.result().resultExpression));

negateButtonEl.on("click", () => numberDisplayEl.text(mathOperator.negate().numberExpression));

btnCE.on("click", () => numberDisplayEl.text(mathOperator.clearNumber().numberExpression));

btnC.on("click", () => {
  mathOperator.reInit();
  numberDisplayEl.text(mathOperator.numberExpression);
  resultDisplayEl.text(mathOperator.resultExpression);
});
