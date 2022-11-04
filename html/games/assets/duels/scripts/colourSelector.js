document.getElementById("colourSelector").style.backgroundColor = playerColours[colour];

function changeColour() {
  colour++;
  if (colour >= playerColours.length) {
    colour = 0;
  }
  document.getElementById("colourSelector").style.backgroundColor = playerColours[colour];
}

const blocks = ["img"];
var UNBREAKABLE_WALL_1 = new Image;
UNBREAKABLE_WALL_1.src = "/assets/blocks/UNBREAKABLE_WALL_1.png";
const blockTextures = [UNBREAKABLE_WALL_1];