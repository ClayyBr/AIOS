# Simulação do Ciclo Financeiro — Restaurante Pré-Abertura

> **Data:** 16/02/2026
> **Status:** Pré-abertura — Simulação com dados estimados
> **Gerado por:** @financeiro | Consolidado: @gerente-geral
> **Fontes:** Manual de Contabilidade (seção 6), ABRASEL, SEBRAE, Banco Central

---

## 1. Premissas da Simulação

### Dados Financeiros Base (DRE Projetado)

| Premissa | Pessimista | Realista | Otimista |
|---|---|---|---|
| Clientes/dia | 25 | 40 | 60 |
| Faturamento Mensal | R$ 19.500 | R$ 31.200 | R$ 46.800 |
| Custos Fixos Totais | R$ 12.510 | R$ 12.510 | R$ 12.510 |
| CMV (32%) | R$ 6.240 | R$ 9.984 | R$ 14.976 |
| Ticket Médio | R$ 30,00 | R$ 30,00 | R$ 30,00 |
| Dias operação/mês | 26 | 26 | 26 |

### Mix de Pagamento Adotado

Utilizamos o mix ABRASEL 2023 ajustado para a tendência 2026, considerando que restaurantes novos em cidades médias tendem a ter mais PIX:

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
| **PME** (Estocagem) | **7 dias** | Cardápio de frango/perecíveis — giro 4× mês (Manual seção 6.1) |
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

> O restaurante precisa financiar **10 dias de operação** com capital próprio antes que o dinheiro "complete o giro".

### Capital de Giro Necessário

| Cenário | Custo Diário Total¹ | Ciclo Financeiro | Capital de Giro Mínimo |
|---|---|---|---|
| 🔴 Pessimista | R$ 750/dia | 10 dias | **R$ 7.500** |
| 🟡 Realista | R$ 975/dia | 10 dias | **R$ 9.750** |
| 🟢 Otimista | R$ 1.230/dia | 10 dias | **R$ 12.300** |

¹ *Custo Diário = (CMV + Custos Fixos + MO + Adm) ÷ 26 dias*

### Detalhamento do Custo Diário

| Componente | Pessimista | Realista | Otimista |
|---|---|---|---|
| CMV/dia | R$ 240 | R$ 384 | R$ 576 |
| MO/dia | R$ 287 | R$ 287 | R$ 287 |
| Fixos/dia | R$ 160 | R$ 160 | R$ 160 |
| Adm/dia | R$ 35 | R$ 42 | R$ 54 |
| Deduções/dia | R$ 64 | R$ 102 | R$ 153 |
| **Total/dia** | **R$ 786** | **R$ 975** | **R$ 1.230** |

---

## 3. Cenário COM Antecipação de Cartão de Crédito

### O que é antecipação?

Em vez de esperar 30 dias para receber as vendas de cartão de crédito, o restaurante pode pedir à operadora para antecipar o repasse em D+1 ou D+2. Isso tem um custo (taxa de antecipação), mas elimina quase todo o ciclo financeiro.

### Taxas de Antecipação de Mercado (2025-2026)

| Modalidade | Taxa Mensal | Taxa Equivalente p/ 30 dias |
|---|---|---|
| Antecipação automática (todas vendas) | 2,5% a 4,0% | ~3,0% em média |
| Antecipação sob demanda (pontual) | 3,5% a 5,0% | ~4,0% em média |
| Não antecipar (D+30) | 0% | R$ 0 |

### Cenário: Antecipação Automática a 3,0%

Com antecipação, o PMR cai drasticamente:

```
PMR (com antecipação) = (55%×1) + (20%×1) + (18%×0) + (2%×0) + (5%×15)
                      = 0,55 + 0,20 + 0 + 0 + 0,75
                      = 1,5 dias ≈ 2 dias

Novo Ciclo Financeiro = PME + PMR - PMP
                      = 7 + 2 - 15
                      = -6 dias ✅ (CICLO NEGATIVO!)
```

