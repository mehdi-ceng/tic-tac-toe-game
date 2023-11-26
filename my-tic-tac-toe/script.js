const dropDown = document.querySelector(".drop-down");
const dropItems = dropDown.querySelector(".drop-down-items");

dropDown.addEventListener("click", (event) => {
  dropItems.classList.toggle("hidden");
});
