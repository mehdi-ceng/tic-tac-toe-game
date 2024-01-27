import View from "./view.js";

//Before abondening this file, we try to connect files related to MVC pattern design.
function init() {
  const view = new View();

  view.bindGameResetEvent((event) => {
    console.log("Reset");
    console.log(event);
  });

  view.bindNewRoundEvent((event) => {
    console.log("New round");
    console.log(event);
  });

  view.bindPlayerMoveEvent((event) => {
    console.log("player move");
    console.log(event);
  });
}

window.addEventListener("load", init);
