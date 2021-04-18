import "/__/firebase/8.4.1/firebase-app.js";
import "/__/firebase/8.4.1/firebase-analytics.js";
import "/__/firebase/init.js";


const express = require("express");
const http = require("http");
var cors = require('cors')
const socketIO = require("socket.io");

const port = 8000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server, {cors: {origin: "*" }});


const { 
  v1: uuidv1,
} = require('uuid');

const clients = {};



{/* <script src="/__/firebase/8.4.1/firebase-app.js"></script>
<script src="/__/firebase/8.4.1/firebase-analytics.js"></script>
<script src="/__/firebase/init.js"></script>  */}


function initiateShareCanvas(requestData, responseCallback) {
    var srcId = requestData.srcId;
    var destId = requestData.destId;
    console.log("Client " + srcId + " attempting to join " + destId);

    // Check both clients exist and that neither are currently in a session
    if((srcId in clients) && (destId in clients) && (srcId !== destId)) {

        clients[destId].emit("shareCanvasRequest", requestData, (responseData) => {
            console.log("responseCallBack");
            console.log(responseData);
            // responseCallback(responseData);
        })
    } 
    else {
        console.log("could not find srcId or destId");
        // responseCallback("Could not find user with the requested FriendID " + destId);
    }
}

function syncUpdate(requestData, responseCallback) {
    var srcId = requestData.srcId;
    var destId = requestData.destId;
    console.log("Client " + srcId + " attempting to update " + destId);

    // Check both clients exist and that neither are currently in a session
    if((srcId in clients) && (destId in clients) && (srcId !== destId)) {

      clients[destId].emit("updateCanvas", requestData, (responseData) => {
          console.log("responseCallBack");
          console.log(responseData);
          // responseCallback(responseData);
      })
  } 
  else {
      console.log("could not find srcId or destId");
      // responseCallback("Could not find user with the requested FriendID " + destId);
  }
}

io.on("connection", (socket) => {
  var uuid = uuidv1().slice(0,8);
  clients[uuid] = socket;

    console.log("current state of clients:");
    for(const [key, value] of Object.entries(clients)) {
      console.log("  UUID: " + key);
    }
  
  socket.emit("uuid", uuid);

  socket.on("initiateShareCanvas", (data, callback) => initiateShareCanvas(data));
//   socket.on("shareCanvasResponse" (data,))

  socket.on("syncUpdate", (data, callback) => syncUpdate(data));

  socket.on("disconnect", () => {
    // remove their unique id from dict
    socket.removeAllListeners();
    console.log("Disconnect, removing " + uuid);
    delete clients[uuid];
  })

  socket.on("connect_error", (error) => {
      socket.removeAllListeners();
      console.log("Connection Error: " + error);
      delete clients[uuid];
  });
});


server.listen(port, () => console.log("Listening on port: " + port));

