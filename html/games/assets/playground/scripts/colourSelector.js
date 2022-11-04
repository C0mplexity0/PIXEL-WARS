document.getElementById("colourSelector").style.backgroundColor = playerColours[colour];

function changeColour() {
  colour++;
  if (colour >= playerColours.length) {
    colour = 0;
  }
  document.getElementById("colourSelector").style.backgroundColor = playerColours[colour];
}