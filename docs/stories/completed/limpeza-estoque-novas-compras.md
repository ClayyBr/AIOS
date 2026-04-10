# Story: Limpeza de Estoque e Registro de Novas Compras

**ID:** CFO-002
**Status:** In Progress
**Agent:** @gerente-geral / @controlador-estoque

## Descrição
O estoque continha dados antigos de testes. O usuário solicitou a limpeza total da base de dados de inventário e a entrada exclusiva de compras reais efetuadas no supermercado Nagumo em 21/03/2026 e 22/03/2026.

## Acceptance Criteria
1. [x] Limpar `squads/CFO/estoque/inventario/posicao-atual.yaml`.
2. [ ] Registrar entrada de Frango Sadia CG/ Sobrecoxa (5 un, R$ 11,98 cada).
3. [ ] Registrar entrada de Frango CG/Peito S/Osso (3,916Kg a R$ 13,98/Kg).
4. [ ] Inserir os itens na base limpa do inventário atualizando o CMP e o Valor Total do Estoque.

## File List
- `squads/CFO/estoque/inventario/posicao-atual.yaml`
- `squads/CFO/estoque/entradas/2026-03-21-compras-nagumo.md`
- `squads/CFO/estoque/entradas/2026-03-22-compras-nagumo.md`
- `docs/stories/active/limpeza-estoque-novas-compras.md`
