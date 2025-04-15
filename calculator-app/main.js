"use strict";

let calcButtons = document.querySelectorAll("#calcButton");
let calcScreen = document.querySelector("#screen");
let equal = document.querySelector("#equal");
let delButton = document.querySelector("#del");
let clearButton = document.querySelector("#clear");

calcButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.dataset.calc;
    calcScreen.value += value;
  });
});

equal.addEventListener("click", () => {
  try {
    calcScreen.value = eval(calcScreen.value);
  } catch (err) {
    calcScreen.value = "Invalid Input";
  }
});

delButton.addEventListener("click", () => {
  calcScreen.value = calcScreen.value.slice(0, -1);
});

clearButton.addEventListener("click", () => {
  calcScreen.value = "";
});
