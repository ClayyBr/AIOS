# Simulação do Ciclo Financeiro — Cenário CMV 35%

> **Data:** 16/02/2026
> **Status:** Pré-abertura — Simulação com dados estimados
> **Gerado por:** @financeiro | Consolidado: @gerente-geral
> **Cenário:** CMV a 35% — Limite crítico de alerta (🚨 teto máximo aceitável)
> **Fontes:** Manual de Contabilidade (seção 6), ABRASEL, SEBRAE, DRE Projetado

---

## ⚠️ ALERTA DO GERENTE GERAL

> **Este relatório simula o cenário de CMV a 35% — o LIMITE MÁXIMO aceitável para alimentos.**
> Acima de 35%, o `@financeiro` emite alerta imediato. Este cenário mostra o impacto financeiro
> quando operamos "na borda" da zona de perigo, comparando com o cenário base de 32%.

---

## 1. Premissas da Simulação

### Dados Financeiros Base

| Premissa | Pessimista | Realista | Otimista |
|---|---|---|---|
| Clientes/dia | 25 | 40 | 60 |
| Faturamento Mensal | R$ 19.500 | R$ 31.200 | R$ 46.800 |
| Custos Fixos Totais | R$ 12.510 | R$ 12.510 | R$ 12.510 |
| **CMV (35%)** | **R$ 6.825** | **R$ 10.920** | **R$ 16.380** |
| Ticket Médio | R$ 30,00 | R$ 30,00 | R$ 30,00 |
| Dias operação/mês | 26 | 26 | 26 |

### Comparativo CMV: 32% vs 35%

| Cenário | CMV a 32% | CMV a 35% | Diferença Mensal |
|---|---|---|---|
| 🔴 Pessimista | R$ 6.240 | R$ 6.825 | **+R$ 585** |
| 🟡 Realista | R$ 9.984 | R$ 10.920 | **+R$ 936** |
| 🟢 Otimista | R$ 14.976 | R$ 16.380 | **+R$ 1.404** |

> **Insight:** A cada 1 ponto percentual de aumento no CMV, o restaurante perde ~R$ 312/mês (cenário realista). A diferença de 3pp (32→35%) custa **R$ 936/mês = R$ 11.232/ano**.

### Mix de Pagamento Adotado

| Meio | % do Faturamento | Prazo Recebimento |
|---|---|---|
| 💳 Cartão Crédito (1x) | 55% | D+30 |
| 💳 Cartão Débito | 20% | D+1 |
| 📱 PIX | 18% | D+0 (instantâneo) |
| 💵 Dinheiro | 2% | D+0 (instantâneo) |
| 🍽️ Vale-Refeição | 5% | D+15 |

### Prazos Comerciais Adotados

| Componente | Valor | Justificativa |
|---|---|---|
| **PME** (Estocagem) | **7 dias** | Cardápio de frango/perecíveis — giro 4× mês |
| **PMR** (Recebimento) | **18 dias** | Calculado: (55%×30)+(20%×1)+(18%×0)+(2%×0)+(5%×15) = 17,95 ≈ 18 |
| **PMP** (Pagamento) | **15 dias** | Média: perecíveis 7-14d, secos 21-28d, fixos 30d |

---

## 2. Ciclo Financeiro — Sem Antecipação

### Cálculo

```
Ciclo Financeiro = PME + PMR - PMP
                 = 7 + 18 - 15
                 = 10 dias
```

> O restaurante precisa financiar **10 dias de operação** com capital próprio.

### Capital de Giro Necessário (CMV 35%)

| Cenário | Custo Diário Total¹ | Ciclo Financeiro | Capital de Giro Mínimo |
|---|---|---|---|
| 🔴 Pessimista | R$ 773/dia | 10 dias | **R$ 7.730** |
| 🟡 Realista | R$ 1.011/dia | 10 dias | **R$ 10.110** |
| 🟢 Otimista | R$ 1.284/dia | 10 dias | **R$ 12.840** |

