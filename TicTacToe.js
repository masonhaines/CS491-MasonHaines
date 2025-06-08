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

startGame();

function initGame() {

    initCells();
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    clearButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

    startButton.removeEventListener("click", initGame);

}

// helper function to re init the cells object
function initCells() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); // addEventListener(type, listener) 
}

function cellClicked() {

    const cellIndex = this.getAttribute("cellIndex"); // this refers to what ever cell in clicked

    if (options[cellIndex] != "" || !running ) {
        return;
    }

    updateUsersChoiceCell(this, cellIndex);
    checkWinner();
}

function updateUsersChoiceCell (cell, index) {

    // options at the current index of cell clicked is being set to the current player either "X" or "O"
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (currentPlayer == "X") {
        cell.style.color = "black";
    }
}

function changePlayer() {
    // if the current player is X we will assign the new current player to O
    // currentPlayer = (currentPlayer == "X") ? currentPlayer = "O" : "X"; // old for testing 
    if (currentPlayer === "X") {

        currentPlayer = "O";
        computerSelection();

    } else {

        currentPlayer = "X";

    }
    statusText.textContent = `${currentPlayer}'s turn`;

}

function checkWinner () {
    let roundWon = false;

    for(let i = 0; i < winConditions.length/*8*/; i++) {

        // [0,1,2], 
        // [3,4,5],
        // [6,7,8],
        // [0,3,6],
        // [1,4,7],
        // [2,5,8],
        // [0,4,8],
        // [2,4,6]
        
        // so if condition is winConditions at index [0] it would be [0,1,2]
        // lets just say the options are all still empty " "
        // that would mean the new 3 element array, conditions, is empty at all indexes
        // that would mean that cellA cellb and cellC are empty as well because they are initialized to the value of the option array at ....
        // the value of the 3 element condition array and in this examplew would be [0,1,2] but could be [0,4,8] etc

        const condition = winConditions[i];

        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {

            continue;
        }
        if (cellA == cellB && cellB == cellC) {

            roundWon = true;
            cells[condition[0]].style.color = "greenyellow";
            cells[condition[1]].style.color = "greenyellow";
            cells[condition[2]].style.color = "greenyellow";
            break;
        }
    }

    if (roundWon) {

        statusText.textContent = `${currentPlayer} wins! Press Clear to restart game`;
        running = false;
    }
    else if (!options.includes("")) {

        statusText.textContent = `Draw! Press Clear to restart game`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame () {
    
    currentPlayer = "X";

    options = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `${currentPlayer}'s turn`;

    cells.forEach(cell => cell.textContent = "");

    running = false;
    startGame();

}

function startGame () {

    statusText.textContent = `Press Start to Play!`;
    startButton.addEventListener("click", initGame);

}

async function computerSelection() {

    cells.forEach(cell => cell.removeEventListener("click", cellClicked));

    if (currentPlayer == "X") {
        return;
    }

    var randomNumber = Math.floor(Math.random() * 9);
    var randomOffset = Math.floor(Math.random() * 9);
    let computerChoice = -1; 

    // await sleep(2000); // dwell computer decision for x seconds
    for (let i = 0; i < options.length; i ++) {

        await sleep(300); 
        if(i >=1) {
            // cells[i-1].style.backgroundColor = "transparent";
            recolorCells(i-1);
        }
        
        if (options[i] == "") {

            cells[i].style.backgroundColor = "greenyellow";
            
            if (randomNumber === i) {
                computerChoice = i;
                break;
            }
            else if (randomNumber - i >= randomOffset && randomNumber - i >= computerChoice) {
                computerChoice = i;
            }
            else {
                computerChoice = i;
            }
        }
    }
    
    options[computerChoice] = currentPlayer;
    cells[computerChoice].textContent = currentPlayer;
    recolorCells(computerChoice);
    cells[computerChoice].style.color = "#ffffff8f";
    checkWinner();
    initCells();
}

function sleep(ms) {
    return new Promise(resolve =>setTimeout(resolve, ms)); // https://youtu.be/pw_abLxr4PI?si=Tlfw1HBU92o0wX3B
}

function recolorCells(i) {
    // cells.forEach(color => color.style.backgroundColor = "transparent"); // this works too but need to remove function param
    cells[i].style.backgroundColor = "transparent";
}