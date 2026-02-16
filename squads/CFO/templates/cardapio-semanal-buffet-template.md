# Cardápio Semanal de Buffet — Semana de {{DATA_INICIO}} a {{DATA_FIM}}

| Campo | Valor |
|-------|-------|
| **Semana** | {{data_inicio}} a {{data_fim}} |
| **Mês/Sazonalidade** | {{mes}} — {{sazonalidade_resumo}} |
| **Clientes/dia estimados** | {{clientes_dia}} |
| **Meta de custo/kg** | R$ {{meta_custo_kg}} |
| **Preço/kg planejado** | R$ {{preco_kg}} |

---

## Grade Semanal

### 🍚 Arroz / Massas (25% do mix)

| Dia | Preparação 1 | Preparação 2 | Custo/kg Est. |
|:---:|-------------|-------------|:-------------:|
| **Seg** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |
| **Ter** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |
| **Qua** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |
| **Qui** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |
| **Sex** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |
| **Sáb** | Arroz Branco | {{opcao_2}} | R$ {{custo}} |

### 🫘 Feijão (10% do mix)

| Dia | Preparação | Custo/kg Est. |
|:---:|-----------|:-------------:|
| **Seg** | Feijão Carioca | R$ {{custo}} |
| **Ter** | Feijão Carioca | R$ {{custo}} |
| **Qua** | Feijão Carioca | R$ {{custo}} |
| **Qui** | Feijão Preto | R$ {{custo}} |
| **Sex** | Feijão Carioca | R$ {{custo}} |
| **Sáb** | **Feijoada Completa** 🥇 | R$ {{custo}} |

### 🥗 Saladas (15% do mix)

| Dia | Salada 1 | Salada 2 | Custo/kg Est. |
|:---:|----------|----------|:-------------:|
| **Seg** | {{salada}} | {{salada}} | R$ {{custo}} |
| **Ter** | {{salada}} | {{salada}} | R$ {{custo}} |
| **Qua** | {{salada}} | {{salada}} | R$ {{custo}} |
| **Qui** | {{salada}} | {{salada}} | R$ {{custo}} |
| **Sex** | {{salada}} | {{salada}} | R$ {{custo}} |
| **Sáb** | {{salada}} | {{salada}} | R$ {{custo}} |

> 💡 **Dica de sazonalidade:** Consultar `data/sazonalidade-hortifruti.yaml` para o mês. Priorizar itens em SAFRA (mais baratos e frescos).

### 🥕 Legumes / Guarnições Quentes (15% do mix)

| Dia | Guarnição 1 | Guarnição 2 | Custo/kg Est. |
|:---:|------------|------------|:-------------:|
| **Seg** | {{legume}} | {{legume}} | R$ {{custo}} |
| **Ter** | {{legume}} | {{legume}} | R$ {{custo}} |
| **Qua** | {{legume}} | {{legume}} | R$ {{custo}} |
| **Qui** | {{legume}} | {{legume}} | R$ {{custo}} |
| **Sex** | {{legume}} | {{legume}} | R$ {{custo}} |
| **Sáb** | {{legume}} | {{legume}} | R$ {{custo}} |

### 🍗 Proteína Econômica (20% do mix)

| Dia | Preparação | Custo/kg Est. |
|:---:|-----------|:-------------:|
| **Seg** | Frango (ex: Fricassê) | R$ {{custo}} |
| **Ter** | Carne Moída (ex: Escondidinho) | R$ {{custo}} |
| **Qua** | Frango (ex: Estrogonofe) | R$ {{custo}} |
| **Qui** | Linguiça (ex: Calabresa acebolada) | R$ {{custo}} |
| **Sex** | **Peixe** (ex: Filé empanado) 🐟 | R$ {{custo}} |
| **Sáb** | Frango (ex: Coxa/sobrecoxa assada) | R$ {{custo}} |

> ⚠️ **Regra:** Não repetir a mesma proteína 2 dias seguidos. Variar métodos de cocção.

### 🥩 Proteína Nobre (10% do mix)

| Dia | Preparação | Custo/kg Est. |
|:---:|-----------|:-------------:|
| **Seg** | — (sem proteína nobre seg) | — |
| **Ter** | {{proteina_nobre}} | R$ {{custo}} |
| **Qua** | — | — |
| **Qui** | {{proteina_nobre}} | R$ {{custo}} |
| **Sex** | {{proteina_nobre}} | R$ {{custo}} |
| **Sáb** | {{proteina_nobre}} | R$ {{custo}} |

> 💡 **Estratégia:** Proteína nobre apenas nos dias de maior movimento (ter, qui, sex, sáb). Na segunda (menor movimento), não oferecer — reduz CMV do dia.

### 🍟 Complementos (5% do mix)

| Dia | Complemento 1 | Complemento 2 | Custo/kg Est. |
|:---:|--------------|--------------|:-------------:|
| **Seg** | Farofa | Vinagrete | R$ {{custo}} |
| **Ter** | Farofa | Vinagrete | R$ {{custo}} |
| **Qua** | Farofa | Vinagrete | R$ {{custo}} |
| **Qui** | Farofa | Vinagrete | R$ {{custo}} |
| **Sex** | Farofa | Vinagrete | R$ {{custo}} |
| **Sáb** | Farofa | Vinagrete + Couve | R$ {{custo}} |

---

## Resumo de Custos da Semana

| Dia | Custo/kg Est. | Preço/kg | CMV Est. | Status |
|:---:|:------------:|:--------:|:--------:|:------:|
| **Seg** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Ter** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Qua** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Qui** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Sex** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Sáb** | R$ {{custo}} | R$ {{preco}} | {{cmv}}% | {{status}} |
| **Média** | **R$ {{media}}** | **R$ {{preco}}** | **{{cmv_media}}%** | **{{status}}** |

---

## Cross-Utilization com Executivo

Ingredientes compartilhados entre buffet e pratos executivos:

| Ingrediente | Uso no Buffet | Uso no Executivo | Economia |
|-------------|--------------|-----------------|----------|
| {{ingrediente}} | {{uso_buffet}} | {{uso_exec}} | Compra em maior volume = preço menor |

> ✅ Maximizar cross-utilization reduz risco de desperdício (ingrediente usado em 2+ preparações).

---

## Regras de Variação

- 🫘 **Sábado = Feijoada** (tradição paulista)
- 🐟 **Sexta = Peixe** (tradição + Quaresma)
- 🍝 **Quarta = Dia do Macarrão** (opcional — ajuda a baixar CMV)
- 🚫 Não repetir mesma proteína 2 dias seguidos
- 🔄 Alternar métodos: grelhado → cozido → assado → frito → refogado
- 📅 Verificar feriados e eventos da semana (ajustar volume)

---

## Lista de Compras da Semana

| Ingrediente | Qtd Total | Un | Dia da Compra | Fornecedor |
|-------------|:---------:|:--:|:-------------:|:----------:|
| {{ingrediente}} | {{qtd}} | {{un}} | {{dia}} | {{fornecedor}} |

> 📦 Consultar `@controlador-estoque *lista-compras` para lista completa com base no par stock e estoque atual.

---

## Observações

- {{observacao_1}}
- {{observacao_2}}

---

*Template gerado pelo Squad CFO — Cardápio semanal de buffet*
