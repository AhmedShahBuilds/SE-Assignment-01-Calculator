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
