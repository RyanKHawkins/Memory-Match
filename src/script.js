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

const pairToMatrix = {
    3: [3, 2],
    4: [4, 2],
    6: [4, 3],
    8: [4, 4],
    10: [5, 4],
    12: [6, 4],
    15: [6, 5],
    18: [6, 6],

}

function setOptions() {
    sizeInput.innerHTML = "";
    for (let pair of Object.keys(cardPairsMatrix)) {
        console.log(`pair: ${pair}`)
        let option = document.createElement("option");
        option.textContent = pair;
        sizeInput.append(option)
    }
}

function clampValues(num, min, max) {
    num = num < min ? min : num;
    num = num > max ? max : num;
    return num
}

document.querySelector("h1").addEventListener("click", cheat);
sizeInput.addEventListener("change", () => {
    Card.dealCards(Card.createDeck(sizeInput.value))
})
window.addEventListener("load", () => {
    // setOptions(MIN_PAIRS, MAX_PAIRS);
    setOptions();
    Card.dealCards(Card.createDeck(sizeInput.value));
})
dealButton.addEventListener("click", () => {
    Card.dealCards(Card.createDeck(sizeInput.value))
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

// function getSimilarRatio(totalCards) {
//     let ratio = [];

//     // let max = Math.ceil(totalCards / 2);
//     // let min = totalCards - max;

//     if (Number.isInteger(Math.sqrt(totalCards))) {
//         let squareRoot = Math.sqrt(totalCards)

//         ratio = [squareRoot, squareRoot]
//     } else {
//         let large = Math.ceil(totalCards / 2);
//         let small = totalCards - large;
//         while (large * small != totalCards) {
//             large++;
//             small = totalCards - large;
//         }
//         ratio = [large, small]
//     }

//     console.log(`ratio:  ${ratio}`)
//     return ratio
// }



export function buildMatrix(pairs) {
    console.log(`buildMatrix(${pairs})`)
    console.log(pairToMatrix[pairs][0])
    cardTable.style = `grid-template-columns: repeat(${pairToMatrix[pairs][0]}, auto); grid-template-rows: repeat(${pairToMatrix[pairs[1]]}, auto)`
}


// export function buildGrid(pairs) {
//     console.log(`pairs:  ${pairs}`)
//     console.log("building grid...");
//     let gridMatrix = [0, 0];

//     if (Number.isInteger(Math.sqrt(pairs * 2))) {
//         let squareRoot = Math.sqrt(pairs * 2)
//         gridMatrix = [squareRoot, squareRoot]
//     } else {
//         let orientation, screenHeight, screenWidth;
        
//         // TODO - Check screen orientation, match ratio
//         // gridMatrix = [Math.max(...getSimilarRatio(pairs * 2)), Math.min(...getSimilarRatio(pairs * 2))];
        
        
//     }
    
//     console.log(`gridMatrix:  ${gridMatrix}`);
//     cardTable.style = `grid-template-columns: repeat(${gridMatrix[0]}, auto); grid-template-rows: repeat(${gridMatrix[1]}, auto)`
    


// }