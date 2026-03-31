# 📊 Análise de CMV Real — Marmitex P, M e G (Pesagem 30/03/2026)

**Data:** 30/03/2026 (Corrigido em 31/03/2026)
**Agente:** @arquiteto-lucro (Engenheiro de Custos)
**Solicitante:** @gerente-geral
**Base de Dados:** Pesagem real + `posicao-atual.yaml` (CMP) + `tabela-fatores-correcao.yaml` (FC/FCc)

> ⚠️ **REVISÃO CRÍTICA (31/03):** A versão anterior deste relatório continha um erro grave de metodologia: multiplicava o **peso servido (cozido)** pelo **preço do kg cru**, ignorando os Fatores de Correção (FC) e Cocção (FCc). Esta versão corrige o cálculo usando a fórmula padrão das fichas técnicas: `Custo = PB × CMP/kg`, onde `PB = Peso Servido × FCc × FC`.

---

## 📋 Metodologia de Cálculo (Corrigida)

### Fórmula Aplicada

```
PL (Peso Limpo cru) = Peso Servido (cozido) × FCc
PB (Peso Bruto comprado) = PL × FC
Custo Porção = PB × CMP/kg (do inventário)
```

- **FCc < 1** = alimento que GANHA peso ao cozinhar (arroz, feijão, macarrão absorvem água)
- **FCc > 1** = alimento que PERDE peso ao cozinhar (carnes encolhem, batata frita desidrata)
- **FC > 1** = perda na limpeza (casca, osso, nervos, gordura, grãos ruins)

### Fontes de Dados

| Ingrediente | CMP (R$/kg) | FC | FCc | Fonte FC/FCc |
| :--- | ---: | ---: | ---: | :--- |
| Arroz Branco | R$ 4,10 | 1,00 | 0,40 | tabela-fatores-correcao.yaml |
| Feijão Carioca | R$ 8,49 | 1,05 | 0,50 | tabela-fatores-correcao.yaml |
| Macarrão Espaguete | R$ 5,18 | 1,00 | 0,40 | tabela-fatores-correcao.yaml |
| Batata Inglesa (p/ fritura) | R$ 6,00* | 1,20 | 1,50 | tabela-fatores-correcao.yaml |
| Óleo absorvido (fritura) | R$ 7,21/L | — | — | posicao-atual.yaml |
| Carne Moída (Acém) | R$ 36,98 | 1,00 | 1,25 | FC=1,00 (já moída); FCc refogada |
| Bisteca Suína (Pernil S/O) | R$ 18,90 | 1,15 | 1,25 | ficha pernil-acebolado.md |
| Frango ao Molho (Peito S/O) | R$ 16,02 | 1,05 | 1,18 | tabela (fcc_forno/panela) |

*Batata Inglesa: preço de referência de mercado (item não consta no inventário).

---

## 🥘 Custo da Base (Guarnições) — Com FC/FCc Aplicados

### Tamanho P (Pequena)

| Ingrediente | Servido | FCc | PL (cru) | FC | PB | CMP | Custo |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Arroz | 0,180 kg | 0,40 | 0,072 kg | 1,00 | 0,072 kg | R$ 4,10 | R$ 0,30 |
| Feijão | 0,130 kg | 0,50 | 0,065 kg | 1,05 | 0,068 kg | R$ 8,49 | R$ 0,58 |
| Macarrão | 0,060 kg | 0,40 | 0,024 kg | 1,00 | 0,024 kg | R$ 5,18 | R$ 0,12 |
| Batata Frita | 0,030 kg | 1,50 | 0,045 kg | 1,20 | 0,054 kg | R$ 6,00 | R$ 0,32 |
| Óleo (absorção fritura) | — | — | — | — | 0,003 L | R$ 7,21 | R$ 0,02 |
| **Total Base P** | **0,400 kg** | | | | | | **R$ 1,34** |

### Tamanho M (Média)

