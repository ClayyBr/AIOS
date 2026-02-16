---
name: fazer-inventario
description: Realiza a contagem física, ajusta divergências e calcula valor total
agent: controlador-estoque
version: 1.0.0
inputs:
  - name: contagem_real
    type: list
    description: Lista com Item e Quantidade Real (contada)
    required: true
---

# Task: Fazer Inventário

Confronta o estoque teórico (sistema) com o físico (real), ajusta saldos e reporta perdas.

## Steps

1. **Importar Posição Atual:**
   - Carregar `estoque/inventario/posicao-atual.yaml`.

2. **Comparar Item a Item:**
   - `Dif_Qtd = Real - Teórico`.
   - `Dif_Valor = Dif_Qtd * CMP_Item`.

3. **Classificar Divergência:**
   - `Variância % = (Dif_Qtd / Teórico) * 100`.
   - |Var| < 2%: ✅ Normal (perda natural).
   - |Var| > 5%: 🚨 Crítico (investigar furto/erro).

4. **Ajustar Estoque:**
   - Atualizar `quantidade` para o valor REAL contada.
   - O CMP não muda (o ajuste é de qtd, não de valor unitário).
   - Recalcular `valor_total_estoque`.

5. **Gerar Relatório:**
   - Valor Total do Inventário.
   - Divergência Total (R$).
   - Top 5 itens com maior fura.

6. **Notificar Financeiro:**
   - "Atenção @arquiteto-lucro: Inventário fechado. Valor atual: R$ X. Perda apurada: R$ Y."

## Output
Relatório completo de inventário com ajustes realizados e impacto financeiro.
