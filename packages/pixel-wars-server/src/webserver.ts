import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";
import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
const server = serve(app);

const io = new Server(server as HttpServer);