¹ *Custo Diário = (CMV + Custos Fixos + MO + Adm) ÷ 26 dias*

### Detalhamento do Custo Diário (CMV 35%)

| Componente | Pessimista | Realista | Otimista |
|---|---|---|---|
| CMV/dia | R$ 263 | R$ 420 | R$ 630 |
| MO/dia | R$ 287 | R$ 287 | R$ 287 |
| Fixos/dia | R$ 160 | R$ 160 | R$ 160 |
| Adm/dia | R$ 35 | R$ 42 | R$ 54 |
| Deduções/dia | R$ 64 | R$ 102 | R$ 153 |
| **Total/dia** | **R$ 809** | **R$ 1.011** | **R$ 1.284** |

### Comparativo Capital de Giro: 32% vs 35%

| Cenário | CG com CMV 32% | CG com CMV 35% | Capital Extra Necessário |
|---|---|---|---|
| 🔴 Pessimista | R$ 7.500 | R$ 7.730 | **+R$ 230** |
| 🟡 Realista | R$ 9.750 | R$ 10.110 | **+R$ 360** |
| 🟢 Otimista | R$ 12.300 | R$ 12.840 | **+R$ 540** |

---

## 3. DRE Comparativo — CMV 32% vs CMV 35% (Cenário Realista)

| Linha | Descrição | CMV 32% | CMV 35% | Diferença |
|---|---|---|---|---|
| 1 | Receita Bruta | R$ 31.200 | R$ 31.200 | — |
| 2.1 | Impostos (Simples 6%) | (R$ 1.872) | (R$ 1.872) | — |
| 2.2 | Taxas Cartão (MDR 2,5%) | (R$ 780) | (R$ 780) | — |
| | **Receita Líquida** | **R$ 28.548** | **R$ 28.548** | **—** |
| 3 | **CMV** | **(R$ 9.984)** | **(R$ 10.920)** | **-R$ 936** |
| | **Lucro Bruto** | **R$ 18.564** | **R$ 17.628** | **-R$ 936** |
| 4 | Mão de Obra | (R$ 7.460) | (R$ 7.460) | — |
| 5 | Custos Fixos | (R$ 4.150) | (R$ 4.150) | — |
| 6 | Despesas Adm | (R$ 1.100) | (R$ 1.100) | — |
| | **RESULTADO LÍQUIDO** | **R$ 5.854** | **R$ 4.918** | **🚨 -R$ 936** |
| | **Margem Líquida** | **18,8%** | **15,8%** | **-3,0 pp** |

> 🚨 **Impacto brutal:** Os mesmos 3 pontos percentuais de CMV a mais reduzem a margem líquida em 3pp e o lucro mensal em **R$ 936 (-16% do lucro!)**

---

## 4. Dashboard de KPIs — Cenário CMV 35%

### KPIs Primários (Cenário Realista)

| Indicador | CMV 32% | CMV 35% | Meta | Status |
|---|---|---|---|---|
| **CMV %** | 32,0% | **35,0%** | 28-35% | ⚠️ Limite |
| **CMO %** | 23,9% | 23,9% | 25-30% | ✅ OK |
| **Prime Cost %** | 55,9% | **58,9%** | < 60% | ⚠️ Próximo |
| **Margem Bruta %** | 59,5% | **56,5%** | > 50% | ✅ OK |
| **Lucro Líquido %** | 18,8% | **15,8%** | 8-15% | ✅ OK |

### KPIs por Cenário (CMV 35%)

