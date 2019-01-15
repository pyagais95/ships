const Cell = require('./Cell')
const Ship = require('./Ship')
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

module.exports = Field