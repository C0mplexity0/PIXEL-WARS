import { ProtocolHandlerEventHandler } from "./base";
import type {
  ClientToCoreEvents,
  CoreToClientEvents,
  CoreToClientProtocolHandler,
} from "./base";
import type { ClientSingleplayerProtocolHandler } from "./client";

export class CoreSingleplayerProtocolHandler
  extends ProtocolHandlerEventHandler<ClientToCoreEvents>
  implements CoreToClientProtocolHandler
{
  private clientProtocolHandler?: ClientSingleplayerProtocolHandler;

  sendMessage<TEvent extends keyof CoreToClientEvents & string>(
    event: TEvent,
    data: CoreToClientEvents[TEvent],
  ): void {
    if (!this.clientProtocolHandler) {
      throw new Error("Client protocol handler not set");
    }

    this.clientProtocolHandler.processCoreMessage(event, data);
  }

  setClientProtocolHandler(handler: ClientSingleplayerProtocolHandler): void {
    this.clientProtocolHandler = handler;
  }

  processClientMessage<TEvent extends keyof ClientToCoreEvents & string>(
    event: TEvent,
    data: ClientToCoreEvents[TEvent],
  ): void {
    const eventHandler = this.messageReceivedEventHandlers.get(event);
    if (eventHandler) {
      eventHandler.fire(data);
    }
  }
}

export class CoreMultiplayerProtocolHandler
  extends ProtocolHandlerEventHandler<ClientToCoreEvents>
  implements CoreToClientProtocolHandler
{
  sendMessage<TEvent extends keyof CoreToClientEvents & string>(
    event: TEvent,
    data: CoreToClientEvents[TEvent],
  ): void {
    // Implement the logic to handle messages in multiplayer mode
    console.log(event, data);
  }
}
