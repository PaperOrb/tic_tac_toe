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


  // function input(clickIndex) { assigns clickIndex to input var. if input is restart, reset vars }
  // function spotIsTaken(elementId) { returns true/false }
  // function updateBoard() { adds input to board if spot isn't taken }
  // return { boardArr, input } // no need to expose anything else

  // player
  const player = (function (piece) {
    return { piece: piece };
  })();

  // ttt bot
  const ticTacToeBot = (function () {
    let mode = null;

    function normalMove() {
      return "normal!";
    }

    function unbeatableMove() {
      return "Unbeatable!";
    }

    function makeMove() {
      if (mode === "Normal") { normalMove() };
      if (mode === "Unbeatable") { unbeatableMove() };
    }

    function setMode(difficulty) {
      mode = difficulty
    };

    function getMode() { return mode };

    return { setMode, getMode, makeMove };
  })();

  // const victor = (function() {
  // const winningSpots = [[]]
  // let victor = null
  // function check() { sets victor }
  // return { check }
  // })

  // function renderBoard() {}

  // currentTurn = function(blank or "next") {
  //   let turnVar = player
  //   function next() { ternary operator to switch turn}
  //   return { next, turnVar }
  // }

  // core game loop

  // while(victor.check === null)
  // renderBoard
  // clickedSquare = document.querySelector(e.target)
  // if(gameboard.input(clickedSquare) === "failed") continue;
  // ai.move
  // victoryDOM.innerHTML = victor.check
  // toggleVisibility(victoryDOM)
  function choicesComplete() {
    if (player.piece !== undefined && ticTacToeBot.getMode() !== null) return true;
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
      player.piece = button.value;
      button.classList.toggle("toggled-btn");
      if (choicesComplete()) startGame();
    });
  });

  // restart button
  restartButton.addEventListener("click", () => {
    gameBoard.clear();
    gameBoard.getArr();
    boardHtml.classList.toggle("board-visibility");
    player.piece = undefined;
    ticTacToeBot.setMode(null);
  });

  function startGame() {
    ticTacToeBot.makeMove();
    boardHtml.classList.toggle("board-visibility");
    buttons.forEach((button) => button.classList.remove("toggled-btn"));

    // core game loop. player clicks, then appropriate methods are triggered
    boardSquares.forEach((square) => {
      square.addEventListener("click", () => {
        gameBoard.input(player.piece, square);
        // gameBoard.input needs to update boardArray
        // gameBoard.clear on restart button
      });
    });
  }
})();
