const cells = document.querySelectorAll(".cell"); // query all cells on the tic tac toe board
const statusText = document.querySelector("#statusText");  // query select the h3 header with id statusText
const clearButton = document.querySelector("#clearButton"); // query select the button with id clearButton
const startButton = document.querySelector("#startButton"); // query select the button with id startButton

const winConditions = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["", "", "", "", "", "", "", "", "" ];
let currentPlayer = "X";
let running = false;

initGame(); 

function initGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // addEventListener(type, listener) 
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    clearButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex"); // this refers to what ever cell in clicked

    if (options[cellIndex] != "" || !running ) {
        return;
    }

    updateCell(this, cellIndex);
    changePlayer();
    checkWinner();
}

function updateCell (cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? currentPlayer = "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner () {

}

function restartGame () {

}
