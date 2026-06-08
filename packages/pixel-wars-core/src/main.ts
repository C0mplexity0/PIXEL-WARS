import type { Gamemode } from "./gamemode";
import type { CoreToClientProtocolHandler } from "@pixel-wars/protocol";

export class PixelWars {
  private running: boolean = true;

  private gamemode: Gamemode;
  private protocolHandler: CoreToClientProtocolHandler;

  constructor(
    gamemode: Gamemode,
    protocolHandler: CoreToClientProtocolHandler,
  ) {
    this.gamemode = gamemode;
    this.protocolHandler = protocolHandler;

    this.protocolHandler.onMessageReceived("world:requestChunk", (data) => {
      const [x, y] = data;
      const chunkData = this.gamemode.getPlayerWorld(/*player*/).getChunk(x, y);
      this.protocolHandler.sendMessage("world:chunkData", {
        coordinates: [x, y],
        chunk: chunkData,
      });
    });

    this.protocolHandler.onMessageReceived("world:requestPixelTypes", () => {
      const pixelTypes = this.gamemode
        .getPlayerWorld(/*player*/)
        .getPixelTypes();
      this.protocolHandler.sendMessage("world:pixelTypes", pixelTypes);
    });
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
