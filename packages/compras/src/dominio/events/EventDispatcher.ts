import { Evento } from "./Evento";

export interface EventDispatcher {
  dispatch(evento: Evento): Promise<void>;
  register(
    nomeEvento: string,
    handler: (evento: Evento) => Promise<void>
  ): void;
}
