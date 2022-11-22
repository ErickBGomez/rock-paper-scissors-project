const playerButtons = document.querySelectorAll("button.player-button");
resetAllButtons();

function buttonAction(e) {
    playerSelection = e.target.textContent;

    // Change state to selected to target button
    e.target.classList.add("selected");

    console.log("Player selection: " + playerSelection);

    // Disable all buttons except the one who invoked this function
    playerButtons.forEach(button => {

        if (button.textContent !== e.target.textContent) {

            button.classList.remove("player-button");
            button.classList.add("player-button-inactive");
            button.removeEventListener("click", buttonAction);
        }
    });
}

function resetAllButtons() {
    playerButtons.forEach(button => {
        button.addEventListener("click", buttonAction, {
            once: true
        });

        // Reset selected button
        if (button.classList.contains("selected")) button.classList.remove("selected");

        // Enable all buttons by resetting their classes
        if (button.classList.contains("player-button-inactive")) {
            button.classList.remove("player-button-inactive");
            button.classList.add("player-button");
        }
    });
}

// Reset test
window.addEventListener("keydown", e => {
    if (e.keyCode === 65) resetAllButtons();
});