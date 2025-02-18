/*
    Imported from my Codepen account
    2/18/2025
    https://codepen.io/RyanKHawkins/pen/gOdRWrJ

*/
import * as Card from "./cards.js"
const cards = Array.from(document.querySelectorAll(".cards"));
const resultDisplay = document.querySelector("#result");
const shuffleButton = document.querySelector("#shuffle-button");

let isTesting = true;
function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
}


shuffleButton.addEventListener("click", shuffleCards);
resultDisplay.addEventListener("click", () => {
    resultDisplay.style.visibility = "hidden"
});



function shuffleArray(array, times = 2) {
    for (let i = 0; i < times; i++) {
        array = array.sort((a, b) => Math.random() - 0.5);
    }
    return array
}

function shuffleCards() {
    cards.forEach((card) =>
        card.addEventListener("click", (e) => {
            selectCard(e.target);
        })
    );
    cards.forEach((card) => (card.classList = "cards hidden"));
    cards.forEach((card) => (card.innerText = ""));
    const cardValues = [1, 1, 2, 2, 3, 3, 4, 4];
    addCardValue(shuffleArray(cardValues));
    shuffleButton.classList.remove("reset");
}

function addCardValue(values) {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.dataset.value = values.pop();
    }
}
function selectCard(card) {
    if (card.classList.contains("solved")) {
        return;
    }
    // const value = card.dataset.value;
    card.classList.add("selected");
    card.classList.remove("hidden");
    card.innerText = card.dataset.value;
    checkMatch();
}

function displayResult(result, MS = 5000) {
    resultDisplay.innerText = result;
    resultDisplay.style.visibility = "visible";
    setTimeout(() => {
        resultDisplay.style.visibility = "hidden";
    }, MS);
}

// Initiation stuff
displayResult("Welcome", 2000);
shuffleCards();
function gameFinished() {
    return cards.every((card) => card.classList == "solved");
}

function checkMatch() {
    let selected = cards.filter((card) => card.classList.contains("selected"));
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
        cards.forEach((card) => card.classList.remove("selected"));
    }
    if (checkWin()) {
        shuffleButton.classList.add("reset");
    }
}

function checkWin() {
    return cards.every((card) => card.classList.contains("solved"));
}

function cheat() {
    console.log(cards.map((card) => card.dataset.value));
    setTimeout(() => console.clear(), 5000);
}
document.querySelector("h1").addEventListener("click", cheat);