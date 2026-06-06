import { type ChunkData, type DefinedChunkData, type World } from ".";

export class ChunkGenerator {
  protected world: World;

  constructor(world: World) {
    this.world = world;
  }

  generateChunk(_x: number, _y: number): ChunkData {
    return null;
  }
}

export class DefaultGenerator extends ChunkGenerator {
  generateChunk(): ChunkData {
    const pixels: DefinedChunkData = [];

    for (let i = 0; i < this.world.getChunkSize(); i++) {
      pixels[i] = [];
      for (let j = 0; j < this.world.getChunkSize(); j++) {
        pixels[i][j] = 0;
      }
    }

    return pixels;
  }
}
