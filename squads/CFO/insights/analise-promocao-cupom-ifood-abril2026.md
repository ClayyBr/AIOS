# 📊 Análise Revisada — Promoção Cupom iFood (Cenário Ajustado)

**Data:** 10/04/2026  
**Análise Multi-Agente:** 💰 Arquiteto do Lucro + 📊 Financeiro + 🎯 Vendas + 👔 Gerente Geral

---

## 📋 Parâmetros do Novo Cenário

| Parâmetro | Valor |
|-----------|-------|
| **Cupons/dia** | 3 (teste controlado) |
| **Dias/semana** | 6 (Seg–Sáb) |
| **Total cupons/semana** | **18 cupons/semana** |
| **Desconto do cupom** | R$ 12,00 |
| **Pedido mínimo** | R$ 25,00 |
| **Taxa iFood** | 27% (repasse para a loja = 73%) |
| **Preço Marmitex P** | R$ 24,90 |
| **Preço Marmitex M** | R$ 32,40 |
| **Preço Marmitex G** | R$ 43,90 |
| **Embalagem (marmita)** | R$ 1,50 |
| **Estratégia Raspadinha** | ❌ Não aplicada |

---

## 💰 ANÁLISE DO ARQUITETO DO LUCRO

### ⚠️ Ponto Crítico Descoberto: Marmitex P Não Qualifica para o Cupom

> **O pedido mínimo para usar o cupom é R$ 25,00.  
> A Marmitex P custa R$ 24,90 no iFood → NÃO atinge o mínimo.**  
> **Conclusão: A Marmitex P está automaticamente excluída da promoção.**

---

### Tabela de Margem por Tamanho — COM Cupom de R$ 12

**Metodologia:**
- Repasse líquido = Preço × 73%
- Repasse com cupom = Repasse líquido − R$ 12,00
- Margem = Repasse com cupom − Custo prato − Embalagem R$ 1,50

#### Marmitex M — R$ 32,40 (iFood)

| Prato | Custo Porção | Embalagem | Custo Total | Repasse (73%) | Repasse c/ Cupom | **Margem** | **CMV Real** |
|-------|-------------|-----------|-------------|---------------|------------------|-----------|-------------|
| **Frango Frito** | R$ 4,18 | R$ 1,50 | R$ 5,68 | R$ 23,65 | R$ 11,65 | **R$ 5,97** | 48,8% ⚠️ |
| **Pernil Acebolado** | R$ 5,52 | R$ 1,50 | R$ 7,02 | R$ 23,65 | R$ 11,65 | **R$ 4,63** | 60,3% 🚨 |
| **Filé Grelhado c/ Frita** | R$ 6,02 | R$ 1,50 | R$ 7,52 | R$ 23,65 | R$ 11,65 | **R$ 4,13** | 64,5% 🚨 |
| **Strogonoff de Frango** | R$ 6,59 | R$ 1,50 | R$ 8,09 | R$ 23,65 | R$ 11,65 | **R$ 3,56** | 69,4% 🚨 |
| **Bife de Panela** | R$ 9,08 | R$ 1,50 | R$ 10,58 | R$ 23,65 | R$ 11,65 | **R$ 1,07** | 90,8% ☠️ |
| **Parmegiana** | R$ 9,44 | R$ 1,50 | R$ 10,94 | R$ 23,65 | R$ 11,65 | **−R$ 3,29** | **PREJUÍZO** ☠️ |

#### Marmitex G — R$ 43,90 (iFood)

| Prato | Custo Porção* | Embalagem | Custo Total | Repasse (73%) | Repasse c/ Cupom | **Margem** | **CMV Real** |
|-------|-------------|-----------|-------------|---------------|------------------|-----------|-------------|
| **Frango Frito** | R$ 5,43 | R$ 1,50 | R$ 6,93 | R$ 32,05 | R$ 20,05 | **R$ 13,12** | 34,6% ✅ |
| **Pernil Acebolado** | R$ 7,18 | R$ 1,50 | R$ 8,68 | R$ 32,05 | R$ 20,05 | **R$ 11,37** | 43,3% ⚠️ |
| **Filé Grelhado c/ Frita** | R$ 7,83 | R$ 1,50 | R$ 9,33 | R$ 32,05 | R$ 20,05 | **R$ 10,72** | 46,5% ⚠️ |
| **Strogonoff de Frango** | R$ 8,57 | R$ 1,50 | R$ 10,07 | R$ 32,05 | R$ 20,05 | **R$ 9,98** | 50,2% ⚠️ |
| **Bife de Panela** | R$ 11,80 | R$ 1,50 | R$ 13,30 | R$ 32,05 | R$ 20,05 | **R$ 6,75** | 66,3% 🚨 |
| **Parmegiana** | R$ 12,27 | R$ 1,50 | R$ 13,77 | R$ 32,05 | R$ 20,05 | **R$ 6,28** | 68,7% 🚨 |

