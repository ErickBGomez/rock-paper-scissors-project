const playerButtons = document.querySelectorAll("button.player-button");
resetAllButtons();

function buttonAction(e) {
    playerSelection = e.target.textContent;
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

        // Enable all buttons by resetting their classes
        button.classList.remove("player-button-inactive");
        button.classList.add("player-button");
    });
}

// Reset test
window.addEventListener("keydown", e => {
    if (e.keyCode === 65) resetAllButtons();
});