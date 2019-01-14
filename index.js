const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const classes = require('./classes/classes');

const Field = classes.Field;
const Cell = classes.Cell;
const Ship = classes.Ship;
const Room = classes.Room;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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
