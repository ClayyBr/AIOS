---
name: vendas-gerar-dashboard
description: Gera um dashboard com KPIs de vendas, ROI de campanhas e estoque salvo (PVPS).
inputs:
  - name: periodo
    type: string
    description: "Mês/Ano ou 'acumulado'"
outputs:
  - Relatório Markdown (Resumo Executivo)
  - Dashboard HTML (Visualização Detalhada)
---

# Task: Gerar Dashboard de Vendas

1.  **Ler Dados:**
    -   Carregar `squads/CFO/data/campanhas-ativas.json`.
    -   Filtrar campanhas pelo período solicitado (se aplicável).

2.  **Calcular KPIs:**
    -   **Receita Total:** Soma de `receita_gerada`.
    -   **Investimento Total:** Soma de `custo_total`.
    -   **ROI Geral:** `(Receita - Investimento) / Investimento`.
    -   **Estoque Salvo (PVPS):** Soma de `valor_estoque_salvo` (apenas campanhas tipo PVPS).
    -   **Migração de Canal:** Contagem de raspadinhas resgatadas.

3.  **Gerar Markdown (Resumo):**
    -   Criar tabela simples com os KPIs acima.
    -   Listar Top 3 Campanhas por ROI.

4.  **Gerar HTML (Visual):**
    -   Usar template `squads/CFO/templates/vendas-dashboard-template.html`.
    -   Substituir placeholders `{{RECEITA}}`, `{{ROI}}`, `{{PVPS}}` pelos valores calculados.
    -   Salvar em `squads/CFO/relatorios/dashboard-vendas-{Mes}.html`.
