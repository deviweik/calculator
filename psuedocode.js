function add

function subtract

function multiply

function divide

function power

function invert

function operate // take inputs and operation and return result, reset stored values at end

function appendToDisplay //add to display

function storeDisplay // if store1 === '', display -> store1, else, display -> store2

function clearDisplay // display -> ''

buttons = all  calc buttons;
operatorButtons = all operator buttons
numberButtons = all number buttons
clearButton = clear button
equalsButton = equals button

let stored1 = '';
let stored2 = '';
let storedOperation = '';
let logInputs = true;
let result = '';


numberButtons.forEach(button => {
    button.addEventListener('click', input => {
        if (logInputs) {
            appendToDisplay(input)
        } else {
            return
        }
        
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', input => {
        storeDisplay()
        
        clearDisplay()

        appendToDisplay(input)

        storedOperation = input;
    });
});

equalsButton.forEach(button => {
    button.addEventListener('click', input => {
        storeDisplay()

        result = operate(stored1, stored2, storedOperation)

        clearDisplay()

        appendToDisplay(result)
    });
});

clearButton.forEach(button => {
    button.addEventListener('click', input => {
        clearDisplay()

        stored1 = '';
        stored2 = '';
        storedOperation = '';
    });
});
