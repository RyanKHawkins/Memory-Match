

export let isTesting = true;
export function testLog(log) {
    if (isTesting) {
        console.log(log);
    }
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

