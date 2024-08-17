const gameState = {
  humanScore: 0,
  computerScore: 0,
};

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

function playRound(humanChoice, computerChoice) {
  let isHuman = true;

  changeIconState(isHuman, humanChoice);
  changeIconState(!isHuman, computerChoice);

  if (humanChoice === computerChoice) {
    displayRoundTie();
    return;
  }

  if (validateHumanWin(humanChoice, computerChoice)) {
    displayRoundWinner("Human", humanChoice, computerChoice);
    updateScore(isHuman);
  } else {
    displayRoundWinner("Computer", computerChoice, humanChoice);
    updateScore(!isHuman);
  }

  displayScore();

  determineWinner();
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
}

function determineWinner() {
  if (gameState.humanScore === 5 || gameState.computerScore === 5) {
    displayOverallWinner();
  }
}
function getOverallWinner() {
  if (gameState.humanScore === 5) return "human";
  if (gameState.computerScore === 5) return "computer";
}

function displayOverallWinner() {
  const overallWinner = document.querySelector(".overall-winner");
  const winner = getOverallWinner();

  overallWinner.style.backgroundColor = "#faf9f6";
  overallWinner.style.color = "#535c91";
  overallWinner.textContent = `${winner.toUpperCase()} WINS!`;
}

function changeIconState(isHuman, choice) {
  const playerIcon = document.querySelector(".player-icon");
  if (isHuman) {
    playerIcon.textContent = getIcon(choice);
    return;
  }

  const computerIcon = document.querySelector(".computer-icon");
  computerIcon.textContent = getIcon(choice);
}

function getIcon(choice) {
  const icons = {
    rock: "✊",
    paper: "✋",
    scissors: "✌",
  };

  return icons[choice];
}

function displayRoundWinner(winner, winnerChoice, losingChoice) {
  const roundWinner = document.querySelector(".round-winner");
  roundWinner.textContent = `${winner} wins! "${winnerChoice}" beats "${losingChoice}"`;
}

function displayRoundTie() {
  const roundWinner = document.querySelector(".round-winner");

  roundWinner.textContent = "Round finished by a tie!";
}

function validateHumanWin(humanMove, computerChoice) {
  return (
    (humanMove === "rock" && computerChoice === "scissors") ||
    (humanMove === "paper" && computerChoice === "rock") ||
    (humanMove === "scissors" && computerChoice === "paper")
  );
}

function updateScore(isHuman) {
  if (isHuman) {
    gameState.humanScore++;
    return;
  }

  gameState.computerScore++;
}

function displayScore() {
  const playerPoints = document.querySelector(".player-points");
  const computerPoints = document.querySelector(".computer-points");

  playerPoints.textContent = gameState.humanScore;
  computerPoints.textContent = gameState.computerScore;
}

playGame();
