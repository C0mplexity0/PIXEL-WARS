var socket;

function load() {
  socket = io();

  socket.on("username-taken", function() {
    document.getElementById("usernameinputerror").innerHTML = "Username already taken.";
    username = null;
  });

  socket.on("join", function(name, game, color, x, y) {
    startGame(x, y);
    username = name;
    colour = color;
  });

  socket.on("chunk", function(x, y, chunk) {
    map["x" + x + "y" + y] = chunk;
  });

  socket.on("disconnect", function() {
    window.location.reload();
  });
  
  socket.on("ping", function() {
    console.log("Ping: " + (Date.now()-pingtime));
  });

  socket.on("players", function(players) {
    playerList = players;
  });
}

function login(name) {
  if (name.length >= 3 && name.length <= 20 && username == null) {
    socket.emit("login", 1, name, colour);
    username = name;
    document.getElementById("usernameinputerror").innerHTML = "";
  } else {
    document.getElementById("usernameinputerror").innerHTML = "Username must be between 3 and 20 characters long.";
  }
}