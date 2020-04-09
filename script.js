class Calculator {
  constructor(domInput, domResult) {
    this.reset();
    this.methods = {
      '+': (a,b) => a + b,
      '-': (a,b) => a - b,
      '*': (a,b) => a * b,
      '/': (a,b) => (b===0) ? NaN : a / b,
    };
    this.domInput = domInput;
    this.domResult = domResult;
    this.MAX_INPUT_LENGTH = 10;
    this.ERROR_MSG = 'Last result is not a number. Resetting calculator.';
    this.consoleLogData();
  }
  
  inputModes = Object.freeze({FIRST_OPERAND:1, OPERATOR:2, SECOND_OPERATOR:3});

  //console log data
  consoleLogData() {
    console.log(`current input: ${this.currentInput} | ` +
                `current input mode: ${this.currentInputMode} | ` +
                `last calculation: ${this.lastCalculation.calculation} | ` +
                `operands: ${this.operands} | ` + 
                `operators: ${this.operators} | `);
                
  }

  //returns result of operation
  getResult(operator, operand1, operand2) {
    if(!this.methods[operator] || isNaN(operand1) || isNaN(operand2)) {
      console.log(`${operator} ${operand1} ${operand2}`);
      return NaN;
    } else {
      console.log(`${operator} ${operand1} ${operand2}`);
      return this.methods[operator](operand1, operand2);
    }
  }

  inputHandlerNumber(number) {
    if(this.currentInputMode === this.inputModes.OPERATOR) {
      this.currentInputMode = this.inputModes.SECOND_OPERATOR;
      this.currentInput = '';
    }
    if(this.currentInput === '0' || this.lastCalculation.lastMadeSolution) {
      this.currentInput = number.toString();
      this.lastCalculation.lastMadeSolution = false;
    } else {
      if(this.currentInput.length < this.MAX_INPUT_LENGTH) {
        this.currentInput += number.toString();
      }
    }
    this.updateUI();
    this.consoleLogData();
  }

  inputHandlerDecimal() {
    if(this.currentInputMode === this.inputModes.OPERATOR || this.lastCalculation.lastMadeSolution) {
      this.currentInput = '0.';
      this.currentInputMode = this.inputModes.SECOND_OPERATOR;
      this.lastCalculation.lastMadeSolution = false;
    } else {
      if(!this.currentInput.includes('.')) {
        if(this.currentInput.length < this.MAX_INPUT_LENGTH) {
          this.currentInput += '.';
        }
      }
    }
    this.updateUI();
    this.consoleLogData();
  }

  inputHandlerOperator(operator) {
    //check operator is valid
    if(this.methods[operator]) {
      //push current # and current operator
      if(this.currentInputMode === this.inputModes.FIRST_OPERAND) {
        this.currentInputMode = this.inputModes.OPERATOR;
        this.operands.push(parseFloat(this.currentInput));
        this.operators.push(operator);
      //replace existing operator
      } else if(this.currentInputMode === this.inputModes.OPERATOR) {
        this.operators[this.operators.length - 1] = operator;
      //handle equation and push operator
      } else {
        //result is a number
        if(this.inputHandlerEqualSign()) {
          this.operators.push(operator);
        //NaN
        } else {
          this.reset(this.ERROR_MSG);
        }
      }
      this.updateUI();
      this.consoleLogData();
    }
  }

  //all clear pressed
  inputHandlerAllClear() {
    this.reset();
    this.consoleLogData();
    this.updateUI();
  }

  //handles calculations: returns boolean based on result value (NaN->false)
  inputHandlerEqualSign() {
    let result = NaN;
    let operand2;
    if(this.operands.length > 0 && this.operators.length > 0 && this.inputModes.SECOND_OPERATOR) {
      const operand1 = this.roundToPlaces(parseFloat(this.operands[this.operands.length - 1]), this.MAX_INPUT_LENGTH); //last operand input
      let operator = this.operators[this.operators.length - 1]; //last operator input
      if(this.lastCalculation.lastMadeSolution) {
        operand2 = this.roundToPlaces(parseFloat(this.lastCalculation.operand), this.MAX_INPUT_LENGTH); //second to last operand input
        operator = this.lastCalculation.operator;
      } else {
        operand2 = this.roundToPlaces(parseFloat(this.currentInput), this.MAX_INPUT_LENGTH); //current input
        this.operands.push(operand2);
      }
      result = this.roundToPlaces(this.getResult(operator, operand1, operand2),this.MAX_INPUT_LENGTH);
      if(!isNaN(result)) {
        this.lastCalculation.calculation = `${operand1} ${operator} ${operand2} =`;
        this.lastCalculation.operand = operand2;
        this.lastCalculation.operator = operator;
        this.lastCalculation.lastMadeSolution = true;
        this.operands.push(result);
        this.currentInput = result.toString();
        this.currentInputMode = this.inputModes.FIRST_OPERAND;
        this.updateUI();
        this.consoleLogData();
      } else {
        this.reset(this.ERROR_MSG);
      }
    }
    return !isNaN(result);
  }

  //sets all variables to initial variables
  reset(optErrorMsg) {
    if(optErrorMsg !== undefined) {
      alert(optErrorMsg);
    }
    this.currentInput = '0';
    this.operators = [];
    this.operands = [];
    this.currentInputMode = this.inputModes.FIRST_OPERAND;
    this.lastCalculation = {calculation:'0', operand: null, operator: null, lastMadeSolution: false};
    this.updateUI();
  }

  //taken from: https://www.jacklmoore.com/notes/rounding-in-javascript/
  roundToPlaces(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  updateUI() {
    if(this.domInput !== undefined) {
      this.domInput.innerHTML = this.currentInput;
    }
    if(this.domResult !== undefined) {
      this.domResult.innerHTML = this.lastCalculation.calculation; 
    }
  }
}

//EVENT LISTENERS
//past results
const domResult = document.querySelector('#display-past-result');
//user input
const domInput = document.querySelector('#display-user-input');
//calculator
const calculator = new Calculator(domInput, domResult);
//operator buttons
const domOperators = document.querySelectorAll('.mod-operator');
for(let i = 0; i < domOperators.length; i++) {
  const btn = domOperators[i];
  btn.addEventListener('click', (e) => {calculator.inputHandlerOperator(e.target.value)});
}
//clear button
const domAllClear = document.querySelector('#btn-all-clear');
domAllClear.addEventListener('click', () => {calculator.inputHandlerAllClear();});
//equals button
const domEqualSign = document.querySelector('#btn-equals');
domEqualSign.addEventListener('click', () => {calculator.inputHandlerEqualSign();});
//decimal button
const domDecimal = document.querySelector('#btn-decimal');
domDecimal.addEventListener('click', () => {calculator.inputHandlerDecimal();});
//number buttons
const domNumbers = [];
for(let i = 0; i <=9; i++) {
  const btn = document.querySelector(`#btn-${i}`);
  btn.addEventListener('click', () => {calculator.inputHandlerNumber(i);});
  domNumbers.push(btn);
}

//TODO handle showing which operator is selected (toggle class when selected?)


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