> 🎉 **Ciclo negativo = O restaurante recebe ANTES de pagar os fornecedores!** Isso elimina a necessidade de capital de giro operacional.

### Impacto da Taxa de Antecipação no Lucro

A taxa de antecipação incide apenas sobre as vendas de **cartão de crédito** (55% do faturamento):

| | 🔴 Pessimista | 🟡 Realista | 🟢 Otimista |
|---|---|---|---|
| Faturamento Total | R$ 19.500 | R$ 31.200 | R$ 46.800 |
| Vendas no Crédito (55%) | R$ 10.725 | R$ 17.160 | R$ 25.740 |
| **Custo Antecipação (3%)** | **R$ 321,75** | **R$ 514,80** | **R$ 772,20** |
| | | | |
| Lucro SEM antecipação | (R$ 907) | R$ 5.854 | R$ 14.836 |
| **Lucro COM antecipação** | **(R$ 1.229)** | **R$ 5.339** | **R$ 14.064** |
| | | | |
| **Impacto no Lucro** | -R$ 322 | **-R$ 515** | **-R$ 772** |
| **Impacto % no Lucro** | N/A (prejuízo) | **-8,8%** | **-5,2%** |
| **Impacto % no Faturamento** | **-1,65%** | **-1,65%** | **-1,65%** |

---

## 4. DRE Comparativo — Com e Sem Antecipação (Cenário Realista)

| Linha | Descrição | SEM Antecipação | COM Antecipação | Diferença |
|---|---|---|---|---|
| 1 | Receita Bruta | R$ 31.200 | R$ 31.200 | — |
| 2.1 | Impostos (Simples 6%) | (R$ 1.872) | (R$ 1.872) | — |
| 2.2 | Taxas Cartão (MDR 2,5%) | (R$ 780) | (R$ 780) | — |
| 2.3 | **Taxa Antecipação (3% s/ crédito)** | **R$ 0** | **(R$ 515)** | **-R$ 515** |
| | Receita Líquida | R$ 28.548 | R$ 28.033 | -R$ 515 |
| 3 | CMV (32%) | (R$ 9.984) | (R$ 9.984) | — |
| | Lucro Bruto | R$ 18.564 | R$ 18.049 | -R$ 515 |
| 4 | Mão de Obra | (R$ 7.460) | (R$ 7.460) | — |
| 5 | Custos Fixos | (R$ 4.150) | (R$ 4.150) | — |
| 6 | Despesas Adm | (R$ 1.100) | (R$ 1.100) | — |
| | **RESULTADO LÍQUIDO** | **R$ 5.854** | **R$ 5.339** | **-R$ 515** |
| | **Margem Líquida** | **18,8%** | **17,1%** | **-1,7 pp** |

---

## 5. Análise de Trade-Off: Antecipar ou Não?

### Custo vs Benefício

| Fator | SEM Antecipação | COM Antecipação |
|---|---|---|
| Ciclo Financeiro | 10 dias (positivo) | -6 dias (negativo) ✅ |
| Capital de Giro necessário | R$ 9.750 | ~R$ 0 ✅ |
| Custo mensal da decisão | R$ 0 | R$ 515 ❌ |
| Custo anual da decisão | R$ 0 | R$ 6.180 ❌ |
| Lucro mensal (realista) | R$ 5.854 | R$ 5.339 |
| Risco de falta de caixa | ⚠️ Médio | ✅ Baixo |
| Tranquilidade operacional | ⚠️ Depende de reserva | ✅ Alta |

### O que o dinheiro "parado" no Capital de Giro custa?

Se você NÃO antecipa, precisa RESERVAR R$ 9.750 para o capital de giro. Esse dinheiro tem custo de oportunidade:

