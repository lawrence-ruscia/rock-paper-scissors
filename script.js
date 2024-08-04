let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  let randomNumber = getRandomInt();

  return randomNumber === 1 // rock: 1, paper: 2, scissors: 3
    ? "rock"
    : randomNumber === 2
    ? "paper"
    : "scissors";
}

function getRandomInt() {
  return Math.floor(Math.random() * 3) + 1;
}

function getHumanChoice() {
  let choice = prompt("Choose your move (rock, paper, scissors): ");

  return choice;
}

function playRound(humanChoice, computerChoice) {
  let humanMove = humanChoice.toLowerCase();

  if (!isValidChoice(humanMove)) {
    humanMove = validateChoice(getHumanChoice).toLowerCase();
  }

  if (humanMove === computerChoice) {
    console.log("Round finished by a tie!");

    return;
  }

  if (validateHumanWin(humanMove, computerChoice)) {
    displayRoundWinner("Human", humanMove, computerChoice);
    humanScore++;
  } else {
    displayRoundWinner("Computer", computerChoice, humanMove);
    computerScore++;
  }
}

// Calls playRound 5 times
function playGame() {
  const ROUND_COUNT = 5;

  for (let i = 0; i < ROUND_COUNT; i++) {
    let humanChoice = getHumanChoice();
    let computerChoice = getComputerChoice();

    playRound(humanChoice, computerChoice);
  }

  determineWinner();
}

function determineWinner() {
  if (humanScore === computerScore) {
    console.log("It's a tie!");
    return;
  }

  let scoreDiff =
    humanScore > computerScore
      ? humanScore - computerScore
      : computerScore - humanScore;

  if (humanScore > computerScore) {
    console.log(`Human won by ${scoreDiff} pts`);
  } else {
    console.log(`Computer won by ${scoreDiff} pts`);
  }
}

function isRock(choice) {
  return choice === "rock";
}

function isPaper(choice) {
  return choice === "paper";
}

function isScissors(choice) {
  return choice === "scissors";
}

function displayRoundWinner(winner, winnerChoice, losingChoice) {
  console.log(`${winner} wins! ${winnerChoice} beats ${losingChoice}`);
}

function validateHumanWin(humanMove, computerChoice) {
  return (
    (isRock(humanMove) && isScissors(computerChoice)) ||
    (isPaper(humanMove) && isRock(computerChoice)) ||
    (isScissors(humanMove) && isPaper(computerChoice))
  );
}

function isValidChoice(choice) {
  const validChoices = ["rock", "paper", "scissors"];

  return validChoices.includes(choice);
}

function validateChoice(getChoice) {
  let choice;
  do {
    console.log("Invalid move! choose between rock, paper, or scissors.");
    choice = getChoice();
  } while (!isValidChoice(choice));

  return choice;
}

playGame();
