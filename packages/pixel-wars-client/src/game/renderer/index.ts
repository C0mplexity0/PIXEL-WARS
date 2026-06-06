import type { PixelType } from "@pixel-wars/core";
import type PixelWarsClient from "../client";
import missingTextureUrl from "../../assets/img/texture-missing.png";

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private client: PixelWarsClient;

  private missingTexture: HTMLImageElement = new Image();

  constructor(client: PixelWarsClient, canvas: HTMLCanvasElement) {
    this.client = client;
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    this.missingTexture.src = missingTextureUrl;

    if (!ctx) {
      throw new Error("Could not get canvas context 2d");
    }

    this.ctx = ctx;
  }

  private updateCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private getPixelScale(rows: number, columns: number) {
    return Math.ceil(
      Math.max(
        this.canvas.height / (rows - 1),
        this.canvas.width / (columns - 1),
      ),
    );
  }

  getCanvasPosFromPixelPos(x: number, y: number, scale: number) {
    const canvasX = x * scale + Math.floor(this.canvas.width / 2);
    const canvasY = y * scale + Math.floor(this.canvas.height / 2);

    return [canvasX, canvasY];
  }

  private renderPixels(pixels: number[][], pixelTypes: PixelType[]) {
    const rows = pixels.length;
    const columns = pixels[0].length;

    const scale = this.getPixelScale(rows, columns);
    for (let y = 0; y < pixels.length; y++) {
      for (let x = 0; x < pixels[y].length; x++) {
        const pixelId = pixels[y][x];
        if (pixelId === null) {
          continue;
        }

        const pixelType = pixelTypes[pixelId];

        this.renderPixel(x - columns / 2, y - rows / 2, scale, pixelType);
      }
    }
  }

  private renderPixelColour(
    canvasPosX: number,
    canvasPosY: number,
    scale: number,
    colour: string,
  ) {
    if (colour.toLowerCase() == "#ffffff") {
      return;
    }

    this.ctx.fillStyle = colour;
    this.ctx.fillRect(
      canvasPosX - Math.floor(scale / 2),
      canvasPosY - Math.floor(scale / 2),
      scale,
      scale,
    );
  }

  private renderPixelTexture(
    canvasPosX: number,
    canvasPosY: number,
    scale: number,
    texture: HTMLImageElement,
  ) {
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      texture,
      canvasPosX - Math.floor(scale / 2),
      canvasPosY - Math.floor(scale / 2),
      scale,
      scale,
    );
  }

  private renderMissingTexture(
    canvasPosX: number,
    canvasPosY: number,
    scale: number,
  ) {
    this.renderPixelTexture(canvasPosX, canvasPosY, scale, this.missingTexture);
  }

  private renderPixel(
    x: number,
    y: number,
    scale: number,
    pixelType: PixelType | null,
  ) {
    const canvasPos = this.getCanvasPosFromPixelPos(x, y, scale);

    if (!pixelType) {
      this.renderMissingTexture(canvasPos[0], canvasPos[1], scale);
      return;
    }

    const texture = pixelType.texture;

    if (texture.type === "animated") {
      // this.renderAnimatedPixelTexture(x, y, scale, texture.animatedTexture);
    } else if (texture.type === "static") {
      const img = texture.staticTexture;

      if (!img) {
        this.renderMissingTexture(canvasPos[0], canvasPos[1], scale);
        return;
      }

      this.renderPixelTexture(canvasPos[0], canvasPos[1], scale, img);
    } else {
      const colour = texture.colour;

      if (!colour) {
        this.renderMissingTexture(canvasPos[0], canvasPos[1], scale);
        return;
      }

      this.renderPixelColour(canvasPos[0], canvasPos[1], scale, colour);
    }
  }

  render() {
    this.updateCanvasSize();

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const worldData = this.client.getLocalWorldData();
    const visiblePixels = worldData.getVisiblePixels(0, 0, 25, 25);
    const pixelTypes = worldData.getPixelTypes();
    this.renderPixels(visiblePixels, pixelTypes);
  }
}
