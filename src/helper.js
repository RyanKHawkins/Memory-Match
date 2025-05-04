const resultDisplay = document.querySelector("#result");

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
        console.log(`height: ${screenHeight}, width: ${screenWidth}`)
    })

    return screenHeight > screenWidth ? "portrait" : "landscape"

}

export function clampValues(num, min, max) {
    num = num < min ? min : num;
    num = num > max ? max : num;
    return num
}
