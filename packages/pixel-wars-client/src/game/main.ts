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

export async function validateMultiplayerServer(serverIp: string) {
  let url = `https://${serverIp}/pixel-wars/info`;

  if (new URL(url).hostname === "localhost") {
    url = `http://${serverIp}/pixel-wars/info`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    return false;
  }

  const data = await response.json();

  if (!data || typeof data !== "object") {
    return false;
  }

  return data.validPixelWarsServer === true;
}
