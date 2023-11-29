const Game = {
  $: {
    dropDown: document.querySelector('[data-id="drop-down"]'),
    dropItems: document.querySelector('[data-id="drop-down-items"]'),
    resetBtn: document.querySelector('[data-id="reset-button"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-button"]'),
    gameCells: document.querySelectorAll('[data-id="cell"]'),
  },

  state: {
    currentPlayer: 1,
  },

  init() {
    Game.registerEventListener();
  },

  registerEventListener() {
    Game.$.dropDown.addEventListener("click", () => {
      Game.$.dropItems.classList.toggle("hidden");
    });

    Game.$.resetBtn.addEventListener("click", () => {
      console.log("reset button");
    });

    Game.$.newRoundBtn.addEventListener("click", () => {
      console.log("new round button");
    });

    //GAME PLAY
    Game.$.gameCells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        console.log(`Clicked button is ${event.target.id} !`);

        //if cell is not empty do nothing
        if (cell.hasChildNodes()) return;

        //if cell is empty
        const currentPlayer = Game.state.currentPlayer;
        const icon = document.createElement("i");

        if (currentPlayer === 1) {
          icon.classList.add("fa-solid", "fa-xmark", "p1-color");
        } else {
          icon.classList.add("fa-solid", "fa-o", "p2-color");
        }

        cell.appendChild(icon);

        Game.state.currentPlayer = Game.state.currentPlayer === 1 ? 2 : 1;
      });
    });
  },
};

window.addEventListener("load", () => Game.init());
