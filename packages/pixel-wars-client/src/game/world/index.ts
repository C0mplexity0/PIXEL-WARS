import {
  WorldChunks,
  type ChunkData,
  type Coordinates,
  type PixelType,
} from "@pixel-wars/core";
import type { ClientToCoreProtocolHandler } from "@pixel-wars/protocol";

export class LocalWorldData {
  private protocolHandler: ClientToCoreProtocolHandler;

  private pixelTypes: PixelType[];

  private chunks = new WorldChunks();

  private requestedChunks: Coordinates[] = [];

  constructor(protocolHandler: ClientToCoreProtocolHandler) {
    this.protocolHandler = protocolHandler;
    protocolHandler.onMessageReceived("world:chunkData", (data) => {
      const { coordinates, chunk } = data;
      this.setChunk(coordinates[0], coordinates[1], chunk);
    });

    protocolHandler.onMessageReceived("world:pixelTypes", (data) => {
      this.pixelTypes = data;
    });

    this.pixelTypes = [];

    this.protocolHandler.sendMessage("world:requestPixelTypes", null);
  }

  private requestChunk(x: number, y: number) {
    if (this.requestedChunks.some(([cx, cy]) => cx === x && cy === y)) {
      return;
    }

    this.requestedChunks.push([x, y]);

    this.protocolHandler.sendMessage("world:requestChunk", [x, y]);
  }

  getPixelTypes(): PixelType[] {
    return this.pixelTypes;
  }

  getChunk(x: number, y: number): ChunkData {
    const chunk = this.chunks.getChunk(x, y);
    if (!chunk) {
      this.requestChunk(x, y);
    }
    return chunk;
  }

  setChunk(x: number, y: number, chunkData: ChunkData) {
    return this.chunks.setChunk(x, y, chunkData);
  }

  getPixel(x: number, y: number): number | null {
    const pixel = this.chunks.getPixel(x, y);
    if (pixel === null) {
      const [chunkX, chunkY] =
        WorldChunks.getChunkCoordinatesFromPixelCoordinates(x, y);
      this.requestChunk(chunkX, chunkY);
    }
    return pixel;
  }

  getVisiblePixels(
    centreX: number,
    centreY: number,
    visibleWidth: number,
    visibleHeight: number,
  ): (number | null)[][] {
    const pixels: (number | null)[][] = [];

    const startX = Math.floor(centreX - visibleWidth / 2);
    const endX = Math.ceil(centreX + visibleWidth / 2);
    const startY = Math.floor(centreY - visibleHeight / 2);
    const endY = Math.ceil(centreY + visibleHeight / 2);

    for (let y = startY; y < endY; y++) {
      const row: (number | null)[] = [];
      for (let x = startX; x < endX; x++) {
        row[x - startX] = this.getPixel(x, y);
      }
      pixels[y - startY] = row;
    }

    return pixels;
  }
}
