let x = 0;
let op = "";
let y = 0;
let activeNum = "x";
let currentNum = "0";
const digitButtons = document.querySelectorAll(".digitButton");
const opButtons = document.querySelectorAll(".opButton");
const decimalButton = document.querySelector("#decimalButton");
const equalsButton = document.querySelector("#equalsButton");
const display = document.querySelector("#screenContents");

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

const calc = function(num1, num2) {
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

const switchNum = function(isRes = false) {
    if (isRes) {activeNum = "res"; return;} 
    if (activeNum == "x") {
        activeNum = "y";
    }
    else {
        activeNum = "x";
    }
}

const updateNum = function(input) {
    if (activeNum == "res") {switchNum(); currentNum = "0";}
    if (input == "." && currentNum.indexOf(".") != -1) return;
    if (currentNum == "0") currentNum = input;
    else currentNum += input;
    if (display.textContent.length < 10) display.textContent = currentNum;
}

const updateEquals = function() {
    if (activeNum == "x"){
        x = parseFloat(currentNum);
        op = "+";
        let result = calc(x, 0);
        display.textContent = result.toString();
        currentNum = "0";
    }
    else if (activeNum == "res"){
        switchNum();
        currentNum = "0";
    }
    else {
        y = parseFloat(currentNum);
        let result = calc(x, y);
        x = result;
        let resultStr = result.toString();
        currentNum = resultStr;
        display.textContent = resultStr;
        switchNum();
    }
}

const updateOp = function(input) {
    if (activeNum == "x") {
        x = parseFloat(currentNum);
        op = input;
        switchNum();
        currentNum = "0";
    }
    else {
        y = parseFloat(currentNum);
        op = input;
        let result = calc(x, y);
        x = result;
        display.textContent = result.toString();
        switchNum(isRes = true);
    }
}

for (let button of digitButtons) {
    button.addEventListener("click", () => updateNum(button.textContent));
}
for (let button of opButtons) {
    button.addEventListener("click", () => updateOp(button.textContent));
}
equalsButton.addEventListener("click", () => updateEquals(equalsButton.textContent));
decimalButton.addEventListener("click", () => updateNum(decimalButton.textContent));
