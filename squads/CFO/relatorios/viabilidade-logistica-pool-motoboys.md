# Relatório de Viabilidade: Modelo de Pool de Motoboys Próprio
**Gerado por:** Gerente Geral — CFO Squad  
**Data:** 2026-04-19  
**Status:** Análise Estratégica com Números Reais/Aproximados  
**Objetivo:** Avaliar a viabilidade financeira do modelo de pool competitivo de entregadores com agrupamento (batching) vs. alternativas

---

## PARTE 1 — BENCHMARK DE MERCADO (O QUE AS PLATAFORMAS COBRAM E PAGAM)

### 1.1 Estrutura de Frete do iFood (2025, região Vale do Paraíba / Interior SP)

| Distância | Frete Cobrado do Cliente | Repasse ao Motoboy | Spread da Plataforma | Spread % |
|---|---|---|---|---|
| Até 2km | R$ 5,00 – R$ 7,00 | R$ 2,50 – R$ 3,50 | R$ 2,50 | ~42% |
| 2–3km | R$ 7,00 – R$ 10,00 | R$ 4,00 – R$ 5,50 | R$ 3,50 | ~39% |
| 3–4km | R$ 10,00 – R$ 13,00 | R$ 5,50 – R$ 7,00 | R$ 4,50 | ~38% |
| 4–5km | R$ 13,00 – R$ 16,00 | R$ 7,00 – R$ 9,00 | R$ 5,50 | ~37% |
| Chuva/Pico | +40–120% sobre o frete base | +0–20% sobre repasse base | Spread expande | Até 55% |

> **Referência exata (do relatório de logística):** Entrega de 3km — iFood cobra R$ 9,00 do cliente (R$ 3,00/km) e repassa R$ 5,50 ao motoboy (R$ 1,83/km). **Spread: R$ 3,50 por entrega = R$ 1,17/km.**

### 1.2 Taxa de Serviço (100% plataforma — cliente paga separado)

| Plataforma | Taxa de Serviço | Destinatário |
|---|---|---|
| iFood | R$ 0,99 – R$ 1,99 por pedido | iFood (100%) |
| 99Food | R$ 0,99 – R$ 1,49 por pedido | 99Food (100%) |
| DoorDash EUA (referência) | ~13% do subtotal | DoorDash (100%) |

### 1.3 Repasse Real ao Motoboy (Por KM Rodado)

```
iFood — Entrega Simples (3km):
  Total rodado pelo motoboy: ~6km (ida 3km + retorno 3km)
  Recebe: R$ 5,50
  Ganho por km REAL (incluindo retorno): R$ 0,92/km

  → O motoboy roda 6km mas só é pago por 3km de distância de rota.
     O retorno não é remunerado em nenhuma plataforma.
```

---

## PARTE 2 — PROPOSTA TARIFÁRIA DO CANAL PRÓPRIO

### 2.1 Frete Cobrado do Cliente (Canal Próprio)

Premissa: competitivo com marketplace, não mais caro. O cliente que pede direto espera preço igual ou menor.

| Distância | Frete Sugerido | Comparativo iFood | Vantagem para o Cliente |
|---|---|---|---|
| Até 2km | R$ 5,00 | R$ 5–7 (iFood) | Igual ou melhor |
| 2–3km | R$ 7,00 | R$ 7–10 (iFood) | Igual ou melhor |
| 3–4km | R$ 9,00 | R$ 10–13 (iFood) | Melhor |
| 4–5km | R$ 12,00 | R$ 13–16 (iFood) | Melhor |
| Chuva intensa | +R$ 3,00 | +R$ 4–8 (iFood surge) | Igual ou melhor |
| Horário pico | +R$ 2,00 | +R$ 3–5 (iFood surge) | Melhor |

> **Regra de ouro:** nunca cobrar mais que o iFood na mesma rota para o mesmo destino. O cliente sempre pode comparar.

### 2.2 Tabela de Pagamento ao Motoboy (Pool — Combinada no Recrutamento)

