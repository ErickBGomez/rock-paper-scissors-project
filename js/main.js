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
        return `Tie.`;
    } else if ((playerSelection === "Rock" && computerSelection === "Scissors") || (playerSelection === "Paper" && computerSelection === "Rock") || (playerSelection === "Scissors" && computerSelection === "Paper")){
        playerPoints++;
        return `Player wins the round. ${playerSelection} beats ${computerSelection}`;
    } else {
        computerPoints++;
        return `Computer wins the round. ${computerSelection} beats ${playerSelection}`;
    }
}

let capitalize = text => text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);

function getPlayerSelection() {
    let answer;
    let invalidInput = true;

    do {
        // Ask the player to enter their input. If the input is "undefined", then the string will be "Invalid". After this prompt, the string will be capitalized
        answer = capitalize(prompt("Type your selection: [Rock], [Paper], [Scissors]", "") ?? "Invalid");

        invalidInput = !(answer === "Rock" || answer === "Paper" || answer === "Scissors");

    } while(invalidInput);

    return answer;
}

// Arrow function and a Ternary Operator to keep this function simpler.
let getWinner = (playerPoints, computerPoints) => (playerPoints > computerPoints ? "Player" : "Computer") + " is the winner!";

// These two variables needs to be accessed by two functions, so, they need to be global
let playerPoints = 0;
let computerPoints = 0;

let playerSelection = "";
let computerSelection = "";

