// Select buttons
const playerButtons = document.querySelectorAll(".player-button");
const computerButtons = document.querySelectorAll(".computer-button");
const allButtons = document.querySelectorAll(".action-block");

resetAllButtons();

// Select Points
const playerPointsLabel = document.querySelector("#player-points");
const computerPointsLabel = document.querySelector("#computer-points");

// Select Round label
const roundTitle = document.querySelector("#round-label");


function selectPlayerButton(e) {
    changeButtonState(e.target, "selected");

    // Save player selection
    playerSelection = e.target.textContent;

    console.log("Player selection: " + playerSelection);// Test

    // Disable all buttons except the one who invoked this function
    playerButtons.forEach(playerButton => {
        if (playerButton !== e.target) {
            changeButtonState(playerButton, "inactive");
            playerButton.removeEventListener("click", selectPlayerButton);
        }
    });

    setTimeout(setComputerSelection, 500);
}

// Test function: Change computer buttons state based on Player's Selection
function selectComputerButton(selection) {
    
    computerButtons.forEach(computerButton => {
        if (selection === computerButton.textContent) {
            changeButtonState(computerButton, "selected")

            console.log("Computer selection: " + computerSelection);

        } else {
            changeButtonState(computerButton, "inactive");
        }
    })

    playRound(playerSelection, computerSelection);
}

function changeButtonState(button, newState) {
    button.dataset.state = newState;
}

function setNewRound() {
    roundTitle.textContent = ++roundNumber;
}

function resetAllButtons() {
    allButtons.forEach(button => changeButtonState(button, "active"));

    playerButtons.forEach(playerButton => playerButton.addEventListener("click", selectPlayerButton, {
            once: true
    }));
}

// Reset test
window.addEventListener("keydown", e => {
    if (e.keyCode === 65) resetAllButtons();
});