A tabela abaixo é acordada UMA VEZ no recrutamento. Durante a operação, nenhuma negociação.

| Configuração da Saída | Pago ao Motoboy | Receita de Frete (R$ 7 médio) | Margem Bruta do Frete |
|---|---|---|---|
| 1 pedido (saída simples) | R$ 5,00 | R$ 7,00 | R$ 2,00 (28%) |
| 2 pedidos (batching duplo) | R$ 8,00 | R$ 14,00 | R$ 6,00 (43%) |
| 3 pedidos (batching triplo) | R$ 10,00 | R$ 21,00 | R$ 11,00 (52%) |

**Por pedido individual (custo unitário de frete para o restaurante):**

| Agrupamento | Receita/pedido | Custo/pedido | Margem/pedido | Margem % |
|---|---|---|---|---|
| Saída simples | R$ 7,00 | R$ 5,00 | R$ 2,00 | 28% |
| Batching duplo | R$ 7,00 | R$ 4,00 | R$ 3,00 | 43% |
| Batching triplo | R$ 7,00 | R$ 3,33 | R$ 3,67 | 52% |

> **A matemática do agrupamento:** com batching triplo o restaurante retém 52% do frete arrecadado contra 28% nas saídas simples. O iFood retém ~39–42% sem precisar pagar custo fixo de motoboy. O restaurante SEM custo fixo via pool pode capturar margem superior ao iFood.

### 2.3 O Que o Motoboy Recebe Por Hora (Para Usar na Conversa de Recrutamento)

```
Sem batching (saídas simples):
  Tempo por saída: ~22 min (ida 3km + entrega + retorno)
  Ganho por saída: R$ 5,00
  Saídas por hora: ~2,7
  Ganho por hora: ~R$ 13,50

Com batching duplo:
  Tempo por saída: ~32 min (rota dois destinos)
  Ganho por saída: R$ 8,00
  Saídas por hora: ~1,9
  Ganho por hora: ~R$ 15,20   ← R$ 1,70/h a mais que sem batching

Com batching triplo:
  Tempo por saída: ~42 min
  Ganho por saída: R$ 10,00
  Saídas por hora: ~1,4
  Ganho por hora: ~R$ 14,00
```

> O argumento de venda para o motoboy não é por entrega — é que com o volume do restaurante e o batching, **ele ganha mais por hora do que em uma loja de baixo movimento**.

---

## PARTE 3 — ANÁLISE DE CAPACIDADE POR MOTOBOY

### 3.1 Entregas Por Turno (Janela de Pico: 4 horas)

| Modelo | Tempo/saída | Saídas/turno | Pedidos/turno |
|---|---|---|---|
| Sem batching | 22 min | 10 | 10 |
| Batching duplo | 32 min | 7 | 14 |
| Batching triplo | 42 min | 5 | 15 |

> **Batching triplo entrega 50% mais pedidos no mesmo turno de 4 horas.** Um motoboy vira 1,5 motoboy.

### 3.2 Ganho do Motoboy Por Turno de 4 Horas

| Modelo | Saídas | Ganho por turno | Ganho por dia (2 turnos) |
|---|---|---|---|
| Sem batching | 10 saídas × R$ 5 | R$ 50 | R$ 100 |
| Batching duplo | 7 saídas × R$ 8 | R$ 56 | R$ 112 |
| Batching triplo | 5 saídas × R$ 10 | R$ 50 | R$ 100 |

> **Atenção:** batching duplo é o ponto ótimo para o motoboy (mais por turno). Batching triplo começa a cair porque ele faz menos saídas. Isso significa que a proposta de duplo é a mais fácil de aceitar.

---

## PARTE 4 — CENÁRIOS DE VIABILIDADE POR VOLUME DE PEDIDOS

### Premissas comuns a todos os cenários:
- Frete médio cobrado do cliente: R$ 7,50 (mix de distâncias)
- Taxa de batching: 60% duplo + 10% triplo + 30% simples
- Dias de operação/mês: 26 (segunda a sábado)
- 2 turnos/dia (almoço: 11h–13h30 + jantar: 18h–20h30)

