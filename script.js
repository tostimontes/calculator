const pads7 = document.querySelector('#seven');
const pads4 = document.querySelector('#four');
const pads1 = document.querySelector('#one');
const pads0 = document.querySelector('#zero');
const pads8 = document.querySelector('#eight');
const pads5 = document.querySelector('#five');
const pads2 = document.querySelector('#two');
const pads00 = document.querySelector('#doublezero');
const pads9 = document.querySelector('#nine');
const pads6 = document.querySelector('#six');
const pads3 = document.querySelector('#three');
const padsDot = document.querySelector('#dot');
const padsDivide = document.querySelector('#divide');
const padsMultiply = document.querySelector('#multiply');
const padsSubtract = document.querySelector('#subtract');
const padsAdd = document.querySelector('#add');
const padsClear = document.querySelector('#clear');
const padsUndo = document.querySelector('#undo');
const padsEqual = document.querySelector('#equal');
const controlPad = document.querySelector(".controls");
const display = document.querySelector(".display");
let number1;
let number2;
let operator = {
    sign: "",
    mathSymbol: ""
};

controlPad.addEventListener('click', function(event) {
  if (event.target.classList.contains('number')) {
    addToDisplay(event.target.textContent);
  } else if (event.target.id === 'clear') {
    clearDisplay();
  } else if (event.target.id == 'undo') {
    eraseLastChar();
  } else if (event.target.classList.contains('operators')) {
    number1 = Number(display.textContent);
    addToDisplay(event.target.textContent);
    operator.sign = event.target.textContent;
    operator.mathSymbol = event.target.getAttribute('value');
    clearDisplay();
  } else if (event.target.id === 'equal') {
    number2 = Number(display.textContent);
    operate(number1, number2, operator);
  }
});

padsClear.addEventListener('click', clearDisplay());

function clearDisplay() {
    display.textContent = "";
}

function eraseLastChar() {
    display.textContent = display.textContent.slice(0, -1);
}

function addToDisplay(padContent) {
    display.append(padContent);
}

function operate(number1, number2, operator) {
  let result;
  switch (operator.mathSymbol) {
    case '+':
      result = number1 + number2;
      break;
    case '-':
      result = number1 - number2;
      break;
    case '*':
      result = number1 * number2;
      break;
    case '/':
      result = number1 / number2;
      break;
    default:
      // Handle unsupported operator
      result = 'Unsupported operator';
  }
  
  display.textContent = `${number1} ${operator.sign} ${number2} = ${result}`;
}