// КАЛЬКУЛЯТОР IT-MENTOR
const resultInput = document.getElementById('result');

function appendNumber(value) {
    resultInput.value += value;
}

function appendOperator(operator) {
    const currentInput = resultInput.value;

    if (currentInput.length === 0) {
        return;
    }

    const lastChar = currentInput[currentInput.length - 1];

    if (isOperator(lastChar)) {
        return;
    }

    resultInput.value += operator;
}

function appendDecimalNumber() {
    const currentInput = resultInput.value;

    // Проверяем, содержит ли текущее число перед оператором точку
    const lastNumber = currentInput.split(/[+\-*/]/).pop();
    if (!lastNumber.includes('.')) {
        resultInput.value += '.';
    }
}

function calculate() {
    let result = resultInput.value;

    // Удаляем все пробелы из выражения
    result = result.replace(/\s+/g, '');

    // Добавляем 0 перед отрицательными числами для обработки случаев, как -2+2 и -2-2
    result = result.replace(/([-+*/])-/g, '$10-');

    let stack = [];
    let currentNumber = '';

    for (let i = 0; i < result.length; i++) {
        const char = result[i];

        if (isOperator(char)) {
            stack.push(parseFloat(currentNumber));
            stack.push(char);
            currentNumber = '';
        } else {
            currentNumber += char;
        }
    }

    stack.push(parseFloat(currentNumber));

    let calculatedResult = stack[0];

    for (let i = 1; i < stack.length; i += 2) {
        const num = stack[i + 1];
        const operator = stack[i];

        if (num === 0 && operator === '/') {
            calculatedResult = NaN;
            break;
        }

        if (inputIsValid(num, operator)) {
            switch (operator) {
                case '+':
                    calculatedResult += num;
                    break;
                case '-':
                    calculatedResult -= num;
                    break;
                case '*':
                    calculatedResult *= num;
                    break;
                case '/':
                    calculatedResult /= num;
                    break;
            }
        } else {
            calculatedResult = NaN;
            break;
        }
    }

    resultInput.value = calculatedResult;
}

function clearResult() {
    resultInput.value = '';
}

function inputIsValid(num, operator) {
    if (isNaN(num) || (operator === '/' && num === 0)) {
        return false;
    }
    return true;
}

function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}