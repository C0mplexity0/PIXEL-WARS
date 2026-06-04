import PixelWarsClient from "./client";

let game: PixelWarsClient;

export function getClient() {
  return game;
}

export function initGame() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  game = new PixelWarsClient(canvas);
  game.start();
}
