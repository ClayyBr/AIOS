---
name: registrar-saida
description: Registra a saída de mercadoria (venda, perda, consumo) e atualiza o inventário
agent: controlador-estoque
version: 1.0.0
inputs:
  - name: motivo
    type: enum
    options: ["venda", "perda", "consumo_equipe", "producao", "ajuste"]
    required: true
  - name: itens
    type: list
    required: false
  - name: pratos_vendidos
    type: list
    required: false
    description: Se motivo="venda", lista de pratos para baixa por ficha técnica
---

# Task: Registrar Saída

Baixa itens do estoque, seja por contagem direta ou explodindo fichas técnicas de vendas.

## Steps

1. **Identificar Origem da Saída:**
   - **Venda:** Recebe lista de pratos → Consulta `fichas/` → Calcula insumos totais.
   - **Manual:** Recebe lista direta de insumos (ex: "2kg cebola estragou").

2. **Verificar Disponibilidade:**
   - Para cada insumo, checar se `quantidade_atual >= quantidade_saida`.
   - Se não, ALERTA DE ESTOQUE NEGATIVO (ajuste necessário).

3. **Dar Baixa:**
   - `Quantidade_Nova = Quantidade_Atual - Quantidade_Saida`.
   - Valor monetário da saída = `Quantidade_Saida * CMP_Atual`.

4. **Registrar Motivo:**
   - Se "perda" ou "consumo_equipe", marcar valor para relatório de desperdício/custo.
   - Se "venda", compõe o CMV teórico do dia.

5. **Persistir Dados:**
   - Salvar em `estoque/saidas/YYYY-MM-DD.md`.
   - Atualizar `estoque/inventario/posicao-atual.yaml`.

6. **Verificar Alertas (Pós-Baixa):**
   - Estoque ficou abaixo do Par Stock? 🚨 ALERTA DE COMPRA.

## Output
Resumo da baixa: Itens deduzidos, valor total da saída (a custo de estoque), e novos alertas de reposição.
