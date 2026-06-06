import Renderer from "./renderer";
import { LocalWorldData } from "./world";

export default class PixelWarsClient {
  private renderer: Renderer;

  private running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Renderer(this, canvas);

    console.log("PIXEL WARS client initialised");

    this.requestNewTick();
  }

  getLocalWorldData(): LocalWorldData {
    // TODO: This is just temporary until the client can connect to the core and fetch world data from there
    const world = new LocalWorldData([
      {
        name: "Air",
        collision: false,
        texture: {
          type: "colour",
          colour: "#FF0000",
        },
      },
    ]);

    world.setChunk(0, 0, [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);

    return world;
  }

  setRunning(running: boolean) {
    this.running = running;
  }

  start() {
    this.setRunning(true);
  }

  pause() {
    this.setRunning(false);
  }

  stop() {
    this.setRunning(false);
  }

  private requestNewTick() {
    requestAnimationFrame(this.tick.bind(this));
  }

  private tick() {
    if (!this.running) return;

    this.renderer.render();

    this.requestNewTick();
  }
}