| Indicador | 🔴 Pessimista | 🟡 Realista | 🟢 Otimista | Meta |
|---|---|---|---|---|
| CMV % | 35,0% | 35,0% | 35,0% | 28-35% ⚠️ |
| MO % | 38,3% | 23,9% | 15,9% | 25-35% |
| **Prime Cost %** | **73,3%** 🚨 | **58,9%** ⚠️ | **50,9%** ✅ | 55-65% |
| Custos Fixos % | 21,3% | 13,3% | 8,9% | 12-18% |
| **Lucro Líq. %** | **-7,5%** 🚨 | **15,8%** ✅ | **29,5%** ✅ | 8-15% |
| **Resultado** | **(R$ 1.843)** 🚨 | **R$ 4.918** | **R$ 13.432** | — |

### Análise dos KPIs

- **🔴 Pessimista:** Prime Cost 73,3% = **INVIÁVEL**. O prejuízo de R$ 1.843/mês é 2× pior que no cenário de 32%. Restaurante fecha em 3-6 meses.
- **🟡 Realista:** Prime Cost 58,9% = **BOM, porém apertado**. Qualquer surpresa (aumento de insumo, equipamento quebrado) pode comprometer o mês.
- **🟢 Otimista:** Prime Cost 50,9% = **BOM**. Margem saudável mesmo com CMV alto, mas desperdiça potencial de lucro.

---

## 5. Ponto de Equilíbrio Comparativo

### CMV 32% vs CMV 35%

```
═══════════════════════════════════════════════════
 PONTO DE EQUILÍBRIO — CMV 32%
═══════════════════════════════════════════════════
 Ticket Médio:       R$ 30,00
 (-) CMV (32%):      R$  9,60
 (-) Impostos (6%):  R$  1,80
 (-) Cartão (2,5%):  R$  0,75
 ─────────────────────────────
 MARGEM/PRATO:       R$ 17,85 (59,5%)
 
 Custos Fixos:       R$ 12.510
 Break-even:         701 pratos/mês = 27 pratos/dia
 Faturamento mín.:   R$ 21.030/mês


═══════════════════════════════════════════════════
 PONTO DE EQUILÍBRIO — CMV 35%
═══════════════════════════════════════════════════
 Ticket Médio:       R$ 30,00
 (-) CMV (35%):      R$ 10,50
 (-) Impostos (6%):  R$  1,80
 (-) Cartão (2,5%):  R$  0,75
 ─────────────────────────────
 MARGEM/PRATO:       R$ 16,95 (56,5%)
 
 Custos Fixos:       R$ 12.510
 Break-even:         738 pratos/mês = 29 pratos/dia  ⚠️
 Faturamento mín.:   R$ 22.140/mês
```

> **Impacto no break-even:** Com CMV 35%, você precisa vender **2 pratos a mais por dia** (29 vs 27) só para empatar. Em um ano, são **624 pratos extras sem lucro**.

---

## 6. Ciclo Financeiro COM Antecipação — Cenário CMV 35%

### Antecipação Automática a 3,0%

```
PMR (com antecipação) = (55%×1) + (20%×1) + (18%×0) + (2%×0) + (5%×15)
                      = 0,55 + 0,20 + 0 + 0 + 0,75
                      = 1,5 dias ≈ 2 dias

Novo Ciclo Financeiro = 7 + 2 - 15 = -6 dias ✅ (CICLO NEGATIVO)
```

### Impacto Combinado: CMV 35% + Antecipação 3%

| | 🔴 Pessimista | 🟡 Realista | 🟢 Otimista |
|---|---|---|---|
| Faturamento Total | R$ 19.500 | R$ 31.200 | R$ 46.800 |
| CMV (35%) | (R$ 6.825) | (R$ 10.920) | (R$ 16.380) |
| Custo Antecipação (3% s/ crédito) | (R$ 322) | (R$ 515) | (R$ 772) |
| | | | |
| Lucro SEM antecipação | (R$ 1.843) | R$ 4.918 | R$ 13.432 |
| **Lucro COM antecipação** | **(R$ 2.165)** 🚨 | **R$ 4.403** | **R$ 12.660** |
| | | | |
| **Impacto no Lucro** | -R$ 322 | **-R$ 515** | **-R$ 772** |
| **Margem Líquida COM antecip.** | **-11,1%** 🚨 | **14,1%** | **27,1%** |

