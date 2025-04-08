// Domínio
export * from "./dominio";

// Aplicação
export * from "./aplicacao";

// Tipos e Interfaces

// Interfaces (exportadas como valor para DI)
export { PedidoRepository } from "./dominio/repositories/PedidoRepository";

// Constantes
export const x = 10;

export const PEDIDO_REPOSITORY = "PEDIDO_REPOSITORY";
export const EVENT_DISPATCHER = "EVENT_DISPATCHER";
