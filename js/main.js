// Define game variables and constants:
let playerSelection = "";
let computerSelection = "";

let playerPoints = 0;
let computerPoints = 0;

let actualRound = 1;
let totalRounds = 5;

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
const endButtons = document.querySelector("#end-game-buttons");

// Game starts here
resetAllButtons();
gameLogsLabel.textContent = "";

// Player and computer selections:
function selectPlayerButton(e) {
    changeButtonState(e.target, "selected");

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

    node.classList.remove("unhide");
    node.classList.add("hide");

    node.addEventListener("transitionend", () => {
        node.classList.remove("hide");
        node.textContent = newValue;
        node.classList.add("unhide");
    });
}

function checkNextRound() {
    if (actualRound < totalRounds) {
        resetAllButtons();
        setNewRound();
    } else {
        setTimeout(() => {
            updateLabel(gameLogsLabel, "Game over!");
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

    endButtons.classList.remove("hide");
    endButtons.classList.add("unhide");
}


// Update DOM:
function changeButtonState(button, newState) {
    button.dataset.state = newState;
}

function setNewRound() {
    roundLabel.textContent = ++actualRound;
}

function resetAllButtons() {
    allButtons.forEach(button => changeButtonState(button, "active"));

    playerButtons.forEach(playerButton => playerButton.addEventListener("click", selectPlayerButton, {
            once: true
    }));
}


// These two variables needs to be accessed by two functions, so, they need to be global


roundLabel.textContent = actualRound;
