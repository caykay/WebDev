/* Buttons */
const numButtons = document.querySelectorAll(".rounded.num span");
numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    display(e.currentTarget.textContent);
    clearAllSelected();
  })
);

const operators = document.querySelectorAll(".rounded.ops span");
operators.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("selected")) return;
    clearAllSelected();
    if (btn.id != "equals") btn.classList.add("selected");
    display(e.currentTarget.textContent, true);
  })
);

// clears any other operator button that is selected
function clearAllSelected() {
  operators.forEach((btn) => btn.classList.remove("selected"));
}

/* DISPLAY */
const resultDisplay = document.getElementById("display-result");
const equationDisplay = document.getElementById("display-equation");
// let num1 = ""
// let num2 = ""
let store = 0;
let previousResult = 0;
// Stores the operator
let operator = null;
// reset the result display on new equation or when a number is pressed
let resetOutput = true;
let operationEnded = false;

// manages the output and input display on the calculator
function display(s, opClicked = false) {
  if (opClicked) {
    if (s == "=") {
      if (operationEnded) {
        return;
      }
      clearAllSelected();
      let val = resultDisplay.textContent;

    //   user presses '=' before complete equation
      if(resetOutput){
        // handle error
      }
      resultDisplay.textContent = operate(store, val, operator);

      previousResult = resultDisplay.textContent;
      // Mark this equation as ended
      // On the next equation display will be reset
      // also clear all operations
      resetOutput = true;
      operationEnded = true;
      operator = null;
    } else {
      // Makes sure the calculator does not evaluate more than a single pair
      // of numbers at a time
      if (operator != null) {
        // if operator has been changed no need to evaluate
        if (!resetOutput) {
          store = operate(store, resultDisplay.textContent, operator);
          displayEquation(store);
        } 
        else if (operationEnded) { // ! redundant?
          // start another operation on top of previous answer
          store = previousResult;
          equationDisplay.textContent = store;
          operationEnded = false;
        } else {
          // otherwise change the equation text to replace the operator
          const temp = equationDisplay.textContent;
          equationDisplay.textContent = temp.slice(0, temp.length - 1);
        }
      } 
      else {
        store = resultDisplay.textContent;
      }
      operator = s;
      resetOutput = true;
    }
    displayEquation(s, true);
  } else {
    resultDisplay.textContent = resetOutput ? s : resultDisplay.textContent + s;
    resetOutput = false;
    displayEquation(s, true);
  }
}

function displayEquation(s, append = false) {
  if (equationDisplay.textContent == 0) equationDisplay.textContent = "";

  if (append) {
    equationDisplay.textContent += s;
  } else equationDisplay.textContent = s;
}

/* OPERATIONS */
function operate(a, b, op) {
  a = parseInt(a);
  b = parseInt(b);

  if (op == "+") return add(a, b);
  else if (op == "—") return subtract(a, b);
  else if (op == "x") return multiply(a, b);
  else if (op == "/") return divide(a, b);
}

function add(a, b = 0) {
  console.log("adding: " + a + " and " + b);
  return a + b;
}

function subtract(a, b = 0) {
  console.log("substracting: " + a + " and " + b);
  return a - b;
}

function multiply(a, b = 0) {
  console.log("multiplying: " + a + " and " + b);
  return a * b;
}

function divide(a, b = 0) {
  console.log("dividing: " + a + " and " + b);
  return a / b;
}

/* CLEAR OUTPUT */
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", (e) => {
  store = 0;
  operator = null;
  resetOutput = true;
  resultDisplay.textContent = 0;
  equationDisplay.textContent = 0;
});

deleteBtn.addEventListener("click", () => {
  if (resetOutput) return;

  const val = resultDisplay.textContent;
  if (resultDisplay.textContent == 0) return;
  else {
    resultDisplay.textContent = val.slice(0, val.length - 1);
    if (resultDisplay.textContent.length < 1) {
      resultDisplay.textContent = 0;
      resetOutput = true;
    }
  }
});