| Ingrediente | Servido | FCc | PL (cru) | FC | PB | CMP | Custo |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Arroz | 0,260 kg | 0,40 | 0,104 kg | 1,00 | 0,104 kg | R$ 4,10 | R$ 0,43 |
| Feijão | 0,260 kg | 0,50 | 0,130 kg | 1,05 | 0,137 kg | R$ 8,49 | R$ 1,16 |
| Macarrão | 0,080 kg | 0,40 | 0,032 kg | 1,00 | 0,032 kg | R$ 5,18 | R$ 0,17 |
| Batata Frita | 0,050 kg | 1,50 | 0,075 kg | 1,20 | 0,090 kg | R$ 6,00 | R$ 0,54 |
| Óleo (absorção fritura) | — | — | — | — | 0,005 L | R$ 7,21 | R$ 0,04 |
| **Total Base M** | **0,650 kg** | | | | | | **R$ 2,34** |

### Tamanho G (Grande)

| Ingrediente | Servido | FCc | PL (cru) | FC | PB | CMP | Custo |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Arroz | 0,380 kg | 0,40 | 0,152 kg | 1,00 | 0,152 kg | R$ 4,10 | R$ 0,62 |
| Feijão | 0,390 kg | 0,50 | 0,195 kg | 1,05 | 0,205 kg | R$ 8,49 | R$ 1,74 |
| Macarrão | 0,120 kg | 0,40 | 0,048 kg | 1,00 | 0,048 kg | R$ 5,18 | R$ 0,25 |
| Batata Frita | 0,100 kg | 1,50 | 0,150 kg | 1,20 | 0,180 kg | R$ 6,00 | R$ 1,08 |
| Óleo (absorção fritura) | — | — | — | — | 0,010 L | R$ 7,21 | R$ 0,07 |
| **Total Base G** | **0,990 kg** | | | | | | **R$ 3,76** |

---

## 🥩 Custo Total por Proteína e Tamanho

*Custos adicionais incluídos em cada marmitex:*
- *Temperos/Molho/Gás (rateio): R$ 0,80*
- *Embalagem: P = R$ 0,50 | M = R$ 0,60 | G = R$ 0,70*

### Marmitex com CARNE MOÍDA (Acém — R$ 36,98/kg | FC 1,00 | FCc 1,25)

| Tam. | Base | Prot. Servida | PB Cru | Custo Prot. | Tempero | Embal. | **Custo Total** | Preço | **CMV %** | Status |
| :---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | :---: |
| **P** | R$ 1,34 | 50g | 63g | R$ 2,33 | R$ 0,80 | R$ 0,50 | **R$ 4,97** | R$ 18,00 | **27,6%** | ✅ |
| **M** | R$ 2,34 | 100g | 125g | R$ 4,62 | R$ 0,80 | R$ 0,60 | **R$ 8,36** | R$ 22,00 | **38,0%** | 🚨 |
| **G** | R$ 3,76 | 150g | 188g | R$ 6,95 | R$ 0,80 | R$ 0,70 | **R$ 12,21** | R$ 35,00 | **34,9%** | ⚠️ |

### Marmitex com BISTECA SUÍNA (Pernil S/O — R$ 18,90/kg | FC 1,15 | FCc 1,25)

| Tam. | Base | Prot. Servida | PB Cru | Custo Prot. | Tempero | Embal. | **Custo Total** | Preço | **CMV %** | Status |
| :---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | :---: |
| **P** | R$ 1,34 | 50g | 72g | R$ 1,36 | R$ 0,80 | R$ 0,50 | **R$ 4,00** | R$ 18,00 | **22,2%** | ✅ |
| **M** | R$ 2,34 | 100g | 144g | R$ 2,72 | R$ 0,80 | R$ 0,60 | **R$ 6,46** | R$ 22,00 | **29,4%** | ✅ |
| **G** | R$ 3,76 | 160g | 230g | R$ 4,35 | R$ 0,80 | R$ 0,70 | **R$ 9,61** | R$ 35,00 | **27,5%** | ✅ |

### Marmitex com FRANGO AO MOLHO (Peito S/O — R$ 16,02/kg | FC 1,05 | FCc 1,18)

| Tam. | Base | Prot. Servida | PB Cru | Custo Prot. | Tempero | Embal. | **Custo Total** | Preço | **CMV %** | Status |
| :---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | :---: |
| **P** | R$ 1,34 | 100g | 124g | R$ 1,99 | R$ 0,80 | R$ 0,50 | **R$ 4,63** | R$ 18,00 | **25,7%** | ✅ |
| **M** | R$ 2,34 | 150g | 186g | R$ 2,98 | R$ 0,80 | R$ 0,60 | **R$ 6,72** | R$ 22,00 | **30,5%** | ⚠️ |
| **G** | R$ 3,76 | 210g | 260g | R$ 4,17 | R$ 0,80 | R$ 0,70 | **R$ 9,43** | R$ 35,00 | **26,9%** | ✅ |

