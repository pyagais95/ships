var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Field{
	constructor(matrix){
		this.matrix
	}
}
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
	this.arr = [],
	this.inj = 0
  }
}

var ships =[]

function mtx (){

	var matrix = []

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

	var count 
	function place (size) {
	var px = Math.floor(Math.random()*10)+1
	var py = Math.floor(Math.random()*10)+1
	var check = true
	var placed = false
	var dir = Math.round(Math.random())

	if(dir === 0){
		if(px + size < 10){
			if(px != 1 && py !=10 && py != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px-1)+i][py].type == "ship"||matrix[(px-1) + i][py-1].type == "ship"||matrix[(px-1) + i][py+1].type == "ship"){
						check = false
					}
				}
			}
			if(px != 1 && py == 10){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py-1].type == "ship"){
						check = false
					}
				}
			}
			if(px != 1 && py == 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py+1].type == "ship"){
						check = false
					}
				}
			}
		}
		if(px + size === 10){
			if(px != 1 && py !=10 && py != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px-1)+i][py].type == "ship"||matrix[(px-1)+i][py-1].type == "ship"||matrix[(px-1)+i][py+1].type == "ship"){
						check = false
					}
				}
			}
			if(px != 1 && py == 10){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px-1)+i][py].type == "ship"||matrix[(px-1)+i][py-1].type == "ship"){
						check = false
					}
				}
			}
			if(px != 1 && py == 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py+1].type == "ship"){
						check = false
					}
				}
			}
		}
		if(px + size > 10){
			if(px != 10 && py != 10 && py != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px+1)-i][py].type == "ship" || matrix[(px+1)-i][py-1].type == "ship"||matrix[(px+1)-i][py+1].type == "ship"){
						check = false
					}
				}
			}

			if(px != 10 && py == 10){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px+1)-i][py].type == "ship" || matrix[(px+1)-i][py-1].type == "ship"){
						check = false
					}
				}
			}
			if(px != 10 && py == 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[(px+1)-i][py].type == "ship" ||matrix[(px+1)-i][py+1].type == "ship"){
						check = false
					}
				}
			}
		}
		if(px === 10){
			if(py !=10 && py != 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px-i][py].type == "ship"||matrix[px-i][py-1].type == "ship"||matrix[px-i][py+1].type == "ship"){
						check = false
					}
				}
			}
			if(py == 10){
				for(let i = 0; i < size+1; i++){
					if(matrix[px-i][py].type == "ship"||matrix[px-i][py-1].type == "ship"){
						check = false
					}
				}
			}
			if(py == 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px-i][py].type == "ship"||matrix[px-i][py+1].type == "ship"){
						check = false
					}
				}
			}
		}
		if(px === 1){
			if(py !=10 && py != 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px+i][py].type == "ship"||matrix[px+i][py-1].type == "ship"||matrix[px+i][py+1].type == "ship"){
						check = false
					}
				}
			}
			if(py == 10){
				for(let i = 0; i < size+1; i++){
					if(matrix[px+i][py].type == "ship"||matrix[px+i][py-1].type == "ship"){
						check = false
					}
				}
			}
			if(py == 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px+i][py].type == "ship"||matrix[px+i][py+1].type == "ship"){
						check = false
					}
				}
			}
		}
	}
	if(dir === 1){
		if((py + size) < 10){
			if(py != 1 && px != 10 && px != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 1 && px === 10){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 1 && px === 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
		}
		if((py + size) === 10){
			if(py != 1 && px != 10 && px != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 1 && px === 10){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 1 && px === 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py-1)+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
						check = false
					}
				}
			}
		}
		if((py + size) > 10){
			if(py != 10 && px != 10 && px != 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py+1)-i].type == "ship"||matrix[px-1][(py+1)-i].type == "ship"||matrix[px+1][(py+1)-i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 10 && px === 10 ){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py+1)-i].type == "ship"||matrix[px-1][(py+1)-i].type == "ship"){
						check = false
					}
				}
			}
			if(py != 10 && px === 1){
				for(let i = 0; i < size+2; i++){
					if(matrix[px][(py+1)-i].type == "ship"|| matrix[px+1][(py+1)-i].type == "ship"){
						check = false
					}
				}
			}
		}

		if(py === 10){
			if(px != 10 && px != 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py-i].type == "ship"||matrix[px-1][py-i].type == "ship"||matrix[px+1][py-i].type == "ship"){
						check = false
					}
				}
			}
			if(px === 10 ){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py-i].type == "ship"||matrix[px-1][py-i].type == "ship"){
						check = false
					}
				}
			}
			if(px === 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py-i].type == "ship"||matrix[px+1][py-i].type == "ship"){
						check = false
					}
				}
			}
		}
		if(py === 1){
			if(px != 10 && px != 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py+i].type == "ship"||matrix[px-1][py+i].type == "ship"||matrix[px+1][py+i].type == "ship"){
						check = false
					}
				}
			}
			if(px == 10){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py+i].type == "ship"||matrix[px-1][py+i].type == "ship"){
						check = false
					}
				}
			}
			if(px == 1){
				for(let i = 0; i < size+1; i++){
					if(matrix[px][py+i].type == "ship"||matrix[px+1][py+i].type == "ship"){
						check = false
					}
				}
			}
		}
	}

	console.log(check)

	if(dir === 0){
		if((px + size) <= 10 && px != 1){
			if(py != 10 && py != 1 && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px-1)+i][py].type = "area"
					ship.arr.push(matrix[(px-1)+i][py])
					matrix[(px-1)+i][py-1].type = "area"
					ship.arr.push(matrix[(px-1)+i][py-1])
					matrix[(px-1)+i][py+1].type = "area"
					ship.arr.push(matrix[(px-1)+i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py == 10  && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px-1)+i][py].type = "area"
					ship.arr.push(matrix[(px-1)+i][py])
					matrix[(px-1)+i][py-1].type = "area"
					ship.arr.push(matrix[(px-1)+i][py-1])
				}
				for(let i = 0; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py == 1 && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px-1)+i][py].type = "area"
					ship.arr.push(matrix[(px-1)+i][py])
					matrix[(px-1)+i][py+1].type = "area"
					ship.arr.push(matrix[(px-1)+i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}

		if((px + size) > 10 && px != 10){
			if(py != 10 && py != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px+1)-i][py].type = "area"
					ship.arr.push(matrix[(px+1)-i][py])
					matrix[(px+1)-i][py-1].type = "area"
					ship.arr.push(matrix[(px+1)-i][py-1])
					matrix[(px+1)-i][py+1].type = "area"
					ship.arr.push(matrix[(px+1)-i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}


			if(py === 10  && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px+1)-i][py].type = "area"
					ship.arr.push(matrix[(px+1)-i][py])
					matrix[(px+1)-i][py-1].type = "area"
					ship.arr.push(matrix[(px+1)-i][py-1])
				}
				for(let i = 0; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(py === 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[(px+1)-i][py].type = "area"
					ship.arr.push(matrix[(px+1)-i][py])
					matrix[(px+1)-i][py+1].type = "area"
					ship.arr.push(matrix[(px+1)-i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}

		if(px === 1){
			if(px == 1 && py != 10 && py != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size; i++){
					matrix[px+i][py].type = "area"
					ship.arr.push(matrix[px+i][py])
					matrix[px+i][py-1].type = "area"
					ship.arr.push(matrix[px+i][py-1])
					matrix[px+i][py+1].type = "area"
					ship.arr.push(matrix[px+i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(px == 1 && py == 10 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px+i][py].type = "area"
					ship.arr.push(matrix[px+i][py])
					matrix[px+i][py-1].type = "area"
					ship.arr.push(matrix[px+i][py-1])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(px == 1 && py == 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px+i][py].type = "area"
					ship.arr.push(matrix[px+i][py])
					matrix[px+i][py+1].type = "area"
					ship.arr.push(matrix[px+i][py+1])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px+i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}

		if(px === 10){
			if(px == 10 && py != 10 && py != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size; i++){
					matrix[px-i][py].type = "area"
					ship.arr.push(matrix[px-i][py])
					matrix[px-i][py-1].type = "area"
					ship.arr.push(matrix[px-i][py-1])
					matrix[px-i][py+1].type = "area"
					ship.arr.push(matrix[px-i][py+1])
				}
				for(let i = 0; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(px == 10 && py == 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px-i][py].type = "area"
					ship.arr.push(matrix[px-i][py])
					matrix[px-i][py+1].type = "area"
					ship.arr.push(matrix[px-i][py+1])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(px == 10 && py == 10 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px-i][py].type = "area"
					ship.arr.push(matrix[px-i][py])
					matrix[px-i][py-1].type = "area"
					ship.arr.push(matrix[px-i][py-1])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px-i][py].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}
	}

	if(dir === 1){
		if((py + size) <= 10){
			if(py != 1 && px != 10 && px != 1 && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py-1)+i].type = "area"
					ship.arr.push(matrix[px][(py-1)+i])
					matrix[px-1][(py-1)+i].type = "area"
					ship.arr.push(matrix[px-1][(py-1)+i])
					matrix[px+1][(py-1)+i].type = "area"
					ship.arr.push(matrix[px+1][(py-1)+i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(py != 1 && px == 10  && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py-1)+i].type = "area"
					ship.arr.push(matrix[px][(py-1)+i])
					matrix[px-1][(py-1)+i].type = "area"
					ship.arr.push(matrix[px-1][(py-1)+i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}

			if(py != 1 && px == 1 && check == true) {
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py-1)+i].type = "area"
					ship.arr.push(matrix[px][(py-1)+i])
					matrix[px+1][(py-1)+i].type = "area"
					ship.arr.push(matrix[px+1][(py-1)+i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}

		if((py + size) > 10){
			if(py != 10 && px != 10 && px != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py+1)-i].type = "area"
					ship.arr.push(matrix[px][(py+1)-i])
					matrix[px-1][(py+1)-i].type = "area"
					ship.arr.push(matrix[px-1][(py+1)-i])
					matrix[px+1][(py+1)-i].type = "area"
					ship.arr.push(matrix[px+1][(py+1)-i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py != 10 && px == 10  && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py+1)-i].type = "area"
					ship.arr.push(matrix[px][(py+1)-i])
					matrix[px-1][(py+1)-i].type = "area"
					ship.arr.push(matrix[px-1][(py+1)-i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py != 10 && px == 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size+1; i++){
					matrix[px][(py+1)-i].type = "area"
					ship.arr.push(matrix[px][(py+1)-i])
					matrix[px+1][(py+1)-i].type = "area"
					ship.arr.push(matrix[px+1][(py+1)-i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}
		
		if(py === 10){
			if(py === 10 && px != 10 && px != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size; i++){
					matrix[px][py-i].type = "area"
					ship.arr.push(matrix[px][py-i])
					matrix[px-1][py-i].type = "area"
					ship.arr.push(matrix[px-1][py-i])
					matrix[px+1][py-i].type = "area"
					ship.arr.push(matrix[px+1][py-i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py === 10 && px === 10 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px][py-i].type = "area"
					ship.arr.push(matrix[px][py-i])
					matrix[px-1][py-i].type = "area"
					ship.arr.push(matrix[px-1][py-i])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py === 10 && px === 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px][py-i].type = "area"
					ship.arr.push(matrix[px][py-i])
					matrix[px+1][py-i].type = "area"
					ship.arr.push(matrix[px+1][py-i])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px][py-i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
		}
		
		if(py === 1){
			if(py === 1 && px != 10 && px != 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0; i <= size; i++){
					matrix[px][py+i].type = "area"
					ship.arr.push(matrix[px][py+i])
					matrix[px-1][py+i].type = "area"
					ship.arr.push(matrix[px-1][py+i])
					matrix[px+1][py+i].type = "area"
					ship.arr.push(matrix[px+1][py+i])
				}
				for(let i = 0; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py === 1 && px === 10 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px][py+i].type = "area"
					ship.arr.push(matrix[px][py+i])
					matrix[px-1][py+i].type = "area"
					ship.arr.push(matrix[px-1][py+i])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
			}
			if(py === 1 && px === 1 && check == true){
				var ship = new Ship()
				ship.size = size
				for(let i = 0 ; i <= size; i++){
					matrix[px][py+i].type = "area"
					ship.arr.push(matrix[px][py+i])
					matrix[px+1][py+i].type = "area"
					ship.arr.push(matrix[px+1][py+i])
				}
				for(let i = 0 ; i < size; i++){
					matrix[px][py+i].type = "ship"
				}
				ships.push(ship)
				placed = true
				}
			}	
		}
		if (placed == true){
			count++
		}
	}

	count = 0
	while (count < 10){

		if(count == 0){
			var ship = new Ship()
			place(4)
		}if(count > 0 && count <= 2){
			var ship = new Ship()
			place(3)
		}if(count > 2 && count <= 5){
			var ship = new Ship()
			place(2)
		}if(count > 5 && count<= 9){
			var ship = new Ship()
			place(1)
		}
	}
	console.log(ships)
	return(matrix)
}

function checkShips () {
	for(let i = 0; i < ships.length; i++){
		let c = 0
		for(let j = 0; j < ships[i].arr.length; j++){
			if(ships[i].arr[j].type === "shot"){
				c++
			}
		}
		if(c == ships[i].size){
			for(let j = 0; j < ships[i].arr.length; j++){
				if(ships[i].arr[j].type == "area"){
					ships[i].arr[j].type = "miss"
				}
			}
		}
	}
}

var turn = 1
var ships1 = 0
var ships2 = 0

var field1 = new Field()
field1.matrix = mtx()
console.log(field1)
var field2 = new Field()
field2.matrix = mtx()

function draw (){
	ctx.clearRect(0, 0, innerWidth, innerHeight)
	var y = 50;
	for(let i = 0; i < 11; i++){
	var x = 50;
		for(let j = 0; j < 11; j++){
			if(field1.matrix[j][i].type == "sea"){
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field1.matrix[j][i].type == "area"){
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50

			}else if(field1.matrix[j][i].type == "ship"){
				ctx.fillStyle = '#e5761c';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(typeof(field1.matrix[j][i]) == "number"){
				ctx.fillStyle = 'black';
				ctx.font = "italic 30pt Arial";
				ctx.fillText(field1.matrix[j][i], x, y+40);
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field1.matrix[j][i].type == "shot"){
				ctx.fillStyle = 'red';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field1.matrix[j][i].type == "miss"){
				ctx.fillStyle = 'black';
				ctx.fillRect(x+20, y+20 , 10, 10)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}
		}
		y = y+50
	}

	y = 50

	for(let i = 0; i < 11; i++){
	var x = 800;
		for(let j = 0; j < 11; j++){
			if(field2.matrix[j][i].type == "sea"){
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field2.matrix[j][i].type == "area"){
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50

			}else if(field2.matrix[j][i].type == "ship"){
				ctx.fillStyle = 'white';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(typeof(field2.matrix[j][i]) == "number"){
				ctx.fillStyle = 'black';
				ctx.font = "italic 30pt Arial";
				ctx.fillText(field2.matrix[j][i], x, y+40);
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field2.matrix[j][i].type == "shot"){
				ctx.fillStyle = 'red';
				ctx.fillRect(x, y, 50, 50)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}else if(field2.matrix[j][i].type == "miss"){
				ctx.fillStyle = 'black';
				ctx.fillRect(x+20, y+20 , 10, 10)
				ctx.strokeRect(x, y, 50, 50)
				x = x+50
			}
		}
		y = y+50
	}
}


var refresh = setInterval(function() {
  draw()
  if(ships1 == 20 ){
  	alert("player2 win")
  	clearInterval(refresh)
  }
  if(ships2 == 20){
  	alert("player1 win")
  	clearInterval(refresh)
  }
}, 100);

canvas.onclick = function(event){
	var x = event.offsetX
	var y = event.offsetY
	x = Math.floor(x/50)
	y = Math.floor(y/50)
	console.log(x-16)
	console.log(y-1)
	console.log(x-1)
	console.log(y-1)

	if (turn % 2 != 0){
		if(x < 12){
			if(field1.matrix[x-1][y-1].type == "ship"){
				field1.matrix[x-1][y-1].type = "shot"
				alert("ранен!")
				ships1++
				console.log("shot")
			} 	
			if(field1.matrix[x-1][y-1].type != "ship" && field1.matrix[x-1][y-1].type != "shot" && field1.matrix[x-1][y-1].type != "miss"){
				field1.matrix[x-1][y-1].type = "miss"
				alert("мимо!")
				turn++
				console.log("miss")
			}
		}
	}

	if(turn % 2 == 0 ){
		if(x > 15){
			if(field2.matrix[x-16][y-1].type == "ship"){
				field2.matrix[x-16][y-1].type = "shot"
				alert("ранен!")
				ships2++
				console.log("shot")
			}
			if(field2.matrix[x-16][y-1].type != "ship" && field2.matrix[x-16][y-1].type != "shot" && field2.matrix[x-16][y-1].type != "miss"){
				field2.matrix[x-16][y-1].type = "miss"
				alert("мимо!")
				turn++
				console.log("miss")
			}		
		}
	}
	checkShips()
}