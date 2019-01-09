const app = require('express')();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

class Field {
  constructor(matrix, ships, socket, count) {
    this.matrix,
      this.ships,
      this.socket,
      this.count = 0
  }
}

class Cell {
  constructor(type, posx, posy) {
    this.type = "sea",
      this.posx = 0,
      this.posy = 0
  }
}

class Ship {
  constructor(size) {
    this.size ,
      this.arr = [],
      this.inj = 0
  }
}

class Room{
  constructor(player1, player2, field1, field2, count, turn){
    this.player1,
      this.player2,
      this.field1,
      this.field2,
      this.count = 1,
      this.turn = 3
  }
}

function createMatrix() {
  let ships = [];
  let matrix = [];

  for (let i = 0; i < 11; i++) {
    let arr = [];
    for (let j = 0; j < 11; j++) {
      let cell = new Cell();
      cell.posx = i;
      cell.posy = j;
      arr.push(cell)
    }
    matrix.push(arr)
  }

  for (let i = 0; i < matrix.length; i++) {
    matrix[i][0] = i;
    matrix[0][i] = i;
  }

  function placeShips(size) {
    let px = Math.floor(Math.random() * 10) + 1;
    let py = Math.floor(Math.random() * 10) + 1;
    let dir = Math.round(Math.random());
    let check = true;
    let placed = false;

    if (dir === 0) {
      if (px + size < 10) {
        if (px !== 1 && py !== 10 && py !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py - 1].type === "ship" || matrix[(px - 1) + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 1 && py === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py - 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 1 && py === 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
      }
      if (px + size === 10) {
        if (px !== 1 && py !== 10 && py !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py - 1].type === "ship" || matrix[(px - 1) + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 1 && py === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py - 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 1 && py === 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[(px - 1) + i][py].type === "ship" || matrix[(px - 1) + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
      }
      if (px + size > 10) {
        if (px !== 10 && py !== 10 && py !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px + 1) - i][py].type === "ship" || matrix[(px + 1) - i][py - 1].type === "ship" || matrix[(px + 1) - i][py + 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 10 && py === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px + 1) - i][py].type === "ship" || matrix[(px + 1) - i][py - 1].type === "ship") {
              check = false
            }
          }
        }
        if (px !== 10 && py === 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[(px + 1) - i][py].type === "ship" || matrix[(px + 1) - i][py + 1].type === "ship") {
              check = false
            }
          }
        }
      }
      if (px === 10) {
        if (py !== 10 && py !== 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px - i][py].type === "ship" || matrix[px - i][py - 1].type === "ship" || matrix[px - i][py + 1].type === "ship") {
              check = false
            }
          }
        }
        if (py === 10) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px - i][py].type === "ship" || matrix[px - i][py - 1].type === "ship") {
              check = false
            }
          }
        }
        if (py === 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px - i][py].type === "ship" || matrix[px - i][py + 1].type === "ship") {
              check = false
            }
          }
        }
      }
      if (px === 1) {
        if (py !== 10 && py !== 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px + i][py].type === "ship" || matrix[px + i][py - 1].type === "ship" || matrix[px + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
        if (py === 10) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px + i][py].type === "ship" || matrix[px + i][py - 1].type === "ship") {
              check = false
            }
          }
        }
        if (py === 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px + i][py].type === "ship" || matrix[px + i][py + 1].type === "ship") {
              check = false
            }
          }
        }
      }
    }

    if (dir === 1) {
      if ((py + size) < 10) {
        if (py !== 1 && px !== 10 && px !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px - 1][(py - 1) + i].type === "ship" || matrix[px + 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 1 && px === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px - 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 1 && px === 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px + 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
      }
      if ((py + size) === 10) {
        if (py !== 1 && px !== 10 && px !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px - 1][(py - 1) + i].type === "ship" || matrix[px + 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 1 && px === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px - 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 1 && px === 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py - 1) + i].type === "ship" || matrix[px + 1][(py - 1) + i].type === "ship") {
              check = false
            }
          }
        }
      }
      if ((py + size) > 10) {
        if (py !== 10 && px !== 10 && px !== 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py + 1) - i].type === "ship" || matrix[px - 1][(py + 1) - i].type === "ship" || matrix[px + 1][(py + 1) - i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 10 && px === 10) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py + 1) - i].type === "ship" || matrix[px - 1][(py + 1) - i].type === "ship") {
              check = false
            }
          }
        }
        if (py !== 10 && px === 1) {
          for (let i = 0; i < size + 2; i++) {
            if (matrix[px][(py + 1) - i].type === "ship" || matrix[px + 1][(py + 1) - i].type === "ship") {
              check = false
            }
          }
        }
      }
      if (py === 10) {
        if (px !== 10 && px !== 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py - i].type === "ship" || matrix[px - 1][py - i].type === "ship" || matrix[px + 1][py - i].type === "ship") {
              check = false
            }
          }
        }
        if (px === 10) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py - i].type === "ship" || matrix[px - 1][py - i].type === "ship") {
              check = false
            }
          }
        }
        if (px === 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py - i].type === "ship" || matrix[px + 1][py - i].type === "ship") {
              check = false
            }
          }
        }
      }
      if (py === 1) {
        if (px !== 10 && px !== 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py + i].type === "ship" || matrix[px - 1][py + i].type === "ship" || matrix[px + 1][py + i].type === "ship") {
              check = false
            }
          }
        }
        if (px === 10) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py + i].type === "ship" || matrix[px - 1][py + i].type === "ship") {
              check = false
            }
          }
        }
        if (px === 1) {
          for (let i = 0; i < size + 1; i++) {
            if (matrix[px][py + i].type === "ship" || matrix[px + 1][py + i].type === "ship") {
              check = false
            }
          }
        }
      }
    }

    if (dir === 0) {
      if ((px + size) <= 10 && px !== 1) {
        if (py !== 10 && py !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px - 1) + i][py].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py]);
            matrix[(px - 1) + i][py - 1].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py - 1]);
            matrix[(px - 1) + i][py + 1].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px - 1) + i][py].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py]);
            matrix[(px - 1) + i][py - 1].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py - 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px - 1) + i][py].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py]);
            matrix[(px - 1) + i][py + 1].type = "area";
            ship.arr.push(matrix[(px - 1) + i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if ((px + size) > 10 && px !== 10) {
        if (py !== 10 && py !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px + 1) - i][py].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py]);
            matrix[(px + 1) - i][py - 1].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py - 1]);
            matrix[(px + 1) - i][py + 1].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px + 1) - i][py].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py]);
            matrix[(px + 1) - i][py - 1].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py - 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[(px + 1) - i][py].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py]);
            matrix[(px + 1) - i][py + 1].type = "area";
            ship.arr.push(matrix[(px + 1) - i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if (px === 1) {
        if (px === 1 && py !== 10 && py !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px + i][py].type = "area";
            ship.arr.push(matrix[px + i][py]);
            matrix[px + i][py - 1].type = "area";
            ship.arr.push(matrix[px + i][py - 1]);
            matrix[px + i][py + 1].type = "area";
            ship.arr.push(matrix[px + i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (px === 1 && py === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px + i][py].type = "area";
            ship.arr.push(matrix[px + i][py]);
            matrix[px + i][py - 1].type = "area";
            ship.arr.push(matrix[px + i][py - 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (px === 1 && py === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px + i][py].type = "area";
            ship.arr.push(matrix[px + i][py]);
            matrix[px + i][py + 1].type = "area";
            ship.arr.push(matrix[px + i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px + i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if (px === 10) {
        if (px === 10 && py !== 10 && py !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px - i][py].type = "area";
            ship.arr.push(matrix[px - i][py]);
            matrix[px - i][py - 1].type = "area";
            ship.arr.push(matrix[px - i][py - 1]);
            matrix[px - i][py + 1].type = "area";
            ship.arr.push(matrix[px - i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (px === 10 && py === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px - i][py].type = "area";
            ship.arr.push(matrix[px - i][py]);
            matrix[px - i][py + 1].type = "area";
            ship.arr.push(matrix[px - i][py + 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (px === 10 && py === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px - i][py].type = "area";
            ship.arr.push(matrix[px - i][py]);
            matrix[px - i][py - 1].type = "area";
            ship.arr.push(matrix[px - i][py - 1])
          }
          for (let i = 0; i < size; i++) {
            matrix[px - i][py].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
    }

    if (dir === 1) {
      if ((py + size) <= 10) {
        if (py !== 1 && px !== 10 && px !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px][(py - 1) + i]);
            matrix[px - 1][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px - 1][(py - 1) + i]);
            matrix[px + 1][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px + 1][(py - 1) + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py !== 1 && px === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px][(py - 1) + i]);
            matrix[px - 1][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px - 1][(py - 1) + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py !== 1 && px === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px][(py - 1) + i]);
            matrix[px + 1][(py - 1) + i].type = "area";
            ship.arr.push(matrix[px + 1][(py - 1) + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if ((py + size) > 10) {
        if (py !== 10 && px !== 10 && px !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px][(py + 1) - i]);
            matrix[px - 1][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px - 1][(py + 1) - i]);
            matrix[px + 1][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px + 1][(py + 1) - i]);
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py !== 10 && px === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px][(py + 1) - i]);
            matrix[px - 1][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px - 1][(py + 1) - i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py !== 10 && px === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size + 1; i++) {
            matrix[px][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px][(py + 1) - i]);
            matrix[px + 1][(py + 1) - i].type = "area";
            ship.arr.push(matrix[px + 1][(py + 1) - i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if (py === 10) {
        if (py === 10 && px !== 10 && px !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py - i].type = "area";
            ship.arr.push(matrix[px][py - i]);
            matrix[px - 1][py - i].type = "area";
            ship.arr.push(matrix[px - 1][py - i]);
            matrix[px + 1][py - i].type = "area";
            ship.arr.push(matrix[px + 1][py - i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 10 && px === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py - i].type = "area";
            ship.arr.push(matrix[px][py - i]);
            matrix[px - 1][py - i].type = "area";
            ship.arr.push(matrix[px - 1][py - i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 10 && px === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py - i].type = "area";
            ship.arr.push(matrix[px][py - i]);
            matrix[px + 1][py - i].type = "area";
            ship.arr.push(matrix[px + 1][py - i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py - i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
      if (py === 1) {
        if (py === 1 && px !== 10 && px !== 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py + i].type = "area";
            ship.arr.push(matrix[px][py + i]);
            matrix[px - 1][py + i].type = "area";
            ship.arr.push(matrix[px - 1][py + i]);
            matrix[px + 1][py + i].type = "area";
            ship.arr.push(matrix[px + 1][py + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 1 && px === 10 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py + i].type = "area";
            ship.arr.push(matrix[px][py + i]);
            matrix[px - 1][py + i].type = "area";
            ship.arr.push(matrix[px - 1][py + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
        if (py === 1 && px === 1 && check === true) {
          let ship = new Ship();
          ship.size = size;
          for (let i = 0; i <= size; i++) {
            matrix[px][py + i].type = "area";
            ship.arr.push(matrix[px][py + i]);
            matrix[px + 1][py + i].type = "area";
            ship.arr.push(matrix[px + 1][py + i])
          }
          for (let i = 0; i < size; i++) {
            matrix[px][py + i].type = "ship"
          }
          ships.push(ship);
          placed = true
        }
      }
    }

    if (placed === true) {
      count++
    }
  }

  let count = 0;
  while (count < 10) {

    if (count === 0) {
      let ship = new Ship();
      placeShips(4)
    }
    if (count > 0 && count <= 2) {
      let ship = new Ship();
      placeShips(3)
    }
    if (count > 2 && count <= 5) {
      let ship = new Ship();
      placeShips(2)
    }
    if (count > 5 && count <= 9) {
      let ship = new Ship();
      placeShips(1)
    }
  }
  return {
    matrix: matrix,
    ships: ships
  }
}

function checkShips(array) {
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
}

function compareCells(field, cell) {
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {

      if (field[i][j].posx === cell.posx && field[i][j].posy === cell.posy) {
        field[i][j].type = cell.type;
      }
    }
  }
}

app.get('/', function (req, res) {
  res.render('main', {waiters});
});

let rooms = [];
let waiters = [];

io.on('connection', function (socket) {

    socket.on('createRoom', function () {
        socket.join(socket.id);
        waiters.push(socket.id)
    });

    socket.on('join', function(msg){
      socket.join(msg);
      let room = new Room();
      let f1 = createMatrix();
      let field1 = new Field();
      field1.matrix = f1.matrix;
      field1.ships = f1.ships;
      field1.socket = msg;
      let f2 = createMatrix();
      let field2 = new Field();
      field2.matrix = f2.matrix;
      field2.ships = f2.ships;
      field2.socket = socket.id;
      room.player1 = msg;
      room.player2 = socket.id;
      room.field1 = field1;
      room.field2 = field2;
      room.count = 1;
      rooms.push(room);

      let message = JSON.stringify(room.field1) + "split" + JSON.stringify(room.field2) + JSON.stringify(1);
      io.to(room.player1).emit('message', message);

      for(let i = 0; i < waiters.length; i++){
        if(waiters[i] === msg){
          waiters.splice(waiters[i], 1);
        }
      }
    });

  socket.on('mes', function (msg) {
    for(let i = 0; i < rooms.length; i ++){
      if(rooms[i].player1 === socket.id || rooms[i].player2 === socket.id){

        let shot = parseInt(msg[msg.length - 1]);
        let cell = msg.substring(0, msg.length - 1);
        cell = JSON.parse(cell);

        if (rooms[i].count % 2 === 0) {
          compareCells(rooms[i].field1.matrix, cell);
          checkShips(rooms[i].field1.ships);
          if(cell.type === 'shot'){
            rooms[i].field1.count++;
            console.log('field 1 inj =  ' + rooms[i].field1.count);
            if(rooms[i].field1.count === 20){
              rooms[i].turn = 4
            }
          }
        } else {
          compareCells(rooms[i].field2.matrix, cell);
          checkShips(rooms[i].field2.ships);
          if(cell.type === 'shot'){
            rooms[i].field2.count++;
            console.log('field 2 inj =  ' + rooms[i].field2.count)
          }
          if(rooms[i].field2.count === 20){
            rooms[i].turn = 5
          }
        }

        if(rooms[i].turn < 4){
          if (shot % 2 === 0) {
            rooms[i].count++;
            if (rooms[i].count % 2 === 0) {
              rooms[i].turn = 2
            } else {
              rooms[i].turn = 3
            }
          }
        }
        console.log(rooms[i].turn)

        msg = JSON.stringify(rooms[i].field1) + "split" + JSON.stringify(rooms[i].field2) + JSON.stringify(rooms[i].turn);
        io.to(rooms[i].player1).emit('message', msg)
      };
    }
  });
  socket.on('disconnect', function () {
    console.log('disconnected ' + socket.id);
    for(let i = 0; i < waiters.length; i++){
      if(socket.id === waiters[i]){
        waiters.splice(waiters[i], 1);
      }
    }
    let msg = 'your oponent is left. you win';
    for(let i = 0; i < rooms.length; i++){
      if(rooms[i].player1 === socket.id){
        console.log(rooms[i].player1 + ' ' + socket.id);
        io.to(rooms[i].player2).emit('leave', msg);
        rooms.splice(rooms[i], 1);
      }else if(rooms[i].player2 === socket.id){
        console.log(rooms[i].player2 + ' ' + socket.id);
        io.to(rooms[i].player1).emit('leave', msg)
        rooms.splice(rooms[i], 1);
      }
    }
    console.log('rooms = ' + rooms.length)
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
