# Custo do Buffet Montado — {{DIA_DA_SEMANA}} {{DATA}}

| Campo | Valor |
|-------|-------|
| **Data** | {{data}} |
| **Dia da Semana** | {{dia_semana}} |
| **Período** | Almoço / Jantar |
| **Clientes Estimados** | {{qtd_clientes}} |
| **Consumo Médio/Cliente** | 350g (referência para buffet por quilo) |

---

## 1. Preparações do Dia

### Arroz / Massas (25% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| {{preparacao_2}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Feijão (10% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Saladas (15% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| {{preparacao_2}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Legumes / Guarnições Quentes (15% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| {{preparacao_2}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Proteína Econômica (20% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Proteína Nobre (10% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

### Complementos (5% do mix)

| Preparação | Custo/kg | Peso Bandeja (kg) | Custo Total | Ficha Técnica |
|------------|:--------:|:-----------------:|:-----------:|:-------------:|
| {{preparacao_1}} | R$ {{custo_kg}} | {{peso}} | R$ {{total}} | [link]({{ficha}}) |
| **Subtotal** | — | **{{peso_total}}** | **R$ {{subtotal}}** | |

---

## 2. Custo Total Produzido

| Categoria | Peso (kg) | Custo (R$) | % Mix Planejado | % Custo Real |
|-----------|:---------:|:----------:|:---------------:|:------------:|
| Arroz / Massas | {{peso}} | R$ {{custo}} | 25% | {{pct}}% |
| Feijão | {{peso}} | R$ {{custo}} | 10% | {{pct}}% |
| Saladas | {{peso}} | R$ {{custo}} | 15% | {{pct}}% |
| Legumes / Guarnições | {{peso}} | R$ {{custo}} | 15% | {{pct}}% |
| Proteína Econômica | {{peso}} | R$ {{custo}} | 20% | {{pct}}% |
| Proteína Nobre | {{peso}} | R$ {{custo}} | 10% | {{pct}}% |
| Complementos | {{peso}} | R$ {{custo}} | 5% | {{pct}}% |
| **TOTAL** | **{{peso_total}}** | **R$ {{custo_total}}** | **100%** | **100%** |

---

## 3. Custo por KG do Buffet

```
Custo Total Produzido:           R$ {{custo_total}}
Peso Total Produzido:            {{peso_total}} kg
───────────────────────────────────────
Custo/kg Produzido (base):       R$ {{custo_kg_base}}

(+) Margem de Sobra ({{sobra_pct}}%):  R$ {{custo_sobra}}
(+) Margem de Perda Oper. ({{perda_pct}}%): R$ {{custo_perda}}
───────────────────────────────────────
Custo/kg Real:                   R$ {{custo_kg_real}}
```

---

## 4. Precificação do KG

| CMV Meta | Preço/kg Calculado | Preço/kg Sugerido |
|:--------:|:------------------:|:-----------------:|
| 28% | R$ {{preco_28}} | R$ {{sugerido_28}} |
| **30%** | **R$ {{preco_30}}** | **R$ {{sugerido_30}} ← Padrão** |
| 32% | R$ {{preco_32}} | R$ {{sugerido_32}} |
| 35% | R$ {{preco_35}} | R$ {{sugerido_35}} |

### Prova Reversa (CMV 30%)

```
Preço do kg:              R$ {{preco_kg}}  (100%)
├── CMV Real:              R$ {{cmv_valor}}  ({{cmv_pct}}%) ✅
├── Mão de Obra:           R$ {{mo_valor}}   ({{mo_pct}}%)
├── Impostos (Simples):    R$ {{imp_valor}}  ({{imp_pct}}%)
├── Custos Fixos:          R$ {{fix_valor}}  ({{fix_pct}}%)
├── Despesas:              R$ {{desp_valor}} ({{desp_pct}}%)
└── 💰 LUCRO:              R$ {{lucro_valor}} ({{lucro_pct}}%)
```

---

## 5. Simulação de Cenários de Mix

O mix de consumo dos clientes impacta diretamente o custo/kg real do buffet.

| Cenário | Descrição | Custo/kg Estimado | Impacto no CMV |
|---------|-----------|:-----------------:|:--------------:|
| 🟢 **Mix Leve** | Cliente se serve mais salada e arroz, pouca proteína | R$ {{custo_leve}} | CMV mais baixo |
| 🟡 **Mix Normal** | Distribuição proporcional ao planejado | R$ {{custo_normal}} | CMV na meta |
| 🔴 **Mix Pesado** | Cliente se serve mais proteína nobre e pouco arroz | R$ {{custo_pesado}} | CMV estoura |

### Detalhamento do Mix Pesado (pior caso)

| Categoria | Mix Planejado | Mix Pesado | Diferença |
|-----------|:------------:|:----------:|:---------:|
| Arroz / Massas | 25% | 15% | -10% |
| Proteína Nobre | 10% | 25% | **+15%** |
| Demais | 65% | 60% | -5% |

> ⚠️ **Ação preventiva:** Posicionar proteínas no final do balcão (cliente se serve de arroz/salada primeiro) e usar conchas menores para proteína nobre.

---

## 6. Controle de Sobras (preencher no fim do turno)

| Métrica | Valor | Referência | Status |
|---------|:-----:|:----------:|:------:|
| Peso Total Produzido | {{produzido}} kg | — | — |
| Peso Vendido (balança) | {{vendido}} kg | — | — |
| Sobra Limpa | {{sobra_limpa}} kg | 3-7% | {{status}} |
| Resto Ingesto | {{resto}} kg | ≤ 5% | {{status}} |
| **Índice de Sobra** | **{{indice_sobra}}%** | **3-7%** | **{{status}}** |
| **Índice de Resto** | **{{indice_resto}}%** | **≤ 5%** | **{{status}}** |

```
Índice de Sobra = (Sobra Limpa ÷ Peso Produzido) × 100
Índice de Resto = (Resto Ingesto ÷ Peso Vendido) × 100
```

---

## Observações

- {{observacao_1}}
- {{observacao_2}}
- {{observacao_3}}
