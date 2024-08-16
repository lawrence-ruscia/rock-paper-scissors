let humanScore = 0;
let computerScore = 0;

let choice = "";

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
  return choice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("Round finished by a tie!");

    return;
  }

  if (validateHumanWin(humanChoice, computerChoice)) {
    displayRoundWinner("Human", humanChoice, computerChoice);
    humanScore++;
  } else {
    displayRoundWinner("Computer", computerChoice, humanChoice);
    computerScore++;
  }
}

function playGame() {
  const choiceButtons = document.querySelectorAll(".choice-btn");

  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const buttonId = e.currentTarget.id;

      const choices = {
        rock: "rock",
        paper: "paper",
        scissors: "scissors",
      };

      if (choices[buttonId]) {
        playRound(buttonId, getComputerChoice());
      }
    });
  });

  // determineWinner();
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

playGame();
