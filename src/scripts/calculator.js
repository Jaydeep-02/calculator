const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const keypad = document.querySelector(".keypad");

const operators = new Set(["+", "-", "*", "/", "%"]);

function setDisplay(value) {
    display.value = value || "0";
}

function appendValue(value) {
    const current = display.value;

    if (current === "0" && !operators.has(value) && value !== ".") {
        setDisplay(value);
        return;
    }

    const lastCharacter = current.slice(-1);
    if (operators.has(value) && operators.has(lastCharacter)) {
        setDisplay(current.slice(0, -1) + value);
        return;
    }

    if (value === ".") {
        const currentSegment = current.split(/[+\-*/%]/).pop();
        if (currentSegment.includes(".")) {
            return;
        }
    }

    setDisplay(current + value);
}

function clearDisplay() {
    setDisplay("0");
}

function deleteLast() {
    if (display.value.length <= 1) {
        clearDisplay();
        return;
    }

    setDisplay(display.value.slice(0, -1));
}

function calculateResult() {
    try {
        const expression = display.value.replace(/%/g, "/100");
        const result = Function(`"use strict"; return (${expression})`)();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        setDisplay(String(Number(result.toFixed(8))));
    } catch (error) {
        setDisplay("Error");
    }
}

keypad.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }

    const { value, action } = button.dataset;

    if (value) {
        appendValue(value);
        return;
    }

    if (action === "delete") {
        deleteLast();
        return;
    }

    if (action === "calculate") {
        calculateResult();
    }
});

clearButton.addEventListener("click", clearDisplay);

document.addEventListener("keydown", (event) => {
    if (/^[0-9]$/.test(event.key) || operators.has(event.key) || event.key === ".") {
        appendValue(event.key);
        return;
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculateResult();
        return;
    }

    if (event.key === "Backspace") {
        deleteLast();
        return;
    }

    if (event.key === "Escape") {
        clearDisplay();
    }
});
