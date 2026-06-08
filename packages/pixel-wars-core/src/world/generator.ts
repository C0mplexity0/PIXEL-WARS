import { type ChunkData, type DefinedChunkData } from ".";

export class ChunkGenerator {
  generateChunk(_x: number, _y: number): ChunkData {
    return null;
  }
}

export class DefaultGenerator extends ChunkGenerator {
  generateChunk(): ChunkData {
    const pixels: DefinedChunkData = [];

    for (let i = 0; i < 16; i++) {
      pixels[i] = [];
      for (let j = 0; j < 16; j++) {
        pixels[i][j] = 0;
      }
    }

    return pixels;
  }
}
