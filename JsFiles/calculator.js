const canvas = document.getElementById('calculator');
const ctx = canvas.getContext('2d');
ctx.font = 'bold 40px Arial';

let expression = '';
let result = '';


//Function to draw the calculator layout according to the given positions and dimensions
function drawCalculator() {

    //setting canvas(rectangle) dimensions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#464343";
    ctx.fillRect(20, 100, 560, 45);
    ctx.fillStyle = "white";

    const expressionWidth = ctx.measureText(expression).width;

    // Adjust the x-coordinate to display the expression from right to left
    const xCoordinate = 580 - expressionWidth;

    ctx.fillText(expression, xCoordinate, 135);

    const resultWidth = ctx.measureText(result).width;

    // Display the result on the right side of the canvas
    ctx.fillText(result, 580-resultWidth, 185);
    // Buttons
    drawButton(" ", 0, 200, '#625E5EFF');
    drawButton(" ", 120, 200, '#625E5EFF');
    drawButton(" ", 240, 200, '#625E5EFF');
    drawButton("%", 360, 200, '#625E5EFF');
    drawButton("/", 480, 200, '#faa620');

    drawButton("(", 0, 293, '#625E5EFF');
    drawButton("7", 120, 293, '#625E5EFF');
    drawButton("8", 240, 293, '#625E5EFF');
    drawButton("9", 360, 293, '#625E5EFF');
    drawButton("x", 480, 293, '#faa620');

    drawButton(")", 0, 386, '#625E5EFF');
    drawButton("4", 120, 386, '#625E5EFF');
    drawButton("5", 240,386, '#625E5EFF');
    drawButton("6", 360, 386, '#625E5EFF');
    drawButton("-", 480, 386, '#faa620');

    drawButton("Back", 0, 479, '#625E5EFF');
    drawButton("1", 120, 479, '#625E5EFF');
    drawButton("2", 240, 479, '#625E5EFF');
    drawButton("3", 360, 479, '#625E5EFF');
    drawButton("+", 480, 479, '#faa620');

    drawButton("0", 0, 572, '#625E5EFF');
    drawButton(".", 360, 572, '#625E5EFF');
    drawButton("=", 480, 572, '#faa620');

    //Begin the path
    ctx.beginPath();
    ctx.arc(20, 20, 10, 0, 2 * Math.PI, false);

// Fill the circle with the specified color
    ctx.fillStyle = "#f65652";
    ctx.fill();

// Close the path
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(60, 20, 10, 0, 2 * Math.PI, false);

    ctx.fillStyle = "#f6ab45";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(100, 20, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#5ce141";
    ctx.fill();

    ctx.closePath();
    ctx.fillStyle = "white";
}

// Draw the button and add background colour
function drawButton(text, x, y,bgColour) {
    // Draw the background color of the button
    ctx.fillStyle = bgColour;
    if(text === "0"){
        ctx.fillRect(x, y, 358, 92);
    }else {
        ctx.fillRect(x, y, 118, 92);
    }
    ctx.fillStyle = "white";

    if(text === "Back"){
        ctx.fillText(text, x + 12, y + 60);
    }else if(text === "0"){
        ctx.fillText(text, x + 162, y + 60);
    }else if(text === "/"){
        ctx.fillText(text, x + 50, y + 60);
    }else{
        ctx.fillText(text, x + 38, y + 60);
    }

}

// Appending the input to the expression
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    if (x >= 0 && x <= 360 && y >= 200 && y <= 292) {3
        expression += "";
    } else if (x >= 360 && x <= 478 && y >= 200 && y <= 292) {
        expression += "%";
    } else if (x >= 480 && x <= 598 && y >= 200 && y <= 292) {
        expression += "/";
    } else if (x >= 0 && x <= 118 && y >= 293 && y <= 385) {
        expression += "(";
    } else if (x >= 120 && x <= 238 && y >= 293 && y <= 385) {
        expression += "7";
    } else if (x >= 240 && x <= 358 && y >= 293 && y <= 385) {
        expression += "8";
    } else if (x >= 360 && x <= 478 && y >= 293 && y <= 385) {
        expression += "9";
    } else if (x >= 480 && x <= 598 && y >= 293 && y <= 385) {
        expression += "*";
    }else if (x >= 0 && x <= 118 && y >= 386 && y <= 478) {
        expression += ")";
    } else if (x >= 120 && x <= 238 && y >= 386 && y <= 478) {
        expression += "4";
    } else if (x >= 240 && x <= 358 && y >= 386 && y <= 478) {
        expression += "5";
    } else if (x >= 360 && x <= 478 && y >= 386 && y <= 478) {
        expression += "6";
    } else if (x >= 480 && x <= 598 && y >= 386 && y <= 478) {
        expression += "-";
    }else if (x >= 0 && x <= 118 && y >= 479 && y <= 571) {
        expression = expression.slice(0, -1); // Remove last character (Back)
    } else if (x >= 120 && x <= 238 && y >= 479 && y <= 571) {
        expression += "1";
    } else if (x >= 240 && x <= 358 && y >= 479 && y <= 571) {
        expression += "2";
    } else if (x >= 360 && x <= 478 && y >= 479 && y <= 571) {
        expression += "3";
    } else if (x >= 480 && x <= 598 && y >= 479 && y <= 571) {
        expression += "+";
    } else if (x >= 0 && x <= 358 && y >= 572 && y <= 664) {
        expression += "0";
    }else if (x >= 360 && x <= 478 && y >= 572 && y <= 664) {
        expression += ".";
    }else if (x >= 480 && x <= 598 && y >= 572 && y <= 664) {
        evaluateExpression();
    }

    drawCalculator();
});

