import PixelWarsRenderer from "./renderer";

export default class PixelWarsClient {
  private renderer: PixelWarsRenderer;

  private running = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new PixelWarsRenderer(canvas);

    console.log("PIXEL WARS client initialised");

    this.requestNewTick();
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

  private requestNewTick() {
    requestAnimationFrame(this.tick.bind(this));
  }

  private tick() {
    if (!this.running) return;

    this.renderer.render();

    this.requestNewTick();
  }
}
