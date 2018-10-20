module.exports = function place (size) {

	var count = 0

		var px = 1//Math.floor(Math.random()*10)+1
		var py = Math.floor(Math.random()*10)+1
		var check = true
		var placed = false
		console.log("px = " + px  + "py = " + py)
		var dir = Math.round(Math.random())
		console.log(dir)

		if(dir == 0 && (px + size) < 10 && px != 1 && py !=10 && py != 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py-1].type == "ship"||matrix[(px-1) + i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && (px + size) < 10 && px != 1 && py == 10){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py-1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && (px + size) < 10 && px != 1 && py == 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px-1) + i][py].type == "ship"||matrix[(px-1) + i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && (px + size) > 10 && px != 10 && py != 10 && py != 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px+1)-i][py].type == "ship" || matrix[(px+1)-i][py-1].type == "ship"||matrix[(px+1)-i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && (px + size) > 10 && px != 10 && py == 10){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px+1)-i][py].type == "ship" || matrix[(px+1)-i][py-1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && (px + size) > 10 && px != 10 && py == 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[(px+1)-i][py].type == "ship" ||matrix[(px+1)-i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 10 && py !=10 && py != 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px-i][py].type == "ship"||matrix[px-i][py-1].type == "ship"||matrix[px-i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 10 && py == 10){
			for(let i = 0; i < size+1; i++){
				if(matrix[px-i][py].type == "ship"||matrix[px-i][py-1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 10 && py == 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px-i][py].type == "ship"||matrix[px-i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 1 && py !=10 && py != 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px+i][py].type == "ship"||matrix[px+i][py-1].type == "ship"||matrix[px+i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 1 && py == 10){
			for(let i = 0; i < size+1; i++){
				if(matrix[px+i][py].type == "ship"||matrix[px+i][py-1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 0 && px == 1 && py == 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px+i][py].type == "ship"||matrix[px+i][py+1].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) < 10 && py != 1 && px != 10 && px != 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) < 10 && py != 1 && px == 10){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][(py-1)+i].type == "ship"||matrix[px-1][(py-1)+i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) < 10 && py != 1 && px == 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][py+i].type == "ship"||matrix[px+1][(py-1)+i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) > 10 && py != 10 && px != 10 && px != 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][(py+1)-i].type == "ship"||matrix[px-1][(py+1)-i].type == "ship"||matrix[px+1][(py+1)-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) > 10 && py != 10 && px == 10 ){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][(py+1)-i].type == "ship"||matrix[px-1][(py+1)-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && (py + size) > 10 && py != 10 &&px == 1){
			for(let i = 0; i < size+2; i++){
				if(matrix[px][(py+1)-i].type == "ship"|| matrix[px+1][(py+1)-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 10 && px != 10 && px != 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py-i].type == "ship"||matrix[px-1][py-i].type == "ship"||matrix[px+1][py-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 10 && px == 10 ){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py-i].type == "ship"||matrix[px-1][py-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 10 && px == 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py-i].type == "ship"||matrix[px+1][py-i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 1 && px != 10 && px != 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py+i].type == "ship"||matrix[px-1][py+i].type == "ship"||matrix[px+1][py+i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 1 && px == 10){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py+i].type == "ship"||matrix[px-1][py+i].type == "ship"){
					check = false
				}
			}
		}
		if(dir == 1 && py == 1 && px == 1){
			for(let i = 0; i < size+1; i++){
				if(matrix[px][py+i].type == "ship"||matrix[px+1][py+i].type == "ship"){
					check = false
				}
			}
		}

			
			console.log(check)



		if(dir == 0 && (px + size) <= 10 && px != 1 && py != 10 && py != 1 && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[(px-1)+i][py].type = "area"
				matrix[(px-1)+i][py-1].type = "area"
				matrix[(px-1)+i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px+i][py].type = "ship"
			}
			placed = true
		}

		if(dir == 0 && (px + size) <= 10 && px != 1 && py == 10  && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[(px-1)+i][py].type = "area"
				matrix[(px-1)+i][py-1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px+i][py].type = "ship"
			}
			placed = true
		}

		if(dir == 0 && (px + size) <= 10 && px != 1 && py == 1 && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[(px-1)+i][py].type = "area"
				matrix[(px-1)+i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px+i][py].type = "ship"
			}
			placed = true
		}

		if(dir == 0 && (px + size) > 10 && px != 10 && py != 10 && py != 1 && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[(px+1)-i][py].type = "area"
				matrix[(px+1)-i][py-1].type = "area"
				matrix[(px+1)-i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px-i][py].type = "ship"
			}
				placed = true

		}
		if(dir == 0 && (px + size) > 10 && px != 10 && py == 10  && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[(px+1)-i][py].type = "area"
				matrix[(px+1)-i][py-1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px-i][py].type = "ship"
			}
				placed = true

		}
		if(dir == 0 && (px + size) > 10 && px != 10  && py == 1 && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[(px+1)-i][py].type = "area"
				matrix[(px+1)-i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px-i][py].type = "ship"
			}
				placed = true

		}
		
		if(dir == 0 && px == 10 && py != 10 && py != 1 && check == true){

			for(let i = 0; i <= size; i++){
				matrix[px-i][py].type = "area"
				matrix[px-i][py-1].type = "area"
				matrix[px-i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px-i][py].type = "ship"
			}
				placed = true

		}

		if(dir == 0 && px == 1 && py != 10 && py != 1 && check == true){

			for(let i = 0; i <= size; i++){
				matrix[px+i][py].type = "area"
				matrix[px+i][py-1].type = "area"
				matrix[px+i][py+1].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px+i][py].type = "ship"
			}			placed = true

		}

		if(dir == 1 && (py + size) <= 10 && py != 1 && px != 10 && px != 1 && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[px][(py-1)+i].type = "area"
				matrix[px-1][(py-1)+i].type = "area"
				matrix[px+1][(py-1)+i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py+i].type = "ship"
			}
			placed = true
		}

		if(dir == 1 && (py + size) <= 10 && py != 1 && px == 10  && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[px][(py-1)+i].type = "area"
				matrix[px-1][(py-1)+i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py+i].type = "ship"
			}
			placed = true
		}

		if(dir == 1 && (py + size) <= 10 && py != 1 && px == 1 && check == true) {
			for(let i = 0; i <= size+1; i++){
				matrix[px][(py-1)+i].type = "area"
				matrix[px+1][(py-1)+i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py+i].type = "ship"
			}
			placed = true
		}

		if(dir == 1 && (py + size) > 10 && py != 10 && px != 10 && px != 1 && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[px][(py+1)-i].type = "area"
				matrix[px-1][(py+1)-i].type = "area"
				matrix[px+1][(py+1)-i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py-i].type = "ship"
			}
				placed = true

		}
		if(dir == 1 && (py + size) > 10 && py != 10 && px == 10  && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[px][(py+1)-i].type = "area"
				matrix[px-1][(py+1)-i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py-i].type = "ship"
			}
				placed = true

		}
		if(dir == 1 && (py + size) > 10 && py != 10 && px == 1 && check == true){

			for(let i = 0; i <= size+1; i++){
				matrix[px][(py+1)-i].type = "area"
				matrix[px+1][(py+1)-i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py-i].type = "ship"
			}
				placed = true

		}
		
		if(dir == 1 && py == 10 && px != 10 && px != 1 && check == true){

			for(let i = 0; i <= size; i++){
				matrix[px][py-i].type = "area"
				matrix[px-1][py-i].type = "area"
				matrix[px+1][py-i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py-i].type = "ship"
			}
				placed = true

		}

		if(dir == 1 && py == 1 && px != 10 && px != 1 && check == true){

			for(let i = 0; i <= size; i++){
				matrix[px][py+i].type = "area"
				matrix[px-1][py+i].type = "area"
				matrix[px+1][py+i].type = "area"
			}
			for(let i = 0; i < size; i++){
				matrix[px][py+i].type = "ship"
			}			placed = true

		}



		if(dir == 0 && px == 10 && py == 1 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px-i][py].type = "area"
				matrix[px-i][py+1].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px-i][py].type = "ship"
			}
			placed = true

		}

		if(dir == 1 && px == 10 && py == 1 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px][py+i].type = "area"
				matrix[px-1][py+i].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px][py+i].type = "ship"
			}
			placed = true

		}

		if(dir == 0 && px == 10 && py == 10 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px-i][py].type = "area"
				matrix[px-i][py-1].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px-i][py].type = "ship"
			}
			placed = true

		}

		if(dir == 1 && px == 10 && py == 10 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px][py-i].type = "area"
				matrix[px-1][py-i].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px][py-i].type = "ship"
			}
			placed = true

		}

		if(dir == 0 && px == 1 && py == 10 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px+i][py].type = "area"
				matrix[px+i][py-1].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px+i][py].type = "ship"
			}
			placed = true

		}

		if(dir == 1 && px == 1 && py == 10 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px][py-i].type = "area"
				matrix[px+1][py-i].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px][py-i].type = "ship"
			}
			placed = true

		}

		if(dir == 0 && px == 1 && py == 1 && check == true){
			for(let i = 0 ; i <= size+1; i++){
				matrix[px+i][py].type = "area"
				matrix[px+i][py+1].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px+i][py].type = "ship"
			}
			placed = true

		}

		if(dir == 1 && px == 1 && py == 1 && check == true){

			for(let i = 0 ; i <= size+1; i++){
				matrix[px][py+i].type = "area"
				matrix[px+1][py+i].type = "area"
			}
			for(let i = 0 ; i < size+1; i++){
				matrix[px][py+i].type = "ship"
			}
			placed = true

		}
		if (placed == true){
			count++
		}
	
}