---

## 📊 Resumo Consolidado — CMV Corrigido

| Tamanho | Peso Servido | Custo Médio (R$) | Preço Venda | CMV Médio | Lucro Bruto | Status |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| **P** | ~470g | **R$ 4,53** | R$ 18,00 | **25,2%** | R$ 13,47 | ✅ Saudável |
| **M** | ~770g | **R$ 7,18** | R$ 22,00 | **32,6%** | R$ 14,82 | ⚠️ Limite |
| **G** | ~1.160g | **R$ 10,42** | R$ 35,00 | **29,8%** | R$ 24,58 | ✅ Saudável |

---

## 🚨 Comparativo: Versão Anterior (Errada) vs. Versão Corrigida

| Marmitex | CMV Anterior (errado) | CMV Corrigido | Diferença | Impacto |
| :--- | ---: | ---: | ---: | :--- |
| **P Média** | 17,1% | **25,2%** | +8,1 pp | Era "excelente", na verdade é "saudável" |
| **M Média** | 23,4% | **32,6%** | +9,2 pp | Era "muito bom", na verdade está **no limite** |
| **G Média** | 21,9% | **29,8%** | +7,9 pp | Era "excelente", na verdade é "saudável" |
| **M Carne Moída** | 28,1% | **38,0%** | +9,9 pp | Era "ok", na verdade está **ACIMA do teto** 🚨 |

**Origem do erro:** O cálculo anterior não aplicava FCc (fator de cocção) aos pesos servidos. Proteínas que encolhem ~20-25% na cocção precisam de mais matéria-prima crua do que o peso servido. Guarnições que expandem (arroz 2,5x, feijão 2x) precisam de menos matéria-prima, mas a diferença geral é negativa porque proteínas são os itens mais caros.

---

## 💡 Parecer do Engenheiro de Custos (@arquiteto-lucro)

### ⚠️ CMV GLOBAL ESTÁ NO LIMITE — Ação necessária para Carne Moída

A margem REAL está dentro do benchmark Abrasel (28-35%) na **média geral**, mas a **Marmitex M de Carne Moída está em 38%** — acima do teto de segurança de 35%.

### 🚨 Alertas Críticos

| Alerta | CMV | Ação Recomendada |
| :--- | ---: | :--- |
| **Marmitex M - Carne Moída** | **38,0%** 🚨 | Reduzir de 2 conchas (100g) para 1,5 concha (75g) → CMV cairia para ~33% |
| **Marmitex G - Carne Moída** | **34,9%** ⚠️ | Monitorar. Está no limite mas ainda dentro da meta |
| **Marmitex M - Frango ao Molho** | **30,5%** ⚠️ | Aceitável, mas monitorar custo do peito de frango |

### ✅ Pontos Positivos

| Ponto | Detalhe |
| :--- | :--- |
| **Bisteca Suína é a estrela** | CMV de 22-29% em todos os tamanhos. Proteína mais rentável. |
| **G é muito rentável** | R$ 24,58 de lucro bruto/unidade, CMV médio de 29,8%. |
| **P está excelente** | CMV médio de 25,2%. Todas as proteínas ficam abaixo de 28%. |

### 🎯 CMV Ponderado Diário (Mix Estimado)

Mix hipotético: 40% Frango, 35% Suíno, 25% Carne Moída | Tamanhos: 50% M, 30% P, 20% G

- **CMV médio ponderado do dia: ~30,1%**
- **Benchmark Abrasel: 28-35%**
- **Status: ✅ Dentro do benchmark, mas sem folga para bovinos**

---

*Relatório corrigido em 31/03/2026 pelo @arquiteto-lucro.*
*Fonte de custos: `posicao-atual.yaml`. Fonte de FC/FCc: `tabela-fatores-correcao.yaml`.*
*Fonte de pesagem: `relatorios/Pesagens/2026-03-30-pesagem-marmitex.md`.*
