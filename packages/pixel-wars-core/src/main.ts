import type { Gamemode } from "./gamemode";

export class PixelWars {
  private gamemode: Gamemode;

  constructor(gamemode: Gamemode) {
    this.gamemode = gamemode;
  }

  getGamemode(): Gamemode {
    return this.gamemode;
  }
}
