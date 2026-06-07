import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { cors } from "hono/cors";
import packageJson from "../package.json" with { type: "json" };

export class PixelWarsServer {
  private port: number;

  private app: Hono | null = null;
  private server: ReturnType<typeof serve> | null = null;
  private io: Server | null = null;

  constructor(options?: { port?: number }) {
    const port = options?.port ?? 3000;
    this.port = port;
  }

  start() {
    if (this.app || this.server || this.io) {
      throw new Error("Server is already running");
    }

    this.app = new Hono({});
    this.server = serve({
      fetch: this.app.fetch,
      port: this.port,
    });
    this.io = new Server(this.server as HttpServer, {
      path: "/pixel-wars/websocket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.app.use(
      "/pixel-wars/*",
      cors({
        origin: "*",
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: false,
      }),
    );

    this.app.get("/pixel-wars/info", (c) => {
      return c.json({
        validPixelWarsServer: true,
        version: packageJson.version,
      });
    });

    this.io.on("connection", (socket) => {
      console.log("A client connected:", socket.id);
    });
  }
}