### DRE Completo — Cenário Realista, CMV 35%, COM Antecipação

| Linha | Descrição | SEM Antecipação | COM Antecipação | Diferença |
|---|---|---|---|---|
| 1 | Receita Bruta | R$ 31.200 | R$ 31.200 | — |
| 2.1 | Impostos (Simples 6%) | (R$ 1.872) | (R$ 1.872) | — |
| 2.2 | Taxas Cartão (MDR 2,5%) | (R$ 780) | (R$ 780) | — |
| 2.3 | **Taxa Antecipação (3% s/ crédito)** | **R$ 0** | **(R$ 515)** | **-R$ 515** |
| | Receita Líquida | R$ 28.548 | R$ 28.033 | -R$ 515 |
| 3 | **CMV (35%)** | **(R$ 10.920)** | **(R$ 10.920)** | — |
| | Lucro Bruto | R$ 17.628 | R$ 17.113 | -R$ 515 |
| 4 | Mão de Obra | (R$ 7.460) | (R$ 7.460) | — |
| 5 | Custos Fixos | (R$ 4.150) | (R$ 4.150) | — |
| 6 | Despesas Adm | (R$ 1.100) | (R$ 1.100) | — |
| | **RESULTADO LÍQUIDO** | **R$ 4.918** | **R$ 4.403** | **-R$ 515** |
| | **Margem Líquida** | **15,8%** | **14,1%** | **-1,7 pp** |

---

## 7. Fluxo de Caixa Semanal Projetado (CMV 35% — Cenário Realista)

### Premissas: Primeiro Mês de Operação

- Capital inicial em caixa: R$ 15.000 (reserva)
- Faturamento diário: R$ 1.200 (~40 clientes × R$ 30)
- CMV diário: R$ 420 (vs R$ 384 no cenário 32%)

| Semana | Entradas Previstas | Saídas Previstas | Saldo Projetado | Status |
|---|---|---|---|---|
| **Pré-abertura** | — | Compras iniciais: R$ 5.500 | R$ 9.500 | ⚠️ Capital aplicado |
| | | | | |
| **Semana 1** | | | | |
| Débito + PIX + Dinheiro (40%) | R$ 2.880 | | | |
| Crédito (não caiu ainda) | R$ 0 | | | |
| Fornecedores perecíveis | | R$ 1.680 | | |
| Salários (quinzenal) | | R$ 1.950 | | |
| **Subtotal Semana 1** | **R$ 2.880** | **R$ 3.630** | **R$ 8.750** | ✅ OK |
| | | | | |
| **Semana 2** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA (S1 começa a cair) | R$ 180 | | | |
| Fornecedores secos | | R$ 1.100 | | |
| Aluguel | | R$ 2.000 | | |
| Energia/Água/Gás | | R$ 1.450 | | |
| **Subtotal Semana 2** | **R$ 3.060** | **R$ 4.550** | **R$ 7.260** | ⚠️ Atenção |
| | | | | |
| **Semana 3** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA | R$ 360 | | | |
| Fornecedores perecíveis | | R$ 1.680 | | |
| Salários (quinzenal) | | R$ 1.950 | | |
| **Subtotal Semana 3** | **R$ 3.240** | **R$ 3.630** | **R$ 6.870** | ⚠️ Ponto crítico |
| | | | | |
| **Semana 4** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA | R$ 360 | | | |
| 🎉 **Crédito S1 começa a cair!** | **R$ 3.960** | | | |
| DAS (Simples Nacional) | | R$ 1.872 | | |
| Contabilidade + Marketing + Banco | | R$ 1.100 | | |
| **Subtotal Semana 4** | **R$ 7.200** | **R$ 2.972** | **R$ 11.098** | ✅ Recupera |

### Gráfico de Caixa (textual) — CMV 35%

