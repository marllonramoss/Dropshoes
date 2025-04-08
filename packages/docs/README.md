# Documentação dos Contextos

Esta pasta contém a documentação detalhada de cada contexto do sistema, seguindo os princípios do Domain-Driven Design (DDD).

## Estrutura

```
docs/
├── README.md                 # Este arquivo
└── contextos/                # Documentação de cada contexto
    ├── compras.md            # Contexto de Compras (Core Domain)
    ├── pagamento.md          # Contexto de Pagamento (Supporting Domain)
    ├── envio.md              # Contexto de Envio (Supporting Domain)
    └── catalogo.md           # Contexto de Catálogo (Supporting Domain)
```

## Como Usar

1. **Para Desenvolvedores Novos:**
   - Comece lendo o README.md de cada contexto para entender sua responsabilidade
   - Consulte a documentação ao implementar novas funcionalidades
   - Atualize a documentação quando modificar o modelo ou regras de negócio

2. **Para Manutenção:**
   - Use a documentação como referência para entender o impacto de mudanças
   - Mantenha a documentação atualizada com as mudanças no código

3. **Para Arquitetos:**
   - Use a documentação para avaliar o acoplamento entre contextos
   - Identifique oportunidades de melhoria na modelagem

## Convenções

- Cada arquivo `.md` representa um contexto
- Use markdown para formatação
- Mantenha a documentação concisa e focada
- Atualize a documentação sempre que o modelo mudar

## Contextos Atuais

1. **Compras (Core Domain)**
   - Responsável pelo processo de compra
   - Gerencia carrinhos e pedidos
   - Central para o negócio de dropshipping

2. **Outros Contextos (a serem documentados)**
   - Pagamento
   - Envio
   - Catálogo 