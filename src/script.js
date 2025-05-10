/*
    Imported from my Codepen account
    2/18/2025
    https://codepen.io/RyanKHawkins/pen/gOdRWrJ

*/
import * as Card from "./cards.js";
import * as Helper from "./helper.js";
const resultDisplay = document.querySelector("#result");
export const dealButton = document.querySelector("#deal-button");
const sizeInput = document.querySelector("#size-input");
const cardTable = document.querySelector("#card-canvas");
const INITIAL_PAIR_VALUE = 8;
export let attempts = 0;

const cardPairsMatrix = {
    3: [3, 2],
    4: [4, 2],
    6: [4, 3],
    8: [4, 4],
    10: [5, 4],
    12: [6, 4],
    15: [6, 5],
    18: [6, 6],
    21: [7, 6]
}

function setOptions() {
    sizeInput.innerHTML = "";
    for (let pair of Object.keys(cardPairsMatrix)) {
        console.log(`pair: ${pair}`)
        let option = document.createElement("option");
        option.textContent = pair;
        sizeInput.append(option)
    }
    sizeInput.value = INITIAL_PAIR_VALUE;
}

sizeInput.addEventListener("change", () => {
    Card.dealCards(Card.createDeck(sizeInput.value))
})
window.addEventListener("load", () => {
    setOptions();
    Card.dealCards(Card.createDeck(sizeInput.value));
})
dealButton.addEventListener("click", () => {
    Card.dealCards(Card.createDeck(sizeInput.value));
    attempts = 0;
});

// Initiation stuff
Helper.displayResult("Welcome", 2000);

export function checkMatch(deck) {
    console.log("deck:  ", deck)
    attempts++;
    let selected = deck.filter((card) => card.classList.contains("selected"));
    if (selected.length >= 2) {
        if (selected[0].dataset.value == selected[1].dataset.value) {
            selected.forEach((card) => card.classList.add("solved"));
            const message = checkWin(deck) ? "You won!" : "Matched";
            Helper.displayResult(message, 500);
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

export function buildMatrix(pairs) {
    console.log(`buildMatrix(${pairs})`)
    console.log(cardPairsMatrix[pairs][0])
    cardTable.style = `grid-template-columns: repeat(${cardPairsMatrix[pairs][0]}, auto); grid-template-rows: repeat(${cardPairsMatrix[pairs[1]]}, auto)`
}
