---
name: curva-abc
description: Classifica o estoque (Curva ABC) baseada no valor investido ou giro
agent: controlador-estoque
version: 1.0.0
inputs:
  - name: criterio
    type: enum
    options: ["valor_estoque", "giro"]
    default: "valor_estoque"
---

# Task: Curva ABC

Identifica quais itens merecem mais atenção (Classe A).

## Steps

1. **Calcular Valor Total:**
   - Listar todos os itens.
   - `Valor_Total_Item = Qtd * CMP`.

2. **Ordenar e Acumular:**
   - Ordenar decrescente pelo Valor Total.
   - Calcular % do Total Geral acumulado.

3. **Classificar:**
   - **A (0-80% do valor):** Alta prioridade. Inventário SEMANAL. Margem de segurança maior.
   - **B (80-95% do valor):** Média prioridade. Inventário QUINZENAL.
   - **C (95-100% do valor):** Baixa prioridade. Inventário MENSAL. Itens baratos/pouco usados.

4. **Recomendações:**
   - Para itens A: "Verifique se o Par Stock está calibrado. Qualquer perda aqui custa caro."
   - Para itens C: "Evite compras picadas. Compre em lote maior para reduzir frete/trabalho."

## Output
Tabela classificatória ABC com recomendações de gestão para cada grupo.
