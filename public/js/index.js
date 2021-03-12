// revealing module pattern to start the game
(function ticTacToe() {
  // factories
  const player = (function (piece) {
    if (typeof piece === undefined) return null;
    return { piece: piece };
  })();

  const difficulty = (function (difficulty) {
    if (typeof difficulty === undefined) return null;
    return { setting: difficulty };
  })();

  const tictactoeBot = (function () {
    function setDifficulty(difficulty) {
      if (difficulty === "Normal") return "hi";
      if (difficulty === "Unbeatable") return "hi";
    }
    //difficultyMode: normal || unbeatable, 
    return { setDifficulty: setDifficulty };
  })();

  // const victor = (function() {
  // const winningSpots = [[]]
  // let victor = null
  // function check() { sets victor }
  // return { check }
  // })

  // let gameBoard = (function () { returns arr })
  // let boardArr = [["", "", ""], ["", "", ""], ["", "", ""]]
  // let clickIndex = null
  // function input(clickIndex) { assigns clickIndex to input var. if input is restart, reset vars }
  // function spotIsTaken(elementId) { returns true/false }
  // function updateBoard() { adds input to board if spot isn't taken }
  // return { boardArr, input } // no need to expose anything else

  // function toggleVisibility(element) { returns nothing }

  // function renderBoard() {}

  // currentTurn = function(blank or "next") {
  //   let turnVar = player
  //   function next() { ternary operator to switch turn}
  //   return { next, turnVar }
  // }

  // menu button events
  const buttons = document.querySelectorAll("button");
  const difficultySelector = document.querySelector("#difficulty-selector");
  const pieceSelector = document.querySelector("#piece-selector");
  const board = document.querySelector("#board");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.classList.contains("set-difficulty")) {
        difficulty.setting = button.value;
        tictactoeBot.setDifficulty(difficulty.setting);
        button.classList.toggle("toggled-btn");
        board.classList.toggle("board-visibility");
      }
      if (button.classList.contains("set-player")) {
        player.piece = button.value;
        button.classList.toggle("btn");
        button.classList.toggle("toggled-btn");
        pieceSelector.classList.toggle("hide-me");
      }
      if (button.classList.contains("restart")) alert(button.value);
      // toggleVisibility(button.parentElement);
    });
  });

  // core game loop
  document.addEventListener("click", function (e) {
    // detect button clicked
  });
  // toggleVisibility(difficultyDOM)
  // create AI object
  // user picks x or o // if(player.piece === null)
  // toggleVisibility(playerSelectDOM)
  // create playerObject()
  //game begins if difficulty + player selected
  // if player === playerObject && ai = AIobject
  // addEventListener(submit, checks for restart)
  // addEventListener(click, function(e) {}) // player starts inputting from here on
  // while(victor.check === null)
  // renderBoard
  // clickedSquare = document.querySelector(e.target)
  // if(gameboard.input(clickedSquare) === "failed") continue;
  // ai.move
  // victoryDOM.innerHTML = victor.check
  // toggleVisibility(victoryDOM)
})();
