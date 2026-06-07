export * from "./client";
export * from "./core";

export interface ProtocolHandler {
  sendMessage(message: string): void;
}
