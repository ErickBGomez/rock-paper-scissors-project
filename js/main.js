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
        return `Tie. Player: ${playerSelection}. Computer: ${computerSelection}`;
    } else if ((playerSelection === "Rock" && computerSelection === "Scissors") || (playerSelection === "Paper" && computerSelection === "Rock") || (playerSelection === "Scissors" && computerSelection === "Paper")){
        playerWins++;
        return `Player wins. ${playerSelection} beats ${computerSelection}`;
    } else {
        computerWins++;
        return `Computer wins. ${computerSelection} beats ${playerSelection}`;
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
}

function getPlayerChoice() {

    let answer;
    let isInputInvalid = true;

    do {
        answer = capitalize(prompt("Type your selection: [Rock], [Paper], [Scissors]", "") ?? "Invalid");

        isInputInvalid = !(answer === "Rock" || answer === "Paper" || answer === "Scissors");

    } while(isInputInvalid)

    return answer;
}

function game() {

    alert("Let's play Rock, Paper, Scissors!")

    for (let i = 1; i <= 5; i++) {

        console.log(`Round ${i}`)

        const player = getPlayerChoice();
        const computer = getComputerChoice();

        console.log(playRound(player, computer));
        console.log(`Player: ${playerWins} - Computer: ${computerWins}`)
    }

    
}

let playerWins = 0;
let computerWins = 0;

game();