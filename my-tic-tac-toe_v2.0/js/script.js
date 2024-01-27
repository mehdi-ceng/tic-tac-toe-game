import View from "./view.js";

const Game = {
  $: {
    dropDown: document.querySelector('[data-id="drop-down"]'),
    dropItems: document.querySelector('[data-id="drop-down-items"]'),
    resetBtn: document.querySelector('[data-id="reset-button"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-button"]'),
    gameCells: document.querySelectorAll('[data-id="cell"]'),
    popUp: document.querySelector('[data-id="pop-up"]'),
    popUpText: document.querySelector('[data-id="pop-up-text"]'),
    popUpButton: document.querySelector('[data-id="pop-up-button"]'),
    turn: document.querySelector('[data-id = "turn"]'),
  },

  state: { moves: [] },

  getGameStatus(moves) {
    const p1cells = moves
      .filter((move) => move.playerId === 1)
      .map((move) => move.cellId);

    const p2cells = moves
      .filter((move) => move.playerId === 2)
      .map((move) => move.cellId);

    const winningPatterns = [
      //cell ids that corresponds to winning game
      [1, 2, 3], //first row of the game board is all same icon, thus winning game and similar logic for other patterns
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winnerVar = null;
    winningPatterns.forEach((pattern) => {
      const p1wins = pattern.every((cellId) => p1cells.includes(cellId));
      const p2wins = pattern.every((cellId) => p2cells.includes(cellId));

      if (p1wins) winnerVar = 1;
      if (p2wins) winnerVar = 2;
    });

    let statusVar =
      winnerVar !== null || moves.length == 9 ? "complete" : "ongoing";

    return {
      status: statusVar,
      winner: winnerVar,
    };
  },

  init() {
    Game.registerEventListener();
  },

  registerEventListener() {
    //DROP DOWN MENU
    Game.$.dropDown.addEventListener("click", () => {
      Game.$.dropItems.classList.toggle("hidden");
    });

    //RESET BUTTON
    Game.$.resetBtn.addEventListener("click", () => {
      console.log("reset button");
    });

    //NEW ROUND BUTTON
    Game.$.newRoundBtn.addEventListener("click", () => {
      console.log("new round button");
    });

    //POP UP BUTTON
    Game.$.popUpButton.addEventListener("click", () => {
      Game.$.popUp.classList.add("hidden");
      Game.state.moves = [];
      Game.$.gameCells.forEach((cell) => {
        cell.replaceChildren();
      });
    });

    //GAME PLAY
    Game.$.gameCells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        console.log(`Clicked button is ${event.target.id} !`);

        //if cell is not empty do nothing
        const isCellPlayed = (cellId) => {
          const foundMove = Game.state.moves.find(
            (move) => move.cellId === cellId
          );
          return foundMove !== undefined;
        };

        if (isCellPlayed(+cell.id)) {
          return;
        }

        //if cell is empty add appropriate icon
        let currentPlayer;
        let lastPlayer;
        if (Game.state.moves.length === 0) {
          currentPlayer = 1;
        } else {
          lastPlayer = Game.state.moves.at(-1).playerId;
          currentPlayer = lastPlayer === 1 ? 2 : 1;
          console.log(lastPlayer);
        }

        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        const cellIcon = document.createElement("i");
        const turnIcon = document.createElement("i");
        const turnText = document.createElement("p");
        turnText.textContent = `Player ${nextPlayer}, you're up!`;

        if (currentPlayer === 1) {
          cellIcon.classList.add("fa-solid", "fa-xmark", "p1-color");
          turnIcon.classList.add("fa-solid", "fa-o", "p2-color");
          Game.$.turn.classList.replace("p1-color", "p2-color");
        } else {
          cellIcon.classList.add("fa-solid", "fa-o", "p2-color");
          turnIcon.classList.add("fa-solid", "fa-xmark", "p1-color");
          Game.$.turn.classList.replace("p2-color", "p1-color");
        }

        Game.$.turn.replaceChildren(turnIcon, turnText);

        cell.appendChild(cellIcon);

        //and also change turn indicator

        //track moves
        Game.state.moves.push({
          cellId: +cell.id,
          playerId: currentPlayer,
        });
        console.log(Game.state.moves);

        //pop up based on game status
        const gameResult = Game.getGameStatus(Game.state.moves);
        if (gameResult.status === "complete") {
          Game.$.popUp.classList.remove("hidden");

          let popUpMessage = "";
          if (gameResult.winner) {
            popUpMessage = `Player ${gameResult.winner} wins!`;
            if (gameResult.winner === 1)
              Game.$.popUpText.classList.replace("tie-color", "p1-color");
            if (gameResult.winner === 2)
              Game.$.popUpText.classList.replace("tie-color", "p2-color");
          } else {
            popUpMessage = "Tie!";
          }

          Game.$.popUpText.textContent = popUpMessage;
        }
      });
    });
  },
};

window.addEventListener("load", () => Game.init());

//Before abondening this file, we try to connect files related to MVC pattern design.
function init() {
  const view = new View();

  console.log(view.$.dropDown);
}

window.addEventListener("load", init);
