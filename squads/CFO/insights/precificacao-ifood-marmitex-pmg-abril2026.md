# 💰 Análise de Precificação Ideal — Marmitex P e M no iFood

**Data:** 10/04/2026 | **Agente:** Arquiteto do Lucro + Financeiro + Gerente Geral

---

## ⚠️ Descoberta Crítica: P e M usam o mesmo custo de insumo

Analisando as fichas técnicas, a Marmitex P **não tem uma porção significativamente menor** — os custos de receita são os mesmos (ou muito próximos) do M. Isso significa que ao cobrar R$ 24,90 no P você está com **pior margem proporcional** que no M.

| Prato | Custo Receita | iFood P (R$ 24,90) | iFood M (R$ 32,40) |
|-------|-------------|-------------------|-------------------|
| Frango Frito | R$ 4,18 | CMV 31,2% ✅ | CMV 25,4% ✅ |
| Pernil Acebolado | R$ 5,52 | CMV 41,2% ⚠️ | CMV 31,9% ✅ |
| Strogonoff | R$ 6,59 | CMV 49,1% 🚨 | CMV 38,4% ⚠️ |
| Parmegiana | R$ 9,44 | CMV 70,4% ☠️ | CMV 54,5% ☠️ |

> **Conclusão:** A Marmitex P está subprecificada. Pratos como Strogonoff e Parmegiana no P já geram CMV insustentável sem nenhum cupom.

---

## 📐 Simulação por Faixa de Preço — Marmitex P

**Referência de custo:** Strogonoff (prato mais caro = pior cenário) · Custo total c/ embalagem: R$ 8,09

| Preço iFood P | Repasse (73%) | Margem (Strog.) | CMV (Strog.) | Entra no Cupom? | Avaliação |
|--------------|--------------|----------------|--------------|----------------|-----------|
| R$ 24,90 (atual) | R$ 18,18 | R$ 10,09 | 49,1% 🚨 | ❌ (abaixo de R$25) | Subprecificado |
| R$ 26,90 | R$ 19,64 | R$ 11,55 | 41,2% ⚠️ | ✅ | Ok, mas fraco |
| **R$ 28,90** | **R$ 21,10** | **R$ 13,01** | **38,3% ⚠️** | **✅** | **Opção conservadora** |
| **R$ 29,90** | **R$ 21,83** | **R$ 13,74** | **37,0% ⚠️** | **✅** | **⭐ Recomendado** |
| R$ 31,90 | R$ 23,29 | R$ 15,20 | 34,7% ✅ | ✅ | Topo do mercado |

### Com Cupom de R$ 12 — Marmitex P (nos preços ajustados)

| Preço iFood P | Repasse c/ Cupom | Margem (Frango Frito) | Margem (Strogonoff) |
|--------------|-----------------|----------------------|---------------------|
| R$ 24,90 | ❌ não elegível | — | — |
| R$ 28,90 | R$ 9,10 | R$ 3,42 ⚠️ | R$ 1,01 🚨 |
| **R$ 29,90** | **R$ 9,83** | **R$ 4,15 ⚠️** | **R$ 1,74 🚨** |
| R$ 31,90 | R$ 11,29 | R$ 5,61 ⚠️ | R$ 3,20 ⚠️ |

> **Insight P:** O cupom de R$ 12 ainda é agressivo para o P mesmo com aumento. Solução: aumentar o preço do P **e** restringir os pratos caros (Strogonoff/Parmegiana) ao tamanho P no iFood, deixando só Frango Frito e Pernil disponíveis nesse tamanho.

---

## 📐 Simulação por Faixa de Preço — Marmitex M

**Referência de custo:** Strogonoff (prato mais caro = pior cenário) · Custo total c/ embalagem: R$ 8,09

| Preço iFood M | Repasse (73%) | Margem (Strog.) | CMV (Strog.) | Avaliação |
|--------------|--------------|----------------|--------------|-----------|
| R$ 32,40 (atual) | R$ 23,65 | R$ 15,56 | 34,2% ✅ | Justo, mas apertado com cupom |
| R$ 33,90 | R$ 24,75 | R$ 16,66 | 32,7% ✅ | Melhor |
| **R$ 35,90** | **R$ 26,21** | **R$ 18,12** | **30,9% ✅** | **Opção conservadora** |
| **R$ 36,90** | **R$ 26,95** | **R$ 18,86** | **30,0% ✅** | **⭐ Recomendado** |
| R$ 38,90 | R$ 28,40 | R$ 20,31 | 28,5% ✅ | Topo do mercado |

