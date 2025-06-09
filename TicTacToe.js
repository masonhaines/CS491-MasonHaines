/* Mason Haines 6/6/2025 */

class TicTacToe {

    /**
     * @param {string} currentPlayer - the current players character will be X or O
     * @param {string[]} options - array that holds the current state of the array 
     * @param {boolean} running - the current state of the game, whether it is running or not 
     * @param {number[][]} winConditions - 2d array of possible win conditions with in the gam e
     * @param {html} cells - query all cells on the tic tac toe board
     * @param {html} clearButton - query select the h3 header with id statusText
     * @param {html} startButton - query select the button with id clearButton
     * @param {html} statusText - query select the button with id startButton
     */

    constructor(cells, statusText, clearButton, startButton){
    
        this.cells = cells;
        this.statusText = statusText;
        this.startButton = startButton;
        this.clearButton = clearButton;

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

        const options = ["", "", "", "", "", "", "", "", "" ];
        const currentPlayer = "X";
        const running = false;
    }

    /**
     * prompts user to start a new game and initializes the start button to have an event listener for click
     * on click calls initGame to make game playable 
     */

    startGame() {

        this.statusText.textContent = `Press Start to Play!`;
        this.startButton.addEventListener("click", this.initGame);
    }

    /**
     * makes game playable setting running to now true
     * gives functionality to start a game and removes the event listener from the start button
     * and creates and event listener for the clear button which calls restart game on click
     */

    initGame() {

        if(!this.running) {
            this.running = true;
        }
        
        this.initCells();
        this.enableClearButton();
        this.displayCurrentPlayerForStatusText();

        this.startButton.removeEventListener("click", this.initGame);  // create event listener for start button to begin a new game 
    }

    /**
     * display the current player whos turn it is to move 
     * current player will display within the html element with statustext id 
     */

    displayCurrentPlayerForStatusText() {

        this.statusText.textContent = `${this.currentPlayer}'s turn`;
    }

    /**
     * adds event listener to clear button, is used if game is running 
     * is called in init game and computer selection
     */

    enableClearButton() {

        if(this.running){
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            this.clearButton.addEventListener("click", this.restartGame);
        }
    }

    /**
     * helper function to re init the cells object adding the event listern for clicked 
     * additonally resetting the color of the text content color of the cells 
     */

    initCells() {

        this.cells.forEach(cell => cell.addEventListener("click", this.cellClicked)); // addEventListener(type, listener) 
        this.cells.forEach(color => color.style.color= "black"); // reset color for all cell text content
    }

    /**
     * event handler for when a cell is clicked during gameplay
     * gets the clicked cell index, prevents moves if cell is taken or game is not running
     * updates the cell with user's choice and checks for a win condition
     * @param {MouseEvent} event - web browser provided object that gives us feedback when mouse action is provided
     * for this instance we are looking for a cellindex to be clicked
     */

    cellClicked(event) {

        const cellIndex = event.target.getAttribute("cellIndex"); // this refers to what ever cell is clicked on screen by user

        if (this.options[cellIndex] != "" || !this.running ) {
            return;
        }

        this.updateUsersChoiceCell(event.target, cellIndex);
        this.checkWinner();
    }

    /**
     * updates game state and UI for the selected cell that was passed by cellClicked
     * @param {number} index - The index of the cell in the options array
     * @param {} cell - the cell element that was clicked during the event that was stored from cellClicked
     */

    updateUsersChoiceCell (cell, index) {

        // options at the current index of cell clicked is being set to the current player either "X" or "O"
        this.options[index] = this.currentPlayer;
        if (cell) {
            this.cell.textContent = this.currentPlayer;
        }
        // if (this.currentPlayer == "X") {
        //     // cell.style.color = "black";
        // }
    }

    /**
     * 
     */

