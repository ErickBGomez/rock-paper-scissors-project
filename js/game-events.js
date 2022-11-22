// Select buttons
const playerButtons = document.querySelectorAll(".player-button");
const computerButtons = document.querySelectorAll(".computer-button");
const allButtons = document.querySelectorAll(".action-block");

resetAllButtons();

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


    selectComputerButton(playerSelection);
}

// Test function: Change computer buttons state based on Player's Selection
function selectComputerButton(playerSelection) {
    
    computerButtons.forEach(computerButton => {
        if (playerSelection === computerButton.textContent) {
            changeButtonState(computerButton, "selected")

            computerSelection = computerButton.textContent;
            console.log("Computer selection: " + computerSelection);

        } else {
            changeButtonState(computerButton, "inactive");
        }
    })
}

function changeButtonState(button, newState) {
    button.dataset.state = newState;
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