// Define game variables and constants:
let playerSelection = "";
let computerSelection = "";

let playerPoints = 0;
let computerPoints = 0;

let actualRound = 1;
let totalRounds = 5;

// Times (milliseconds):
const computerDecisionDelay = 500;
const nextRoundDelay = 2000;
const playRoundDelay = 500;

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


// Game starts here
resetAllButtons();


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

    // When player made their selection, it's time for computer make its own selection
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
        gameLogsLabel.textContent = "Tie";
    } else if ((playerSelection === "R" && computerSelection === "S") || (playerSelection === "P" && computerSelection === "R") || (playerSelection === "S" && computerSelection === "P")){
        playerPointsLabel.textContent = ++playerPoints;
        gameLogsLabel.textContent = "Player won the round!";
    } else {
        computerPointsLabel.textContent = ++computerPoints;
        gameLogsLabel.textContent = "Computer won the round!";
    }

    setTimeout(checkNextRound, nextRoundDelay);
}

function checkNextRound() {
    if (actualRound < totalRounds) {
        resetAllButtons();
        setNewRound();
    } else {
        console.log("Game finished!");

        decideWinner(playerPoints, computerPoints);
    }
}

function decideWinner(playerPoints, computerPoints) {
    if (playerPoints === computerPoints) {
        console.log("There are no winners!");
    } else if (playerPoints > computerPoints) {
        console.log("Player is the winner of the game!");
    } else {
        console.log("Computer is the winner of the game!");
    }
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
