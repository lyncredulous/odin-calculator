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
  if (btn.innerText === "c") {
    display.textContent = "";
  } else if (btn.innerText === "=") {
    const operation = Array.from(
      display.innerText.split(/(\d+|[^\d]+)/g).filter(Boolean)
    );
    let result = operate(operation);
    display.textContent = result;
  } else {
    display.textContent += btn.innerText;
  }
}

main();
