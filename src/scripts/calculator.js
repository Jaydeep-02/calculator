function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// Event listeners for button clicks
document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    
    document.getElementById('add').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        resultDisplay.textContent = add(num1, num2);
    });

    document.getElementById('subtract').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        resultDisplay.textContent = subtract(num1, num2);
    });

    document.getElementById('multiply').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        resultDisplay.textContent = multiply(num1, num2);
    });

    document.getElementById('divide').addEventListener('click', () => {
        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        try {
            resultDisplay.textContent = divide(num1, num2);
        } catch (error) {
            resultDisplay.textContent = error.message;
        }
    });
});