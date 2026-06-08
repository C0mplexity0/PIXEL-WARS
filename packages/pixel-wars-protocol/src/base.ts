import type { Coordinates, PixelType } from "@pixel-wars/core";
import type { ChunkData } from "@pixel-wars/core";
import { EventHandler, type Listener } from "@pixel-wars/utils";

export class ProtocolHandlerEventHandler<TEvents extends object> {
  protected messageReceivedEventHandlers = new Map<
    string,
    EventHandler<TEvents[keyof TEvents & string]>
  >();

  onMessageReceived<TEvent extends keyof TEvents & string>(
    event: TEvent,
    handler: Listener<TEvents[TEvent]>,
  ) {
    let eventHandler = this.messageReceivedEventHandlers.get(event);
    if (!eventHandler) {
      eventHandler = new EventHandler<TEvents[keyof TEvents & string]>();
      this.messageReceivedEventHandlers.set(event, eventHandler);
    }

    eventHandler.addListener(handler);

    return {
      disconnect: () => {
        eventHandler.removeListener(handler);
      },
    };
  }
}

export interface ClientToCoreEvents {
  "world:requestChunk": Coordinates;
  "world:requestPixelTypes": null;
}

export interface CoreToClientEvents {
  "world:chunkData": {
    coordinates: Coordinates;
    chunk: ChunkData;
  };
  "world:pixelTypes": PixelType[];
}

export interface ProtocolHandler<TEvents extends object> {
  sendMessage<TEvent extends keyof TEvents & string>(
    event: TEvent,
    data: TEvents[TEvent],
  ): void;
}

export interface ClientToCoreProtocolHandler extends ProtocolHandler<ClientToCoreEvents> {
  onMessageReceived<TEvent extends keyof CoreToClientEvents & string>(
    event: TEvent,
    handler: Listener<CoreToClientEvents[TEvent]>,
  ): {
    disconnect: () => void;
  };
}

export interface CoreToClientProtocolHandler extends ProtocolHandler<CoreToClientEvents> {
  onMessageReceived<TEvent extends keyof ClientToCoreEvents & string>(
    event: TEvent,
    handler: Listener<ClientToCoreEvents[TEvent]>,
  ): {
    disconnect: () => void;
  };
}