    changePlayer() {
        // if the current player is X we will assign the new current player to O
        // currentPlayer = (currentPlayer == "X") ? currentPlayer = "O" : "X"; // old for testing 
        if (this.currentPlayer === "X") {

            this.currentPlayer = "O";
            this.computerSelection();

        } else {

            this.currentPlayer = "X";
        }
        this.statusText.textContent = `${this.currentPlayer}'s turn`;

    }

    /**
     * 
     */

    checkWinner () {
        let roundWon = false;

        for(let i = 0; i < this.winConditions.length/*8*/; i++) {

            // so if condition is winConditions at index [0] it would be [0,1,2]
            // lets just say the options are all still empty " "
            // that would mean the new 3 element array, conditions, is empty at all indexes
            // that would mean that cellA cellb and cellC are empty as well because they are initialized to the value of the option array at ....
            // the value of the 3 element condition array and in this examplew would be [0,1,2] but could be [0,4,8] etc

            const condition = this.winConditions[i];
            const cellA = this.options[condition[0]];
            const cellB = this.options[condition[1]];
            const cellC = this.options[condition[2]];

            if (cellA == "" || cellB == "" || cellC == "") {

                continue;
            }
            if (cellA == cellB && cellB == cellC) {

                roundWon = true;
                this.cells[condition[0]].style.color = "red";
                this.cells[condition[1]].style.color = "red";
                this.cells[condition[2]].style.color = "red";
                break;
            }
        }

        if (roundWon) {

            this.statusText.textContent = `${this.currentPlayer} wins! Press Clear to restart game`;
            this.running = false;
        }
        else if (!this.options.includes("")) {

            this.statusText.textContent = `Draw! Press Clear to restart game`;
            this.running = false;
        }
        else {
            this.changePlayer();
        }
    }

    /**
     * 
     */

    restartGame () {
        
        this.currentPlayer = "X";

        this.options = ["", "", "", "", "", "", "", "", ""];

        this.statusText.textContent = `${this.currentPlayer}'s turn`;

        this.cells.forEach(cell => this.cell.textContent = "");

        this.running = false;
        this.startGame();

    }

    /**
     * 
     * @returns - only current player is "X"
     */

    async computerSelection() {

        this.cells.forEach(cell => this.cell.removeEventListener("click", this.cellClicked));
        this.clearButton.removeEventListener("click", this.restartGame);

        if (this.currentPlayer == "X") {
            return;
        }

        var randomNumber = Math.floor(Math.random() * 9);
        var randomOffset = Math.floor(Math.random() * 9);
        let computerChoice = -1; 

        await sleep(300); // dwell computer decision for x seconds
        for (let i = 0; i < this.options.length; i ++) {

            await sleep(300); 
            if(i >=1) {
                // cells[i-1].style.backgroundColor = "transparent";
                this.recolorCells(i-1);
            }
            
            if (this.options[i] == "") {

                this.cells[i].style.backgroundColor = "greenyellow";

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
        
        this.enableClearButton();// return event listern for clear button
        this.options[computerChoice] = this.currentPlayer;
        this.cells[computerChoice].textContent = this.currentPlayer;
        this.recolorCells(computerChoice);
        // cells[computerChoice].style.color = "#ffffff8f"; // this was to color the computers moves a different color for better differentiation
        this.checkWinner();
        this.initCells();
    }

    /**
     * 
     * @param {*} ms 
     * @returns 
     */

    sleep(ms) {
        return new Promise(resolve =>setTimeout(resolve, ms)); // https://youtu.be/pw_abLxr4PI?si=Tlfw1HBU92o0wX3B
    }

    /**
     * 
     * @param {number} i - index for cells
     */

    recolorCells(i) {
        // cells.forEach(color => color.style.backgroundColor = "transparent"); // this works too but need to remove function param
        this.cells[i].style.backgroundColor = "transparent";
    }

};

const myGame = new TicTacToe(
    document.querySelectorAll(".cell"),
    document.querySelector("#statusText"),
    document.querySelector("#clearButton"),
    document.querySelector("#startButton")
)

myGame.startGame();