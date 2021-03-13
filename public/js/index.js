// revealing module pattern to start the game
(function ticTacToe() {
  const buttons = document.querySelectorAll("button");
  const difficultyButtons = document.querySelectorAll(".set-difficulty");
  const playerButtons = document.querySelectorAll(".set-player");
  const restartButton = document.querySelector(".restart");
  const board = document.querySelector("#board");
  const boardSquares = document.querySelectorAll("[data-board-square='board-square']");


  // game board
  const gameBoard = (function() {
    let boardArr = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]]

    function render() {

    };

    function input(piece, clickedTile) {
      if(clickedTile.innerHTML === '') clickedTile.innerHTML = piece;
    }

    return { array: boardArr, render, input }
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
    board.classList.toggle("board-visibility");
    player.piece = undefined;
    ticTacToeBot.setMode(null);
  });

  function startGame() {
    ticTacToeBot.makeMove();
    board.classList.toggle("board-visibility");
    buttons.forEach((button) => button.classList.remove("toggled-btn"));

    // core game loop. player clicks, then appropriate methods are triggered
    boardSquares.forEach((square) => {
      square.addEventListener("click", () => {
        gameBoard.input("x", square);
        // gameBoard.input needs to update boardArray
        // gameBoard.clear on restart button
      });
    });
  }
})();
