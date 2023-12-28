const padsDot = document.querySelector("#dot");
const padsClear = document.querySelector("#clear");
const padsUndo = document.querySelector("#undo");
const padsEqual = document.querySelector("#equal");
const controlPad = document.querySelector(".controls");
const currentDisplay = document.querySelector(".current_display");
const accumulatedDisplay = document.querySelector(".accumulated_display");

const keyMappings = {
  0: () => addToDisplay(0),
  1: () => addToDisplay(1),
  2: () => addToDisplay(2),
  3: () => addToDisplay(3),
  4: () => addToDisplay(4),
  5: () => addToDisplay(5),
  6: () => addToDisplay(6),
  7: () => addToDisplay(7),
  8: () => addToDisplay(8),
  9: () => addToDisplay(9),
  "+": () => preOperate("+", "+"),
  "-": () => preOperate("-", "-"),
  "*": () => preOperate("x", "*"),
  "/": () => preOperate("÷", "/"),
  c: clearDisplay,
  Backspace: eraseLastChar,
  Enter: equalOperation,
  ".": dotOperation,
};

let eraseResult = false;
let number1;
let number2;
let operator = {
  sign: "",
  mathSymbol: "",
};
let result;
const operatorRegex = /[+\-x÷]/;

function adjustFontSizeToFit(container) {
  let contentWidth = container.scrollWidth;
  let containerWidth = container.clientWidth;

  while (contentWidth > containerWidth && container.style.fontSize !== "0px") {
    let currentFontSize = parseFloat(
      window.getComputedStyle(container, null).getPropertyValue("font-size")
    );
    container.style.fontSize = currentFontSize - 1 + "px";
    contentWidth = container.scrollWidth;
  }
}

controlPad.addEventListener("click", function (event) {
  if (eraseResult === true) {
    currentDisplay.textContent = "";
    eraseResult = false;
  }
  if (event.target.classList.contains("number")) {
    addToDisplay(event.target.textContent);
  } else if (event.target.id === "clear") {
    clearDisplay();
  } else if (event.target.id == "undo") {
    eraseLastChar();
  } else if (event.target.classList.contains("operators")) {
    let eventOperator = event.target.textContent;
    switch (eventOperator) {
      case "+":
        preOperate("+", "+");
        break;
      case "-":
        preOperate("-", "-");
        break;
      case "x":
        preOperate("x", "*");
        break;
      case "÷":
        preOperate("÷", "/");
        break;
      default:
        break;
    }
  } else if (event.target.id === "equal") {
    equalOperation();
  } else if (event.target.id === "dot") {
    dotOperation();
  }
});

document.addEventListener("keyup", (event) => {
  if (eraseResult === true) {
    currentDisplay.textContent = "";
    eraseResult = false;
  }
  if (keyMappings[`${event.key}`]) {
    keyMappings[`${event.key}`]();
  }
});

padsClear.addEventListener("click", clearDisplay);

function preOperate(text, symbol) {
  if (
    operatorRegex.test(accumulatedDisplay.textContent.slice(-1)) &&
    currentDisplay.textContent === ""
  ) {
    return;
  }
  if (accumulatedDisplay.textContent.slice(-1) === "=") {
    updateOperatorObject(text, symbol);
    accumulatedDisplay.textContent = `${number1}${text}`;
    currentDisplay.textContent = "";
    return;
  }
  roundedDisplay = Math.round(currentDisplay.textContent * 1000) / 1000;
  if (accumulatedDisplay.textContent === "") {
    currentDisplay.textContent = roundedDisplay;
    number1 = roundedDisplay;
    addToDisplay(text);
    updateOperatorObject(text, symbol);
    currentToAccumulated();
  } else {
    currentDisplay.textContent = roundedDisplay;
    number2 = roundedDisplay;
    addToDisplay(text);
    operate();
    updateOperatorObject(text, symbol);
  }
}

function equalOperation() {
  if (accumulatedDisplay.textContent.slice(-1) === "=") {
    return;
  }
  number2 = Number(currentDisplay.textContent);
  addToDisplay("=");
  operate();
}

function dotOperation() {
  if (
    currentDisplay.textContent.slice(-1) === "." ||
    currentDisplay.textContent.includes(".")
  ) {
    return null;
  } else if (currentDisplay.textContent === "") {
    addToDisplay("0");
    addToDisplay(".");
  } else {
    addToDisplay(".");
  }
}

function clearDisplay() {
  currentDisplay.textContent = "";
  accumulatedDisplay.textContent = "";
  number1 = undefined;
  number2 = undefined;
  eraseResult = false;
}

function eraseLastChar() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
}

function addToDisplay(padContent) {
  currentDisplay.append(padContent);
  adjustFontSizeToFit(currentDisplay);
}

function currentToAccumulated() {
  accumulatedDisplay.append(currentDisplay.textContent);
  adjustFontSizeToFit(accumulatedDisplay);
  currentDisplay.textContent = "";
}

function updateOperatorObject(text, symbol) {
  operator.sign = text;
  operator.mathSymbol = symbol;
}

function operate() {
  let operand1 = number1;
  let operand2 = number2;
  switch (operator.mathSymbol) {
    case "+":
      result = operand1 + operand2;
      break;
    case "-":
      result = operand1 - operand2;
      break;
    case "*":
      result = operand1 * operand2;
      break;
    case "/":
      if (operand2 !== 0) {
        result = operand1 / operand2;
      } else {
        alert("ERROR, PLEASE DO NOT DIVIDE BY 0");
        currentDisplay.textContent = "";
        operator = { sign: "", mathSymbol: "" };
        return;
      }
      break;
    default:
      result = "Unsupported operator";
  }
  result = Math.round(result * 1000) / 1000;
  currentToAccumulated();
  number1 = result;
  currentDisplay.textContent = result;
  eraseResult = true;
}
