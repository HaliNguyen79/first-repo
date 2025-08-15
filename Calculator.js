const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let current = '';
let operator = null;
let previous = '';
let displayString = '';
let justEvaluated = false;

function calculate() {
  const a = Number(previous);
  const b = Number(current);
  // if (isNaN(a) || isNaN(b)) return;

  switch (operator) {
    case '+':
      current = (a + b).toString();
      break;
    case '-':
      current = (a - b).toString();
      break;
    case 'x':
      current = (a * b).toString();
      break;
    case '/':
      current = b === 0 ? 'Error' : (a / b).toString();
      break;
  }

  operator = null;
  previous = '';
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      current = '';
      previous = '';
      operator = null;
      displayString = '';
      display.textContent = '0';
      return;
    }

    if (value === 'DEL') {
      current = current.slice(0, -1);
      displayString = displayString.slice(0, -1);
      display.textContent = displayString || '0';
      return;
    }

    if (['+', '-', 'x', '/'].includes(value)) {
      if (current === '') return;
      if (previous !== '') {
        calculate();
      }
      operator = value;
      previous = current;
      current = '';
      displayString += value;
      display.textContent = displayString;
      return;
    }

    if (value === '=') {
      if (current === '' || previous === '' || !operator) return;
      calculate();
      display.textContent = current;
      justEvaluated = true;
      return;
    }
    if (justEvaluated) {
      current = '';
      previous = '';
      operator = null;
      displayString = '';
      justEvaluated = false;
    }

    current += value;
    displayString += value;
    display.textContent = displayString;

  });
});
