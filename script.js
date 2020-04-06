/*
.header
.calculator
  .calculator-display
    .calculator-display-div.mod-past-result #display-past-result
    .calculator-display-div.mod-user-input  #display-user-input
  .calculator-keys
    .calculator-keys-btn
    .calculator-keys-btn.mod-all-clear
    .calculator-keys-btn.mod-equal-sign
    .calculator-keys-btn.mod-operator
----------------------------------------------------------------------------------------------------------
  #display-past-result
  #display-user-input
----------------------------------------------------------------------------------------------------------
  #btn-open-parenthesis #btn-close-parenthesis  #btn-all-clear  #btn-divide
  #btn-7                #btn-8                  #btn-9          #btn-multiply
  #btn-4                #btn-5                  #btn-6          #btn-subtract
  #btn-1                #btn-2                  #btn-3          #btn-add
  #btn-switch-sign      #btn-0                  #btn-decimal    #btn-equals
----------------------------------------------------------------------------------------------------------
*/

class Calculator {
  constructor() {
    this.reset();
    this.methods = {
      '+': (a,b) => a + b,
      '-': (a,b) => a - b,
      '*': (a,b) => a * b,
      '/': (a,b) => (b===0) ? NaN : a / b,
    };
  }
  
  //returns result of operation
  getResult(operator, operand1, operand2) {
    if(!this.methods[operator] || isNaN(operand1) || isNaN(operand2)) {
      return NaN;
    } else {
      return this.methods[operator](operand1, operand2);
    }
  }

  //sets all variables to initial variables
  reset() {
    this.currentInput = '0';
    this.currentResult = '0';
    this.operators = [];
    this.operands = [];
  }

  //TODO handle number input
  inputHandlerNumber(number) {

  }

  //TODO handle decimal input
  inputHandlerDecimal() {

  }

  //TODO handle operator input
  inputHandlerOperator(operator) {
    //check oeprator is valid
    if(this.methods[operator]) {

    }
  }

  //all clear pressed
  inputHandlerAllClear() {
    this.reset();
  }

  //TODO handle equal sign input
  inputHandlerEqualSign() {

  }
}

//TODO handle updating UI (input & results) using eventListeners for buttons (keyboard?)



// //inserts text into input div
// function handleInsertion(e) {
//   const str = e.target.innerHTML;
//   switch(str) {
//     //blank OR ends in operator
//     case '(':
//       input.innerHTML += (/^$|[-+/*]$/.test(input.innerHTML)) ? str : '';
//       break;
//     //ends in digit AND more '(' than ')'
//     case ')':
//       input.innerHTML += (/\d$/.test(input.innerHTML) && ((input.innerHTML.match(/[(]/g)||[]).length > (input.innerHTML.match(/[)]/g)||[]).length)) ? str : '';
//       break;
//     //ends in number or ')'
//     case '-':
//     case '+':
//     case '*':
//     case '/':
//       input.innerHTML += (/[\d)]$/.test(input.innerHTML)) ? str : '';
//       break;
//     //blank AND answer is not 0
//     case '+/-':
//       input.innerHTML += (/^$/.test(input.innerHTML) && answer.innerHTML !== '0') ? str : '';
//       break;
//     //number w/o '.'
//     case '.':
//       input.innerHTML += (/[^.]?\d+$/.test(input.innerHTML)) ? str : '';
//       break;
//     //if number cannot end in ')' else ''
//     default:
//         if(isNaN(parseInt(str))) {
//           input.innerHTML += '';
//         } else {
//           input.innerHTML += (/\)$/.test(input.innerHTML)) ? '' : str;
//         }
//   }
// }