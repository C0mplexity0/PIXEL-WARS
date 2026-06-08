import type { Gamemode } from "./gamemode";
import type { ProtocolHandler } from "@pixel-wars/protocol";

export class PixelWars {
  private running: boolean = true;

  private gamemode: Gamemode;
  private protocolHandler: ProtocolHandler;

  constructor(gamemode: Gamemode, protocolHandler: ProtocolHandler) {
    this.gamemode = gamemode;
    this.protocolHandler = protocolHandler;

    console.log(this.protocolHandler);
  }

  stop() {
    this.running = false;
    // TODO: Cleanup resources, stop game loop, etc.
  }

  getGamemode(): Gamemode {
    return this.gamemode;
  }

  isRunning(): boolean {
    return this.running;
  }
}
