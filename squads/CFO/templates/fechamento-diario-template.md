# Template: Fechamento Diário — Reconciliação de Estoque

**Data:** YYYY-MM-DD
**Responsável:** @controlador-estoque + @financeiro

---

## 1. Snapshot de Estoque Inicial (EI)

> Copiar os saldos do `posicao-atual.yaml` NO INÍCIO do dia, ANTES de qualquer operação.

| Item | Saldo Inicial (kg/un) | Valor (R$) |
|------|----------------------:|----------:|
| Peito de Frango | ___ | ___ |
| Sobrecoxa de Frango | ___ | ___ |
| ... | ___ | ___ |
| **TOTAL EI** | — | **R$ ___** |

---

## 2. Entradas do Dia (Compras)

> Registrar TODAS as NFs processadas no dia. Cruzar com `estoque/entradas/YYYY-MM-DD-*.md`

| NF/Fornecedor | Total (R$) | Arquivo de Entrada |
|---------------|----------:|-------------------|
| ___ | ___ | `estoque/entradas/...` |
| **TOTAL COMPRAS** | **R$ ___** | — |

---

## 3. Saídas do Dia (Vendas + Perdas)

> Registrar TODAS as baixas. Usar fichas técnicas para calcular consumo por ingrediente.

### 3.1 Vendas
| Comanda | Prato | Tamanho | Proteínas Consumidas | Guarnições | Bebidas |
|---------|-------|---------|---------------------|------------|---------|
| ___ | ___ | P/M/G | ___ kg | ___ kg | ___ un |

### 3.2 Perdas/Descarte
| Item | Quantidade | Motivo | Custo Estimado |
|------|-----------|--------|---------------|
| ___ | ___ | ___ | R$ ___ |

### 3.3 Consumo Detalhado por Ingrediente

> ⚠️ CRÍTICO: Baixar TODOS os ingredientes, incluindo óleos, temperos, saladas, embalagens.

| Cód Item | Nome | Qtd Baixada | Unidade | Origem (Venda/Perda) |
|----------|------|-------------|---------|---------------------|
| ___ | ___ | ___ | ___ | ___ |
| **TOTAL CMV SAÍDAS** | — | — | — | **R$ ___** |

---

## 4. Estoque Final (EF)

> Copiar os saldos do `posicao-atual.yaml` APÓS todas as operações do dia.

| Item | Saldo Final (kg/un) | Valor (R$) |
|------|--------------------:|----------:|
| ___ | ___ | ___ |
| **TOTAL EF** | — | **R$ ___** |

---

## 5. Reconciliação Obrigatória

```
CMV Real = EI + Compras - Devoluções - EF

EI (R$): ___
+ Compras (R$): ___
- Devoluções (R$): ___
- EF (R$): ___
= CMV REAL (R$): ___
```

### Verificação Cruzada

| Indicador | Valor | Status |
|-----------|-------|--------|
| CMV Real (pela fórmula acima) | R$ ___ | — |
| CMV Teórico (pela soma das fichas técnicas dos pratos vendidos) | R$ ___ | — |
| **Variância (Real - Teórico)** | **R$ ___** | ✅ OK (<5%) / ⚠️ Atenção (5-15%) / 🚨 Crítico (>15%) |
| Receita Bruta do Dia | R$ ___ | — |
| CMV % (Real ÷ Receita) | ___% | Meta: < 30% |

### Análise de Variância (se > 5%)

Se a variância entre CMV real e teórico superar 5%, investigar:
- [ ] Porcionamento excessivo (cozinha servindo mais que a ficha)
- [ ] Perda não registrada (queima, queda, contaminação)
- [ ] Desvio (furto interno)
- [ ] Erro de contagem no inventário
- [ ] Ficha técnica desatualizada

---

## 6. Sobras / WIP (Produtos em Processo)

> Registrar pesagem das sobras que voltam para geladeira/congelador.
> Estes valores devem ser atualizados na seção `produtos_em_processo` do `posicao-atual.yaml`.

| Item (Preparo) | Peso Líquido Final | Local | Status |
|----------------|-------------------:|-------|--------|
| ___ | ___ kg | ___ | Disponível / Descartar |
| **TOTAL WIP** | — | — | **R$ ___** |

---

## 7. Assinatura de Fechamento

- [ ] Entradas registradas e CMP recalculado
- [ ] Saídas registradas (TODOS os ingredientes, não só proteínas)
- [ ] Perdas documentadas
- [ ] Sobras pesadas e registradas no WIP
- [ ] Reconciliação EI+Compras-EF = CMV Real ✅
- [ ] Variância < 5% ✅ (ou justificada)
- [ ] `posicao-atual.yaml` atualizado com saldos finais corretos
- [ ] `valor_total_estoque` = soma de todos `valor_em_estoque`
