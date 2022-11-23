// Define game variables and constants:
let playerSelection = "";
let computerSelection = "";

let playerPoints = 0;
let computerPoints = 0;

let actualRound = 1;
const totalRounds = 5;

// Times (milliseconds):
const computerDecisionDelay = 500;
const playRoundDelay = 500;
const nextRoundDelay = 500;

// Selection of DOM nodes:
// Select buttons
const playerButtons = document.querySelectorAll(".player-button");
const computerButtons = document.querySelectorAll(".computer-button");
const allButtons = document.querySelectorAll(".action-block");

// Select Points
const playerPointsLabel = document.querySelector("#player-points");
const computerPointsLabel = document.querySelector("#computer-points");

// Select game logs
const gameLogsLabel = document.querySelector(".game-logs");

// Select Round label
const roundLabel = document.querySelector("#round-label");

// End game buttons
const endButtonsArea = document.querySelector("#end-game-buttons");

// Game starts here
resetAllButtons();
roundLabel.textContent = actualRound;

// Player and computer selections:
function selectPlayerButton(e) {
    changeButtonState(e.target, "selected");

    updateLabel(gameLogsLabel, "");

    // Save player selection
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
    })

    // When player and computer made their selection, play a round
    setTimeout(playRound, playRoundDelay);
}

function setPlayerSelection(selection) {
    playerSelection = selection;

    console.log("Player selection: " + playerSelection);// Test

}

function setComputerSelection() {
    const random = Math.floor(Math.random() * 3);

    computerSelection = (random === 0) ? "R"
                      : (random === 1) ? "P"
                      : (random === 2) ? "S"
                      : "Invalid number";

    console.log("Computer selection: " + computerSelection); // Test

    selectComputerButton(computerSelection);
}

function playRound() {

    if (playerSelection === computerSelection){
        updateLabel(gameLogsLabel, "Tie");
    } else if ((playerSelection === "R" && computerSelection === "S") || (playerSelection === "P" && computerSelection === "R") || (playerSelection === "S" && computerSelection === "P")){
        
        updateLabel(playerPointsLabel, ++playerPoints);
        updateLabel(gameLogsLabel, "Player won the round");
    } else {

        updateLabel(computerPointsLabel, ++computerPoints);
        updateLabel(gameLogsLabel, "Computer won the round");
    }

    setTimeout(checkNextRound, nextRoundDelay);
}

function updateLabel(node, newValue) {

    changeNodeVisibility(node, "hide");  

    node.addEventListener("transitionend", () => {
        
        node.textContent = newValue;
        changeNodeVisibility(node, "show");
    });
}

function checkNextRound() {
    if (actualRound < totalRounds) {
        resetAllButtons();

        // Set new round
        updateLabel(roundLabel, ++actualRound);

    } else {
        setTimeout(() => {
            updateLabel(gameLogsLabel, "Game over!");
            changeAllButtonsState("inactive");
        }, 1000);

        setTimeout(() => {
            decideWinner(playerPoints, computerPoints);
        }, 2000);
    }
}

function decideWinner(playerPoints, computerPoints) {
    if (playerPoints === computerPoints) {
        updateLabel(gameLogsLabel, "There are no winners!");
    } else if (playerPoints > computerPoints) {
        updateLabel(gameLogsLabel, "Player is the winner of the game!");
    } else {
        updateLabel(gameLogsLabel, "Computer is the winner of the game!");
    }

    changeNodeVisibility(endButtonsArea, "show");
}

// DOM Manipulation:
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

function changeNodeVisibility(node, newState) {
    node.dataset.visibility = newState;
}