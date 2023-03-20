const height = window.innerHeight;
const display = document.querySelector('#display');
const innerContainer = document.getElementById('inner-container');
innerContainer.setAttribute('style', `margin-top: ${height * 0.1}px;`);

const displayContent = document.querySelector('#display-content');

function add(in1, in2) {
    // take 2 inputs and add them
    return parseFloat(in1) + parseFloat(in2);
}

function subtract(in1, in2) {
    // take 2 inputs and subtract the second from the first
    return parseFloat(in1) - parseFloat(in2);
}

function multiply(in1, in2) {
    // take 2 inputs and multiply them
    return parseFloat(in1) * parseFloat(in2);
}

function divide(in1, in2) {
    // take 2 inputs, divide the first by the second
    return parseFloat(in1) / parseFloat(in2);
}

function power(in1, in2) {
    // take 2 inputs, raise the first to the power of the second
    return Math.pow(parseFloat(in1), parseFloat(in2));
}

function invert(in1) {
    // take 1 input and return its inverse
    return -1 * parseFloat(in1);
}

function operate(in1, in2, operation) {
    // take inputs from the calculator and call relevant math functions
    switch (operation){
        case '+':
            return add(in1, in2).toFixed(9);
            break;
        case '-':
            return subtract(in1, in2).toFixed(9);
            break;
        case 'x':
            return multiply(in1, in2).toFixed(9);
            break;
        case '÷':
            return divide(in1, in2).toFixed(9);
            break;
        case '^':
            return power(in1, in2).toFixed(9);
            break;
        case '+/-':
            return invert(in1).toFixed(9);
            break;
    }
}

function appendToDisplay(input) {
    displayContent.innerText += input;
}

function storeDisplay() {
    if (stored1 === '') {
        stored1 = displayContent.innerText;
    } else {
        stored2 = displayContent.innerText;
    }
}

function clearDisplay() {
    displayContent.innerText = '';
}

function clearStorage() {
    stored1 = '';
    stored2 = '';
    storedOperation = '';
}

function checkStorageEmpty() {
    if (stored1 === '' && stored2 === '' && storedOperation === ''){
        return true;
    } else {
        return false;
    }
}

function activateOperation(input) {
    const addButton = document.getElementById('add-button');
    const subtractButton = document.getElementById('subtract-button');
    const multiplyButton = document.getElementById('multiply-button');
    const divideButton = document.getElementById('divide-button');
    const powerButton = document.getElementById('power-button');
    switch (input){
        case '+':
            addButton.setAttribute('style', 'color: rgb(135, 156, 239); background-color: white;');
            break;
        case '-':
            subtractButton.setAttribute('style', 'color: rgb(135, 156, 239); background-color: white;');
            break;
        case 'x':
            multiplyButton.setAttribute('style', 'color: rgb(135, 156, 239); background-color: white;');
            break;
        case '÷':
            divideButton.setAttribute('style', 'color: rgb(135, 156, 239); background-color: white;');
            break;
        case '^':
            powerButton.setAttribute('style', 'color: rgb(135, 156, 239); background-color: white;');
            break;
    }
    activatedOperation = true;
}

function deactivateOperation(input) {
    const addButton = document.getElementById('add-button');
    const subtractButton = document.getElementById('subtract-button');
    const multiplyButton = document.getElementById('multiply-button');
    const divideButton = document.getElementById('divide-button');
    const powerButton = document.getElementById('power-button');
    
    addButton.setAttribute('style', 'background-color: rgb(135, 156, 239); color: black;');
    subtractButton.setAttribute('style', 'background-color: rgb(135, 156, 239); color: black;');
    multiplyButton.setAttribute('style', 'background-color: rgb(135, 156, 239); color: black;');
    divideButton.setAttribute('style', 'background-color: rgb(135, 156, 239); color: black;');
    powerButton.setAttribute('style', 'background-color: rgb(194, 194, 194); color: black;');

    activatedOperation = false;
}