---

### Cenário A — 25 Pedidos/Dia (Fase Inicial)

```
DECOMPOSIÇÃO DOS 25 PEDIDOS/DIA:
  Batching triplo (10%):  2 pedidos = 1 saída tripla  → R$ 10,00 pago
  Batching duplo  (60%): 15 pedidos = 7 saídas duplas + 1 extra → R$ 60,00 pago
  Saída simples   (30%):  8 pedidos = 8 saídas simples → R$ 40,00 pago
  
  Total saídas: ~16 saídas/dia
  Total pago ao pool: R$ 110,00/dia

RECEITA DE FRETE:
  25 pedidos × R$ 7,50 = R$ 187,50/dia

MARGEM BRUTA DO FRETE:
  R$ 187,50 − R$ 110,00 = R$ 77,50/dia (41%)

MOTOBOYS NECESSÁRIOS: 1–2 ativos/dia
POOL IDEAL: 3–4 cadastrados (rotatividade)

RESULTADO MENSAL:
  Receita frete: R$ 187,50 × 26 = R$ 4.875/mês
  Custo pool:    R$ 110,00 × 26 = R$ 2.860/mês
  Margem frete:                   R$ 2.015/mês
```

**Comparativo: Pool vs. Motoboy Fixo (25 pedidos/dia)**

| Modelo | Custo/mês | Receita Frete/mês | Margem Frete/mês |
|---|---|---|---|
| Motoboy fixo (diária R$ 120 + combustível R$ 25) | R$ 3.770 | R$ 4.875 | R$ 1.105 |
| Pool por entrega (modelo proposto) | R$ 2.860 | R$ 4.875 | **R$ 2.015** |
| **Diferença (pool vs. fixo)** | **-R$ 910/mês** | — | **+R$ 910/mês** |

---

### Cenário B — 50 Pedidos/Dia

```
DECOMPOSIÇÃO DOS 50 PEDIDOS/DIA:
  Batching triplo (10%):  5 pedidos = 2 saídas triplas  → R$ 20,00 pago
  Batching duplo  (60%): 30 pedidos = 15 saídas duplas  → R$ 120,00 pago
  Saída simples   (30%): 15 pedidos = 15 saídas simples → R$ 75,00 pago
  
  Total saídas: ~32 saídas/dia
  Total pago ao pool: R$ 215,00/dia

RECEITA DE FRETE:
  50 pedidos × R$ 7,50 = R$ 375,00/dia

MARGEM BRUTA DO FRETE:
  R$ 375,00 − R$ 215,00 = R$ 160,00/dia (42,7%)

MOTOBOYS NECESSÁRIOS: 2–3 ativos/dia
POOL IDEAL: 5–6 cadastrados

RESULTADO MENSAL:
  Receita frete: R$ 9.750/mês
  Custo pool:    R$ 5.590/mês
  Margem frete:  R$ 4.160/mês
```

**Comparativo: Pool vs. 2 Motoboys Fixos (50 pedidos/dia)**

| Modelo | Custo/mês | Receita Frete/mês | Margem Frete/mês |
|---|---|---|---|
| 2 fixos (R$ 145/dia cada) | R$ 7.540 | R$ 9.750 | R$ 2.210 |
| Pool por entrega | R$ 5.590 | R$ 9.750 | **R$ 4.160** |
| **Diferença** | **-R$ 1.950/mês** | — | **+R$ 1.950/mês** |

---

### Cenário C — 100 Pedidos/Dia (Escala Operacional)

