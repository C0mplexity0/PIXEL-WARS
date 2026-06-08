import { ProtocolHandlerEventHandler } from "./base";
import type {
  ClientToCoreEvents,
  ClientToCoreProtocolHandler,
  CoreToClientEvents,
} from "./base";
import type { CoreSingleplayerProtocolHandler } from "./core";
import { Socket } from "socket.io-client";

export class ClientSingleplayerProtocolHandler
  extends ProtocolHandlerEventHandler<CoreToClientEvents>
  implements ClientToCoreProtocolHandler
{
  private coreProtocolHandler?: CoreSingleplayerProtocolHandler;

  sendMessage<TEvent extends keyof ClientToCoreEvents & string>(
    event: TEvent,
    data: ClientToCoreEvents[TEvent],
  ): void {
    if (!this.coreProtocolHandler) {
      throw new Error("Core protocol handler not set");
    }

    this.coreProtocolHandler.processClientMessage(event, data);
  }

  setCoreProtocolHandler(handler: CoreSingleplayerProtocolHandler): void {
    this.coreProtocolHandler = handler;
  }

  processCoreMessage<TEvent extends keyof CoreToClientEvents & string>(
    event: TEvent,
    data: CoreToClientEvents[TEvent],
  ): void {
    const eventHandler = this.messageReceivedEventHandlers.get(event);
    if (eventHandler) {
      eventHandler.fire(data);
    }
  }
}

export class ClientMultiplayerProtocolHandler
  extends ProtocolHandlerEventHandler<CoreToClientEvents>
  implements ClientToCoreProtocolHandler
{
  private socket: Socket;

  constructor(socket: Socket) {
    super();
    this.socket = socket;
  }

  sendMessage<TEvent extends keyof ClientToCoreEvents & string>(
    event: TEvent,
    data: ClientToCoreEvents[TEvent],
  ): void {
    // Implement the logic to handle messages in multiplayer mode
    console.log(event, data);
    console.log(this.socket.id);
  }
}
