const canvas = document.getElementById("main-canvas");
const smallCanvas = document.getElementById("small-canvas");
const displayBox = document.getElementById("prediction");
const confidence = document.getElementById("confidence");

const inputBox = canvas.getContext("2d");
const smBox = smallCanvas.getContext("2d");

let isDrawing = false;
let model;

/* Loads trained model */
async function init() {
    model = await tf.loadModel("model/model.json");
}

function drawStartEvent(event) {
    isDrawing = true;

    inputBox.strokeStyle = "white";
    inputBox.lineWidth = "15";
    inputBox.lineJoin = inputBox.lineCap = "round";
    inputBox.beginPath();
}
canvas.addEventListener("mousedown", drawStartEvent);
canvas.addEventListener("ontouchstart", drawStartEvent);

function drawMoveEvent(event) {
    if (isDrawing) {
        drawStroke(event.clientX, event.clientY);
    }
}
canvas.addEventListener("mousemove", drawMoveEvent);
canvas.addEventListener("ontouchmove", drawMoveEvent);

function drawEndEvent(event) {
    isDrawing = false;
    updateDisplay(predict());
}
canvas.addEventListener("mouseup", drawEndEvent);
canvas.addEventListener("ontouchend", drawEndEvent);

/* Draws on canvas */
function drawStroke(clientX, clientY) {
    // get mouse coordinates on canvas
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // draw
    inputBox.lineTo(x, y);
    inputBox.stroke();
    inputBox.moveTo(x, y);
}

/* Makes predictions */
function predict() {
    let values = getPixelData();
    let predictions = model.predict(values).dataSync();

    return predictions;
}

/* Returns pixel data from canvas after applying transformations */
function getPixelData() {
    smBox.drawImage(
        inputBox.canvas,
        0,
        0,
        smallCanvas.width,
        smallCanvas.height
    );
    const imgData = smBox.getImageData(
        0,
        0,
        smallCanvas.width,
        smallCanvas.height
    );

    // preserve and normalize values from red channel only
    let values = [];
    for (let i = 0; i < imgData.data.length; i += 4) {
        values.push(imgData.data[i] / 255);
    }
    values = tf.reshape(values, [1, 28, 28, 1]);
    return values;
}

/* Displays predictions on screen */
function updateDisplay(predictions) {
    // Find index of best prediction, which corresponds to the predicted value
    const maxValue = Math.max(...predictions);
    const bestPred = predictions.indexOf(maxValue);
    confidence.innerHTML = `<strong>${Math.round(maxValue * 100)}%</strong> confidence`
    displayBox.innerText = bestPred;
}

document.getElementById("erase").addEventListener("click", erase);

/* Clears canvas */
function erase() {
    inputBox.fillStyle = "#111";
    inputBox.fillRect(0, 0, canvas.width, canvas.height);
    displayBox.innerText = "";
    confidence.innerHTML = "&#8212";
}

erase();
init();
