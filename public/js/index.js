// revealing module pattern to start the game
(function ticTacToe() {
  const buttons = document.querySelectorAll("button");
  const difficultyButtons = document.querySelectorAll(".set-difficulty");
  const playerButtons = document.querySelectorAll(".set-player");
  const restartButton = document.querySelector(".restart");
  const boardHtml = document.querySelector("#board");
  const boardSquares = document.querySelectorAll("[data-board-square='board-square']");

  // game board
  const gameBoard = (function() {
    let boardArr = ["", "", "", "", "", "", "", "", ""];

    function getArr() {
      return boardArr;
    }

    function spotAvailable(tileIndex) {
      if (boardArr[tileIndex] === "") return true;
      return false;
    };

    // verifies spot is empty before inputting to boardArr + html
    function input(piece, clickedTile) {
      let tileIndex = Number(clickedTile.id - 1);
      if (!spotAvailable(tileIndex)) return false; // guard clause
      clickedTile.innerHTML = piece;
      boardArr[tileIndex] = piece;
    };

    function clear() {
      boardArr = ["", "", "", "", "", "", "", "", ""];
      boardSquares.forEach(function(square) { square.innerHTML = "" } );
    };

    return { getArr, input, clear };
  })();

  // player
  const player = (function() {
    let piece = undefined;

    function setPiece(pc) { piece = pc };

    function getPiece() { return piece };

    return { getPiece, setPiece };
  })();

  // ttt bot
  const ticTacToeBot = (function () {
    let mode = null;
    let piece = null;

    function normalMove() {
     let emptySpots = [...boardSquares].filter((square) => {
       return square.innerHTML === "";
     });
    let index = Math.floor(Math.random() * emptySpots.length);
    // alert(emptySpots[index]);
    return emptySpots[index];
    }

    function unbeatableMove() {
      return "Unbeatable!";
      // https://invidious.snopyta.org/watch?v=trKjYdBASyQ best vid on minimax algorithm
    }

    function pickTile() {
      return normalMove();
      // if (mode === "Unbeatable") { unbeatableMove() };
    };

    function setMode(difficulty) { mode = difficulty };

    function getMode() { return mode };

    function setPiece(pc) { piece = pc }

    function getPiece() { return piece }

    return { setMode, getMode, pickTile, setPiece, getPiece };
  })();

  const victor = (function() {
    const winningCombos = [
      [1, 2, 3], [4, 5, 6], [7, 8, 9],
      [1, 4, 7], [2, 5, 8], [3, 6, 9],
      [1, 5, 9], [3, 5, 7]
    ]

    function detect() {
      let victor = [player.getPiece(), ticTacToeBot.getPiece()].filter((piece) => { // filters which piece
        return winningCombos.some((tileCombo) => { // has some winning combo
          return tileCombo.every((tileIndex) => { // where every tile has said piece on it
            return gameBoard.getArr()[tileIndex - 1] === piece;
          });
        });
      });
      return victor.length === 0 ? false : victor.join('');
    };

    function tied() {
     return gameBoard.getArr().every((tile) => {
        return tile !== "";
      });
    };

    return { detect, tied };
  })();

  function choicesComplete() {
    if (player.getPiece() !== undefined && ticTacToeBot.getMode() !== null) return true;
    return false;
  }

  // difficulty selection buttons
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      difficultyButtons.forEach((btn) => btn.classList.remove("toggled-btn"));
      ticTacToeBot.setMode(button.value);
      button.classList.toggle("toggled-btn");

      if (choicesComplete()) startGame();
    });
  });

  // player selection buttons
  playerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playerButtons.forEach((btn) => btn.classList.remove("toggled-btn"));
      player.setPiece(button.value);
      ticTacToeBot.setPiece(button.value === "X" ? "O" : "X");
      button.classList.toggle("toggled-btn");
      if (choicesComplete()) startGame();
    });
  });

  // restart button
  restartButton.addEventListener("click", () => {
    gameBoard.clear();
    boardHtml.classList.toggle("board-visibility");
    player.setPiece(undefined);
    ticTacToeBot.setPiece(undefined);
    ticTacToeBot.setMode(null);
  });

  // enable board and hide buttons
  function startGame() {
    boardHtml.classList.toggle("board-visibility");
    buttons.forEach((button) => button.classList.remove("toggled-btn"));
  }

  // core game loop. player clicks, then appropriate methods are triggered
  boardSquares.forEach((square) => {
    square.addEventListener("click", function() {
      gameBoard.input(player.getPiece(), square);
      gameBoard.input(ticTacToeBot.getPiece(), ticTacToeBot.pickTile()); 
      if (victor.detect()) alert('v');
      if (victor.tied()) alert('tied');
    });
  });
})();
