const gameState = {
  humanScore: 0,
  computerScore: 0,
};

function getComputerChoice() {
  let randomNumber = getRandomInt();

  return randomNumber === 1 // 1: rock, 2: paper, 3: scissors
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
  const playerChoices = document.querySelector(".player-choices");

  function handleChoiceClick(event) {
    // The closest button relative to target
    const button = event.target.closest("button");

    if (button) {
      const buttonId = button.id;

      const choices = {
        rock: "rock",
        paper: "paper",
        scissors: "scissors",
      };

      if (choices[buttonId]) {
        playRound(buttonId, getComputerChoice());

        // After checking each round if the game is finished,
        // remove listener from delegation point
        if (isGameFinished()) {
          playerChoices.removeEventListener("click", handleChoiceClick);
        }

        // FIX: New game button should also reset how the game works,
        // e.g If the game is finished, it should let you play again
        // instead of removing listener
      }
    }
  }

  playerChoices.addEventListener("click", handleChoiceClick);
  resetGame();
}

function resetGame() {
  const DEFAULT_ICON = "❔";

  const newGameBtn = document.querySelector(".new-game-btn");

  const playerIcon = document.querySelector(".player-icon");
  const computerIcon = document.querySelector(".computer-icon");

  newGameBtn.addEventListener("click", () => {
    playerIcon.textContent = DEFAULT_ICON;
    computerIcon.textContent = DEFAULT_ICON;
    gameState.humanScore = 0;
    gameState.computerScore = 0;

    // update score state each click
    displayScore();
  });
}
function isGameFinished() {
  return gameState.humanScore === 5 || gameState.computerScore === 5;
}

function determineWinner() {
  if (isGameFinished()) {
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

  if (playerPoints) playerPoints.textContent = gameState.humanScore;
  if (computerPoints) computerPoints.textContent = gameState.computerScore;
}

playGame();
