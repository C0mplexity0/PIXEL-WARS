import type { ProtocolHandler } from ".";

export class CoreSingleplayerProtocolHandler implements ProtocolHandler {
  sendMessage(message: string): void {
    // Implement the logic to handle messages in singleplayer mode
    console.log(message);
  }
}

export class CoreMultiplayerProtocolHandler implements ProtocolHandler {
  sendMessage(message: string): void {
    // Implement the logic to handle messages in multiplayer mode
    console.log(message);
  }
}
