import { WorldChunks, type ChunkData, type PixelType } from "@pixel-wars/core";

export class LocalWorldData {
  private pixelTypes: PixelType[];
  private chunks = new WorldChunks();

  constructor(pixelTypes: PixelType[]) {
    this.pixelTypes = pixelTypes;
  }

  getPixelTypes(): PixelType[] {
    return this.pixelTypes;
  }

  getChunk(x: number, y: number): ChunkData {
    return this.chunks.getChunk(x, y);
  }

  setChunk(x: number, y: number, chunkData: ChunkData) {
    return this.chunks.setChunk(x, y, chunkData);
  }

  getVisiblePixels(
    centreX: number,
    centreY: number,
    visibleWidth: number,
    visibleHeight: number,
  ): number[][] {
    const pixels: number[][] = [];

    const startX = Math.floor(centreX - visibleWidth / 2);
    const endX = Math.ceil(centreX + visibleWidth / 2);
    const startY = Math.floor(centreY - visibleHeight / 2);
    const endY = Math.ceil(centreY + visibleHeight / 2);

    for (let y = startY; y < endY; y++) {
      pixels[y - startY] = [];
      for (let x = startX; x < endX; x++) {
        pixels[y - startY][x - startX] = this.chunks.getPixel(x, y);
      }
    }

    return pixels;
  }
}
