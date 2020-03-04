const buttons = Array.from(document.getElementsByTagName('button'));
const display = document.getElementById('screen');

const numbers = [];
let operator = '';

const operations = {
	DIVISION: '\u00F7',
	MULTIPLICATION: 'x',
	SUBTRACTION: '-',
	ADDITION: '+'
};

buttons.forEach(button => {
	button.addEventListener('click', e => {
		const btnValue = e.target.innerText;
		if (btnValue === 'AC') {
			clearDisplay();
		} else if (btnValue === 'C') {
			removeDigitFromDisplay();
		} else if (btnValue === '+' ||
			btnValue === '-' ||
			btnValue === '\u00F7' ||
			btnValue === 'x') {
			operator = btnValue;
			clearDisplay();
		} else if (btnValue === '=') {
			calculate();
		} else {
			// TODO: Allow double digit numbers to work for
			// example 1000 x 100
			if (display.value.length < 8) {
				display.value += e.target.innerText;
				numbers.push(display.value);
			}
		}
	});
});

function removeDigitFromDisplay() {
	if (display.value.length > 0) {
		const currentDisplayValue = Array.from(display.value);
		currentDisplayValue.pop();
		const updatedDisplayValue = currentDisplayValue.join('');
		display.value = updatedDisplayValue;
	}
}

function clearDisplay() {
	display.value = "";
}

function calculate() {
	if (operator === '') {
		display.value = numbers.join('');
	}
	if (numbers.length > 1) {
		const operandOne = numbers[0];
		const operandTwo = numbers[1];
		if (operator === operations.ADDITION) {
			display.value = operandOne + operandTwo;
			resetCalculation();
			numbers.push(operandOne + operandTwo);
		} else if (operator === operations.DIVISION) {
			display.value = operandOne / operandTwo;
			resetCalculation();
			numbers.push(operandOne / operandTwo);
		} else if (operator === operations.MULTIPLICATION) {
			display.value = operandOne * operandTwo;
			resetCalculation();
			numbers.push(operandOne * operandTwo);
		} else if (operator === operations.SUBTRACTION) {
			display.value = operandOne - operandTwo;
			resetCalculation();
			numbers.push(operandOne - operandTwo);
		}
	}
}

function resetCalculation() {
	numbers.pop();
	numbers.pop();
	operator = '';
}