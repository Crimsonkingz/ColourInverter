var inputPreview = document.getElementById("inputColour");
var outputPreview = document.getElementById("outputColour");

var redSlider = document.getElementById("red");
var greenSlider = document.getElementById("green");
var blueSlider = document.getElementById("blue");

var inputRed = 255;
var inputGreen = 255;
var inputBlue = 255;


var outputRed = 0;
var outputGreen = 0;
var outputBlue = 0;

var inputRedVal = document.getElementById("redVal");
var inputGreenVal = document.getElementById("greenVal");
var inputBlueVal = document.getElementById("blueVal");


redSlider.addEventListener("input", function() {
	inputRed = redSlider.value;
	updateInputPreview();
	updateInputBox();
});

greenSlider.addEventListener("input", function() {
	inputGreen = greenSlider.value;
	updateInputPreview();
	updateInputBox();
});

blueSlider.addEventListener("input", function() {
	inputBlue = blueSlider.value;
	updateInputPreview();
	updateInputBox();
});

inputRedVal.addEventListener("input", function(){
	inputRed = inputRedVal.value;
	updateInputPreview();
	updateInputSlider();

});

inputGreenVal.addEventListener("input", function(){
	inputGreen = inputGreenVal.value;
	updateInputPreview();
	updateInputSlider();

});

inputBlueVal.addEventListener("input", function(){
	inputBlue = inputBlueVal.value;
	updateInputPreview();
	updateInputSlider();

});

var updateInputPreview = function() {

	inputPreview.style.backgroundColor = "rgb(" + inputRed + ", " +  inputGreen + ", " + inputBlue + ")";

};

var updateInputBox = function() {

	inputRedVal.value = inputRed;
	inputGreenVal.value = inputGreen;
	inputBlueVal.value = inputBlue;

};

var updateInputSlider = function() {

	redSlider.value = inputRed;
	greenSlider.value = inputGreen;
	blueSlider.value = inputBlue;

};

var inverseColour = function(red, green, blue) {
	var x = (red/255) - 0.5*((green/255) + (blue/255));
	var y = (Math.sqrt(3)/2) * ((green/255) - (blue/255));
	var theta = Math.atan(y/x);
	console.log(theta);
	console.log(180*theta/Math.PI);

	var invTheta = theta + (Math.PI);
	var invX = Math.cos(invTheta);
	var invY = Math.sin(invTheta);

	var newRed = 

};