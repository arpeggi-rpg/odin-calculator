let num1 = 2;
let op = '+';
let num2 = 2;
const digitButtons = document.querySelectorAll(".digitButton");
const opButtons = document.querySelectorAll(".opButton");
const display = document.querySelector("#screen")

const add = function(num1, num2) {
    return num1 + num2;
};

const subtract = function(num1, num2) {
    return num1 - num2;
};

const multiply = function(num1, num2) {
    return num1 * num2;
};

const divide = function(num1, num2) {
    if (num2 == 0) return "nuh uh";
    return num1 / num2;
};

const calc = function(num1, op, num2) {
    switch (op) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            break;
    }
};

const updateDisplay = function(inputNum) {

}

for (let button of digitButtons) {
    button.addEventListener("click", () => updateDisplay(button.textContent));
}