// Evaluating the expression and displaying the result
function evaluateExpression() {
    const isValidExpression = isExpressionValid(expression);

    if (isValidExpression) {
        try {
            result = calculateExpression(expression);
            if(isNaN(result)){
                result = "Invalid Expression";
            }
        } catch (error) {
            result = "Invalid Expression";
        }
    } else {
        result = "Invalid Expression";
    }
}

//Calculating the result of the expression
function calculateExpression(expression) {
    const operators = "+-*/%";
    const operatorStack = [];
    const operandStack = [];

    // Helper function to determine operator precedence
    function getPrecedence(operator) {
        if (operator === "+" || operator === "-") return 1;
        if (operator === "*" || operator === "/") return 2;
        if(operator === "%") return 3;
        return 0;
    }

    // Split the expression into tokens
    const tokens = expression.match(/\d+\.?\d*|[\+\-\*\/%]|[\(\)]/g);


    console.log("Tokens : "+tokens);
    if (!tokens) {
        return "Invalid expression";
    }

    if(getPrecedence(expression[expression.length-1]) !== 0) {
        return "Invalid expression";
    }
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isNaN(token)) {
            operandStack.push(parseFloat(token));
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
                const operator = operatorStack.pop();
                const rightOperand = operandStack.pop();
                const leftOperand = operandStack.pop();
                console.log(operator,operators,operatorStack,operandStack);
                operandStack.push(applyOperator(leftOperand, rightOperand, operator));
            }
            operatorStack.pop(); // Pop the '('
        } else if (operators.includes(token)) {
            while (
                operatorStack.length > 0 &&
                getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
                ) {
                const operator = operatorStack.pop();
                const rightOperand = operandStack.pop();
                const leftOperand = operandStack.pop();
                operandStack.push(applyOperator(leftOperand, rightOperand, operator));
                console.log(operator,operators,operatorStack,operandStack);
            }
            //console.log(operator,operators,operatorStack,operandStack);
            operatorStack.push(token);
        }
    }

    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const rightOperand = operandStack.pop();
        const leftOperand = operandStack.pop();
        operandStack.push(applyOperator(leftOperand, rightOperand, operator));
    }

    if (operandStack.length === 1 && operatorStack.length === 0) {
        return operandStack[0];
    } else {
        return "Invalid expression";
    }

    // Function to perform operation between two operands
    function applyOperator(leftOperand, rightOperand, operator) {
        switch (operator) {
            case "+":
                return leftOperand + rightOperand;
            case "-":
                return leftOperand - rightOperand;
            case "*":
                return leftOperand * rightOperand;
            case "/":
                if (rightOperand === 0) {
                    return "Division by zero";
                }
                return leftOperand / rightOperand;
            case "%":
                return leftOperand % rightOperand;

            default: return -1;
        }
    }
}

//Function to check if the given expression is valid
function isExpressionValid(expression) {
    const stack = [];

    for (let i = 0; i < expression.length; i++) {
        if (expression[i] === '(') {
            stack.push('(');
        } else if (expression[i] === ')') {
            if (stack.length === 0) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.length === 0;
}
drawCalculator();