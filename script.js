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

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.') inputDot();
  else if (e.key === '+') chooseOp('+');
  else if (e.key === '-') chooseOp('−');
  else if (e.key === '*') chooseOp('×');
  else if (e.key === '/') { e.preventDefault(); chooseOp('÷'); }
  else if (e.key === 'Enter' || e.key === '=') equals();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === 'Backspace'){
    current = current.length > 1 ? current.slice(0, -1) : '0';
    render();
  }
});

render();
