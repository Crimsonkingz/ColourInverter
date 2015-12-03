var inputRed = 255;
var inputGreen = 255;
var inputBlue = 255;


var outputRed = 255;
var outputGreen = 255;
var outputBlue = 255;

var inputPreview = document.getElementById("inputColour");
var outputPreview = document.getElementById("outputColour");

var redSlider = document.getElementById("red");
var greenSlider = document.getElementById("green");
var blueSlider = document.getElementById("blue");

var inputRedVal = document.getElementById("inputRedVal");
var inputGreenVal = document.getElementById("inputGreenVal");
var inputBlueVal = document.getElementById("inputBlueVal");


var outputRedVal = document.getElementById("outputRedVal");
var outputGreenVal = document.getElementById("outputGreenVal");
var outputBlueVal = document.getElementById("outputBlueVal");

//////// Event listeners on input sliders for each colour
redSlider.addEventListener("input", function() {
	inputRed = redSlider.value;	
	updateInputPreview();
	updateInputBox();

	updateOutputPreview();
	updateOutputBox();
	
});

greenSlider.addEventListener("input", function() {
	inputGreen = greenSlider.value;
	updateInputPreview();
	updateInputBox();

	updateOutputPreview();
	updateOutputBox();
});

blueSlider.addEventListener("input", function() {
	inputBlue = blueSlider.value;
	updateInputPreview();
	updateInputBox();

	updateOutputPreview();
	updateOutputBox();
});
///////////////


//////////// Event listeners on input boxes for each colour
inputRedVal.addEventListener("input", function(){
	inputRed = inputRedVal.value;
	updateInputPreview();
	updateInputSlider();

	updateOutputPreview();
	updateOutputBox();

});

inputGreenVal.addEventListener("input", function(){
	inputGreen = inputGreenVal.value;
	updateInputPreview();
	updateInputSlider();

	updateOutputPreview();
	updateOutputBox();

});

inputBlueVal.addEventListener("input", function(){
	inputBlue = inputBlueVal.value;
	updateInputPreview();
	updateInputSlider();

	updateOutputPreview();
	updateOutputBox();

});
/////////////////

// Update the colour of the preview div
var updateInputPreview = function() {

	inputPreview.style.backgroundColor = "rgb(" + inputRed + ", " +  inputGreen + ", " + inputBlue + ")";

};

// Update the shown values on the input boxes if slider is moved
var updateInputBox = function() {

	inputRedVal.value = inputRed;
	inputGreenVal.value = inputGreen;
	inputBlueVal.value = inputBlue;

};

// Update the slider position if an input box is used
var updateInputSlider = function() {

	redSlider.value = inputRed;
	greenSlider.value = inputGreen;
	blueSlider.value = inputBlue;

};

// Get the HSL (Hue, Saturation, Lightness) from a set of RGB values
// Returns an object with hue, saturation and lightness properties
var toHSL = function(red, green, blue) {

	var redFrac = red/255;
	var greenFrac= green/255;
	var blueFrac = blue/255;

	var max = Math.max(red,green,blue);
	var min = Math.min(red,green,blue);
	var dist = (max - min) / 255;
	

	var lightness = (0.5 * (max+min))/255;

	if (lightness > 0) {
		var saturation = dist/(1 - Math.abs((2*lightness) - 1));

	}
	else {
		var saturation = 0;
	}
	if (max === min) {
		var saturation = 0;
		var hue = 0;
	}
	else if (max === red) {
		console.log("RED");
		var hue = ((greenFrac - blueFrac)/dist) % 6;
	}
	else if (max === green) {
		console.log("GREEN");
		var hue = ((blueFrac - redFrac)/dist) + 2;
	}
	else if (max === blue) {
		console.log("BLUE");
		var hue = ((redFrac - greenFrac)/dist) + 4;
	}
	else {
		console.log("NONE");
		var hue = 0;
	}

	hue = hue * 60;
	var hue = (180/Math.PI) * Math.acos((red - (green/2) - (blue/2)) / Math.sqrt((red*red) + (green*green) + (blue*blue) - (red*green) - (red*blue) - (blue*green)));
	
	if (blue > green) {
	// 	// --------- ERROR IS HERE ------------
	// 	// Test R = 255, Green = 1 to 2 OR 9 to 10 OR 12 to 13 OR 99 to 100, Blue = 122
		hue = 360 - hue;
	}
	if (isNaN(hue)) {
		hue = 0;
	}


	console.log(hue);
	hue = Math.round(hue);
	return {
		hue: hue,
		saturation: saturation,
		lightness: lightness
	}
}

// Get the RGB  from a set of HSL values
// Returns an object with red, green and blue properties
var toRGB = function(hue, saturation, lightness) {
	var dist = saturation * (1-Math.abs((2*lightness) - 1));
		
	var x = dist * (1-Math.abs(((hue/60) % 2) - 1));

	var min = (lightness - (dist/2));

	var red, 
		blue, 
		green;
	
		
	if (hue >= 0 && hue < 60) {

		red = dist;
		green = x
		blue = 0;
	}
	else if (hue >= 60 && hue < 120) {
		red = x;
		green = dist;
		blue = 0;
	}
	else if (hue >= 120 && hue < 180) {
		red = 0;
		green = dist;
		blue = x;
	}
	else if (hue >= 180 && hue < 240) {
		red = 0;
		green = x;
		blue = dist;
	}
	else if (hue >= 240 && hue < 300) {
		red = x;
		green = 0;
		blue = dist;
	}
	else if (hue >= 300 && hue < 360) {
		red = dist;
		green = 0;
		blue = x;
	}
	else {
		red = 0;
		green = 0;
		blue = 0;
		console.log("HUE NOT IN BOUNDS");
	}
	
	red = Math.round((red+min) * 255);
	green = Math.round((green+min) * 255);
	blue = Math.round((blue+min) * 255);
	// console.log("RED: " + red);
	// console.log("GREEN: " + green);
	// console.log("BLUE: " + blue);
		
	return {
		red: red,
		green: green,
		blue: blue
	}
}

// Finds the opposite colour based on hue
var reverseHue = function(hue) {

	// Opposite hue is a rotation of 180 degrees
	return hue;
}

// Update the colour of the output div
var updateOutputPreview = function() {
	var inputHSL = toHSL(inputRed, inputGreen, inputBlue);
	var inputHue = inputHSL.hue;
	var inputSaturation = inputHSL.saturation;
	var inputLightness = inputHSL.lightness;

	var oppositeHue = reverseHue(inputHSL.hue);
	

	var outputRGB = toRGB(oppositeHue,inputSaturation, inputLightness);
	

	outputRed = outputRGB.red;
	outputGreen = outputRGB.green;
	outputBlue = outputRGB.blue;

	outputPreview.style.backgroundColor = "rgb(" + outputRed + ", " +  outputGreen + ", " + outputBlue + ")";

}

var updateOutputBox = function() {

	outputRedVal.innerHTML = outputRed;
	outputGreenVal.innerHTML = outputGreen;
	outputBlueVal.innerHTML = outputBlue;
}