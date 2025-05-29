
function makeGridOfButtons() {
    const buttongrid = document.getElementById('keypadbuttons');
    const input = document.getElementById('dialerInput');
    buttongrid.innerHTML = '';
    input.value = '';  // Clear input on reload

    const keypadValues = [
        '1 ', '2 ABC', '3 DEF', '4 GHI', '5 JKL', '6 MNO', '7 PQRS', '8 TUV', '9 WXYZ', ' * ',  '0', ' # '];


    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.textContent = keypadValues[i * 3 + j];

            button.addEventListener('click', () => {
                input.value += button.textContent[0];
            });

            buttongrid.appendChild(button);
        }
    };
};

function setupDialCallButton() {
    const dialCallButton = document.getElementById('dialCallButton');
    const input = document.getElementById('dialerInput');

    dialCallButton.textContent = 'Dial';

    dialCallButton.addEventListener('click', () => {
        if (dialCallButton.textContent === 'Dial') {
            dialCallButton.textContent = 'Call';
        } else {
            const length = input.value.length;

            messageBox.style.fontSize = '35px';
            if ([1, 5, 7, 10].includes(length)) {
                messageBox.textContent = `Calling ${input.value}...`;
                // call logic here
            } else {
                messageBox.textContent = 'Please enter a valid number with 1, 5, 7, or 10 digits.';
            }
            dialCallButton.textContent = 'Dial';
        }
    });
}


window.onload = () => {
    makeGridOfButtons();
    setupDialCallButton();
};


