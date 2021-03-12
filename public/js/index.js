// revealing module pattern to start the game
(function ticTacToe() {
  // factories
  const player = (function (piece) {
    return { piece: piece };
  })();

  const difficulty = (function (difficulty) {
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
  const board = document.querySelector("#board");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("set-difficulty")) {
        difficulty.setting = button.value;
        tictactoeBot.setDifficulty(difficulty.setting);
        button.classList.toggle("toggled-btn");
      };
      if (button.classList.contains("set-player")) {
        player.piece = button.value;
        button.classList.toggle("toggled-btn");
      };
      if (button.classList.contains("restart")) {
        board.classList.toggle("board-visibility");
        player.piece = undefined;
        difficulty.setting = undefined;
      };
      if (player.piece !== undefined && difficulty.setting !== undefined) {
        board.classList.toggle("board-visibility");
        buttons.forEach((button) => button.classList.remove("toggled-btn"));
        // hand over to gameloop function
        // then begin working on inputting x's and o's into array and rendering on board
      };
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
