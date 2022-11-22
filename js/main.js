function setComputerSelection() {
    const random = Math.floor(Math.random() * 3);

    computerSelection = (random === 0) ? "R"
                      : (random === 1) ? "P"
                      : (random === 2) ? "S"
                      : "Invalid number";

    selectComputerButton(computerSelection);
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection){
        // Tie
    } else if ((playerSelection === "R" && computerSelection === "S") || (playerSelection === "P" && computerSelection === "R") || (playerSelection === "S" && computerSelection === "P")){
        playerPointsLabel.textContent = ++playerPoints;
        // Player win
    } else {
        computerPointsLabel.textContent = ++computerPoints;
        // Computer win
    }

    setTimeout(resetAllButtons, 1000);
    setTimeout(setNewRound, 1000);
}

// Arrow function and a Ternary Operator to keep this function simpler.
let getWinner = (playerPoints, computerPoints) => (playerPoints > computerPoints ? "Player" : "Computer") + " is the winner!";

// These two variables needs to be accessed by two functions, so, they need to be global
let playerPoints = 0;
let computerPoints = 0;

let playerSelection = "";
let computerSelection = "";

let roundNumber = 1;

roundTitle.textContent = roundNumber;
