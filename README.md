# 👟 DropShoes

E-commerce de calçados desenvolvido com arquitetura moderna, aplicando DDD (Domain-Driven Design) e Clean Architecture em um monorepo.

## 💡 Destaques Técnicos

- **Arquitetura Moderna**: Monorepo com Turborepo + DDD + Clean Architecture
- **Módulos de Domínio**: Implementação de `Produtos` e `Compras` como bounded contexts isolados
- **Frontend Moderno**: Next.js 15 com App Router, React Server Components e TailwindCSS
- **Backend Robusto**: NestJS com princípios SOLID e design patterns
- **Type Safety**: TypeScript end-to-end com configurações estritas
- **Qualidade**: ESLint + Prettier + Jest para testes

## 🏗️ Stack

```
Frontend (Next.js 15)          Backend (NestJS)
├─ React 19                    ├─ TypeScript
├─ TailwindCSS                 ├─ Prisma (ORM)
├─ TypeScript                  ├─ PostgreSQL
└─ Shadcn/ui                   └─ Jest
```

## 📦 Estrutura

```
dropshoes/
├── apps/
│   ├── web/              # Next.js (E-commerce + Admin)
│   └── backend/          # NestJS API
└── packages/
    ├── produto/          # Domínio de Produtos
    └── compras/          # Domínio de Compras
```

## 🚀 Quick Start

```bash
yarn install
yarn dev     # Desenvolvimento
yarn build   # Build de produção
yarn test    # Testes
```

## 📝 Arquitetura

- **Domain-Driven Design**: Módulos de domínio isolados com suas próprias regras de negócio
- **Clean Architecture**: Separação clara entre domínio, aplicação e infraestrutura
- **Monorepo**: Compartilhamento de código e configurações entre aplicações
- **Type Safety**: TypeScript com configurações estritas em todo o projeto

## 🔐 Admin

Painel administrativo integrado com features de:
- Gestão de produtos
- Visualização de pedidos
- Dashboard de vendas

## 📚 Docs

- API: Swagger em `/apps/backend/swagger`
- Docs: `/packages/docs`

---
Desenvolvido com tecnologias modernas e boas práticas de arquitetura.
