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
	this.size = 0


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


function place () {

	var count = 0

	while (count < 4){

		var py = Math.floor(Math.random()*9)+1
		var px = Math.floor(Math.random()*9)+1
		var check = true
		var placed = false
		console.log("py = " + py  + "px = " + px)
		var dir = Math.round(Math.random())
		console.log(dir)
		if(dir == 0 && (py + 3) < 10){
			for(let i = 0; i < 5; i++){
				if(matrix[py+i][px].type == "ship"){
					check == false
				}
			}

		}
		if (dir == 0 && (py + 3) >=10){
			for(let i = 0; i < 5; i++){
				if(matrix[py-i][px].type == "ship"){
					check == false
				}
			}
		}
		if(dir == 1 && (px + 3) < 10){
			for(let i = 0; i < 5; i++){
				if(matrix[py][px+i].type == "ship"){
					check == false
				}
			}
		}
		if (dir == 1 && (px + 3) >= 10)
			for(let i = 0; i < 5; i++){
				if(matrix[py][px-i].type == "ship"){
					check == false
				} 
			}

			console.log(check)

		if(dir == 0 && (py + 3) < 10 && px != 10 &&  check == true) {

			matrix[py][px].type = "ship"
			matrix[py][px+1].type = "area"
			matrix[py][px-1].type = "area"
			matrix[py+1][px].type = "ship"
			matrix[py+1][px+1].type = "area"
			matrix[py+1][px-1].type = "area"
			matrix[py+2][px].type = "ship"
			matrix[py+2][px+1].type = "area"
			matrix[py+2][px-1].type = "area"
			matrix[py+3][px].type = "ship"
			matrix[py+3][px+1].type = "area"
			matrix[py+3][px-1].type = "area"
			matrix[py+4][px].type = "area"
			matrix[py+4][px-1].type = "area"
			matrix[py+4][px+1].type = "area"
			matrix[py-1][px].type = "area"
			matrix[py-1][px+1].type = "area"
			matrix[py-1][px-1].type = "area"
			placed = true

		}

		if(dir == 0 && (py + 3) > 10 && py != 10 && check == true){

			matrix[py][px].type = "ship"
			matrix[py][px+1].type = "area"
			matrix[py][px-1].type = "area"
			matrix[py-1][px].type = "ship"
			matrix[py-1][px+1].type = "area"
			matrix[py-1][px-1].type = "area"
			matrix[py-2][px].type = "ship"
			matrix[py-2][px+1].type = "area"
			matrix[py-2][px-1].type = "area"
			matrix[py-3][px].type = "ship"
			matrix[py-3][px+1].type = "area"
			matrix[py-3][px-1].type = "area"
			matrix[py-4][px].type = "area"
			matrix[py-4][px-1].type = "area"
			matrix[py-4][px+1].type = "area"
			matrix[py+1][px].type = "area"
			matrix[py+1][px+1].type = "area"
			matrix[py+1][px-1].type = "area"
			placed = true

		}

		if(dir == 1 && (px + 3) > 10 && px != 10 && check == true){
			matrix[py][px].type = "ship"
			matrix[py-1][px].type = "area"
			matrix[py+1][px].type = "area"
			matrix[py][px-1].type = "ship"
			matrix[py-1][px-1].type = "area"
			matrix[py+1][px-1].type = "area"
			matrix[py][px-2].type = "ship"
			matrix[py-1][px-2].type = "area"
			matrix[py+1][px-2].type = "area"
			matrix[py][px-3].type = "ship"
			matrix[py-1][px-3].type = "area"
			matrix[py+1][px-3].type = "area"
			matrix[py][px-4].type = "area"
			matrix[py+1][px-4].type = "area"
			matrix[py+1][px-4].type = "area"
			matrix[py][px+1].type = "area"
			matrix[py-1][px+1].type = "area"
			matrix[py+1][px+1].type = "area"
			placed = true

		}

		if(dir == 1 && (px + 3) < 10 && py != 10 && check == true) {
			matrix[py][px].type = "ship"
			matrix[py-1][px].type = "area"
			matrix[py+1][px].type = "area"
			matrix[py][px+1].type = "ship"
			matrix[py-1][px+1].type = "area"
			matrix[py+1][px+1].type = "area"
			matrix[py][px+2].type = "ship"
			matrix[py-1][px+2].type = "area"
			matrix[py+1][px+2].type = "area"
			matrix[py][px+3].type = "ship"
			matrix[py-1][px+3].type = "area"
			matrix[py+1][px+3].type = "area"
			matrix[py][px+4].type = "area"
			matrix[py+1][px+4].type = "area"
			matrix[py-1][px+4].type = "area"
			matrix[py][px-1].type = "area"
			matrix[py+1][px-1].type = "area"
			matrix[py-1][px-1].type = "area"
			placed = true

		}

		if(dir == 0 && py == 10 && px == 1 && check == true){

			matrix[py][px].type = "ship"
			matrix[py][px+1].type = "area"
			matrix[py-1][px].type = "ship"
			matrix[py-1][px+1].type = "area"
			matrix[py-2][px].type = "ship"
			matrix[py-2][px+1].type = "area"
			matrix[py-3][px].type = "ship"
			matrix[py-3][px+1].type = "area"
			matrix[py-4][px+1].type = "area"
			matrix[py-4][px].type = "area"
			placed = true

		}

		if(dir == 1 && py == 10 && px == 1 && check == true){

			matrix[py][px].type = "ship"
			matrix[py-1][px].type = "area"
			matrix[py][px+1].type = "ship"
			matrix[py-1][px+1].type = "area"
			matrix[py][px+2].type = "ship"
			matrix[py-1][px+2].type = "area"
			matrix[py][px+3].type = "ship"
			matrix[py-1][px+3].type = "area"
			matrix[py][px+4].type = "area"
			matrix[py-1][px+4].type = "area"
			placed = true

		}

		if(dir == 0 && py == 10 && px == 10 && check == true){

			matrix[py][px].type = "ship"
			matrix[py][px-1].type = "area"
			matrix[py-1][px].type = "ship"
			matrix[py-1][px-1].type = "area"
			matrix[py-2][px].type = "ship"
			matrix[py-2][px-1].type = "area"
			matrix[py-3][px].type = "ship"
			matrix[py-3][px-1].type = "area"
			matrix[py-4][px-1].type = "area"
			matrix[py-4][px].type = "area"
			placed = true

		}

		if(dir == 1 && py == 10 && px == 10 && check == true){

			matrix[py][px].type = "ship"
			matrix[py-1][px].type = "area"
			matrix[py][px-1].type = "ship"
			matrix[py-1][px-1].type = "area"
			matrix[py][px-2].type = "ship"
			matrix[py-1][px-2].type = "area"
			matrix[py][px-3].type = "ship"
			matrix[py-1][px-3].type = "area"
			matrix[py][px-4].type = "area"
			matrix[py-1][px-4].type = "area"
			placed = true

		}

		if(dir == 0 && py == 1 && px == 10 && check == true){

			matrix[py][px].type = "ship"
			matrix[py][px-1].type = "area"
			matrix[py+1][px].type = "ship"
			matrix[py+1][px-1].type = "area"
			matrix[py+2][px].type = "ship"
			matrix[py+2][px-1].type = "area"
			matrix[py+3][px].type = "ship"
			matrix[py+3][px-1].type = "area"
			matrix[py+4][px-1].type = "area"
			matrix[py+4][px].type = "area"
			placed = true

		}

		if(dir == 1 && py == 1 && px == 10 && check == true){

			matrix[py][px].type = "ship"
			matrix[py+1][px].type = "area"
			matrix[py][px-1].type = "ship"
			matrix[py+1][px-1].type = "area"
			matrix[py][px-2].type = "ship"
			matrix[py+1][px-2].type = "area"
			matrix[py][px-3].type = "ship"
			matrix[py+1][px-3].type = "area"
			matrix[py][px-4].type = "area"
			matrix[py+1][px-4].type = "area"
			placed = true

		}
		if (placed == true){
			count++
		}

	}
	
}

place();
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