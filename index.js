const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

class Field {
  constructor(matrix, ships, socket, count) {
    this.matrix;
    this.ships;
    this.socket;
    this.count = 0;
  }

  createMatrix () {
    const ships = [];
    let matrix = [];
    const size = 10;
    for (let i = 0; i <= size; i++) {
      let arr = [];
      for (let j = 0; j <= size; j++) {
        let cell = new Cell();
        cell.posx = i;
        cell.posy = j;
        arr.push(cell)
      }
      matrix.push(arr)
    }

    const placeShips = (size) => {
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
    };

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
    this.matrix = matrix;
    this.ships = ships;
  };
}

class Cell {
  constructor(type = "sea", posx = 0, posy = 0) {
    this.type = type;
    this.posx;
    this.posy;
  }
}

class Ship {
  constructor(size, arr, inj) {
    this.size;
    this.arr = [];
    this.inj = 0;
  }
}

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

app.get('/',  (req, res) => {
  res.render('main', {waiters});
});

let rooms = [];
let waiters = [];

io.on('connection', (socket) => {

    socket.on('createRoom', () => {
        socket.join(socket.id);
        waiters.push(socket.id)
    });

    socket.on('join', (roomID) => {
      socket.join(roomID);
      let room = new Room();
      let field1 = new Field();
      field1.createMatrix();
      field1.socket = roomID;
      let field2 = new Field();
      field2.createMatrix();
      field2.socket = socket.id;
      room.player1 = roomID;
      room.player2 = socket.id;
      room.field1 = field1;
      room.field2 = field2;
      room.count = 1;
      rooms.push(room);

      let data = {
        field1: room.field1,
        field2: room.field2,
        turn: room.count
      };
      data = JSON.stringify(data);
      io.to(room.player1).emit('gameState', data);

      waiters.forEach((waiter, i) => {
        if(waiter === roomID){
          waiters.splice(i, 1);
        }
      })
    });

  socket.on('turn', (data) => {
    console.log(data);
    rooms.forEach((room, i) => {
      if(room.player1 === socket.id || room.player2 === socket.id){
        let turn = JSON.parse(data);
        let shot = turn.shot;
        let cell = turn.cell;

        if (room.count % 2 === 0) {
          room.compareCells(room.field1.matrix, cell);
          room.checkShips(room.field1.ships);
          if(cell.type === 'shot'){
            room.field1.count++;
            console.log('field 1 inj =  ' + room.field1.count);
            if(room.field1.count === 20){
              room.turn = 4
            }
          }
        } else {
          room.compareCells(room.field2.matrix, cell);
          room.checkShips(room.field2.ships);
          if(cell.type === 'shot'){
            room.field2.count++;
            console.log('field 2 inj =  ' + room.field2.count)
          }
          if(room.field2.count === 20){
            room.turn = 5
          }
        }

        if(room.turn < 4){
          if (shot % 2 === 0) {
            room.count++;
            if (room.count % 2 === 0) {
              room.turn = 2
            } else {
              room.turn = 3
            }
          }
        }

        let newData = {
          field1: room.field1,
          field2: room.field2,
          turn: room.turn
        };

        newData = JSON.stringify(newData);

        io.to(room.player1).emit('gameState', newData)
      }
    })
  });

  socket.on('disconnect', () => {
    console.log('disconnected ' + socket.id);
    waiters.forEach((waiter, i) => {
      if(socket.id === waiter){
        console.log('waiter = ' + waiter + ' ' + 'socket  = ' + socket.id + ' ' + 'i = ' + i)
        waiters.splice(i, 1);
        console.log(waiters)
        socket.emit('hideWaitersList')
      }
    });

    let msg = 'your oponent is left. you win';

    rooms.forEach((room, i) => {
      if(room.player1 === socket.id){
        console.log(room.player1 + ' ' + socket.id);
        io.to(room.player2).emit('leave', msg);
        rooms.splice(i, 1);
      }else if(room.player2 === socket.id){
        console.log(room.player2 + ' ' + socket.id);
        io.to(room.player1).emit('leave', msg);
        rooms.splice(i, 1);
      }
    });
    console.log('rooms = ' + rooms.length)
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
