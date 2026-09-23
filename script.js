let current = '0';
let previous = null;
let operator = null;
let overwrite = true;

const currentEl = document.getElementById('current');
const historyEl = document.getElementById('history');

function render(){
  currentEl.textContent = current;
  historyEl.textContent = previous !== null ? `${previous} ${operator}` : '\u00A0';
}

function inputDigit(d){
  if (overwrite){
    current = d === '0' ? '0' : d;
    overwrite = false;
  } else {
    current = current === '0' ? d : current + d;
  }
  render();
}

function inputDot(){
  if (overwrite){
    current = '0.';
    overwrite = false;
    render();
    return;
  }
  if (!current.includes('.')) current += '.';
  render();
}

function toggleSign(){
  if (current === '0') return;
  current = current.startsWith('-') ? current.slice(1) : '-' + current;
  render();
}

function percent(){
  current = String(parseFloat(current) / 100);
  render();
}

function clearAll(){
  current = '0';
  previous = null;
  operator = null;
  overwrite = true;
  render();
}

function compute(a, b, op){
  a = parseFloat(a); b = parseFloat(b);
  switch(op){
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? 'Error' : a / b;
  }
}

function chooseOp(op){
  if (operator && !overwrite){
    equals();
  }
  previous = current;
  operator = op;
  overwrite = true;
  render();
}

function equals(){
  if (operator === null || previous === null) return;
  const result = compute(previous, current, operator);
  current = String(result);
  previous = null;
  operator = null;
  overwrite = true;
  render();
}

render();
