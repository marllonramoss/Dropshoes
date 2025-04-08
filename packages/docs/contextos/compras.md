# Contexto de Compras (Core Domain)

## Visão Geral
O contexto de Compras é responsável por gerenciar o processo de compra dos usuários, desde a criação do carrinho até a realização do pedido. É considerado um Core Domain por ser central para o negócio de dropshipping.

## Modelo de Domínio

### Entidades
- **Pedido**
  - Identidade: `Id` (UUID)
  - Estados: `CRIADO`, `EM_PROCESSAMENTO`, `APROVADO`, `REJEITADO`
  - Comportamentos:
    - `adicionarItem(item: ItemPedido)`: Adiciona um item ao pedido (apenas se status = `CRIADO`)
    - `realizar()`: Muda status para `EM_PROCESSAMENTO` e dispara evento `PedidoRealizado`
    - `getValorTotal()`: Calcula o valor total do pedido

### Objetos de Valor
- **Id**
  - Imutável
  - Validação: não pode ser vazio
- **ItemPedido**
  - Imutável
  - Atributos: `produtoId`, `quantidade`, `valorUnitario`
  - Validações: quantidade > 0, valorUnitario > 0
  - Comportamento: `getValorTotal()`

### Eventos de Domínio
- **PedidoRealizado**
  - Dados: `pedidoId`, `valorTotal`, `itens[]`
  - Disparado quando: pedido é realizado
  - Consumido por: Contextos de Pagamento, Envio, etc.

## Casos de Uso

### CriarPedido
- **Entrada**: `produtoId`, `quantidade`, `valorUnitario`
- **Processo**:
  1. Cria novo `Pedido` com ID único
  2. Cria `ItemPedido` com dados fornecidos
  3. Adiciona item ao pedido
  4. Salva pedido no repositório
- **Saída**: `Pedido` criado

### AdicionarItemAoPedido
- **Entrada**: `pedidoId`, `produtoId`, `quantidade`, `valorUnitario`
- **Processo**:
  1. Busca pedido existente
  2. Cria novo `ItemPedido`
  3. Adiciona item ao pedido
  4. Salva pedido atualizado
- **Saída**: `Pedido` atualizado

### RealizarPedido
- **Entrada**: `pedidoId`
- **Processo**:
  1. Busca pedido existente
  2. Chama `pedido.realizar()`
  3. Salva pedido atualizado
  4. Dispara eventos acumulados
- **Saída**: `Pedido` realizado

## Regras de Negócio
1. Um pedido só pode receber itens se estiver em status `CRIADO`
2. Um pedido não pode ser realizado sem itens
3. Um pedido não pode ser realizado se já estiver em outro estado
4. Itens devem ter quantidade e valor unitário maiores que zero

## Interfaces
- **PedidoRepository**
  - `salvar(pedido: Pedido): Promise<void>`
  - `buscarPorId(id: Id): Promise<Pedido | null>`
  - `listarTodos(): Promise<Pedido[]>`

- **EventDispatcher**
  - `dispatch(evento: Evento): Promise<void>`
  - `register(nomeEvento: string, handler: (evento: Evento) => Promise<void>): void`

## Fluxo Principal
1. Usuário adiciona primeiro item → `CriarPedido`
2. Usuário adiciona mais itens → `AdicionarItemAoPedido`
3. Usuário finaliza compra → `RealizarPedido` → Evento `PedidoRealizado`

## Decisões de Arquitetura
- O pedido é criado no backend desde o primeiro item para permitir sincronização entre dispositivos
- Eventos de domínio são usados para comunicação com outros contextos
- A implementação do repositório e do dispatcher de eventos ficam em pacotes separados para manter o domínio limpo

## Integrações com Outros Contextos
- **Pagamento**: Reage ao evento `PedidoRealizado` para iniciar o processo de pagamento
- **Envio**: Reage ao evento `PedidoRealizado` para preparar o envio
- **Estoque**: Reage ao evento `PedidoRealizado` para reservar os itens 