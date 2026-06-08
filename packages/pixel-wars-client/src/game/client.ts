import type { ClientToCoreProtocolHandler } from "@pixel-wars/protocol";
import Renderer from "./renderer";
import { LocalWorldData } from "./world";
import type { Coordinates } from "@pixel-wars/core";

export default class PixelWarsClient {
  private protocolHandler: ClientToCoreProtocolHandler;
  private renderer: Renderer;

  private running = true;

  private worldData: LocalWorldData;
  private cameraLocation: Coordinates = [0, 0];

  constructor(
    canvas: HTMLCanvasElement,
    protocolHandler: ClientToCoreProtocolHandler,
  ) {
    this.protocolHandler = protocolHandler;
    this.worldData = new LocalWorldData(this.protocolHandler, []);
    this.renderer = new Renderer(this, canvas);

    console.log("PIXEL WARS client initialised");

    this.requestNewTick();
  }

  getLocalWorldData(): LocalWorldData {
    return this.worldData;
  }

  setRunning(running: boolean) {
    this.running = running;
  }

  pause() {
    this.setRunning(false);
  }

  exit() {
    this.pause();
    // TODO: Clean up resources, send disconnect message
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
