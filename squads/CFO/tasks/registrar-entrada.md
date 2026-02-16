---
name: registrar-entrada
description: Registra a entrada de mercadoria no estoque, calculando o Custo Médio Ponderado (CMP)
agent: controlador-estoque
version: 1.0.0
inputs:
  - name: fornecedor
    type: string
    required: true
  - name: nota_fiscal
    type: string
    required: false
  - name: itens
    type: list
    required: true
    description: Lista de itens com nome, quantidade (kg/un) e preço total
---

# Task: Registrar Entrada

Atualiza o inventário com novos itens, recalculando o preço médio (CMP).

## Steps

1. **Identificar Itens:**
   - Ler lista de compra (texto/foto).
   - Para cada item, verificar se já existe em `posicao-atual.yaml`.

2. **Calcular CMP (Custo Médio Ponderado):**
   - Se item NOVO: CMP = Preço Entrada.
   - Se item EXISTE:
     ```
     CMP = ((QtdAtual * CMP_Atual) + (QtdEntrada * PrecoEntrada)) / (QtdAtual + QtdEntrada)
     ```

3. **Atualizar Inventário:**
   - Somar quantidade nova à atual.
   - Atualizar CMP.
   - Atualizar `validade_proxima` (se a nova for menor/igual).
   - Registrar `ultimo_fornecedor` e `ultimo_preco`.

4. **Persistir Dados:**
   - Salvar registro em `estoque/entradas/YYYY-MM-DD.md`.
   - Atualizar `estoque/inventario/posicao-atual.yaml`.

5. **Gerar Alertas:**
   - Preço variou > 10% vs referência? ⚠️
   - Preço variou > 10% vs última compra? ⚠️
   - Algum item crítico (estoque baixo) foi reposto? ✅

## Output
Tabela resumo com: Item, Qtd Entrou, Preço Pago, Novo Estoque, Novo CMP.
