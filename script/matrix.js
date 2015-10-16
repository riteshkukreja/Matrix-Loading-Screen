/*
 *
 *	Author: Ritesh Kukreja
 *	Follow the Post at riteshkukreja.wordpress.com
 *	Title: Matrix Loading Screen
 */

 var width = 1500,
	height = 1000,
	increment = 40,
	maxSpeed = 100,
	minSpeed = 40,
	maxLength = 200, 
	minLength = 50
	font_size = 12;

var holder, 
	lock = false,
	loading_time = 5000;

var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var randomText = function() {
	return characters[getRandomInt(0, characters.length-1)];
}

var thread = function() {
	var div = document.createElement('div');
	div.className = "thread";

	var msg = "", 
		len = getRandomInt(minLength, maxLength-1);

	for(i = 0; i < len; i++) {
		msg += randomText();
	}

	div.innerHTML = msg;
	return div;
}

var animate = function(div, speed) {
	var topVal = parseInt(div.style.top, 10);
	if(topVal > height) {
		holder.removeChild(div);
	} else {
		div.style.top = parseInt(topVal + increment) + "px";
		setTimeout(function() {
			animate(div, speed);
		}, speed);
	}
}

var matrix = function() {
	var div = thread();
	holder.appendChild(div);
	div.style.left = getRandomInt(0, width) + "px";
	div.style.top =  (-maxLength * font_size - 100) + "px";
	console.log(div.style.top);

	var speed = getRandomInt(minSpeed, maxSpeed);

	setTimeout(function() {
		animate(div, speed);
	}, speed);
	if(!lock) {
		setTimeout(matrix, getRandomInt(minSpeed, maxSpeed));
	}
}

var stop = function() {
	lock = true;
}

window.onload = function() {
	holder = document.getElementById('loader');
	matrix();

	setTimeout(stop, loading_time);
}