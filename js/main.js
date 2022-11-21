function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);

    return (
    (random === 0) ? "Rock" :
    (random === 1) ? "Paper" :
    (random === 2) ? "Scissors" : "Invalid number"
    )
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

function getPlayerChoice() {
    let answer;
    let isInputInvalid = true;

    do {
        // Ask the player to enter their input. If the input is "undefined", then the string will be "Invalid". After this prompt, the string will be capitalized
        answer = capitalize(prompt("Type your selection: [Rock], [Paper], [Scissors]", "") ?? "Invalid");

        isInputInvalid = !(answer === "Rock" || answer === "Paper" || answer === "Scissors");

    } while(isInputInvalid);

    return answer;
}

// Arrow function and a Ternary Operator to keep this function simpler.
let getWinner = (playerPoints, computerPoints) => (playerPoints > computerPoints ? "Player" : "Computer") + " is the winner!";

function game() {
    alert("Let's play Rock, Paper, Scissors!");

    for (let i = 1; i <= 5; i++) {

        console.log(`Round ${i}`);

        // Get Player's choice and print their answer
        const player = getPlayerChoice();
        console.log(`Player: ${player}`);

        // Get Computer's choice and print their answer
        const computer = getComputerChoice();
        console.log(`Computer: ${computer}`);

        // Start round and get the winner for that round.
        console.log(playRound(player, computer));
        console.log(`Player: ${playerPoints} - Computer: ${computerPoints}`);
    }

    // Get the winner of the game
    console.log(getWinner(playerPoints, computerPoints));
}

// These two variables needs to be accessed by two functions, so, they need to be global
let playerPoints = 0;
let computerPoints = 0;

let playerSelection;

//game();