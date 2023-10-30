const express = require("express");
const cors = require("cors");
const app = express();

const morgan = require('morgan');


require('dotenv').config()

const http = require('http').createServer(app)

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on(
  "connection",
  (userSocket) => {
    console.log("Socket connected with socket id -> ", userSocket.id)
    userSocket.on("send_message", (data) => {
      console.log('userSocket.on -> "send_message" -> data -> ', data)
      // to other users
      userSocket.broadcast.emit("receive_message", data);
      // send back to user itself
      userSocket.emit(
        'send_message_sendback',
        {
          // message: "CALLBACK FROM SERVER",
          message: data,
        }
      );
    });
    userSocket.on("JoinTable", (data) => {
      console.log('userSocket.on -> "JoinTable" -> data -> ', data)
      // to other users
      userSocket.broadcast.emit("JoinTable", data);
      // send back to user itself
      userSocket.emit(
        'JoinTable',
        {
          data,
        }
      );
    });
    userSocket.on("JoinTable_response", (data) => {
      console.log('userSocket.on -> "send_message" -> data -> ', data)
      // to other users
      userSocket.broadcast.emit("JoinTable_response", data);
      // send back to user itself
      userSocket.emit(
        'JoinTable_response',
        {
          data,
        }
      );
    });
    userSocket.on("orderTable", (data) => {

      // to other users
      userSocket.broadcast.emit("orderTable", data);
      // send back to user itself
      userSocket.emit(
        'orderTable',
        {
          data,
        }
      );
    });
  }
);

global.__basedir = __dirname;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));


const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to klitchy backend application." });
});

app.use(express.static('resources/uploads/'));

require("./app/routes/category.routes")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/food.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/resto.routes")(app);
require("./app/routes/tableResto.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/files.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

http.listen(
  3030,
  () => {
    console.log('Server is running at port ' + 3030);
  }
);