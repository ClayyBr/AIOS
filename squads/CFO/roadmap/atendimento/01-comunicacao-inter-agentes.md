# Evolução: Comunicação Inter-Agentes (Opção B)

**Prioridade:** 🔴 Alta
**Pré-requisito:** MVP validado e funcionando
**Complexidade:** Alta
**Origem:** Brainstorming Ponto 2.1

---

## Contexto

No MVP, o Agente Atendente lê dados centralizados de uma Google Sheets para saber promoções, cardápio e preços (**Opção A**). Isso funciona, mas não é "inteligente" — ele apenas lê dados estáticos.

## O que será feito

Implementar a **Opção B**: comunicação agêntica real entre o Atendente e os outros agentes do Squad CFO.

### Fluxo Desejado

```
Cliente: "Tem promoção hoje?"
  → Atendente cria sub-tarefa interna
  → Invoca @vendas com o prompt: "Qual a promoção de hoje?"
  → @vendas consulta @controlador-estoque (o que vence?)
  → @vendas aplica regras de Revenue Management
  → @vendas retorna: "Terça é dia de Strogonoff por R$24,90 (frango vencendo)"
  → Atendente traduz para linguagem de cliente e responde
```

### Requisitos Técnicos

1. **SDK de Comunicação Inter-Agentes** — Criar module que permita invocar agentes AIOS programaticamente
2. **Queue/Fila** — Para não bloquear o atendimento enquanto espera resposta dos agentes
3. **Timeout** — Máximo 5s para resposta do agente; se falhar, usar fallback (dados do Sheets)
4. **Cache** — Promoção do dia não muda a cada minuto; cachear por 1h

### Benefícios

- Promoções dinâmicas baseadas em estoque real
- Respostas mais inteligentes e contextuais
- Integração orgânica com todo o ecossistema CFO

### Riscos

- Latência adicional nas respostas ao cliente
- Complexidade de debug (múltiplos agentes envolvidos)
- Custo adicional de API (mais chamadas ao Gemini)
