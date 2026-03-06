# Roadmap: Agente Atendente WhatsApp — Próximos Passos

**Criado em:** 2026-03-06
**Responsável:** Squad CFO
**Status:** Planejamento Futuro

---

Este diretório documenta as melhorias e evoluções planejadas para o Agente Atendente IA do WhatsApp, organizadas por prioridade e complexidade.

## 📁 Arquivos deste Roadmap

| Arquivo | Descrição | Prioridade |
|---------|-----------|------------|
| `01-comunicacao-inter-agentes.md` | Evoluir de leitura de planilha para comunicação agêntica real com @vendas | Alta |
| `02-banco-de-dados-dedicado.md` | Migrar de Google Sheets para Supabase/PostgreSQL + Redis | Alta |
| `03-sistema-notificacoes.md` | Notificações automáticas para o dono (handoff, pedidos, alertas) | Média |
| `04-pagamento-automatizado.md` | Verificação automática de Pix e integração com gateways | Média |
| `05-analytics-e-metricas.md` | Dashboard de métricas do atendimento (tempo resposta, conversão) | Baixa |
| `06-cardapio-no-codigo.md` | Migrar cardápio de Google Sheets para arquivo no código | Baixa |

## 🗺️ Visão de Evolução

```
MVP (Atual Planejamento)
  ├── Google Sheets (cardápio + pedidos)
  ├── Render (free tier)
  ├── Gemini 1.5 Flash
  └── Handoff manual

V2 (Pós-Validação MVP)
  ├── Banco de dados dedicado (Supabase)
  ├── Comunicação agêntica com @vendas
  ├── Notificações automáticas
  └── Verificação de Pix via webhook bancário

V3 (Escala)
  ├── VPS dedicada
  ├── Multi-atendimento simultâneo otimizado
  ├── Dashboard analytics em tempo real
  └── Integração completa com todos os agentes CFO
```
