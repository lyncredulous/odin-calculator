let computed = false;

function main() {
  const display = document.querySelector(".screen p");
  const buttons = Array.from(document.querySelectorAll("button"));
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => updateDisplay(button, display));
  });
}

function operate(vals) {
  let result = Number(vals[0]);
  let operator = "";
  computed = true;

  for (let i = 1; i <= vals.length; i++) {
    if (isNaN(vals[i])) {
      operator = vals[i];
    } else {
      switch (operator) {
        case "+":
          result = add(result, Number(vals[i]));
          break;
        case "-":
          result = subtract(result, Number(vals[i]));
          break;
        case "x":
          result = multiply(result, Number(vals[i]));
          break;
        case "÷":
          result = divide(result, Number(vals[i]));
          break;
      }
    }
  }

  if (isNaN(result)) {
    return "ERROR: INVALID OPERATION";
  } else if (result === Infinity) {
    return "THINK YOU'RE FUNNY, HUH?";
  } else {
    if (String(result).includes(".")) {
      if (String(result).split(".")[1].length > 5) {
        return Math.round((result + Number.EPSILON) * 100000) / 100000;
      } else {
        return result;
      }
    } else {
      return result;
    }
  }
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function updateDisplay(btn, display) {
  //Don't allow operators or decimals to be typed before numbers
  if (display.textContent === "" && btn.classList.contains("operator") || display.textContent === "" && btn.innerText === ".") {
      return
  }
  // Allows user to use decimal button. Reenables button once an operator is pressed.
  if (btn.innerText === ".") {
    btn.disabled = true;
  } else if (btn.classList.contains("operator")) {
    document.getElementById("decimal").disabled = false;
  }

  //Allow user to clear screen
  if (btn.innerText === "c") {
    display.textContent = "";
  } else if (btn.innerText === "=") {
    const operation = display.innerText.match(/[\d\.]+|\D+/g);
    let result = operate(operation);
    display.textContent = result;
  } else {
    // Will clear screen when button is pressed after calculation unless it's an operator
    if (computed === true) {
      if (btn.classList.contains("operator") || btn.innerText === ".") {
        display.textContent += btn.innerText;
        computed = false;
      } else {
        display.textContent = btn.innerText;
        computed = false;
      }
    } else {
      display.textContent += btn.innerText;
    }
  }
}

main();
