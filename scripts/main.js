let num1 = 2;
let op = '+';
let num2 = 2;
let currentNum = "0";
const digitButtons = document.querySelectorAll(".digitButton");
const opButtons = document.querySelectorAll(".opButton");
const decimalButton = document.querySelector("#decimalButton");
console.log(decimalButton.textContent);
const display = document.querySelector("#screenContents")

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

const updateNum = function(input) {
    if (input == "." && currentNum.indexOf(".") != -1) return;
    if (currentNum == "0") {
        display.textContent = input;
        currentNum = input;
    }
    else {
        if (display.textContent.length < 10) display.textContent += input;
        currentNum += input;
    }
}

for (let button of digitButtons) {
    button.addEventListener("click", () => updateNum(button.textContent));
}
decimalButton.addEventListener("click", () => updateNum(decimalButton.textContent))
