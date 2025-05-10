import * as Script from "./script.js";
import * as Helper from "./helper.js";
export const cards = Array.from(document.querySelectorAll(".cards"));
const cardTable = document.querySelector("#card-canvas");

function shuffleArray(array, times = 2) {
    for (let i = 0; i < times; i++) {
        array = array.sort((a, b) => Math.random() - 0.5);
    }
    return array
}

function addCardValue(values) {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.dataset.value = values.pop();
    }
}

function selectCard(card, deck) {
    // Helper.testLog(`Selected ${card}`)
    if (card.classList.contains("solved")) {
        return;
    }
    // const value = card.dataset.value;
    card.classList.add("selected");
    card.classList.remove("hidden");
    card.innerText = card.dataset.value;
    Script.checkMatch(deck);
}

function createCard(card) {
    let cardDiv = document.createElement("div");
    cardDiv.dataset.value = card
    cardDiv.classList = "cards hidden"
    return cardDiv
}

export function createDeck(numOfPairs) {
    Helper.testLog("Creating deck...");
    let deck = [];
    for (let i = 1; i <= numOfPairs; i++) {

        deck.push(createCard(i));
        deck.push(createCard(i));
    }
    deck.forEach(card => {
        card.addEventListener("click", (e) => {
            selectCard(card, deck)
        })
    })
    return deck
}

function shuffleDeck(deck, shuffleCount = 1) {
    // Helper.testLog("Shuffling the deck...")
    for (let i = 0; i < deck.length; i++) {
        deck = deck.sort((a, b) => Math.random() - 0.5)
    }
    return deck
}

export function dealCards(deck) {
    // Helper.testLog("deck: ", deck);
    Script.buildMatrix(deck.length / 2);
    cardTable.innerHTML = ""
    deck = shuffleDeck(deck, 2);
    for (let i = 0; i < deck.length; i++) {
        deck[i].id = i
        cardTable.append(deck[i])
    }
}
