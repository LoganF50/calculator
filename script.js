function Calculator() {
  //functions to calculate
  this.methods = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '*': (a,b) => a * b,
    '/': (a,b) => (b===0) ? NaN : a / b,
  }

  //calls specific function if exists and both values are numbers
  this.calculate = function(op, number1, number2) {
    if(!this.methods[op] || isNaN(number1) || isNaN(number2)) {
      return NaN;
    } else {
      return this.methods[op](number1,number2);
    }
  };
}

//clears all data
function allClear() {
  input.innerHTML = '';
  answer.innerHTML = 0;
}

//inserts text into input div
function handleInsertion(e) {
  const str = e.target.innerHTML;
  switch(str) {
    //blank OR ends in operator
    case '(':
      input.innerHTML += (/^$|[-+/*]$/.test(input.innerHTML)) ? str : '';
      break;
    //ends in digit AND more '(' than ')'
    case ')':
      input.innerHTML += (/\d$/.test(input.innerHTML) && ((input.innerHTML.match(/[(]/g)||[]).length > (input.innerHTML.match(/[)]/g)||[]).length)) ? str : '';
      break;
    //ends in number or ')'
    case '-':
    case '+':
    case '*':
    case '/':
      input.innerHTML += (/[\d)]$/.test(input.innerHTML)) ? str : '';
      break;
    //blank AND answer is not 0
    case '+/-':
      input.innerHTML += (/^$/.test(input.innerHTML) && answer.innerHTML !== '0') ? str : '';
      break;
    //number w/o '.'
    case '.':
      input.innerHTML += (/[^.]?\d+$/.test(input.innerHTML)) ? str : '';
      break;
    //if number cannot end in ')' else ''
    default:
        if(isNaN(parseInt(str))) {
          input.innerHTML += '';
        } else {
          input.innerHTML += (/\)$/.test(input.innerHTML)) ? '' : str;
        }
  }
}

//  DOM ELEMENTS
//  ------------------------
const input = document.querySelector('#display-input');
const answer = document.querySelector('#display-answer');

//  OTHER VARIABLES
//  ------------------------
let rawInput = '';

//  EVENTLISTENERS
//  ------------------------
document.querySelector('#btn-all-clear').addEventListener('click', allClear);
for(let num = 0; num <=9; num++) {
  document.querySelector(`#btn-${num}`).addEventListener('click', handleInsertion);
}
document.querySelector(`#btn-open-parenthesis`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-close-parenthesis`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-divide`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-multiply`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-subtract`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-add`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-switch-sign`).addEventListener('click', handleInsertion);
document.querySelector(`#btn-decimal`).addEventListener('click', handleInsertion);
/*
  #display-input
  #display-answer
  -----------------------------------------------------
  #btn-open-parenthesis #btn-close-parenthesis  #btn-all-clear  #btn-divide
  #btn-7                #btn-8                  #btn-9          #btn-multiply
  #btn-4                #btn-5                  #btn-6          #btn-subtract
  #btn-1                #btn-2                  #btn-3          #btn-add
  #btn-switch-sign      #btn-0                  #btn-decimal    #btn-equals
*/

function logTest(msg, expected, actual) {
  if(expected===actual || Object.is(expected, actual)) {
    console.log(`${msg} | Success: ${actual}`);
  } else {
    console.log(`${msg} | Error: expected: ${expected} vs actual: ${actual}`);
  }
}

let calc = new Calculator();


//TESTING STARTS HERE
/*
//test add
logTest('add', 3, calc.calculate('+', 1, 2));
logTest('add', NaN, calc.calculate('+', 'as', 2));
logTest('add', 3.5, calc.calculate('+', 1.5, 2));

//test subtract
logTest('subtract', 3, calc.calculate('-', 4, 1));
logTest('subtract', NaN, calc.calculate('-', 4, 'ads'));
logTest('subtract', 3.55, calc.calculate('-', 4.55, 1));

//test multiply
logTest('multiply', 6, calc.calculate('*', 2, 3));
logTest('multiply', 0, calc.calculate('*', 2, 0));
logTest('multiply', NaN, calc.calculate('*', 'asd', 3));
logTest('multiply', 6.5, calc.calculate('*', 2, 3.25));

//test divide
logTest('divide', 3, calc.calculate('/', 6, 2));
logTest('divide', NaN, calc.calculate('/', 6, 0));
logTest('divide', 4, calc.calculate('/', 6, 1.5));
logTest('divide', NaN, calc.calculate('/', 6, 'nasn'));
*/

//test regexer
/*
//  +/- ->  '' AND answer !==0 (insert (-)answer into input)
const sign_switch_reg = /^$/;
logTest('regex op', false, sign_switch_reg.test('12*'));
logTest('regex #', false, sign_switch_reg.test('12'));
logTest('regex \'\'', true, sign_switch_reg.test(''));

//  . ->  # w/o '.'
const decimal_reg = /[^.]\d+$/;
logTest('regex op', false, decimal_reg.test('*'));
logTest('regex #', true, decimal_reg.test('12'));
logTest('regex # decimal #', true, decimal_reg.test('12.12'));
logTest('regex # decimal', false, decimal_reg.test('12.'));
*/