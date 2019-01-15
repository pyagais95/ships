class Room{
  constructor(player1, player2, field1, field2, count, turn){
    this.player1;
    this.player2;
    this.field1;
    this.field2;
    this.count = 1;
    this.turn = 3;
  }

  checkShips (array) {
    for (let i = 0; i < array.length; i++) {
      let c = 0;
      for (let j = 0; j < array[i].arr.length; j++) {
        if (array[i].arr[j].type === "shot") {
          c++
        }
      }
      if (c === array[i].size) {
        for (let j = 0; j < array[i].arr.length; j++) {
          if (array[i].arr[j].type === "area") {
            array[i].arr[j].type = "miss"
          }
        }
      }
    }
  };

  compareCells (field, cell) {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {

        if (field[i][j].posx === cell.posx && field[i][j].posy === cell.posy) {
          field[i][j].type = cell.type;
        }
      }
    }
  };
}

module.exports = Room;