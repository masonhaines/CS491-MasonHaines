
document.getElementById("dialbutton").onclick = function startDialer() {

    const dialCallButton = document.getElementById('dialbutton');
    const userInput = document.getElementById("userinput");
    const numButtons = document.querySelectorAll('[input-number]');

    if (dialCallButton.textContent === 'Dial') {

        dialCallButton.textContent = 'Call';
        
        for (let i = 0; i < numButtons.length; i++) {
            numButtons[i].addEventListener("click", UpdateNumber);
        }

    } 
    else if (dialCallButton.textContent === 'Call') {

        if ([1, 5, 7, 10].includes(userInput.value.length)) {
            // document.getElementById("calling").style.visibility = "visible";
            document.getElementById("message").textContent = `Calling ${userInput.value}`;
            dialCallButton.textContent = 'End';

        } else if (userInput.value.length === 0) {
            document.getElementById("message").textContent = `Invalid Number`;
        }
        else {
            // document.getElementById("error").style.visibility = "visible";
            userInput.value = '';
            document.getElementById("message").textContent = `Invalid Number`;
            dialCallButton.textContent  = 'Dial';
        }
        
    }
    else {
        // window.alert(5 + 6);  // just for testing
        
        for (let i = 0; i < numButtons.length; i++) {
            numButtons[i].removeEventListener("click", UpdateNumber);
        }
        clearNumbers();

    }

}

document.getElementById("clearbutton").onclick = clearNumbers;

function clearNumbers() {
    const userInput = document.getElementById("userinput");
    userInput.value = '';
    document.getElementById("message").textContent = `--`;
    document.getElementById("dialbutton").textContent  = 'Dial';
}

function UpdateNumber(){

    const userInput = document.getElementById("userinput");

    if (userInput.value.length < userInput.maxLength) {
        userInput.value += this.value;
    }
}


// function pressKey(button) {
//     const userInput = document.getElementById("userinput");
//     if (userInput.value.length < userInput.maxLength) {
//         userInput.value += button.value;
//     }
// }