```
R$ 15.000 ┤████████████████████████████
R$ 11.000 ┤                                                              ████████
R$  9.500 ┤█████████
R$  8.750 ┤             ██████████
R$  7.260 ┤                           ██████████
R$  6.870 ┤                                        ██████████ ← PONTO CRÍTICO
           └──────────────────────────────────────────────────────────────
            Pré     Sem1      Sem2      Sem3      Sem4

⚠️ Saldo mínimo: R$ 6.870 na Semana 3 (vs R$ 7.830 com CMV 32%)
   Diferença de R$ 960 a menos no caixa no momento mais crítico!
```

> 🚨 **Saldo mínimo projetado: R$ 6.870 (Semana 3)** — quase R$ 1.000 a MENOS que no cenário de CMV 32%. Se qualquer imprevisto ocorrer (equipamento quebra, fornecedor cobra mais), o caixa pode ficar abaixo de R$ 5.000 — zona de perigo.

---

## 8. Cenário Híbrido: Otimizando CMV 35% sem Antecipação

### Otimização 1: Incentivar PIX (desconto 3%) — migrar 15% do crédito

| Meio | % Atual | % Otimizado | Efeito no PMR |
|---|---|---|---|
| Crédito | 55% | 40% | Reduz PMR |
| PIX | 18% | 33% | Melhora PMR |
| Demais | 27% | 27% | Mantém |

```
PMR otimizado = (40%×30) + (20%×1) + (33%×0) + (2%×0) + (5%×15) = 12,95 ≈ 13 dias
Novo Ciclo = 7 + 13 - 15 = 5 dias
```

| Indicador | Sem Otimização | Com PIX Incentivado | Economia |
|---|---|---|---|
| Ciclo Financeiro | 10 dias | 5 dias | **-5 dias** |
| Capital de Giro | R$ 10.110 | R$ 5.055 | **-R$ 5.055** |
| Custo desconto PIX | — | ~R$ 140/mês | Muito menor que antecipação |

### Otimização 2: Negociar PMP 21 dias

```
Novo Ciclo = 7 + 18 - 21 = 4 dias
Capital de Giro = R$ 1.011 × 4 = R$ 4.044
```

### Otimização 3: Combinar PIX + PMP (melhor cenário)

```
Ciclo = 7 + 13 - 21 = -1 dia ✅ (CICLO NEGATIVO SEM PAGAR ANTECIPAÇÃO!)
Capital de Giro = ~R$ 0
Custo mensal = ~R$ 140 (desconto PIX) vs R$ 515 (antecipação)
```

### Otimização 4: REDUZIR o CMV de 35% para 32% 🎯

**Esta é a otimização mais poderosa.** Reduzir o CMV de volta a 32% economiza:

| Ação | Impacto Mensal | Impacto Anual |
|---|---|---|
| Renegociar fornecedores (-5% nos insumos) | ~R$ 500 | R$ 6.000 |
| Reduzir desperdício (perdas de 7→5%) | ~R$ 200 | R$ 2.400 |
| Ajustar porções (padronizar com balança) | ~R$ 150 | R$ 1.800 |
| Engenharia de cardápio (priorizar alta margem) | ~R$ 300 | R$ 3.600 |
| **Combinação de todas** | **~R$ 936** | **~R$ 11.232** |

> **Insight do Gerente Geral:** Investir tempo e esforço em reduzir o CMV de 35% para 32% tem retorno de **R$ 936/mês** — equivalente a 31 pratos vendidos. É o "investimento" mais rentável que o restaurante pode fazer.

---

## 9. Análise de Sensibilidade do Lucro

### Lucro Mensal por Faixa de CMV (Cenário Realista — 40 clientes/dia)

