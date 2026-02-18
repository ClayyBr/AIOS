# Manual Test Plan: @vendas

**Agent:** Vendas
**Type:** Integration & Logic Test

## Scenario 1: Expiring Stock (PVPS)
**Context:** Need to test if the agent correctly prioritizes expiring items.
**Prompt:**
> "@vendas Eu tenho 20kg de Coxa de Frango vencendo em 4 dias. O que eu faço?"
**Expected Output:**
- Consult `@controlador-estoque`.
- Suggest a campaign (e.g., "Festival do Frango", "Adicional Grátis").
- Mention Urgency/Scarcity.

## Scenario 2: The "Raspadinha" Logic (Variance Efficiency)
**Context:** Verify the math of Migration + Perceived Value.
**Prompt:**
> "@vendas Quero migrar clientes do iFood para o WhatsApp. Pensei em dar 10% de desconto ou dar uma Batata Frita (Custo R$ 4,00, Venda R$ 20,00). O pedido médio é R$ 80,00."
**Expected Output:**
- Calculate Scenario A (Discount): R$ 8,00 cost.
- Calculate Scenario B (Fries): R$ 4,00 cost + Migrates client (saves 25% future fee).
- Compare ROI explicitly using a Table.

## Scenario 3: RevPASH (Occupancy)
**Context:** Tuesday night is empty.
**Prompt:**
> "@vendas Minha terça-feira está morta. O que sugere?"
**Expected Output:**
- Reference `guia-revenue-management.md`.
- Suggest strategies like "Reverse Happy Hour" or "All-You-Can-Eat" upgrades to cover fixed costs.

## Verification Checklist
- [ ] Agent respects "CLI First" (doesn't ask for UI).
- [ ] Agent consults `guia-revenue-management.md`.
- [ ] Strategies are financially sound (Break-even check).
