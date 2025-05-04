/*
    Imported from my Codepen account
    2/18/2025
    https://codepen.io/RyanKHawkins/pen/gOdRWrJ

*/
import * as Card from "./cards.js"
const resultDisplay = document.querySelector("#result");
export const dealButton = document.querySelector("#deal-button");
const sizeInput = document.querySelector("#size-input");
const cardTable = document.querySelector("#card-canvas");

export let isTesting = true;
export function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
}

const MIN_PAIRS = 3;
const MAX_PAIRS = 25;

function setOptions(min, max) {
    sizeInput.innerHTML = "";
    for (let i = min; i <= max; i++) {
        if (isAcceptableNumOfPairs(i)) {
            let option = document.createElement("option");
            option.textContent = i;
            sizeInput.append(option);
        }
    } 
}

function clampValues(num, min, max) {
    num = num < min ? min : num;
    num = num > max ? max : num;
    return num
}

document.querySelector("h1").addEventListener("click", cheat);
sizeInput.addEventListener("change", () => {
    sizeInput.value = clampValues(sizeInput.value, MIN_PAIRS, MAX_PAIRS);
    Card.dealCards(Card.createDeck(sizeInput.value))
})
window.addEventListener("load", () => {
    setOptions(MIN_PAIRS, MAX_PAIRS);
    Card.dealCards(Card.createDeck(sizeInput.value));
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

function getSimilarRatio(totalCards) {
    let ratio = [];

    // let max = Math.ceil(totalCards / 2);
    // let min = totalCards - max;

    console.log(`ratio:  ${ratio}`)
    return ratio
}


console.log("getSimilarRatio(6)", getSimilarRatio(6)) // [3, 2]
console.log("getSimilarRatio(20)", getSimilarRatio(20)) // [5, 4]
console.log("getSimilarRatio(16)", getSimilarRatio(16)) // [4, 4]
console.log("getSimilarRatio(8)", getSimilarRatio(8)) // [4, 2]
console.log("getSimilarRatio(12)", getSimilarRatio(12)) // [4, 3]
console.log("getSimilarRatio(24)", getSimilarRatio(24)) // [6, 4]

function isAcceptableNumOfPairs(pairs) {
    // Todo - also include check to keep the width or height under a maximum - 10??
    return pairs * 2 % 2 == 0 || pairs % 2 == 0 || !Math.max(...getSimilarRatio(pairs * 2) > 10)
}

export function buildGrid(pairs) {
    console.log(`pairs:  ${pairs}`)
    console.log("building grid...");
    let gridMatrix = [0, 0];

    if (Number.isInteger(Math.sqrt(pairs * 2))) {
        let squareRoot = Math.sqrt(pairs * 2)
        gridMatrix = [squareRoot, squareRoot]
    } else if (pairs == 10) {
        gridMatrix = [5, 4];
    } else {
        let orientation, screenHeight, screenWidth;
        
        // TODO - Check screen orientation, match ratio
        window.addEventListener("deviceorientation", (event) => {
            screenHeight = event.target.screen.availHeight
            screenWidth = event.target.screen.availWidth
            console.log(`height: ${screenHeight}, width: ${screenWidth}`)
        })
        
        gridMatrix = [Math.max(...getSimilarRatio(pairs * 2)), Math.min(...getSimilarRatio(pairs * 2))];
        
        
    }
    
    console.log(`gridMatrix:  ${gridMatrix}`);
    cardTable.style = `grid-template-columns: repeat(${gridMatrix[0]}, auto); grid-template-rows: repeat(${gridMatrix[1]}, auto)`
    


}