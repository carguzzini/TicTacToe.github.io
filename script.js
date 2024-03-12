document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const newGameBtn = document.querySelector(".new-game-btn");
  const gameTitle = document.querySelector(".game-title");
  const resultSection = document.querySelector(".result-section");
  const turnInfo = document.querySelector(".turn-info");
  const scoreXDisplay = document.querySelector(".score-x");
  const scoreODisplay = document.querySelector(".score-o");

  let cells = Array.from({ length: 9 }, () => null);
  let currentPlayer = "X";
  let gameOver = false;
  let scoreX = 0;
  let scoreO = 0;

  gameTitle.textContent = "Tic Tac Toe"; // Initialize game title

  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", () => handleCellClick(index));
    board.appendChild(cell);
  });

  const handleCellClick = (index) => {
    if (cells[index] || gameOver) return;

    cells[index] = currentPlayer;
    document.querySelector(
      `.cell[data-index="${index}"]`
    ).textContent = currentPlayer;

    const winner = checkWinner();

    if (winner) {
      gameOver = true;
      updateScore(winner);
      displayResult(winner);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnInfo.textContent = `${currentPlayer}'s turn`;
    }
  };

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }

    return cells.includes(null) ? null : "T";
  };

  const updateScore = (winner) => {
    if (winner === "X") {
      scoreX++;
      scoreXDisplay.textContent = `X: ${scoreX}`;
    } else if (winner === "O") {
      scoreO++;
      scoreODisplay.textContent = `O: ${scoreO}`;
    }
  };

  const displayResult = (result) => {
    if (result === "T") {
      resultSection.textContent = "It's a Tie!";
    } else {
      resultSection.textContent = `${result} wins this game!`;
    }
    resultSection.style.display = "block";

    if (scoreX === 3 || scoreO === 3) {
      gameTitle.textContent = "Match Finished!";
      resultSection.textContent += ` Final Score: X ${scoreX} - ${scoreO} O`;
      resetScores();
    } else {
      newGameBtn.style.display = "block";
      turnInfo.textContent = ""; // Clear turn info
    }
  };

  const resetScores = () => {
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.textContent = "X: 0";
    scoreODisplay.textContent = "O: 0";
    newGameBtn.style.display = "block";
  };

  window.resetGame = () => {
    cells = Array.from({ length: 9 }, () => null);
    currentPlayer = "X";
    gameOver = false;
    document
      .querySelectorAll(".cell")
      .forEach((cell) => (cell.textContent = ""));
    resultSection.textContent = "";
    resultSection.style.display = "none";
    newGameBtn.style.display = "none";
    gameTitle.textContent = "Tic Tac Toe"; // Reset game title
    turnInfo.textContent = `${currentPlayer}'s turn`; // Initial player's turn
  };

  turnInfo.textContent = `${currentPlayer}'s turn`; // Initial player's turn
});