| Comparação | Valor |
|---|---|
| Capital de Giro necessário (sem antecipar) | R$ 9.750 |
| Custo da antecipação anual | R$ 6.180 |
| Rendimento CDI do capital de giro (11,25% a.a.) | ~R$ 1.097/ano |
| **Custo líquido de antecipar** | R$ 6.180 - R$ 1.097 = **R$ 5.083/ano** |
| **Custo líquido de NÃO antecipar** | Capital imobilizado de R$ 9.750 + risco |

### Cenários de Decisão

| Se... | Recomendação |
|---|---|
| Tem reserva de R$ 10.000+ | ✅ **NÃO antecipe.** Economize R$ 515/mês |
| Não tem reserva, capital apertado | ✅ **ANTECIPE.** Pague R$ 515/mês para ter caixa |
| Quer começar antecipando e parar depois | ✅ **BOA estratégia!** Antecipe nos 3 primeiros meses e pare quando tiver reserva |
| Negocia PMP 21+ dias com fornecedores | ✅ **NÃO antecipe.** PMP maior já resolve o ciclo |

---

## 6. Cenário Híbrido: Otimizando sem Antecipar

Antes de pagar 3% de antecipação, existem otimizações gratuitas:

### Otimização 1: Incentivar PIX com desconto

Se oferecer 3% de desconto no PIX e migrar 15% do crédito para PIX:

| Meio | % Atual | % Otimizado | Efeito no PMR |
|---|---|---|---|
| Crédito | 55% | 40% | Reduz PMR |
| Débito | 20% | 20% | Mantém |
| PIX | 18% | 33% | Melhora PMR |
| Dinheiro | 2% | 2% | Mantém |
| VR/VA | 5% | 5% | Mantém |

```
PMR otimizado = (40%×30) + (20%×1) + (33%×0) + (2%×0) + (5%×15)
             = 12 + 0,2 + 0 + 0 + 0,75
             = 12,95 ≈ 13 dias

Novo Ciclo = 7 + 13 - 15 = 5 dias (vs 10 dias antes)
```

| Indicador | Original | Otimizado | Economia |
|---|---|---|---|
| Ciclo Financeiro | 10 dias | 5 dias | **-5 dias** |
| Capital de Giro | R$ 9.750 | R$ 4.875 | **-R$ 4.875** |
| Custo desconto PIX (3% s/ migrados) | — | R$ 140/mês | Muito menor que antecipação |

### Otimização 2: Negociar PMP maior

Se negociar 21 dias com fornecedores (vs 15 atuais):

```
Novo Ciclo = 7 + 18 - 21 = 4 dias
Capital de Giro = R$ 975 × 4 = R$ 3.900
```

### Otimização 3: Combinar PIX + PMP

```
Ciclo = 7 + 13 - 21 = -1 dia ✅ (CICLO NEGATIVO SEM PAGAR ANTECIPAÇÃO!)
```

---

## 7. Fluxo de Caixa Semanal Projetado (Cenário Realista — Sem Antecipação)

### Premissas: Primeiro Mês de Operação

- Capital inicial em caixa: R$ 15.000 (reserva)
- Faturamento diário: R$ 1.200 (~40 clientes × R$ 30)

