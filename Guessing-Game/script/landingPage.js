// Use strict mode to catch errors earlier
"use strict";

// Find the container and buttons in the HTML document
const container = document.querySelector(".main");
const difficultyButtons = document.querySelectorAll(".dfBtn");
const playBtn = document.querySelector("#playBtn");

// Disable the play button by default
playBtn.disabled = true;

// Initialize variables
let secondClicked = false;
let gameLevel = null;

// Functions to set and get the game level
const setGameLevel = (lvl) => {
  gameLevel = lvl;
};

const getGameLevel = () => {
  return gameLevel;
};

// When the container is clicked, disable the play button and enable difficulty buttons
container.addEventListener("click", (e) => {
  if (e.target === container) {
    playBtn.disabled = true;
    difficultyButtons.forEach((button) => {
      button.disabled = false;
    });
  }
});

// When a difficulty button is clicked, set the game level and disable other difficulty buttons
difficultyButtons.forEach((outerButton) => {
  outerButton.addEventListener("click", (e) => {
    setGameLevel(outerButton.value);
    difficultyButtons.forEach((innerButton) => {
      innerButton.disabled = innerButton.value !== outerButton.value;
    });
    playBtn.disabled = false;
  });
});

// When the play button is clicked, store the game level in local storage and navigate to the playground page
playBtn.addEventListener("click", () => {
  localStorage.setItem("gameLevel", getGameLevel());
  window.location.href = "playground.html";
});
