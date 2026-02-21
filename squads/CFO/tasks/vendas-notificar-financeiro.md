---
name: vendas-notificar-financeiro
description: Registra o custo previsto de uma campanha para que o Financeiro possa incluir no DRE.
inputs:
  - name: id_campanha
    type: string
  - name: custo_estimado
    type: number
    description: "Valor total do investimento ou CMV dos brindes"
  - name: data_inicio
    type: string
outputs:
  - Registro em data/campanhas-ativas.json
  - Output formatado para o agente Financeiro ler
---

# Task: Notificar Financeiro sobre Campanha

1.  **Registrar a Campanha**:
    -   Adicionar entrada no arquivo `squads/CFO/data/campanhas-ativas.json`.
    -   Estrutura: `{ id, data, custo, status: 'ativa' }`.

2.  **Emitir Alerta Financeiro**:
    -   Gerar output: "📢 **NOTIFICAÇÃO FINANCEIRA:** Campanha `{id_campanha}` iniciada. Custo previsto: R$ `{custo_estimado}`. Por favor, provisione este valor no DRE."

3.  **Vincular ao Fluxo de Caixa**:
    -   Se o custo for imediato (compra de brindes), solicitar ao `@financeiro` que registre como "Despesa de Marketing".