### Com Cupom de R$ 12 — Marmitex M (nos preços ajustados)

| Preço iFood M | Repasse c/ Cupom | Margem (Frango Frito) | Margem (Strogonoff) |
|--------------|-----------------|----------------------|---------------------|
| R$ 32,40 (atual) | R$ 11,65 | R$ 5,97 ⚠️ | R$ 3,56 ⚠️ |
| R$ 35,90 | R$ 14,21 | R$ 8,53 ✅ | R$ 6,12 ⚠️ |
| **R$ 36,90** | **R$ 14,95** | **R$ 9,27 ✅** | **R$ 6,86 ⚠️** |
| R$ 38,90 | R$ 16,40 | R$ 10,72 ✅ | R$ 8,31 ✅ |

---

## 🧠 A Âncora Psicológica: Equilíbrio da Grade P/M/G

### Grade atual vs. Grade recomendada:

| | P | M | G | Gap P→M | Gap M→G |
|--|--|--|--|--|--|
| **Atual** | R$ 24,90 | R$ 32,40 | R$ 43,90 | R$ 7,50 | R$ 11,50 |
| **Opção Conservadora** | R$ 28,90 | R$ 35,90 | R$ 43,90 | R$ 7,00 | R$ 8,00 |
| **⭐ Recomendado** | R$ 29,90 | R$ 36,90 | R$ 43,90 | R$ 7,00 | R$ 7,00 |
| **Opção Agressiva** | R$ 31,90 | R$ 38,90 | R$ 43,90 | R$ 7,00 | R$ 5,00 |

**Por que R$ 29,90 e R$ 36,90 são os preços ideais:**
- Gap de R$ 7,00 entre todos os tamanhos = grade **simétrica e percebida como justa**
- O cliente olha e pensa: "Por mais R$ 7 eu pego um tamanho maior" → tende a escolher M ou G
- R$ 29,90 ainda "parece" vinte e poucos (barreira psicológica dos R$ 30)
- R$ 36,90 ainda "parece" trinta e poucos (barreira psicológica dos R$ 40)
- A opção agressiva (R$ 38,90 M) deixa o G muito próximo → canibaliza o G

---

## ✅ Recomendação Final

| Tamanho | Preço Atual | **Preço Recomendado** | Aumento | Motivo |
|---------|------------|----------------------|---------|--------|
| **P** | R$ 24,90 | **R$ 29,90** | +R$ 5,00 (+20%) | Corrige CMV, habilita cupom, âncora psicológica |
| **M** | R$ 32,40 | **R$ 36,90** | +R$ 4,50 (+14%) | Grade simétrica, melhora margem com cupom |
| **G** | R$ 43,90 | **R$ 43,90** | — | Já bem posicionado |

---

## 💡 Impacto de Receita Projetado (sem cupom)

**Base:** 11 pedidos/semana no iFood — Mix 50% P + 50% M (Strogonoff)

| | Preço Atual | Preço Novo | Diferença |
|--|--|--|--|
| Receita Bruta/semana | ~R$ 315,00 | ~R$ 369,00 | **+R$ 54,00** |
| Repasse (73%)/semana | R$ 229,95 | R$ 269,37 | +R$ 39,42 |
| Custo pratos + emb. | R$ 88,99 | R$ 88,99 | — |
| **Margem Bruta/semana** | **R$ 140,96** | **R$ 180,38** | **+R$ 39,42** |
| **Margem Bruta/mês** | R$ 563,84 | R$ 721,52 | **+R$ 157,68/mês** |

> Só com o reajuste de preço, **sem mudar nada mais**, você ganha ~R$ 157/mês a mais nos pedidos existentes.

---

## 📋 Regra de Cardápio por Tamanho no iFood

| Prato | Tamanho P | Tamanho M | Tamanho G |
|-------|:---------:|:---------:|:---------:|
| Frango Frito | ✅ | ✅ | ✅ |
| Pernil Acebolado | ✅ | ✅ | ✅ |
| Filé Grelhado c/ Frita | ✅ | ✅ | ✅ |
| Strogonoff de Frango | ⚠️ Só se prato do dia | ✅ | ✅ |
| Bife de Panela | ❌ | ✅ | ✅ |
| Parmegiana | ❌ | ⚠️ Cuidado | ✅ |

> Pratos de proteína bovina no P sempre terão CMV ruim. Não oferecer nesses tamanhos é a solução mais simples.

---

*Análise gerada pelo Arquiteto do Lucro + Financeiro — Restaurante Bendito É · Abril/2026*
