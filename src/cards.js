import * as Script from "./script.js"
export const cards = Array.from(document.querySelectorAll(".cards"));

function shuffleArray(array, times = 2) {
    for (let i = 0; i < times; i++) {
        array = array.sort((a, b) => Math.random() - 0.5);
    }
    return array
}

export function shuffleCards() {
    cards.forEach((card) =>
        card.addEventListener("click", (e) => {
            selectCard(e.target);
        })
    );
    cards.forEach((card) => (card.classList = "cards hidden"));
    cards.forEach((card) => (card.innerText = ""));
    const cardValues = [1, 1, 2, 2, 3, 3, 4, 4];
    addCardValue(shuffleArray(cardValues));
    Script.shuffleButton.classList.remove("reset");
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
    Script.checkMatch();
}




// const canvas = document.querySelector("#card-canvas")

// export let cards = [];

// export function createDeck(gridSize = 4) {
//     let deck = [];
//     for (let i = 1; i <= gridSize; i++) {
//         deck.push(i);
//         deck.push(i);
//     }
//     return deck
// }

// function shuffleCards(deck) {
//     for (let i = 0; i < deck.length; i++) {
//         deck = deck.sort((a, b) => Math.random() - 0.5)
//     }
//     return deck
// }

// export function placeCards(deck) {
//     console.log("deck:  ", deck);
//     deck = shuffleCards(deck);
//     for (let i = 0; i < deck.length; i++) {
//         let cardDiv = document.createElement("div");
//         cardDiv.classList = "cards hidden";
//         cardDiv.innerText = "";
//         cardDiv.dataset.value = deck[i]
//         cardDiv.addEventListener("click", (e) => {
//             Script.selectCard(e.target)
//         });

//         canvas.append(cardDiv)         
//     }
// }

// export function selectCard(card) {
//     if (card.classList.contains("solved")) {
//         return
//     }
//     card.classList.add("selected");
//     card.classList.remove("hidden");
//     card.innertext = card.dataset.value
// }