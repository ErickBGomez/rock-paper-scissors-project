// Define game variables and constants:
let playerSelection = "";
let computerSelection = "";

let playerPoints = 0;
let computerPoints = 0;

let actualRound = 1;
const totalRounds = 5;

// Times (milliseconds):
const computerDecisionDelay = 750;
const playRoundDelay = 500;
const nextRoundDelay = 1000;
const gameOverDelay = 1000;
const decideWinnerDelay = 2000;


// Selection of DOM nodes:
const playerButtons = document.querySelectorAll(".player-button");
const computerButtons = document.querySelectorAll(".computer-button");
const allButtons = document.querySelectorAll(".action-block");

const playerPointsLabel = document.querySelector("#player-points");
const computerPointsLabel = document.querySelector("#computer-points");

const gameLogsNameLabel = document.querySelector(".game-logs-name");
const gameLogsBodyLabel = document.querySelector(".game-logs-body");

const roundLabel = document.querySelector("#round-label");

const endButtonsArea = document.querySelector("#end-game-buttons");

// Game starts here
resetAllButtons();
roundLabel.textContent = actualRound;

// Player and computer selections:
function selectPlayerButton(e) {
    changeButtonState(e.target, "selected");

    updateGameLogsLabels();

    setPlayerSelection(e.target.textContent);

    // Disable all buttons except the one who invoked this function
    playerButtons.forEach(playerButton => {
        if (playerButton !== e.target) {
            changeButtonState(playerButton, "inactive");
            playerButton.removeEventListener("click", selectPlayerButton);
        }
    });

    setTimeout(setComputerSelection, computerDecisionDelay);
}

function selectComputerButton(selection) {
    computerButtons.forEach(computerButton => {
        if (selection === computerButton.textContent)
            changeButtonState(computerButton, "selected");
        else
            changeButtonState(computerButton, "inactive");
    });

    // When player and computer made their selection, play a round
    setTimeout(playRound, playRoundDelay);
}

function setPlayerSelection(selection) {
    playerSelection = selection;
}

function setComputerSelection() {
    // Select a random integer between 0 and 2
    const random = Math.floor(Math.random() * 3);

    switch(random) {
        case 0:
            computerSelection = "R";
            break;

        case 1:
            computerSelection = "P";
            break;

        case 2:
            computerSelection = "S";
            break;
        
        default:
            computerSelection = "Invalid number";
    }

    selectComputerButton(computerSelection);
}

function playRound() {
    let logNameString = "";
    let logBodyString = "";

    // First check if player and computer selection are not the same
    if (playerSelection !== computerSelection) {

        if ((playerSelection === "R" && computerSelection === "S") ||
            (playerSelection === "P" && computerSelection === "R") ||
            (playerSelection === "S" && computerSelection === "P")) {
            
            // If player beats computer
            updateLabel(playerPointsLabel, ++playerPoints);
            
            logNameString = "Player";
        } else {
            // If computer beats player
            updateLabel(computerPointsLabel, ++computerPoints);
            logNameString = "Computer";
        }
        logBodyString = "won the round.";  
    } else {
        // If both selections are the same
        logNameString = "";
        logBodyString = "Tie.";
    }

    updateGameLogsLabels(logNameString, logBodyString);

    setTimeout(checkNextRound, nextRoundDelay);
}

function checkNextRound() {
    if (actualRound < totalRounds) {
        resetAllButtons();

        updateLabel(roundLabel, ++actualRound);
    } else
        setTimeout(setGameOver, gameOverDelay);
}

function setGameOver() {
    updateGameLogsLabels("", "Game Over!");
    changeAllButtonsState("inactive");

    setTimeout(decideWinner, decideWinnerDelay);
}

function decideWinner() {
    if (playerPoints === computerPoints)
        updateGameLogsLabels("", "There are no winners!");
    else if (playerPoints > computerPoints)
        updateGameLogsLabels("Player", "is the winner!");
    else
        updateGameLogsLabels("Computer", "is the winner!");

    changeNodeVisibility(endButtonsArea, "show");
}

function restartNewGame() {
    updateLabel(playerPointsLabel, playerPoints = 0);
    updateLabel(computerPointsLabel, computerPoints = 0);
    
    updateLabel(roundLabel, actualRound = 1);
    updateGameLogsLabels();

    resetAllButtons();
    changeNodeVisibility(endButtonsArea, "hide");
}

// Add restartGame function to "Play Again" button
endButtonsArea.firstElementChild.addEventListener("click", restartNewGame);

function openSourceCode() {
    window.open("https://github.com/ErickBGomez/rock-paper-scissors-project", "_blank").focus();
}

// Add openSourceCode function to "View Open Source" button
endButtonsArea.lastElementChild.addEventListener("click", openSourceCode);


// Repetitive DOM Manipulation methods:

function changeButtonState(button, newState) {
    button.dataset.state = newState;
}

function changeAllButtonsState(newState) {
    allButtons.forEach(button => changeButtonState(button, newState));
}

function resetAllButtons() {
    changeAllButtonsState("active");

    playerButtons.forEach(playerButton => playerButton.addEventListener("click", selectPlayerButton, {
            once: true
    }));
}

function updateGameLogsLabels(nameLabel = "", bodyLabel = "") {
    updateLabel(gameLogsNameLabel, nameLabel);
    gameLogsNameLabel.dataset.logname = nameLabel;

    updateLabel(gameLogsBodyLabel, bodyLabel);
}

// Animation before and after applying new value to a label node
function updateLabel(node, newValue) {
    changeNodeVisibility(node, "hide");  

    node.addEventListener("transitionend", () => {
        node.textContent = newValue;
        changeNodeVisibility(node, "show");
    });
}

function changeNodeVisibility(node, newState) {
    node.dataset.visibility = newState;
}