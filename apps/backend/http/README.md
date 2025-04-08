# Testes de API HTTP

Este diretório contém arquivos para testar os endpoints da API diretamente através de requisições HTTP.

## Como usar

### Usando a extensão REST Client para VS Code

1. Instale a extensão [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VS Code
2. Abra qualquer arquivo `.http` neste diretório
3. Clique em "Send Request" acima de cada requisição para executá-la

### Ajustando variáveis

No início de cada arquivo existem variáveis que podem ser ajustadas:

```
@host = http://localhost:3000
@pedidoId = 89935c5a-1f10-4656-b75a-fc82298749a7
```

Substitua `@pedidoId` pelo ID do pedido que deseja testar.

## Fluxo completo para testar um pedido

1. Execute o endpoint de "Criar novo pedido" para obter um ID
2. Atualize a variável `@pedidoId` com o ID retornado
3. Consulte o status do pedido com o endpoint "Verificar status do pedido"
4. Execute o endpoint "Realizar pedido" para colocá-lo em processamento
5. Consulte o status novamente para confirmar a mudança
6. Execute o endpoint "Aprovar pedido" ou "Rejeitar pedido"
7. Consulte o status final

## Arquivos disponíveis

- `compras.http`: Todos os endpoints do módulo de compras
- `fluxo-completo.http`: Passo a passo para testar o fluxo completo de um pedido
- `cenarios-erro.http`: Testes para verificar cenários de erro e validações

## Dicas

1. **Copiar o ID do Pedido**: Após criar um pedido, copie o ID retornado e atualize a variável `@pedidoId` em todos os arquivos.

2. **Verificar Status**: Use o endpoint de verificação de status antes e depois de cada operação para confirmar as mudanças.

3. **Ordem de Execução**: Siga a ordem numérica dos comentários em `fluxo-completo.http` para testar corretamente o ciclo de vida do pedido.

4. **Erros Esperados**: Em `cenarios-erro.http`, espera-se que as requisições falhem com erros específicos. Isso é útil para verificar se as validações estão funcionando. 