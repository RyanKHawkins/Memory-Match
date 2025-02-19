/*
    Imported from my Codepen account
    2/18/2025
    https://codepen.io/RyanKHawkins/pen/gOdRWrJ

*/
import * as Card from "./cards.js"
const resultDisplay = document.querySelector("#result");
export const shuffleButton = document.querySelector("#shuffle-button");

let isTesting = true;
function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
}


shuffleButton.addEventListener("click", Card.shuffleCards);
resultDisplay.addEventListener("click", () => {
    resultDisplay.style.visibility = "hidden"
});


function displayResult(result, MS = 5000) {
    resultDisplay.innerText = result;
    resultDisplay.style.visibility = "visible";
    setTimeout(() => {
        resultDisplay.style.visibility = "hidden";
    }, MS);
}

// Initiation stuff
displayResult("Welcome", 2000);
Card.shuffleCards();
function gameFinished() {
    return cards.every((card) => card.classList == "solved");
}

export function checkMatch() {
    let selected = Card.cards.filter((card) => card.classList.contains("selected"));
    if (selected.length >= 2) {
        if (selected[0].dataset.value == selected[1].dataset.value) {
            selected.forEach((card) => card.classList.add("solved"));
            const message = checkWin() ? "You won!" : "Matched";
            displayResult(message, 500);
        } else {
            selected.forEach((card) => {
                setTimeout(() => {
                    card.classList.add("hidden");
                    card.classList.remove("selected");
                    card.innerText = "";
                }, 500);
            });
        }
        Card.cards.forEach((card) => card.classList.remove("selected"));
    }
    if (checkWin()) {
        shuffleButton.classList.add("reset");
    }
}

function checkWin() {
    return Card.cards.every((card) => card.classList.contains("solved"));
}

function cheat() {
    console.log(cards.map((card) => card.dataset.value));
    setTimeout(() => console.clear(), 5000);
}
document.querySelector("h1").addEventListener("click", cheat);