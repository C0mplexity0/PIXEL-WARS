import PixelWarsClient from "./client";

let game: PixelWarsClient | undefined;

export function getClient() {
  return game;
}

export function startSingleplayerGame() {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  game = new PixelWarsClient(canvas);
  game.start();
}

export function stopSingleplayerGame() {
  if (game) {
    game.stop();
    game = undefined;
  }
}
