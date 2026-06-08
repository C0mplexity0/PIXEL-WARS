import {
  ChunkGenerator,
  Gamemode,
  World,
  type ChunkData,
  type DefinedChunkData,
} from "@pixel-wars/core";

class CreativeGenerator extends ChunkGenerator {
  generateChunk(): ChunkData {
    const pixels: DefinedChunkData = [];

    for (let i = 0; i < 16; i++) {
      pixels[i] = [];
      for (let j = 0; j < 16; j++) {
        pixels[i][j] = Math.random() < 0.5 ? 0 : 1;
      }
    }

    console.log("Generated chunk:", pixels);

    return pixels;
  }
}

export class CreativeGamemode extends Gamemode {
  constructor() {
    super();

    const generator = new CreativeGenerator();

    this.addWorld(
      "default",
      new World(
        [
          {
            name: "Air",
            collision: false,
            texture: {
              type: "colour",
              colour: "#87CEEB",
            },
          },
          {
            name: "Red Air",
            collision: false,
            texture: {
              type: "colour",
              colour: "#FF0000",
            },
          },
        ],
        generator,
      ),
    );
  }
}
