import { Injectable } from '@nestjs/common';
import {
  EventDispatcher as IEventDispatcher,
  Evento,
} from '@dropshoes/compras';

@Injectable()
export class EventDispatcher implements IEventDispatcher {
  private handlers: Map<string, Array<(evento: Evento) => Promise<void>>> =
    new Map();

  async dispatch(evento: Evento): Promise<void> {
    const handlers = this.handlers.get(evento.nome) || [];
    for (const handler of handlers) {
      await handler(evento);
    }
  }

  register(
    nomeEvento: string,
    handler: (evento: Evento) => Promise<void>,
  ): void {
    if (!this.handlers.has(nomeEvento)) {
      this.handlers.set(nomeEvento, []);
    }
    this.handlers.get(nomeEvento)?.push(handler);
  }
}
