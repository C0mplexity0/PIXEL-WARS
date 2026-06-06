import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import packageJson from "../package.json" with { type: "json" };
import { cors } from "hono/cors";

let app: Hono;
let server: ReturnType<typeof serve>;
let io: Server;

export function startWebServer() {
  app = new Hono();
  server = serve(app);
  io = new Server(server as HttpServer, {
    path: "/pixel-wars/websocket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  app.use(
    "/pixel-wars/*",
    cors({
      origin: "*",
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: false,
    }),
  );

  app.get("/pixel-wars/info", (c) => {
    return c.json({
      validPixelWarsServer: true,
      version: packageJson.version,
    });
  });

  io.on("connection", (socket) => {
    console.log("A client connected:", socket.id);
  });
}
