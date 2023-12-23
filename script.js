const pads7 = document.querySelector("#seven");
const pads4 = document.querySelector("#four");
const pads1 = document.querySelector("#one");
const pads0 = document.querySelector("#zero");
const pads8 = document.querySelector("#eight");
const pads5 = document.querySelector("#five");
const pads2 = document.querySelector("#two");
const pads00 = document.querySelector("#doublezero");
const pads9 = document.querySelector("#nine");
const pads6 = document.querySelector("#six");
const pads3 = document.querySelector("#three");
const padsDot = document.querySelector("#dot");
const padsDivide = document.querySelector("#divide");
const padsMultiply = document.querySelector("#multiply");
const padsSubtract = document.querySelector("#subtract");
const padsAdd = document.querySelector("#add");
const padsClear = document.querySelector("#clear");
const padsUndo = document.querySelector("#undo");
const padsEqual = document.querySelector("#equal");
const controlPad = document.querySelector(".controls");
const currentDisplay = document.querySelector(".current_display");
const accumulatedDisplay = document.querySelector(".accumulated_display");

let eraseResult = false;
let number1;
let number2;
let operator = {
  sign: "",
  mathSymbol: "",
};
let result;


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
    if (accumulatedDisplay.textContent === "") {
      number1 = Number(currentDisplay.textContent);
      addToDisplay(event.target.textContent);
      operator.sign = event.target.textContent;
      operator.mathSymbol = event.target.getAttribute("value");
      currentToAccumulated();
    } else {
      number2 = Number(currentDisplay.textContent);
      addToDisplay(event.target.textContent);
      operate();
      // number1 = result;
      operator.sign = event.target.textContent;
      operator.mathSymbol = event.target.getAttribute("value");
    }
  } else if (event.target.id === "equal") {
    number2 = Number(currentDisplay.textContent);
    operate();
  } else if (event.target.id === "dot") {
    if (currentDisplay.textContent.slice(-1) === "." || currentDisplay.textContent !== "") {
      return null;
    } else if (currentDisplay.textContent === "") {
      addToDisplay("0");
      addToDisplay(event.target.textContent);
    } else {
      addToDisplay(event.target.textContent);
    }
  }
});

padsClear.addEventListener("click", clearDisplay);

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
}

function currentToAccumulated() {
  accumulatedDisplay.append(currentDisplay.textContent);
  currentDisplay.textContent = "";
}

function operate() {
  let operand1 = number1; // Use the global number1
  let operand2 = number2; // Previously number2
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
  number1 = result; // Update the global number1 with the operation result
  currentDisplay.textContent = result;
  eraseResult = true;
}

// When calling operate, do not pass the global variables as parameters
// Just call operate();