```
DECOMPOSIÇÃO DOS 100 PEDIDOS/DIA:
  Batching triplo (10%): 10 pedidos = 3–4 saídas triplas → R$ 35,00 pago
  Batching duplo  (60%): 60 pedidos = 30 saídas duplas   → R$ 240,00 pago
  Saída simples   (30%): 30 pedidos = 30 saídas simples  → R$ 150,00 pago
  
  Total saídas: ~64 saídas/dia
  Total pago ao pool: R$ 425,00/dia

RECEITA DE FRETE:
  100 pedidos × R$ 7,50 = R$ 750,00/dia

MARGEM BRUTA DO FRETE:
  R$ 750,00 − R$ 425,00 = R$ 325,00/dia (43,3%)

MOTOBOYS NECESSÁRIOS: 3–4 ativos/dia
POOL IDEAL: 8–10 cadastrados

RESULTADO MENSAL:
  Receita frete: R$ 19.500/mês
  Custo pool:    R$ 11.050/mês
  Margem frete:  R$ 8.450/mês
```

**Comparativo: Pool vs. 3 Motoboys Fixos (100 pedidos/dia)**

| Modelo | Custo/mês | Receita Frete/mês | Margem Frete/mês |
|---|---|---|---|
| 3 fixos (R$ 145/dia cada) | R$ 11.310 | R$ 19.500 | R$ 8.190 |
| Pool por entrega | R$ 11.050 | R$ 19.500 | **R$ 8.450** |
| **Diferença** | **-R$ 260/mês** | — | **+R$ 260/mês** |

> **Observação crítica:** Em volume alto (100 pedidos/dia), a vantagem do pool sobre o fixo se reduz porque os motoboys do pool estão trabalhando quase como fixos em termos de horas. O ganho real do pool está nos volumes baixos e médios (25–50/dia), onde você não carrega custo fixo nos dias fracos.

---

## PARTE 5 — CONSOLIDAÇÃO DOS TRÊS CENÁRIOS

| Métrica | 25 ped/dia | 50 ped/dia | 100 ped/dia |
|---|---|---|---|
| Receita frete/mês | R$ 4.875 | R$ 9.750 | R$ 19.500 |
| Custo pool/mês | R$ 2.860 | R$ 5.590 | R$ 11.050 |
| **Margem frete/mês** | **R$ 2.015** | **R$ 4.160** | **R$ 8.450** |
| Margem % | 41% | 42,7% | 43,3% |
| Motoboys ativos/dia | 1–2 | 2–3 | 3–4 |
| Pool cadastrado | 3–4 | 5–6 | 8–10 |
| Vantagem vs. fixo | +R$ 910/mês | +R$ 1.950/mês | +R$ 260/mês |

> **Insight central:** a margem de frete gira consistentemente em torno de 42–43% do frete arrecadado independentemente do volume. O que muda é o valor absoluto capturado mensalmente.

---

## PARTE 6 — COMPARATIVO FINAL: 3 MODELOS LOGÍSTICOS

| Modelo | Custo (50 ped/dia) | Margem Frete | Risco | Complexidade |
|---|---|---|---|---|
| 100% iFood (plataforma entrega) | R$ 0 (plataforma paga) | R$ 0 (não cobra frete) | Ausência de dados do cliente | Nenhuma |
| Motoboy fixo (CLT ou diária) | R$ 7.540/mês | R$ 2.210/mês | Custo mesmo em dias fracos | Baixa |
| **Pool de motoboys (modelo proposto)** | **R$ 5.590/mês** | **R$ 4.160/mês** | Sem cobertura em picos extremos | **Média** |
| Pool + 1 motoboy âncora fixo | R$ 6.300/mês | R$ 3.450/mês | Baixo | Média |

---

## PARTE 7 — RISCOS E MITIGAÇÕES PRÁTICAS

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Motoboy não aparece no pico | Média | Alto | Pool de 5–6 para usar 2–3. Grupo WhatsApp com aviso de 30min antecipação |
| Reclamação trabalhista de vínculo | Baixa-Média | Alto | Formalização como MEI/PJ obrigatória. Rotatividade real do pool |
| Motoboy rejeita tabela de saída dupla | Baixa | Médio | Apresentar cálculo de ganho por hora. Quem não aceita não entra no pool |
| Conflito sobre contagem de entregas | Média | Médio | Registro por saída via WhatsApp Business (cada saída = print de pedidos) |
| Volume insuficiente para atrair pool | Alta (início) | Alto | Começar com 1 acordo mais generoso + dilui na semana 3–4 com o novo modelo |