| CMV % | CMV (R$) | Lucro Líquido | Margem Líquida | Status |
|---|---|---|---|---|
| 28% | R$ 8.736 | R$ 6.102 | 19,6% | ✅ Excelente |
| 30% | R$ 9.360 | R$ 5.478 | 17,6% | ✅ Bom |
| **32%** | **R$ 9.984** | **R$ 5.854** | **18,8%** | **✅ Meta atual** |
| 33% | R$ 10.296 | R$ 4.542 | 14,6% | ✅ Aceitável |
| **35%** | **R$ 10.920** | **R$ 4.918** | **15,8%** | **⚠️ Limite** |
| 37% | R$ 11.544 | R$ 3.294 | 10,6% | 🚨 Risco |
| 40% | R$ 12.480 | R$ 2.358 | 7,6% | 🚨 Crítico |

> **Insight:** Cada 1pp de CMV = ~R$ 312/mês de lucro perdido. A diferença entre CMV 28% (excelente) e 40% (crítico) é de R$ 3.744/mês = **R$ 44.928/ano**.

---

## 10. Resumo Executivo para o Dono

### Cenário Realista (40 clientes/dia) — Todas as Combinações

| Indicador | CMV 32% Sem Antecip. | CMV 35% Sem Antecip. | CMV 35% Com Antecip. | CMV 35% + PIX+PMP |
|---|---|---|---|---|
| **Ciclo Financeiro** | 10 dias | 10 dias | -6 dias ✅ | -1 dia ✅ |
| **Capital de Giro** | R$ 9.750 | R$ 10.110 | ~R$ 0 | ~R$ 0 |
| **Custo mensal extra** | R$ 0 | R$ 0 | R$ 515 | ~R$ 140 |
| **CMV/mês** | R$ 9.984 | R$ 10.920 | R$ 10.920 | R$ 10.920 |
| **Lucro mensal** | **R$ 5.854** | **R$ 4.918** | **R$ 4.403** | **R$ 4.778** |
| **Margem líquida** | **18,8%** | **15,8%** | **14,1%** | **15,3%** |
| **Risco de caixa** | ⚠️ Médio | ⚠️ Alto | ✅ Baixo | ✅ Baixo |

### 🏆 Top 5 Recomendações do Gerente Geral

1. **🥇 PRIORIDADE MÁXIMA: Controle o CMV!** — A diferença entre 32% e 35% é de R$ 936/mês (R$ 11.232/ano). Invista em: fichas técnicas padronizadas, balança na cozinha, negociação com 3+ fornecedores, controle de perdas

2. **🥈 Reserve R$ 15.000 de capital de giro** — Com CMV 35%, o saldo mínimo cai para R$ 6.870 (Semana 3). A reserva de R$ 15.000 é OBRIGATÓRIA para absorver o impacto

3. **🥉 Incentive PIX** — Desconto de 3-5% no PIX reduz o ciclo financeiro de 10 para 5 dias e economiza R$ 5.055 em capital de giro

4. **4️⃣ Negocie PMP 21+ dias** — Combinar PIX + PMP longo zera o ciclo financeiro SEM custo de antecipação

5. **5️⃣ NÃO antecipe se tiver reserva** — A antecipação consome R$ 515/mês a mais. Se tiver reserva de R$ 15.000, economize. Se não tiver, antecipe estrategicamente nos 3 primeiros meses

### 🚨 Alerta de Escalonamento

| Condição | Ação |
|---|---|
| CMV subir acima de 35% | **ALERTA IMEDIATO — Ciclo de auditoria com @financeiro** |
| Caixa cair abaixo de R$ 5.000 | **EMERGÊNCIA — Considerar antecipação pontual** |
| CMV se mantiver em 35% por 2+ meses | **Revisão de cardápio com @arquiteto-lucro** |
| Lucro cair abaixo de R$ 3.000/mês | **Reunião estratégica — cortar custos ou aumentar preços** |

---

*Simulação gerada pelo Squad CFO | @financeiro + @gerente-geral | 16/02/2026*
*Cenário CMV 35% — Análise comparativa com baseline 32%*
*Valores são estimativas para planejamento pré-abertura — atualizar com dados reais após início da operação*
