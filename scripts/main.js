let x = 0;
let op = "";
let y = 0;
let activeNum = "x";
let currentNum = "0";
const calculatorButtons = Array.from(document.querySelectorAll(".buttonrow")).flatMap((row) => Array.from(row.children));
const cButton = document.querySelector("#cButton");
const backspaceButton = document.querySelector("#backspaceButton");
const signButton = document.querySelector("#signButton");
const digitButtons = document.querySelectorAll(".digitButton");
const opButtons = document.querySelectorAll(".opButton");
const decimalButton = document.querySelector("#decimalButton");
const equalsButton = document.querySelector("#equalsButton");
const display = document.querySelector("#screenContents");

const handleKeypress = function(key) {
    switch(key) {
        case "Backspace":
            backspaceButton.click();
            return;
        case "F9":
            signButton.click();
            return;
        case "Enter":
            equalsButton.click();
            return;
        default:
            for (let button of calculatorButtons) {
                if (key == button.textContent) {
                    button.click();
                    return;
                }
            }
            return;
    }

}

const calc = function(num1, num2) {
    switch(op) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 == 0) return "nuh uh";
            return num1 / num2;
        default:
            break;
    }
};

const updateDisplay = function(num) {
    if (num > 9999999999){
        num = num.toExponential(4);
    }
    let numStr = num.toString();
    if (numStr.length > 10){
        let decPoint = numStr.indexOf(".");
        if (decPoint == 9){
            numStr = Math.round(num).toString();
        }
        else {
            let precision = 9 - decPoint;
            numStr = num.toPrecision(precision);
        }
    }
    if (numStr.length > 10){
        console.warn("Number exceeds limit!");
    }
    display.textContent = numStr;
}

const switchNum = function(isRes = false) {
    /*
    Res state - If the user presses the same operator button repeatedly,
    it will perform those operations with the same second operand on the result.
    Compare this to pressing the equals sign which will not reperform the operation.
    After pressing the equals sign to calculate, pressing an operator will require you to
    input a new second operand.
    Pressing a number key will begin inputting a new first operand, an identical state to
    when the calculator first loads.
    */
    if (isRes) {activeNum = "res"; return;} 
    activeNum = activeNum == "x" ? "y" : "x";
}

const updateNum = function(input) {
    if (activeNum == "res") {switchNum(); currentNum = "0";}
    if (input == "." && currentNum.indexOf(".") != -1) return;
    if (currentNum == "0" || currentNum == "nuh uh") {
        currentNum = input;
        updateDisplay(currentNum);
    }
    else {
        currentNum += input;
        if (display.textContent.length < 10) updateDisplay(parseFloat(currentNum));
    } 
}

const clearAll = function() {
    activeNum = "x";
    currentNum = "0";
    x = 0;
    y = 0;
    display.textContent = "0";
}

const backspace = function() {
    if (display.textContent.length == 1) {
        currentNum = "0";
        display.textContent = "0";
    }
    else {
        currentNum = currentNum.slice(0, -1);
        display.textContent = display.textContent.slice(0, -1);
    }
}

const flipSign = function() {
    if (currentNum.at(0) == "-"){
        currentNum = currentNum.slice(1);
        display.textContent = display.textContent.slice(1);
    }
    else {
        currentNum = "-" + currentNum;
        display.textContent = "-" + display.textContent;
    }
}

const updateEquals = function() {
    if (activeNum == "x"){
        x = parseFloat(currentNum);
        op = "+";
        let result = calc(x, 0);
        updateDisplay(result);
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
        updateDisplay(result);
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
    // If the user switches operator, we want to take the current result as the first value
    // and get a new second value
    else if (activeNum == "res" && op != input){
        // switch activeNum to "y"
        op = input;
        switchNum();
        switchNum();
        currentNum = "0";
    }
    else if (activeNum == "y" && op != input){
        y = parseFloat(currentNum);
        let result = calc(x, y);
        x = result;
        updateDisplay(result);
        currentNum = "0";
        op = input;
    }
    else {
        y = parseFloat(currentNum);
        let result = calc(x, y);
        x = result;
        updateDisplay(result);
        switchNum(isRes = true);
        op = input;
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
cButton.addEventListener("click", () => clearAll());
backspaceButton.addEventListener("click", () => backspace());
signButton.addEventListener("click", () => flipSign());
document.addEventListener("keydown", (e) => handleKeypress(e.key));
