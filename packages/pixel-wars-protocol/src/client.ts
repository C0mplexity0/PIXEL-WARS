import type { ProtocolHandler } from ".";
import { Socket } from "socket.io-client";

export class ClientSingleplayerProtocolHandler implements ProtocolHandler {
  sendMessage(message: string): void {
    // Implement the logic to handle messages in singleplayer mode
    console.log(message);
  }
}

export class ClientMultiplayerProtocolHandler implements ProtocolHandler {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  sendMessage(message: string): void {
    // Implement the logic to handle messages in multiplayer mode
    console.log(message);
    console.log(this.socket.id);
  }
}
