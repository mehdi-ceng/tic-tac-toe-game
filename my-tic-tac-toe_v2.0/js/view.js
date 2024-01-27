export default class View {
  $ = {};
  $$ = {}; //For organization purposes, selected element lists are here

  constructor() {
    this.$.dropDown = this.#qs('[data-id="drop-down"]');
    this.$.dropDownBtn = this.#qs('[data-id="action-button"]');
    this.$.dropItems = this.#qs('[data-id="drop-down-items"]');
    this.$.resetBtn = this.#qs('[data-id="reset-button"]');
    this.$.newRoundBtn = this.#qs('[data-id="new-round-button"]');
    this.$$.gameCells = this.#qsAll('[data-id="cell"]');
    this.$.popUp = this.#qs('[data-id="pop-up"]');
    this.$.popUpText = this.#qs('[data-id="pop-up-text"]');
    this.$.popUpButton = this.#qs('[data-id="pop-up-button"]');
    this.$.turn = this.#qs('[data-id = "turn"]');

    //Drop down menu is also related to state of the game, but it is "client side state".
    //View can handle that.
    this.$.dropDown.addEventListener("click", () => {
      this.#toggleActionItems();
    });
  }

  /*******************Register event listeners *********************/
  //We  add event listeners here. But functionality will not be implemented
  //here, because they are related to state of the game(and server side).
  //They will be implemented in Controlled part of MVC(Model View Controller) design pattern,
  //which is app.js file in our case.
  //handler is function parameter and handler will be implemented in app.js
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.gameCells.forEach((cell) => {
      cell.addEventListener("click", handler);
    });
  }

  /*********DOM helper manipulation ************/
  // # sign to declare private methods
  #toggleActionItems() {
    this.$.dropItems.classList.toggle("hidden");
    this.$.dropDown.classList.toggle("border");

    const icon = this.$.dropDownBtn.querySelector("i");

    icon.classList.toggle("fa-caret-up");
    icon.classList.toggle("fa-caret-down");
  }

  //Helper method to easily select elements and
  //also checks we actually selected a valid element.
  #qs(selector, parent) {
    //selects an element

    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    //validates
    if (!el) throw new Error("No such element!");

    return el;
  }

  #qsAll(selector, parent) {
    //selects an element

    const elList = parent
      ? parent.querySelectorAll(selector)
      : document.querySelectorAll(selector);

    //validates
    if (!elList) throw new Error("No such elements!");

    return elList;
  }
}
