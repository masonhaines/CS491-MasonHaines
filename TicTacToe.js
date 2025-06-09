/*Mason Haines 6/6/2025 */

class TicTacToe {

    /**
     * @param {string} currentPlayer - the current players character will be X or O
     * @param {string[]} options - array that holds the current state of the array 
     * @param {boolean} running - the current state of the game, whether it is running or not 
     * @param {number[][]} winConditions - 2d array of possible win conditions with in the gam e
     * @param {*} cells
     * @param {*} clearButton  
     * @param {*} startButton 
     * @param {*} statusText 
     */

    constructor(options, currentPlayer, running, winConditions, cells, statusText, clearButton, startButton){
        this.options = options;
        this.currentPlayer = currentPlayer;
        this.running = running;
        this.winConditions = winConditions;

        this.cells = cells;
        this.statusText = statusText;
        this.startButton = startButton;
        this.clearButton = clearButton;
    }
    /**
     * function that initializes the board game, inits the win conditions as well as the active places that are held on the board with options array 
     * inits the DOM objects and queries them from the html doc 
     * and inits the game to now be running and the starting player to be X
     */
    
    createBoard() {
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

        const options = ["", "", "", "", "", "", "", "", "" ];
        const currentPlayer = "X";
        const running = false;

        this.startGame();
    }

    /**
     * prompts user to start a new game and initializes the start button to have an event listener for click
     * on click calls initGame to make game playable 
     */

    startGame () {

        this.statusText.textContent = `Press Start to Play!`;
        this.startButton.addEventListener("click", initGame);
    }

    /**
     * makes game playable setting running to now true
     * gives functionality to start a game and removes the event listener from the start button
     * and creates and event listener for the clear button which calls restart game on click
     */

    initGame() {

        if(!running) {
            running = true;
        }
        
        initCells();
        this.enableClearButton();
        this.displayCurrentPlayerForStatusText();

        this.startButton.removeEventListener("click", initGame);  // create event listener for start button to begin a new game 
    }

    /**
     * display the current player whos turn it is to move 
     * current player will display within the html element with statustext id 
     */

    displayCurrentPlayerForStatusText() {

        statusText.textContent = `${currentPlayer}'s turn`;
    }

    /**
     * adds event listener to clear button, is used if game is running 
     * is called in init game and computer selection
     */

    enableClearButton() {

        if(running){
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
            this.clearButton.addEventListener("click", restartGame);
        }
    }

    /**
     * helper function to re init the cells object adding the event listern for clicked 
     * additonally resetting the color of the text content color of the cells 
     */
    initCells() {

        this.cells.forEach(cell => cell.addEventListener("click", cellClicked)); // addEventListener(type, listener) 
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
        options[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (currentPlayer == "X") {
            // cell.style.color = "black";
        }
    }

    changePlayer() {
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

    checkWinner () {
        let roundWon = false;

        for(let i = 0; i < winConditions.length/*8*/; i++) {

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
                cells[condition[0]].style.color = "red";
                cells[condition[1]].style.color = "red";
                cells[condition[2]].style.color = "red";
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

    restartGame () {
        
        currentPlayer = "X";

        options = ["", "", "", "", "", "", "", "", ""];

        statusText.textContent = `${currentPlayer}'s turn`;

        cells.forEach(cell => cell.textContent = "");

        running = false;
        startGame();

    }



    async computerSelection() {

        cells.forEach(cell => cell.removeEventListener("click", cellClicked));
        clearButton.removeEventListener("click", restartGame);

        if (currentPlayer == "X") {
            return;
        }

        var randomNumber = Math.floor(Math.random() * 9);
        var randomOffset = Math.floor(Math.random() * 9);
        let computerChoice = -1; 

        await sleep(300); // dwell computer decision for x seconds
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
        
        this.enableClearButton();// return event listern for clear button
        options[computerChoice] = currentPlayer;
        cells[computerChoice].textContent = currentPlayer;
        recolorCells(computerChoice);
        // cells[computerChoice].style.color = "#ffffff8f"; // this was to color the computers moves a different color for better differentiation
        checkWinner();
        initCells();
    }

    sleep(ms) {
        return new Promise(resolve =>setTimeout(resolve, ms)); // https://youtu.be/pw_abLxr4PI?si=Tlfw1HBU92o0wX3B
    }

    recolorCells(i) {
        // cells.forEach(color => color.style.backgroundColor = "transparent"); // this works too but need to remove function param
        cells[i].style.backgroundColor = "transparent";
    }

};