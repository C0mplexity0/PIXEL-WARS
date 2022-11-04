function load() {
  setTimeout(function() {
    document.getElementById("startscreen").style.display = "none";
  }, 7000);

  document.getElementById("play").onclick = function() {displayGamemodes()};
  document.getElementById("playgroundlogo").onclick = function() {window.location.href = "/games/playground.html"};
}

function displayGamemodes() {
  document.getElementById("home").style.display = "none";
  document.getElementById("gamemodes").style.display = "block";
}