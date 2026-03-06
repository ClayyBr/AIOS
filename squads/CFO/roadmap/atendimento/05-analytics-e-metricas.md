# Evolução: Analytics e Métricas do Atendimento

**Prioridade:** 🟢 Baixa
**Pré-requisito:** Sistema estável com volume de dados
**Complexidade:** Média
**Origem:** Melhoria Contínua

---

## Contexto

Para otimizar o atendimento e entender o comportamento dos clientes, precisamos de métricas.

## Métricas a Coletar

### Atendimento

| Métrica | Descrição | Meta |
|---------|-----------|------|
| Tempo médio de resposta | Quanto o agente demora para responder | < 5s |
| Taxa de conversão | Conversas que viram pedido / total | > 40% |
| Taxa de handoff | % de conversas transferidas para humano | < 10% |
| Tempo médio de pedido | Tempo entre 1ª mensagem e confirmação | < 8min |
| NPS/Satisfação | Pesquisa rápida pós-entrega ("de 1 a 5...") | > 4.0 |

### Negócio

| Métrica | Descrição |
|---------|-----------|
| Ticket médio (WhatsApp) | Valor médio dos pedidos feitos pelo bot |
| Horários de pico | Quando o WhatsApp recebe mais mensagens |
| Itens mais pedidos | Ranking de pratos pelo canal WhatsApp |
| Taxa de abandono | Cliente iniciou conversa mas não finalizou pedido |
| Comparativo Canal | WhatsApp vs Site vs iFood (quando houver dados) |

### Inteligência

| Métrica | Uso |
|---------|-----|
| Perguntas mais frequentes | Melhorar o prompt e FAQ do agente |
| Classificação de sentimento | Detectar insatisfação antes do handoff |
| Padrões de recompra | Clientes que pedem toda semana (programa fidelidade?) |

## Visualização

1. **V1:** Relatório semanal gerado pelo agente @financeiro (já existe no squad)
2. **V2:** Aba no Dashboard CFO (apps/dashboard) com gráficos em tempo real
3. **V3:** Integração com Looker Studio / Google Data Studio

## Coleta de Dados

- Log de toda conversa (mensagem + timestamp + status)
- Eventos estruturados (pedido_iniciado, pedido_confirmado, handoff, etc.)
- Armazenar no banco de dados dedicado (ver `02-banco-de-dados-dedicado.md`)
