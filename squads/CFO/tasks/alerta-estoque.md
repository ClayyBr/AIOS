---
name: alerta-estoque
description: Verifica itens críticos, validade e gera lista de compras
agent: controlador-estoque
version: 1.0.0
inputs:
  - name: tipo
    type: enum
    options: ["reposicao", "validade", "geral"]
    default: "geral"
---

# Task: Alerta de Estoque e Lista de Compras

Analisa o estado atual contra as regras de negócio (Par Stock e Validade).

## Steps

1. **Checar Par Stock:**
   - Ler `posicao-atual.yaml` e `par-stock.yaml`.
   - Para cada item:
     - `Deficit = Par_Stock - Qtd_Atual`.
     - Se `Deficit > 0`: Adicionar à lista de compras.
     - Se `Qtd_Atual < Par_Stock_Minimo`: Marcar como 🚨 CRÍTICO.

2. **Checar Validade (PVPS):**
   - Filtrar itens com `validade_proxima` definida.
   - Se `data - hoje <= 3 dias`: ⚠️ ALERTA DE USO URGENTE.
   - Se `data < hoje`: ☠️ VENCIDO (solicitar descarte).

3. **Gerar Lista de Compras:**
   - Agrupar itens por `fornecedor_principal`.
   - Calcular custo estimado (`Deficit * CMP_Atual` ou `Ultimo_Preco`).

## Output
1. **Painel de Alertas:** (Críticos / Atenção / Vencimento)
2. **Sugestão de Compra:** Lista organizada por fornecedor com estimativa de custo.
