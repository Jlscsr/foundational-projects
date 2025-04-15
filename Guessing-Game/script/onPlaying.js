"use strict";

// Get the DOM elements
const timerDisplay = document.querySelector("#instructionContainer");
const statusContainer = document.querySelector("#correctAnswer");
const playerAnswer = document.querySelector("#playerAnswer");
const startAndSubmit = document.querySelector("#startSubmit");

// Game settings
let levelSettings = [
  { level: "easy", mins: 8 * 60, range: 10 },
  { level: "medium", mins: 5 * 60, range: 30 },
  { level: "hard", mins: 3 * 60, range: 100 },
  { level: "expert", mins: 1 * 60, range: 1000 },
];
let totalPoints = 0;
let gameLevel = null;
let gameSetting = null;

// setting the defaults
statusContainer.innerHTML = `<h2>?</h2>`;
startAndSubmit.value = "start";
startAndSubmit.innerHTML = "Start";
playerAnswer.disabled = true;

// set game level
const setGameLevel = (lvl) => {
  gameLevel = lvl;
};

// get game level
const getGameLevel = () => {
  return gameLevel;
};

// set the game level from locaStorage
setGameLevel(localStorage.getItem("gameLevel"));
gameSetting = levelSettings.find((setting) => setting.level === getGameLevel());
timerDisplay.innerHTML = `<h2>Guess as many numbers as possible within ${
  gameSetting.mins / 60
} minutes!</h2>`;

// Start timer
const startTimer = (duration, display) => {
  if (duration < 0) {
    resetGame(display);
    return;
  }

  // format time 00:00
  display.innerHTML = formatTime(duration);

  setTimeout(() => {
    startTimer(duration - 1, display);
  }, 1000);
};

// Format time
const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

// Generate a Random number
const generateRandNum = (range) => {
  let randomNumber = Math.floor(Math.random() * range) + 1;
  return randomNumber;
};

// Checking the player answer
const checkAnswer = (answer, playerAnswer) => {
  const input = document.querySelector("#playerAnswer");
  let feedback = "";

  if (answer === playerAnswer) {
    feedback = "correct";
    correctAnswer = generateRandNum(gameSetting.range);
    totalPoints++;
  } else if (playerAnswer < answer) {
    feedback = "higher";
  } else {
    feedback = "lower";
  }

  statusContainer.innerHTML = `<h2>${feedback.toUpperCase()} ${
    feedback === "correct" ? "🎉" : feedback === "higher" ? "👆" : "👇"
  }</h2>`;

  // reset
  input.value = "";
  setTimeout(() => {
    statusContainer.innerHTML = `<h2>?</h2>`;
  }, 1000);
};

const resetGame = (display) => {
  display.innerHTML = "Times Up!";
  setTimeout(() => {
    display.innerHTML = `<h2>Your total points</h2>`;
    statusContainer.innerHTML = `<h2>${totalPoints}🎉</h2>`;
  }, 2000);
  setTimeout(() => {
    statusContainer.innerHTML = `<h2>?</h2>`;
    display.innerHTML = `<h2>Guess as many numbers as possible within ${
      gameSetting.mins / 60
    } minutes!</h2>`;
  }, 4000);
  startAndSubmit.value = "start";
  startAndSubmit.innerHTML = "Start";
  playerAnswer.disabled = true;
};

// generate the correct answer from generate random number function
let correctAnswer = generateRandNum(gameSetting.range);
startAndSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.value === "start") {
    startAndSubmit.value = "submit";
    startAndSubmit.innerHTML = "submit";
    playerAnswer.disabled = false;
    startTimer(gameSetting.mins, timerDisplay);
  } else {
    let inputAnswer = parseInt(playerAnswer.value);
    if (inputAnswer) {
      checkAnswer(correctAnswer, inputAnswer);
    } else {
      console.log(correctAnswer);
      alert("Enter a number to make a guess!");
    }
  }
});
