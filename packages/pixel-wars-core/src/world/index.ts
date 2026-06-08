import { ChunkGenerator, DefaultGenerator } from "./generator";

export interface PixelTexture {
  type: "colour" | "static" | "animated";
  colour?: string;
  staticTexture?: HTMLImageElement;
  animatedTexture?: {
    spriteSheet: HTMLImageElement;
    frames: {
      x: number;
      y: number;
      width: number;
      height: number;
      duration: number;
    }[];
  };
}

export interface PixelType {
  name: string;
  collision: boolean;
  texture: PixelTexture;
}

export type DefinedChunkData = number[][];
export type ChunkData = DefinedChunkData | null;

export type Coordinates = [number, number];

export class WorldChunks {
  private chunks: { [coordinates: string]: ChunkData } = {};

  setChunk(x: number, y: number, chunkData: ChunkData) {
    const chunkKey = `${x},${y}`;
    this.chunks[chunkKey] = chunkData;
    return this.chunks[chunkKey];
  }

  getChunk(x: number, y: number): ChunkData {
    const chunkKey = `${x},${y}`;
    return this.chunks[chunkKey] ?? null;
  }

  static getChunkCoordinatesFromPixelCoordinates(
    x: number,
    y: number,
  ): Coordinates {
    const chunkX = Math.floor(x / 16);
    const chunkY = Math.floor(y / 16);
    return [chunkX, chunkY];
  }

  getPixel(x: number, y: number): number | null {
    const [chunkX, chunkY] =
      WorldChunks.getChunkCoordinatesFromPixelCoordinates(x, y);
    const chunk = this.getChunk(chunkX, chunkY);

    if (!chunk) {
      return null;
    }

    const pixelX = Math.abs(x % 16);
    const pixelY = Math.abs(y % 16);

    return chunk[pixelY][pixelX] ?? null;
  }
}

export class World {
  private pixelTypes: PixelType[];
  private chunks = new WorldChunks();

  // Config
  private generationEnabled = true;
  private generator: ChunkGenerator;

  constructor(
    pixelTypes: PixelType[],
    generator: ChunkGenerator = new DefaultGenerator(),
  ) {
    this.pixelTypes = pixelTypes;
    this.generator = generator;
  }

  getPixelTypes(): PixelType[] {
    return this.pixelTypes;
  }

  getChunkSize(): number {
    return 16;
  }

  chunkGenerationEnabled(): boolean {
    return this.generationEnabled;
  }

  setChunkGenerationEnabled(enabled: boolean) {
    this.generationEnabled = enabled;
  }

  getChunk(x: number, y: number): ChunkData {
    let chunk = this.chunks.getChunk(x, y);

    if (!chunk) {
      if (!this.generationEnabled) {
        return null;
      }

      this.generateChunk(x, y);
      chunk = this.chunks.getChunk(x, y);
    }

    return chunk ?? null;
  }

  generateChunk(x: number, y: number) {
    const chunk = this.generator.generateChunk(x, y);
    this.chunks.setChunk(x, y, chunk);
  }
}
