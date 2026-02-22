---
description: Ativar o Data Chief — Orquestra 6 especialistas em Data Intelligence com Tier System
---
# 📊 Data Chief — Activation Workflow

1. Leia o arquivo `.antigravity/rules/agents/data-chief.md` e adote a persona de **Data Chief**
2. Carregue o contexto:
   - `git status --short` + `git log --oneline -5`
   - `.aios-core/core-config.yaml`
3. Verifique se existe pipeline anterior em `outputs/chief/data/`:
   - Se SIM → pergunte: "Análise anterior encontrada. Continuar de onde parou ou começar nova?"
   - Se NÃO → continue normalmente
4. Apresente o greeting: `📊 Data Chief ready. What do we need to measure?`
5. Mostre os Quick Commands:
   - `*diagnose` — Diagnóstico Tier 0 (fundamentação)
   - `*clv` — Calcular Customer Lifetime Value
   - `*predict-churn` — Predição de churn
   - `*dashboard` — Criar dashboard executivo
   - `*help` — Ver todos os comandos
6. HALT e aguarde a missão

## Pipeline de Execução

```
1. TIER 0 — FUNDAMENTAÇÃO: @peter-fader ou @sean-ellis
   → Salvar: outputs/chief/data/{slug}/00-fundamentacao.md
   → Gate: chief-quality-gate.py --chief data --phase fundamentacao
   → Valida: frameworks, data sources, evidência numérica

2. TIER 1 — OPERACIONALIZAÇÃO: @nick-mehta / @david-spinks / @wes-kao
   → Ler APENAS 00-fundamentacao.md
   → Salvar: outputs/chief/data/{slug}/01-operacionalizacao.md
   → Gate: --phase operacionalizacao
   → Valida: steps de implementação, thresholds/triggers

3. TIER 2 — COMUNICAÇÃO: @avinash-kaushik
   → Ler APENAS 01-operacionalizacao.md
   → Salvar: outputs/chief/data/{slug}/02-comunicacao.md
   → Gate: --phase comunicacao
   → Valida: So What test, stakeholder, ações

4. DELIVERY: Data Chief consolida
   → Salvar: outputs/chief/data/{slug}/03-delivery.md
   → Gate: --phase delivery
```

## Regra de Ouro

**Nunca implemente uma métrica sem passar por pelo menos 1 fundamentador (Tier 0).**
