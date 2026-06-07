import { io, Socket } from "socket.io-client";
import PixelWarsClient from "./client";
import {
  ClientMultiplayerProtocolHandler,
  ClientSingleplayerProtocolHandler,
  type ProtocolHandler,
} from "@pixel-wars/protocol";
import { changeMenuDetails } from "../util/menus";

let game: PixelWarsClient | undefined;

export function getClient() {
  return game;
}

export function stopGame() {
  if (game) {
    game.stop();
    game = undefined;

    changeMenuDetails({
      menu: "home",
    });
  }
}

function startGame(protocol: ProtocolHandler) {
  console.log(protocol);

  if (game) {
    throw new Error("Client is already running");
  }

  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Canvas element not found");
  }

  game = new PixelWarsClient(canvas);
  game.start();
  changeMenuDetails({
    menu: "game",
  });
}

export function startSingleplayerGame() {
  const protocol = new ClientSingleplayerProtocolHandler();
  startGame(protocol);
}

export async function attemptMultiplayerConnection(ip: string) {
  if (!ip) {
    return;
  }

  changeMenuDetails({
    menu: "loading",
    loadingMessage: "Pinging server...",
  });

  const result = await validateMultiplayerServer(ip);

  if (!result) {
    changeMenuDetails({
      menu: "multiplayer-error",
      errorMessage: "Server could not be found.",
    });
    return;
  }

  changeMenuDetails({
    menu: "loading",
    loadingMessage: "Connecting to server...",
  });

  let socket: Socket;

  try {
    socket = (await connectToMultiplayerServer(ip)) as Socket;
  } catch (e) {
    changeMenuDetails({
      menu: "multiplayer-error",
      errorMessage: "Couldn't connect to server.",
    });
    return;
  }

  startMultiplayerGame(socket);
  changeMenuDetails({
    menu: "game",
  });
}

function getServerUrl(ip: string, path: string = "/") {
  try {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }

    let url = `https://${ip}${path}`;

    if (new URL(url).hostname === "localhost") {
      url = `http://${ip}${path}`;
    }
    return url;
  } catch (_e) {
    return null;
  }
}

export async function validateMultiplayerServer(serverIp: string) {
  try {
    const url = getServerUrl(serverIp, "/pixel-wars/info");

    if (!url) {
      return false;
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
    const url = getServerUrl(serverIp);

    if (!url) {
      reject();
      return;
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
  const protocol = new ClientMultiplayerProtocolHandler(socket);

  startGame(protocol);
}