// function formatNumber(num) {
//     if (typeof num !== 'number' || isNaN(num)) {
//       return 'Invalid input';
//     }
  
//     if (num >= 1e9 || num <= -1e9) {
//       return num.toExponential(6);
//     }
  
//     return parseFloat(num.toFixed(9));
//   }

//   function formatNumber(num) {
//     if (num >= 1e9 || num <= -1e9) {
//       return num.toExponential(7);
//     }
  
//     let parts = num.toFixed(9).toString().split('.');
//     let integerPart = parts[0].slice(0, 9);
//     let decimalPart = parts[1] || '';
  
//     if (decimalPart.length > 0) {
//       decimalPart = '.' + decimalPart;
//     }
  
//     return parseFloat(integerPart + decimalPart);
//   }

function formatNumber(num) {
    num = parseFloat(num).toFixed(9);
    if (num.includes(".")) {
      var whole = num.split(".")[0];
      var dec = num.split(".")[1];
      var leftDigits = 9 - whole.length;
      if (leftDigits < 0) {
        return num.slice(0, 9);
      } else {
        return parseFloat(num).toFixed(leftDigits + 1);
      }
    } else {
      return num.slice(0, 9);
    }
  }
  
  
  

const buttons = document.querySelectorAll('.button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelectorAll('#clear-button');
const equalsButton = document.querySelectorAll('#equals-button');

let stored1 = '';
let stored2 = '';
let storedOperation = '';
let logInputs = true;
let activatedOperation = false;
let resetDisplay = false;

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        const input = e.target.innerText;
        if (logInputs && (storedOperation === '+' || storedOperation === 
        '-' || storedOperation === 'x' || storedOperation === '÷' || 
        storedOperation === '^' || storedOperation === '+/-') 
        && activatedOperation) {
            // clear display and start new input after operation button is
            // pressed
            clearDisplay();
            console.log('this one')
            deactivateOperation();
            appendToDisplay(input);
        } else if (logInputs && resetDisplay) {
            // clear display and start new input if number buttons are 
            // pressed while old result is still displayed
            console.log('resetDisplay: ',resetDisplay)
            clearDisplay();
            appendToDisplay(input);
        } else if (logInputs) {
            appendToDisplay(input);
        } else {
            return;
        }
        resetDisplay = false;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        const input = e.target.innerText;

        if (displayContent.innerText !== '' && input === '+/-') {
            let inverted = invert(displayContent.innerText);
            clearDisplay();
            appendToDisplay(inverted);
        } else if (displayContent.innerText === '' && input === '+/-') {
            return;
        } else if (displayContent.innerText !== '') {
            if (storedOperation === '') {
                // for normal operation
                storeDisplay();
    
                activateOperation(input);
    
                storedOperation = input;
            } else {
                // for multiple operations without pressing '=' in between
                // inputs
                storeDisplay();
    
                let result = formatNumber(operate(stored1, 
                    stored2, storedOperation));
    
                clearDisplay();
    
                appendToDisplay(result);
    
                clearStorage();
    
                storeDisplay();
                
                activateOperation(input);
    
                storedOperation = input;
            }
        } else {
            return;
        }
    });
});

clearButton.forEach(button => {
    button.addEventListener('click', () => {
        clearDisplay();

        clearStorage();

        deactivateOperation();
    });
});

equalsButton.forEach(button => {
    button.addEventListener('click', () => {
        storeDisplay();

        result = formatNumber(operate(stored1, stored2, 
            storedOperation));

        clearDisplay();

        clearStorage();

        appendToDisplay(result);

        resetDisplay = true;
    });
});



//debugging
buttons.forEach(button => {
    button.addEventListener('click', e => {
        console.log('Pressed: ', e.target.innerText);
        console.log("stored1: ", stored1, "stored2: ", stored2, "storedOperation: ", storedOperation);
        console.log('resetDisplay: ',resetDisplay)
    })
})
