const resultDisplay = document.querySelector("#result");
document.querySelector("h1").addEventListener("click", cheat);

resultDisplay.addEventListener("click", () => {
    resultDisplay.style.visibility = "hidden"
});

export let isTesting = true;
export function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
}

export function displayResult(result, MS = 5000) {
    resultDisplay.innerText = result;
    resultDisplay.style.visibility = "visible";
    setTimeout(() => {
        resultDisplay.style.visibility = "hidden";
    }, MS);
}

export function getOrientation() {
    let screenHeight, screenWidth;
    window.addEventListener("deviceorientation", (event) => {
        screenHeight = event.target.screen.availHeight
        screenWidth = event.target.screen.availWidth
        testLog(`height: ${screenHeight}, width: ${screenWidth}`)
    })

    return screenHeight > screenWidth ? "portrait" : "landscape"

}

export function getScreenSize() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return { width, height }
}

export function handleResize() {
    const screenSize = getScreenSize();
    testLog(screenSize);
}

window.addEventListener("resize", handleResize);

export function clampValues(num, min, max) {
    num = num < min ? min : num;
    num = num > max ? max : num;
    return num
}

function cheat() {
    let cards = Array.from(document.querySelectorAll(".cards"));
    console.log(cards.map((card) => card.dataset.value));
    setTimeout(() => console.clear(), 5000);
}