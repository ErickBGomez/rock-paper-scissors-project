const playerButtons = document.querySelectorAll("button.player-button");
const computerButtons = document.querySelectorAll("button.computer-button");

resetAllButtons();

function selectPlayerButton(e) {
    playerSelection = e.target.textContent;

    // Clicked button will change its state to "Selected"
    e.target.classList.add("selected");

    console.log("Player selection: " + playerSelection);

    // Disable all buttons except the one who invoked this function
    playerButtons.forEach(playerButton => {

        if (playerButton !== e.target) {

            playerButton.classList.remove("player-button");
            playerButton.classList.add("player-button-inactive");
            playerButton.removeEventListener("click", selectPlayerButton);
        }
    });


    selectComputerButton(playerSelection);
}

// Test function: Change computer buttons state based on Player's Selection
function selectComputerButton(playerSelection) {
    
    computerButtons.forEach(computerButton => {
        if (playerSelection === computerButton.textContent) {
            computerButton.classList.add("selected");

            computerSelection = computerButton.textContent;
            console.log("Computer selection: " + computerSelection);

        } else {
            computerButton.classList.remove("computer-button");
            computerButton.classList.add("computer-button-inactive");
        }
    })
}

function resetAllButtons() {
    playerButtons.forEach(playerButton => {
        playerButton.addEventListener("click", selectPlayerButton, {
            once: true
        });

        // Reset selected button
        if (playerButton.classList.contains("selected")) playerButton.classList.remove("selected");

        // Enable all buttons by resetting their classes
        if (playerButton.classList.contains("player-button-inactive")) {
            playerButton.classList.remove("player-button-inactive");
            playerButton.classList.add("player-button");
        }
    });

    computerButtons.forEach(computerButton => {
        if (computerButton.classList.contains("selected")) computerButton.classList.remove("selected");
    
        if (computerButton.classList.contains("computer-button-inactive")) {
            computerButton.classList.remove("computer-button-inactive");
            computerButton.classList.add("computer-button");
        }
    })
}

// Reset test
window.addEventListener("keydown", e => {
    if (e.keyCode === 65) resetAllButtons();
});