*Custo G estimado em 130% do custo M (porção ~30% maior).*

---

## 📊 ANÁLISE DO FINANCEIRO: O Que os Números Revelam

### 🔴 Diagnóstico da Marmitex M com Cupom

O cupom de R$ 12 representa **50,7% do repasse** de uma Marmitex M.

```
Repasse M = R$ 32,40 × 73% = R$ 23,65
Cupom = R$ 12,00 → representa 50,7% do repasse
Sobra = R$ 11,65 para pagar prato + embalagem + gás + mão de obra
```

Mesmo no melhor prato (Frango Frito @ R$ 5,97 de margem bruta):
- Sem cobrir gás (~R$ 0,80/prato)
- Sem cobrir mão de obra proporcional (~R$ 2,00/prato estimativa mínima)
- **Margem real: ~R$ 3,17** — 73 centavos por real investido em cupom

### 🟡 Diagnóstico da Marmitex G com Cupom

```
Repasse G = R$ 43,90 × 73% = R$ 32,05
Cupom = R$ 12,00 → representa 37,4% do repasse
Sobra = R$ 20,05 para pagar prato + embalagem + gás + mão de obra
```

No Frango Frito G (melhor caso):
- Margem bruta após embalagem: R$ 13,12
- Menos gás+MO estimados (~R$ 2,80): **~R$ 10,32 de margem real** ✅
- CMV de 34,6% → único prato que passa no benchmark com cupom

---

## 📊 SIMULAÇÃO SEMANAL REAL (3 cupons/dia × 6 dias = 18 cupons)

### Premissa conservadora: 60% de conversão (~11 pedidos/semana)

| Cenário | Pedidos/semana | Receita Bruta | Repasse (73%) | Cupons Absorvidos | Rep. Líquido | Custo Pratos | Embalagens | **Margem Bruta** |
|---------|---------------|--------------|---------------|-------------------|-------------|-------------|-----------|----------------|
| **Todos Marm M (Frango Frito)** | 11 | R$ 356,40 | R$ 260,17 | R$ 132,00 | R$ 128,17 | R$ 45,98 | R$ 16,50 | **R$ 65,69** |
| **Todos Marm G (Frango Frito)** | 11 | R$ 482,90 | R$ 352,52 | R$ 132,00 | R$ 220,52 | R$ 59,73 | R$ 16,50 | **R$ 144,29** |
| **Mix: 70% M + 30% G (Frango)** | 11 | R$ 390,90 | R$ 285,36 | R$ 132,00 | R$ 153,36 | R$ 66,23 | R$ 16,50 | **R$ 70,63** |

### Custo real da promoção (custo de oportunidade)

| Métrica | Valor |
|---------|-------|
| Cupons distribuídos/semana | 18 |
| Pedidos esperados (60% conversão) | ~11 |
| Desconto total absorvido/semana | **R$ 132,00** |
| Margem bruta no melhor caso (G) | **R$ 144,29** |
| Margem bruta no cenário mix | **R$ 70,63** |
| Se vendesse tudo sem cupom (M) | ~R$ 197,69 |

> Você "gasta" R$ 132,00 em descontos por semana para ganhar R$ 65–144.
> A questão não é só a margem — é se os novos clientes captados vão voltar.

---

## 🎯 ANÁLISE DO AGENTE DE VENDAS: Viabilidade Estratégica

### A Matemática do Cliente (Lifetime Value)

| Hipótese | Valor |
|----------|-------|
| Taxa de retenção iFood (benchmark) | 15–25% |
| De 11 novos clientes/semana → retêm | 2–3 clientes |
| Se esses 2-3 compram 2×/mês (Marm M, sem cupom) | 5–6 pedidos extras/mês |
| Margem por pedido sem cupom (Strogonoff M) | R$ 16,66 |
| **Receita adicional mensal gerada** | **R$ 83–100** |
| Custo de aquisição (cupons/mês, 4 semanas) | R$ 528/mês |
| **Payback em novos clientes retidos** | 5+ meses 😬 |

### O Que Realmente Importa: Efeito de Escala no CMV

O relatório da Semana 2 identificou: **o CMV de 49% é problema de escala, não de eficiência.**

Se 18 cupons gerarem ~11 pedidos extras/semana:
- **Faturamento semanal atual:** ~R$ 233/dia × 5 dias = R$ 1.165
- **Com promoção (receita bruta iFood):** +R$ 357–483
- **Novo faturamento semanal:** ~R$ 1.521–1.648
- **Aumento de volume:** **+30–41%** com custo fixo praticamente igual

