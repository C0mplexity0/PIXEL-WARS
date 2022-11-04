const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const fs = require('fs');

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
httpserver.listen(3000);

const logging = require("./logging.js");

class Player {
  constructor(client, username, color) {
    this.client = client;
    this.position = [0,0];
    this.color = color;
    this.username = username;
    this.inventory = [[]];
  }
}

var modes = [];

// Mode Decleration
modes.push(require("./games/playground/playground.js")); // This mode is declared first, therefore it is mode id 0; when you add a new gamemode it should be added at the end of the existing list of gamemodes otherwise players will join the wrong game on the menu
modes.push(require("./games/duels/duels.js"));

var clients = [];
var modeClients = [];
var players = [];

logging.log("MAIN", "Loading modes...");

for (var i=0;i<modes.length;i++) {
  var mode = modes[i];
  modeClients[mode.name] = [];
  mode.setupGame(fs);
}

io.on("connect", function(client) {
  client.on("ping", function() {client.emit("ping")});
  client.on("login", function(game, username, characterColour=0) {
    if (getClientById(client.id) == null && username.length >= 3 && username.length <= 20) {
      for (var i=0;i<clients.length;i++) {
        var player = players[clients[i].id];
        if (player.username === username) {
          client.emit("username-taken");
          return;
        }
      }
      if (modes[game] != undefined) {
        clients.push(client);
        modeClients[modes[game].name].push(client);
        players[client.id] = new Player(client, username, characterColour);
        modes[game].connectPlayer(players[client.id]);
      }
    }
  });
  
  client.on("disconnect", function() {
    for (var i=0;i<modes.length;i++) {
      const index = modeClients[modes[i].name].indexOf(client);
      if (index > -1) {
        modeClients[modes[i].name].splice(index, 1);
        modes[i].disconnectPlayer(client);
      }
    }
    
    const index = clients.indexOf(client);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

function getClientById(id) {
  for (var i=0;i<clients.length;i++) {
    if (clients[i].id === id) {
      return clients[i];
    }
  }
  return null;
}