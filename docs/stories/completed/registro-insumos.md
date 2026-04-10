# Story: Registro de Insumos Comprados

**ID:** CFO-001
**Status:** In Progress
**Agent:** @gerente-geral

## Descrição
O usuário deseja registrar as compras de insumos realizadas nos últimos dias para manter o estoque e o CMV atualizados.

## Acceptance Criteria
1. [ ] Receber e validar os dados de compra (Nome, Qtd, Preço, Unidade).
2. [ ] Registrar a entrada em `squads/CFO/estoque/entradas/YYYY-MM-DD-compras.md`.
3. [ ] Atualizar `squads/CFO/estoque/inventario/posicao-atual.yaml` recalculando o CMP.
4. [ ] Notificar o @arquiteto-lucro se houver variação de preço > 10%.
5. [ ] Confirmar o registro com relatório em Markdown e HTML.

## File List
- `docs/stories/active/registro-insumos.md`
- `squads/CFO/estoque/entradas/`
- `squads/CFO/estoque/inventario/posicao-atual.yaml`
