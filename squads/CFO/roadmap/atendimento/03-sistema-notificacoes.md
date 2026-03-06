# Evolução: Sistema de Notificações

**Prioridade:** 🟡 Média
**Pré-requisito:** MVP funcionando
**Complexidade:** Baixa-Média
**Origem:** Brainstorming Ponto 4.1

---

## Contexto

No MVP, quando o agente faz handoff (transfere o chat para humano), o Cleison precisa estar acompanhando manualmente as conversas. Não há notificação automática.

## O que será feito

Implementar um sistema de notificações para que o dono/gerente saiba em tempo real sobre eventos importantes do atendimento.

### Eventos que Geram Notificação

| Evento | Urgência | Canal Sugerido |
|--------|----------|----------------|
| Handoff para humano (cliente pediu atendente) | 🔴 Alta | WhatsApp do dono + Push |
| Reclamação detectada (sentiment analysis) | 🔴 Alta | WhatsApp do dono |
| Novo pedido confirmado | 🟢 Baixa | Grupo WhatsApp da Cozinha |
| Pedido com pagamento Pix pendente há +10min | 🟡 Média | WhatsApp do dono |
| Volume atípico (muitas msgs simultâneas) | 🟡 Média | WhatsApp do dono |

### Canais de Notificação (Progressivo)

1. **V1:** Mensagem no WhatsApp pessoal do Cleison (usar a própria API da Meta)
2. **V2:** Integração com Telegram Bot (backup, mais barato)
3. **V3:** Push no Dashboard CFO (quando existir)

### Requisitos Técnicos

- Análise de sentimento básica (Gemini pode classificar: positivo/neutro/negativo)
- Debounce de notificações (não enviar spam ao dono)
- Configuração de quais eventos notificar (toggle por tipo)