---

## PARTE 8 — PONTO DE EQUILÍBRIO DA OPERAÇÃO LOGÍSTICA

**Pergunta:** a partir de quantos pedidos/dia o frete cobre o custo do pool e ainda sobra?

```
Custo fixo de ter o pool ativo: R$ 0 (você só paga por entrega)

Break-even do frete:
  Em qualquer volume, o frete margem positiva = sempre viável
  A pergunta real é: o frete cobre o subsídio que você oferece?

  Exemplo: você oferece "frete grátis" para o cliente
  no canal próprio durante a fase de aquisição.
  
  Quem paga esse subsídio?

  Opção A: Restaurante absorve (custo de marketing)
    → Custo do pool de R$ 5,00 por entrega simples
    → 50 entregas/dia = R$ 250/dia de custo logístico "escondido"
    → R$ 6.500/mês como investimento em aquisição

  Opção B: Cobrando R$ 5,00 de frete (metade do mercado)
    → Receita: 50 × R$ 5,00 = R$ 250/dia
    → Custo: R$ 215/dia (pool + batching)
    → Margem: R$ 35/dia — break-even quase perfeito
    → O cliente paga metade do frete e o batching cobre o resto
```

> **Conclusão do break-even:** cobrar **R$ 5,00 de frete** no canal próprio durante a fase de aquisição já é suficiente para cobrir o custo do pool via batching — e ainda assim ser mais barato que o iFood para o cliente.

---

## PARTE 9 — SÍNTESE EXECUTIVA

### O Modelo em Uma Tabela

```
╔══════════════════════════════════════════════════════════════╗
║           MODELO POOL DE MOTOBOYS — RESUMO FINANCEIRO      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  VOCÊ COBRA DO CLIENTE                                       ║
║    Frete médio: R$ 7,50 por pedido                          ║
║                                                              ║
║  VOCÊ PAGA AO POOL                                           ║
║    1 pedido/saída:  R$ 5,00 (frete cobre: 67%)             ║
║    2 pedidos/saída: R$ 8,00 (frete cobre: 107% — lucro!)   ║
║    3 pedidos/saída: R$ 10,00 (frete cobre: 133% — lucro!)  ║
║                                                              ║
║  MARGEM FRETE MENSAL (50 ped/dia):                         ║
║    Sem batching: R$ 2.600                                   ║
║    Com 60% batching: R$ 4.160   ← +R$ 1.560 extra          ║
║                                                              ║
║  VANTAGEM VS. MOTOBOY FIXO (50 ped/dia):                   ║
║    Economia: +R$ 1.950/mês                                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Os 3 Números Mais Importantes

1. **R$ 4.160/mês** — margem de frete líquida em 50 pedidos/dia com batching 60%
2. **43%** — percentual do frete que fica no restaurante (iFood fica 39%)
3. **R$ 1.950/mês** — vantagem financeira do pool vs. motoboy fixo no mesmo volume

### Quando o Modelo Funciona Bem

- ✅ Volume entre 30 e 80 pedidos/dia
- ✅ Taxa de batching acima de 50%
- ✅ Pool com 4+ motoboys ativos e disponíveis
- ✅ Tabela de pagamento acordada no recrutamento, não renegociada na operação

### Quando o Modelo Tem Limitação

- ⚠️ Abaixo de 20 pedidos/dia — difícil atrair e manter pool motivado
- ⚠️ Acima de 100 pedidos/dia — pool se comporta como fixo sem as vantagens de fixo (lealdade, treinamento)
- ⚠️ Dias de chuva extrema sem âncora fixo — pool pode não cobrir

---

*Relatório gerado pelo Gerente Geral (CFO Squad) — Synkra AIOS*  
*Base de dados: Deep Research Logística + DRE Escala Marmitex + Simulação Ciclo Financeiro*  
*Próxima etapa sugerida: definir tabela final de pagamento ao pool e iniciar recrutamento*
