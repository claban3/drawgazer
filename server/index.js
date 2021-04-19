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

function initiateShareCanvas(requestData, responseCallback) {
    var srcId = requestData.srcId;
    var destId = requestData.destId;
    console.log("Client " + srcId + " attempting to join " + destId);

    // Check both clients exist and that neither are currently in a session
    if((srcId in clients) && (destId in clients) && (srcId !== destId)) {

        clients[destId].emit("shareCanvasRequest", requestData, (responseData) => {
            console.log("responseCallBack: ", responseData);
            responseCallback(responseData);
        })
    } 
    else {
        console.log("could not find srcId or destId");
    }
}

function syncEventHandler(syncEvent) {
    var srcId = syncEvent.srcId;
    var destId = syncEvent.destId;
    console.log("sync event: ", syncEvent.eventType);
    // Check both clients exist and that neither are currently in a session
    if((srcId in clients) && (destId in clients) && (srcId !== destId)) {
      clients[destId].emit("syncEvent", syncEvent);
    } 
    else {
        console.log("could not find srcId or destId");
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

  socket.on("initiateShareCanvas", (data, callback) => initiateShareCanvas(data, callback));

  socket.on("syncEvent", (data) => syncEventHandler(data));

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

