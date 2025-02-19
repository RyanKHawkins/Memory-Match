/*
    Imported from my Codepen account
    2/18/2025
    https://codepen.io/RyanKHawkins/pen/gOdRWrJ

*/
import * as Card from "./cards.js"
const resultDisplay = document.querySelector("#result");
export const dealButton = document.querySelector("#deal-button");
const sizeInput = document.querySelector("#size-input");

export let isTesting = true;
export function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
}

function clampValues(num, min, max) {
    num = num < min ? min : num;
    num = num > max ? max : num;
    return num
}

sizeInput.addEventListener("change", () => {
    sizeInput.value = clampValues(sizeInput.value, 4, 25)
})
window.addEventListener("load", () => {
    Card.dealCards(Card.createDeck(4))
})
dealButton.addEventListener("click", () => {
    Card.dealCards(Card.createDeck(sizeInput.value))
    //todo: resize table

    sizeInput.value = 4;
});
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
function gameFinished() {
    return cards.every((card) => card.classList == "solved");
}

export function checkMatch(deck) {
    console.log("deck:  ", deck)
    let selected = deck.filter((card) => card.classList.contains("selected"));
    if (selected.length >= 2) {
        if (selected[0].dataset.value == selected[1].dataset.value) {
            selected.forEach((card) => card.classList.add("solved"));
            const message = checkWin(deck) ? "You won!" : "Matched";
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
        deck.forEach((card) => card.classList.remove("selected"));
    }
    // if (checkWin(deck)) {
    //     dealButton.classList.add("reset");
    // }
}

function checkWin(deck) {
    return deck.every((card) => card.classList.contains("solved"));
}

function cheat() {
    let cards = Array.from(document.querySelectorAll(".cards"));
    console.log(cards.map((card) => card.dataset.value));
    setTimeout(() => console.clear(), 5000);
}
document.querySelector("h1").addEventListener("click", cheat);