**Isso SIM resolve o CMV.** Cada prato a mais vendido cobre custos fixos que já estão pagos.

---

## 👔 VEREDITO DO GERENTE GERAL

### ✅ SIM — Fazer o teste com 3 cupons/dia, COM as condições abaixo:

---

### Condição 1: Proibir Marmitex M com pratos de proteína bovina

Nos dias com cupom ativo, o cardápio iFood para Marm M deve ser **somente frango e pernil**.

| Prato | Marm M c/ Cupom | Decisão |
|-------|----------------|---------|
| Frango Frito | R$ 5,97 | ✅ Aceitar |
| Pernil Acebolado | R$ 4,63 | ✅ Aceitar com cautela |
| Filé Grelhado | R$ 4,13 | ⚠️ Só se for prato do dia |
| Strogonoff | R$ 3,56 | ⚠️ Só se for prato do dia |
| Bife de Panela | R$ 1,07 | 🚨 Evitar |
| Parmegiana | **PREJUÍZO** | ❌ Proibido com cupom |

### Condição 2: Favorecer a Marmitex G na comunicação

A Marmitex G com cupom tem a melhor matemática:
- **Frango Frito G: margem bruta de R$ 13,12 ✅**
- Custo de aquisição de cliente muito menor proporcionalmente

**Ação:** Na bio do iFood e nos títulos dos pratos, destacar a Marmitex G como opção de valor.

### Condição 3: Fazer o teste por 2 semanas e medir

| Métrica para monitorar | Meta |
|------------------------|------|
| Quantos cupons foram usados | Mín. 10/semana (56% conversão) |
| Qual tamanho foi mais pedido | Preferência por G = ótimo |
| Quais pratos foram pedidos | Evitar bovinos com cupom |
| Taxa de retorno (2ª semana) | Algum cliente repetiu? |
| CMV semanal geral | Está caindo com o volume? |

---

## 📐 SIMULAÇÃO FINANCEIRA FINAL — Cenário RECOMENDADO

**Base: 3 cupons/dia × 6 dias = 18 cupons → 11 pedidos (60% conversão)**  
**Mix estimado: 70% Marm M (frango) + 30% Marm G**

| Linha | Cálculo | Valor |
|-------|---------|-------|
| Pedidos M (8 × R$ 32,40) | | R$ 259,20 |
| Pedidos G (3 × R$ 43,90) | | R$ 131,70 |
| **Receita Bruta Total** | | **R$ 390,90** |
| **Repasse iFood (73%)** | R$ 390,90 × 0,73 | **R$ 285,36** |
| **Menos cupons usados** (11 × R$ 12) | | **−R$ 132,00** |
| **Repasse líquido real** | | **R$ 153,36** |
| Custo dos pratos (8 × R$ 5,68 + 3 × R$ 6,93) | | −R$ 66,23 |
| Embalagens (11 × R$ 1,50) | | −R$ 16,50 |
| **Margem Bruta Operacional** | | **R$ 70,63** |
| Frete/motoboy estimado (5 pedidos × R$ 5) | | −R$ 25,00 |
| **Margem Líquida Estimada** | | **~R$ 45,63/semana** |

---

## 📋 PLANO DE AÇÃO — PRÓXIMAS 2 SEMANAS

| Prioridade | Ação |
|-----------|------|
| 🔴 Antes de ativar | Remover Parmegiana e Bife de Panela do cardápio de promoção |
| 🔴 Antes de ativar | Confirmar que Marm P (R$ 24,90) não aparece como opção de cupom |
| 🟡 Semana 1 | Ativar 3 cupons/dia → Público: Novos Clientes · Horário: Almoço 09h–16h30 |
| 🟡 Semana 1 | Monitorar diariamente: qual tamanho e prato estão sendo pedidos |
| 🟢 Semana 2 | Analisar: algum cliente fez segundo pedido sem cupom? |
| 🟢 Semana 3 | Decisão: manter 3/dia, aumentar para 5/dia, ou pausar |

---

## 🏁 RESUMO EXECUTIVO

1. **A promoção com 3 cupons/dia é segura para testar** — custo máximo de R$ 132/semana em descontos absorvidos.
2. **Só é viável com Marm G ou Marm M de frango/pernil** — nunca bovinos com cupom.
3. **O objetivo real não é lucrar nos pedidos com cupom — é atrair clientes que vão voltar sem cupom** e aumentar o volume para diluir o CMV atual de 49%.

---

*Análise revisada pelo time CFO — Restaurante Bendito É · Abril/2026*
