import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

let app: Hono;
let server: ReturnType<typeof serve>;
let io: Server;

export function startWebServer() {
  app = new Hono();
  server = serve(app);
  io = new Server(server as HttpServer);
}
