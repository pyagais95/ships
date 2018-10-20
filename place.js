(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var place = require("./place.js")
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var matrix = []

class Cell  {
	constructor(type, posx, posy) {
    this.type = "sea",
    this.posx = 0,
    this.posy = 0
  }
}

class Ship  {
	constructor(size) {
	this.size ,
	this.arr =[]
  }
}
for (let i = 0; i < 11; i++){
	var arr = []
	for(let j = 0; j < 11; j++){
		let cell = new Cell()
		cell.posx = j;
		cell.posy = i;
		arr.push(cell)
	}
	matrix.push(arr)
}
for (let i = 0; i < matrix.length; i++){
	matrix[i][0] = i;
}

for (let i = 0; i < matrix.length; i++){
	matrix[0][i] = i;
}



place(Math.floor(Math.random()*3)+1);
console.log(matrix)


var y = 50;
for(let i = 0; i < 11; i++){
var x = 50;
	for(let j = 0; j < 11; j++){
		if(matrix[j][i].type == "sea"){
			ctx.fillStyle = 'blue';
			ctx.fillRect(x, y, 50, 50)
			ctx.strokeRect(x, y, 50, 50)
			x = x+50
		}else if(matrix[j][i].type == "area"){
			ctx.fillStyle = '#3ee51c';
			ctx.fillRect(x, y, 50, 50)
			ctx.strokeRect(x, y, 50, 50)
			x = x+50

		}else if(matrix[j][i].type == "ship"){
			ctx.fillStyle = '#e5761c';
			ctx.fillRect(x, y, 50, 50)
			ctx.strokeRect(x, y, 50, 50)
			x = x+50
		}
	}
	y = y+50
}

},{"./place.js":2}],2:[function(require,module,exports){

},{}]},{},[1]);
