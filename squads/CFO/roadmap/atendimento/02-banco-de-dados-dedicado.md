# Evolução: Banco de Dados Dedicado

**Prioridade:** 🔴 Alta
**Pré-requisito:** MVP validado com Google Sheets
**Complexidade:** Média
**Origem:** Brainstorming Ponto 3

---

## Contexto

No MVP, usamos Google Sheets tanto para o cardápio (leitura) quanto para os pedidos (escrita). Isso é ótimo para começar, mas tem limitações sérias para escala.

## Limitações do Google Sheets

| Problema | Impacto |
|----------|---------|
| Latência da API (~300-800ms) | Cliente espera mais pela resposta |
| Rate limits (60 req/min) | Se tiver muitos pedidos simultâneos, falha |
| Sem transações ACID | Risco de dados corrompidos |
| Sem índices/buscas eficientes | Buscar histórico do cliente é lento |
| Sem relações entre dados | Cardápio → Pedido → Cliente sem join |

## Solução Proposta

### Stack de Dados V2

| Componente | Tecnologia | Função |
|------------|-----------|--------|
| **Banco Relacional** | Supabase (PostgreSQL) | Pedidos, clientes, cardápio, histórico |
| **Cache de Sessão** | Redis (Upstash — free tier) | Estado da conversa por número de telefone |
| **Migrations** | Prisma ORM | Gerenciar schema e migrações |

### Schema Inicial

```
Clientes
  - id, nome, telefone, endereco_padrao, criado_em

Cardapio
  - id, nome, descricao, preco, categoria, disponivel, foto_url

Pedidos
  - id, cliente_id, itens (JSON), total, forma_pagamento, status, criado_em

PromocoesAtivas
  - id, cardapio_id, preco_promocional, validade, dia_semana

SessoesConversa
  - telefone, estado_atual, carrinho (JSON), ultima_interacao
```

### Benefícios

- Tempo de resposta < 50ms (vs 300-800ms do Sheets)
- Histórico do cliente (pedidos anteriores, preferências)
- Dashboard SQL nativo no Supabase
- Sem limite de rate
- Dados relacionais (o pedido "pertence a" um cliente)

### Plano de Migração

1. Criar schema no Supabase
2. Migrar dados do Sheets para as tabelas
3. Substituir chamadas do Google Sheets API por queries Prisma
4. Manter Sheets como backup/visualização somente-leitura (opcional)
