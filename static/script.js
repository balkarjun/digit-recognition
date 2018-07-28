const canvas = document.querySelector("#main-canvas");
const smallCanvas = document.querySelector("#small-canvas");
const predDisplay = document.querySelector("#prediction");

const context = canvas.getContext("2d");
const smContext = smallCanvas.getContext("2d");

let draw = false;
let model;

/* Loads trained model */
async function init(){
	model = await tf.loadModel("http://localhost:3000/model.json");
}

/* Clears canvas */
function erase(){
	context.fillStyle = "black";
	context.fillRect(0, 0, canvas.width, canvas.height);
	predDisplay.innerText = "";
}

/* Draws on canvas */
function drawStroke(event){
	// get mouse coordinates on canvas
	let rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	let y = event.clientY - rect.top;

	// draw
	context.lineTo(x, y);
	context.stroke();
	context.moveTo(x, y);
}

/* Makes predictions and calls updateDisplay */
function predict(){
	let values = getPixelData();
	let predictions = model.predict(values).dataSync();

	updateDisplay(predictions);
}

/* Returns pixel data from canvas after applying transformations */
function getPixelData(){
	smContext.drawImage(context.canvas, 0, 0, smallCanvas.width, smallCanvas.height);
	const imgData = smContext.getImageData(0, 0, smallCanvas.width, smallCanvas.height);

	// preserve and normalize values from red channel only
	let values = [];
	for(let i = 0; i < imgData.data.length; i += 4){
		values.push(imgData.data[i]/255);
	}

	values = tf.reshape(values, [1, 28, 28, 1]);
	return values;
}

/* Displays predictions on screen */
function updateDisplay(predictions){
	let max = -1, bestPred;
	for(let i = 0; i < predictions.length; i++){
		if(predictions[i] > max){
			max = predictions[i];
			bestPred = i;
		}
	}

	predDisplay.innerText = bestPred;
}

canvas.addEventListener("mousedown", event => {
	draw = true;

	context.strokeStyle = "white";
	context.lineWidth = "15";
	context.lineJoin = context.lineCap = "round";
	context.beginPath();
});

canvas.addEventListener("mouseup", event => {
	draw = false;
	predict();
});

canvas.addEventListener("mousemove", event => {
	if(draw) drawStroke(event);
});

document.querySelector("#erase").addEventListener("click", erase);

erase();
init();
