const logging = require("/home/runner/PIXEL-WARS-2/logging.js");

//////////////////////////////////////////////////////
//                    SETTINGS                      //
//////////////////////////////////////////////////////
module.exports.name = "PLAYGROUND";
module.exports.blocks = ["#000", "#474747", "#878787", "#bababa", "#E53935", "#B71C1C", "#F57F17", "#5A3D23", "#FFEB3B", "#95de16", "#37de16", "#1da811", "#33691E", "#18c7b8", "#18a7c7", "#1884c7",  "#0D47A1", "#6c18c7", "#b218c7", "#c718a1", "#F06292"];


modeName = "PLAYGROUND";
blocks = ["#000", "#474747", "#878787", "#bababa", "#E53935", "#B71C1C", "#F57F17", "#5A3D23", "#FFEB3B", "#95de16", "#37de16", "#1da811", "#33691E", "#18c7b8", "#18a7c7", "#1884c7",  "#0D47A1", "#6c18c7", "#b218c7", "#c718a1", "#F06292"];

//////////////////////////////////////////////////////
//                 GAME VARIABLES                   //
//////////////////////////////////////////////////////

const id = 0; // Game ID from index.js

var players = [];
var map;
var fs;

//////////////////////////////////////////////////////
//                   GAME SETUP                     //
//////////////////////////////////////////////////////

module.exports.setupGame = function(files) {
  fs = files;

  try {
    map = JSON.parse(fs.readFileSync('games/playground/map.json', 'utf8'));
    setInterval(saveMap, 60000)
    logging.log("PLAYGROUND", "Loaded map");
  } catch (err) {
    logging.log("PLAYGROUND", "Failed to load map", 2);
    console.error(err);
    process.exit();
  }
}

function saveMap() {
  fs.writeFile("games/playground/map.json", JSON.stringify(map), function(err) {
    if (err) {
        logging.log("PLAYGROUND", err, 2);
    }
  });
}

//////////////////////////////////////////////////////
//                   CONNECTIONS                    //
//////////////////////////////////////////////////////

module.exports.connectPlayer = function(player) {
  logging.log("PLAYGROUND", player.username + " joined");
  player.client.emit("join", player.username, id, player.color, 0, 0);
  player.position = [0, 0];
  player.inventory = [[0, -1],[1, -1],[2, -1],[3, -1],[4, -1],[5, -1],[6, -1],[7, -1],[8, -1],[9, -1],[10, -1],[11, -1],[12, -1],[13, -1],[14, -1],[15, -1],[16, -1],[17, -1],[18, -1],[19, -1],[20, -1]];
  players.push(player);
  pushChunks(player.client);

  for (var i=0;i<players.length;i++) {
    pushPlayers(players[i].client);
  }

  // Game functions

  player.client.on("teleport", function(x, y) {
    player.position = [x, y];
    pushChunks(player.client);
    
    for (var i=0;i<players.length;i++) {
      pushPlayers(players[i].client);
    }
  });

  player.client.on("break", function(x, y) {
      setBlock(x, y, 0);
      

      setTimeout(function() {
        for (var i=0;i<players.length;i++) {
          pushChunks(players[i].client);
        }
      });
  });

  player.client.on("place", function(x, y, blockType) {
    var onPlayer = false;
    for (var i=0;i<players.length;i++) {
      if (players[i].position[0] == x && players[i].position[1] == y) {
        onPlayer = true;
      }
    }
    if (!onPlayer) {
      if (x-1 <= player.position[0] && x+1 >= player.position[0] && y-1 <= player.position[1] && y+1 >= player.position[1]) {
        setBlock(x, y, blockType+1);
      }
      
      
      for (var i=0;i<players.length;i++) {
        pushChunks(players[i].client);
      }
    }
  });
}

module.exports.disconnectPlayer = function(client) {
  logging.log("PLAYGROUND", getPlayerFromClient(client).username + " disconnected");
  
  const index = players.indexOf(getPlayerFromClient(client));
  if (index > -1) {
    players.splice(index, 1);
  }

  for (var i=0;i<players.length;i++) {
    pushPlayers(players[i].client);
  }
}


//////////////////////////////////////////////////////
//                      GAME                        //
//////////////////////////////////////////////////////

function getPlayerFromClient(client) {
  for (var i=0;i<players.length;i++) {
    if (players[i].client.id == client.id) {
      return players[i];
    }
  }
  return null;
}


function setBlock(x, y, value) {
  if (value < blocks.length+1) {
    getChunk(getChunkX(x), getChunkY(y), true)[getYInChunk(y)][getXInChunk(x)] = value;
  }
}

function saveMap() {
  fs.writeFile("games/playground/map.json", JSON.stringify(map), function(err) {
    if (err) {
        console.logging.log("PLAYGROUND", err);
    }
  });
}

function getChunk(x, y, placingBlock=false) {
  if (!map.hasOwnProperty("x" + x + "y" + y)) {
    if (placingBlock) {
      return map["x" + x + "y" + y] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
    } else {
      return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
    }
  }
  return map["x" + x + "y" + y];
}

function pushChunks(client) {
  var player = getPlayerFromClient(client);
  const x = getChunkX(player.position[0]);
  const y = getChunkY(player.position[1]);
  for (let i=-1;i<2;i++) {
    for (let j=-1;j<2;j++) {
      client.emit("chunk", x+j, y+i, getChunk(x+j, y+i));
    }
  }
}

function getChunkX(x) {
  var negative = false;
  if (x < 0) {
    negative = true;
  }
  x = x-(x % 16);
  x = x/16;
  if (negative) {
    x--;
  }
  return x;
}

function getChunkY(y) {
  var negative = false;
  if (y < 0) {
    negative = true;
  }
  y = y-(y % 16);
  y = y/16;
  if (negative) {
    y--;
  }
  return y;
}

function getXInChunk(x) {
  x = x % 16;
  if (x < 0) {
    x = 0-x;
    x = 16-x;
  }
  return x;
}

function getYInChunk(y) {
  y = y % 16;
  if (y < 0) {
    y = 0-y;
    y = 16-y;
  }
  return y;
}

// Player Info >> Client

function pushPlayers(client) {
  var playerList = [];
  for (var i=0;i<players.length;i++) {
    playerList.push([]);
    playerList[i].push(players[i].username);
    playerList[i].push(players[i].position);
    playerList[i].push(players[i].color);
  }
  client.emit("players", playerList);
}