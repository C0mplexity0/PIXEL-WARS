import { io, Socket } from "socket.io-client";
import PixelWarsClient from "./client";

let game: PixelWarsClient | undefined;

export function getClient() {
  return game;
}

function startGame() {
  if (game) {
    throw new Error("Client is already running");
  }

  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  game = new PixelWarsClient(canvas);
  game.start();
}

export function startSingleplayerGame() {
  startGame();
}

export function stopSingleplayerGame() {
  if (game) {
    game.stop();
    game = undefined;
  }
}

export async function validateMultiplayerServer(serverIp: string) {
  try {
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
  } catch (error) {
    console.error("Error connecting to multiplayer server:", error);
    return false;
  }
}

export async function connectToMultiplayerServer(serverIp: string) {
  return new Promise<Socket>((resolve, reject) => {
    let url = `https://${serverIp}`;

    if (new URL(url).hostname === "localhost") {
      url = `http://${serverIp}`;
    }

    const socket = io(url, {
      path: "/pixel-wars/websocket",
    });

    const timeout = setTimeout(() => {
      console.error("Connection to multiplayer server timed out");
      socket.disconnect();
      reject();
    }, 10000);

    socket.on("connect", () => {
      console.log("Connected to multiplayer server");
      clearTimeout(timeout);
      resolve(socket);
    });
  });
}

export async function startMultiplayerGame(socket: Socket) {
  if (game) {
    throw new Error("Client is already running");
  }

  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  game = new PixelWarsClient(canvas);
  game.start();
}