| Semana | Entradas Previstas | Saídas Previstas | Saldo Projetado | Status |
|---|---|---|---|---|
| **Pré-abertura** | — | Compras iniciais: R$ 5.000 | R$ 10.000 | ⚠️ Capital aplicado |
| | | | | |
| **Semana 1** | | | | |
| Débito + PIX + Dinheiro (40%) | R$ 2.880 | | | |
| VR/VA (0 — ainda não caiu) | R$ 0 | | | |
| Crédito (0 — não caiu ainda) | R$ 0 | | | |
| Fornecedores perecíveis | | R$ 1.500 | | |
| Salários (quinzenal) | | R$ 1.950 | | |
| **Subtotal Semana 1** | **R$ 2.880** | **R$ 3.450** | **R$ 9.430** | ✅ OK |
| | | | | |
| **Semana 2** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA (S1 começa a cair) | R$ 180 | | | |
| Crédito (0 — ainda não caiu) | R$ 0 | | | |
| Fornecedores secos | | R$ 1.000 | | |
| Aluguel | | R$ 2.000 | | |
| Energia/Água/Gás | | R$ 1.450 | | |
| **Subtotal Semana 2** | **R$ 3.060** | **R$ 4.450** | **R$ 8.040** | ✅ OK |
| | | | | |
| **Semana 3** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA | R$ 360 | | | |
| Crédito (0 — ainda não caiu) | R$ 0 | | | |
| Fornecedores perecíveis | | R$ 1.500 | | |
| Salários (quinzenal) | | R$ 1.950 | | |
| **Subtotal Semana 3** | **R$ 3.240** | **R$ 3.450** | **R$ 7.830** | ✅ OK |
| | | | | |
| **Semana 4** | | | | |
| Débito + PIX + Dinheiro | R$ 2.880 | | | |
| VR/VA | R$ 360 | | | |
| 🎉 **Crédito S1 começa a cair!** | **R$ 3.960** | | | |
| DAS (Simples Nacional) | | R$ 1.872 | | |
| Contabilidade + Marketing + Banco | | R$ 1.100 | | |
| **Subtotal Semana 4** | **R$ 7.200** | **R$ 2.972** | **R$ 12.058** | ✅ Recupera! |

### Gráfico de Caixa (textual)

```
R$ 15.000 ┤████████████████████████████
R$ 12.000 ┤                                                              ████████
R$ 10.000 ┤█████████
R$  9.000 ┤             ██████████
R$  8.000 ┤                           ██████████████████████████
R$  7.000 ┤                                        ██████████
          └──────────────────────────────────────────────────────────────
           Pré     Sem1      Sem2      Sem3      Sem4
           
⚠️ O caixa cai nas semanas 2-3 (antes do crédito cair), 
   mas a reserva de R$ 15.000 segura a operação.
```

> **Saldo mínimo projetado: R$ 7.830 (Semana 3)** — o momento mais crítico do mês, quando os custos fixos já foram pagos mas o cartão de crédito ainda não caiu.

---

## 8. Resumo Executivo para o Dono

### Cenário Realista (40 clientes/dia)

| Indicador | Sem Antecipação | Com Antecipação | Com Otimização (PIX+PMP) |
|---|---|---|---|
| **Ciclo Financeiro** | **10 dias** | **-6 dias** ✅ | **-1 dia** ✅ |
| **Capital de Giro necessário** | **R$ 9.750** | **~R$ 0** | **~R$ 0** |
| **Custo mensal extra** | **R$ 0** | **R$ 515** | **~R$ 140** |
| **Custo anual extra** | **R$ 0** | **R$ 6.180** | **~R$ 1.680** |
| **Lucro mensal** | **R$ 5.854** | **R$ 5.339** | **R$ 5.714** |
| **Margem líquida** | **18,8%** | **17,1%** | **18,3%** |
| **Risco de caixa** | ⚠️ Médio | ✅ Baixo | ✅ Baixo |

### Top 3 Recomendações

1. **🥇 Otimize antes de pagar** — Incentive PIX (desconto 3-5%) e negocie PMP 21+ dias com fornecedores. Isso pode zerar o ciclo financeiro **sem custo de antecipação**

2. **🥈 Reserve R$ 15.000** de capital de giro para os primeiros 3 meses — o fluxo de caixa aperta nas semanas 2-3 quando custos fixos já saíram mas o crédito ainda não caiu

3. **🥉 Antecipe estrategicamente** — Se o caixa apertar, antecipe apenas o necessário (sob demanda), não tudo automaticamente. Cada R$ 1.000 antecipado custa R$ 30

---

*Simulação gerada pelo Squad CFO | @financeiro + @gerente-geral | 16/02/2026*
*Valores são estimativas para planejamento pré-abertura — atualizar com dados reais após início da operação*
