var gameStarted = false;

var playerPiece;
var map = [];
var zoom = 32;
var pingtime = 0;
var fps = 0;
var moveCooldown = 7;
const blocks = ["#000", "#474747", "#878787", "#bababa", "#E53935", "#B71C1C", "#F57F17", "#5A3D23", "#FFEB3B", "#95de16", "#37de16", "#1da811", "#33691E", "#18c7b8", "#18a7c7", "#1884c7",  "#0D47A1", "#6c18c7", "#b218c7", "#c718a1", "#F06292"];
const blocksText = ["#fff", "#fff", "#fff", "#000", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff",  "#fff", "#fff", "#fff", "#fff", "#fff"];
const playerColours = ["#000", "#474747", "#878787", "#bababa", "#E53935", "#B71C1C", "#F57F17", "#5A3D23", "#FFEB3B", "#95de16", "#37de16", "#1da811", "#33691E", "#18c7b8", "#18a7c7", "#1884c7",  "#0D47A1", "#6c18c7", "#b218c7", "#c718a1", "#F06292"];
var playerList = [[]];

var username;
var colour = Math.floor((Math.random() * 20)+1);

var inventory = [[0,-1],[1,-1],[2,-1],[3,-1],[4,-1],[5,-1],[6,-1],[7,-1],[8,-1],[9,-1],[10,-1],[11,-1],[12,-1],[13,-1],[14,-1],[15,-1],[16,-1],[17,-1],[18,-1],[19,-1],[20,-1],];

// Basics

function startGame(x, y) {
  gameStarted = true;
  myGameArea.start();
  myGameArea.canvas.className = "game";
  playerPiece = new player(x, y);
  document.getElementById("app").style.display = "none";
  var inventoryInfo = document.createElement("div");
  var inventoryString = "INVENTORY:<br>";
  for (var i=0;i<inventory.length;i++) {
    if (inventory[i][1] == -1) {
      if (playerPiece.selectedBlock == i) {
        inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">Inf</div>";
      } else {
        inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">Inf</div>";
      }
    } else {
      if (playerPiece.selectedBlock == i) {
        inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">" + inventory[i][1] + "</div>: ";
      } else {
        inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">" + inventory[i][1] + "</div>: ";
      }
    }
  }
  inventoryInfo.innerHTML = inventoryString;
  inventoryInfo.className = "inventory";
  document.body.insertBefore(inventoryInfo, document.body.childNodes[0]);
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = zoom*31;
    this.canvas.height = zoom*31;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    this.velocityX = 0;
    this.velocityY = 0;
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function player(x, y) {
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = playerColours[colour];
    ctx.fillRect((15*zoom)+(0.1*zoom), (15*zoom)+(0.1*zoom), (0.8*zoom), (0.8*zoom));
    ctx.font = "16px pixel";
    ctx.textAlign = "center";
    ctx.fillText(username, (15*zoom)+(zoom*0.5), (15*zoom)-(zoom*0.2));
  }
  this.movementInterval = null;
  this.selectedBlock = 0;
}

function ping() {
  pingtime = Date.now();
  socket.emit("ping");
}

// Rendering & Map

function updateGameArea() {
  if (window.innerWidth > 32*31 && window.innerHeight > 32*31) {
  zoom = 32;
  } else if (window.innerWidth > 24*31 && window.innerHeight > 24*31) {
    zoom = 24;
  } else if (window.innerWidth > 16*31 && window.innerHeight > 16*31) {
    zoom = 16;
  } else {
    zoom = 8;
  }
  myGameArea.canvas.width = zoom*31;
  myGameArea.canvas.height = zoom*31;
  fps++;
  setTimeout(function() {fps--;}, 1000);
  if (moveCooldown == 0) {
    if (playerPiece.velocityY == -1) {
      moveup();
      moveCooldown = 7;
    } else if (playerPiece.velocityY == 1) {
      movedown();
      moveCooldown = 7;
    }
    if (playerPiece.velocityX == -1) {
      moveleft();
      moveCooldown = 7;
    } else if (playerPiece.velocityX == 1) {
      moveright();
      moveCooldown = 7;
    }
  } else {
    moveCooldown--;
  }
  myGameArea.clear();
  for (var y=0;y<31;y++) {
    for (var x=0;x<31;x++) {
      var block = getBlock(playerPiece.x+(x-15), playerPiece.y+(y-15));
      if (block > 0) {
        ctx = myGameArea.context;
        ctx.fillStyle = blocks[block-1];
        ctx.fillRect(x*zoom, y*zoom, zoom, zoom);
      } else {
        ctx = myGameArea.context;
        ctx.fillStyle = "white";
        ctx.fillRect(x*zoom, y*zoom, zoom, zoom);
      }
      for (var i=0;i<playerList.length;i++) {
        if (playerList[i][1] != null) {
          if (playerList[i][0] != username) {
            if (playerList[i][1][0] == playerPiece.x+(x-15) && playerList[i][1][1] == playerPiece.y+(y-15)) {
              ctx = myGameArea.context;
              ctx.fillStyle = playerColours[playerList[i][2]];
              ctx.fillRect(x*zoom+(zoom*0.1), y*zoom+(zoom*0.1), zoom*0.8, zoom*0.8);
              ctx.font = "16px pixel";
              ctx.textAlign = "center";
              ctx.fillText(playerList[i][0], x*zoom+(zoom*0.5), (y*zoom)-(zoom*0.2));
            }
          }
        }
      }
    }
  }
  var ctx = myGameArea.context;
  ctx.textAlign = "start";
  ctx.font = "16px pixel";
  ctx.fillStyle = "black";
  ctx.fillText("Selected Tile:", 5, 16);
  ctx.fillText("FPS: " + fps, 5, 32);
  ctx.fillStyle = blocks[playerPiece.selectedBlock];
  ctx.fillRect((zoom*0.1)+100, zoom*0.1, zoom*0.8, zoom*0.8);
  ctx.fillStyle = "black";
  ctx.fillText("Username: " + username, 5, 48); 
  ctx.fillText("X:" + playerPiece.x + " Y:" + playerPiece.y, 5, 64)
  ctx.fillText(playerList.length + " Players Online", 5, 80);
  playerPiece.update();
}

function getBlock(x, y) {
  var chunk = getChunk(getChunkX(x), getChunkY(y));
  var block = chunk[getYInChunk(y)][getXInChunk(x)];
  return block;
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

function getChunk(x, y) {
  if (map.hasOwnProperty("x" + x + "y" + y)) {
    return map["x" + x + "y" + y];
  } else {
    return [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]
  }
}

// Movement & Interactions

var interacting = false;

function moveup() {
  if (getBlock(playerPiece.x, playerPiece.y - 1) <= 0) {
    playerPiece.y -= 1;
    socket.emit("teleport", playerPiece.x, playerPiece.y);
  }
}

function movedown() {
  if (getBlock(playerPiece.x, playerPiece.y + 1) <= 0) {
    playerPiece.y += 1;
    socket.emit("teleport", playerPiece.x, playerPiece.y);
  }
}

function moveleft() {
  if (getBlock(playerPiece.x - 1, playerPiece.y) <= 0) {
    playerPiece.x -= 1;
    socket.emit("teleport", playerPiece.x, playerPiece.y);
  }
}

function moveright() {
  if (getBlock(playerPiece.x + 1, playerPiece.y) <= 0) {
    playerPiece.x += 1;
    socket.emit("teleport", playerPiece.x, playerPiece.y);
  }
}

function interactPixelUp() {
  if (getBlock(playerPiece.x, playerPiece.y-1) != 0) {
    socket.emit("break", playerPiece.x, playerPiece.y-1);
  } else {
    socket.emit("place", playerPiece.x, playerPiece.y-1, playerPiece.selectedBlock);
  }
}

function interactPixelDown() {
  if (getBlock(playerPiece.x, playerPiece.y+1) != 0) {
    socket.emit("break", playerPiece.x, playerPiece.y+1);
  } else {
    socket.emit("place", playerPiece.x, playerPiece.y+1, playerPiece.selectedBlock);
  }
}

function interactPixelLeft() {
  if (getBlock(playerPiece.x-1, playerPiece.y) != 0) {
    socket.emit("break", playerPiece.x-1, playerPiece.y);
  } else {
    socket.emit("place", playerPiece.x-1, playerPiece.y, playerPiece.selectedBlock);
  }
}

function interactPixelRight() {
  if (getBlock(playerPiece.x+1, playerPiece.y) != 0) {
    socket.emit("break", playerPiece.x+1, playerPiece.y);
  } else {
    socket.emit("place", playerPiece.x+1, playerPiece.y, playerPiece.selectedBlock);
  }
}

document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;
  if (gameStarted) {
    if (e.keyCode == '38' || e.keyCode == '87') {
      if (!interacting) {
        playerPiece.velocityY = -1;
      } else {
        playerPiece.velocityX = 0;
        playerPiece.velocityY = 0;
        interactPixelUp();
      }
    } else if (e.keyCode == '40' || e.keyCode == '83') {
      if (!interacting) {
        playerPiece.velocityY = 1;
      } else {
        playerPiece.velocityX = 0;
        playerPiece.velocityY = 0;
        interactPixelDown();
      }
    } else if (e.keyCode == '37' || e.keyCode == '65') {
      if (!interacting) {
        playerPiece.velocityX = -1;
      } else {
        playerPiece.velocityX = 0;
        playerPiece.velocityY = 0;
        interactPixelLeft();
      }
    } else if (e.keyCode == '39' || e.keyCode == '68') {
      if (!interacting) {
        playerPiece.velocityX = 1;
      } else {
        playerPiece.velocityX = 0;
        playerPiece.velocityY = 0;
        interactPixelRight();
      }
    } else if (e.keyCode == '16') {
      interacting = true;
    } else if (e.keyCode == '79') {
      playerPiece.selectedBlock--;
      if (playerPiece.selectedBlock < 0) {
        playerPiece.selectedBlock = 0-playerPiece.selectedBlock;
        playerPiece.selectedBlock = blocks.length-playerPiece.selectedBlock;
      }
      var inventoryInfo = document.getElementsByClassName("inventory")[0];
      var inventoryString = "INVENTORY:<br>";
      for (var i=0;i<inventory.length;i++) {
        if (inventory[i][1] == -1) {
          if (playerPiece.selectedBlock == i) {
            inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">Inf</div>";
          } else {
            inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">Inf</div>";
          }
        } else {
          if (playerPiece.selectedBlock == i) {
            inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">" + inventory[i][1] + "</div>: ";
          } else {
            inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">" + inventory[i][1] + "</div>: ";
          }
        }
      }
      inventoryInfo.innerHTML = inventoryString;
    } else if (e.keyCode == '80') {
      playerPiece.selectedBlock++;
      playerPiece.selectedBlock = playerPiece.selectedBlock % blocks.length;
      var inventoryInfo = document.getElementsByClassName("inventory")[0];
      var inventoryString = "INVENTORY:<br>";
      for (var i=0;i<inventory.length;i++) {
        if (inventory[i][1] == -1) {
          if (playerPiece.selectedBlock == i) {
            inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">Inf</div>";
          } else {
            inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">Inf</div>";
          }
        } else {
          if (playerPiece.selectedBlock == i) {
            inventoryString += "<div class=\"tile\" style=\"background-color: white;color: black;border-color: " + blocks[inventory[i][0]] + ";\" data-selected=\"true\">" + inventory[i][1] + "</div>: ";
          } else {
            inventoryString += "<div class=\"tile\" style=\"background-color: " + blocks[inventory[i][0]] + ";color:" + blocksText[inventory[i][0]] + ";\">" + inventory[i][1] + "</div>: ";
          }
        }
      }
      inventoryInfo.innerHTML = inventoryString;
    }
  }
}

document.onkeyup = checkKeyUp;

function checkKeyUp(e) {
  e = e || window.event;

  if (gameStarted) {
    if (e.keyCode == '38' || e.keyCode == '87') {
      if (playerPiece.velocityY == -1) {
        playerPiece.velocityY = 0;
      }
    } else if (e.keyCode == '40' || e.keyCode == '83') {
      if (playerPiece.velocityY == 1) {
        playerPiece.velocityY = 0;
      }
    } else if (e.keyCode == '37' || e.keyCode == '65') {
      if (playerPiece.velocityX == -1) {
        playerPiece.velocityX = 0;
      }
    } else if (e.keyCode == '39' || e.keyCode == '68') {
      if (playerPiece.velocityX == 1) {
        playerPiece.velocityX = 0;
      }
    } else if (e.keyCode == '16') {
      interacting = false;
    }
  }
}

// Prevent the page from scrolling when using arrow keys/space bar
var arrow_keys_handler = function(e) {
  if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
      switch(e.code){
          case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight": 
              case "Space": e.preventDefault(); break;
          default: break; // do not block other keys
      }
    }
  };
  window.addEventListener("keydown", arrow_keys_handler, false);