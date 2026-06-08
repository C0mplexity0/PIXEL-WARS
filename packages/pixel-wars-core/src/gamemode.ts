import type { World } from "./world";

export class Gamemode {
  private worlds: Map<string, World> = new Map();
  private defaultWorldName = "default";

  getWorld(name: string): World | undefined {
    return this.worlds.get(name);
  }

  addWorld(name: string, world: World) {
    this.worlds.set(name, world);

    if (this.worlds.size === 1) {
      this.setDefaultWorld(name);
    }
  }

  setDefaultWorld(name: string) {
    if (!this.worlds.has(name)) {
      throw new Error(`World with name "${name}" does not exist.`);
    }

    this.defaultWorldName = name;
  }

  getDefaultWorld(): World | undefined {
    return this.getWorld(this.defaultWorldName);
  }

  getPlayerWorld(/*player: Player*/): World {
    // TODO: Implement player-specific world selection logic (e.g., based on player state, preferences, etc.)
    return this.getDefaultWorld()!;
  }
}
