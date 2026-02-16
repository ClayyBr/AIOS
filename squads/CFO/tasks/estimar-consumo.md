---
name: estimar-consumo
description: Estima o consumo de insumos do estoque baseado em pratos vendidos, explodindo fichas técnicas
agent: controlador-estoque
version: 1.0.0
purpose: Calcular a baixa teórica de estoque baseada nas vendas do dia, para comparar com estoque real e identificar desperdício

inputs:
  - name: pratos_vendidos
    type: list
    description: Lista de pratos vendidos com quantidade (ex. "30 Strogonoff, 15 Parmegiana, 20 Grelhado")
    required: true

  - name: periodo
    type: string
    description: Período de referência (ex. "hoje", "semana", "segunda-feira")
    required: false
    default: "hoje"

outputs:
  - description: Consumo teórico de insumos baseado nos pratos vendidos
    format: markdown (tabela)

dependencies:
  data:
    - fichas/*.md
  files:
    - estoque/inventario/posicao-atual.yaml
---

# Task: Estimar Consumo de Estoque

Calcula a baixa teórica de insumos, "explodindo" as fichas técnicas dos pratos vendidos em quantidades brutas de cada ingrediente.

## Quando Usar

- Quando o dono informa quantos pratos vendeu no dia/semana
- Para comparar consumo teórico vs real (detectar desperdício/furto)
- Para estimar necessidade de compra baseada em vendas previstas
- Como base para registrar saída por vendas (`*saida motivo=venda`)

## Steps

1. **Coletar Vendas:**
   - Receber lista de pratos vendidos com quantidade
   - Se o prato não tiver ficha técnica em `fichas/`, avisar e pedir para criar

2. **Explodir Fichas Técnicas:**
   - Para cada prato, ler a ficha em `fichas/[nome-do-prato].md`
   - Extrair ingredientes com Peso Bruto (PB) por porção
   - Multiplicar PB × quantidade vendida = consumo bruto total

3. **Consolidar por Ingrediente:**
   - Agrupar todos os ingredientes únicos
   - Somar consumo bruto total de cada ingrediente (mesmo ingrediente em múltiplos pratos)
   - Exemplo: Frango aparece no Strogonoff (180g × 30) + Parmegiana (180g × 15) + Grelhado (200g × 20) = 12.100g = 12,1 kg

4. **Comparar com Estoque:**
   - Ler `estoque/inventario/posicao-atual.yaml`
   - Para cada ingrediente: `Saldo Pós-Venda = Estoque Atual - Consumo Teórico`
   - Se `Saldo Pós-Venda < 0`: 🚨 ESTOQUE INSUFICIENTE
   - Se `Saldo Pós-Venda < Par Stock`: ⚠️ ABAIXO DO MÍNIMO — compra necessária

5. **Calcular Valor Consumido:**
   - `Valor = Consumo (kg) × CMP do item`
   - Somar total = valor de CMV teórico do dia
   - Comparar CMV teórico vs receita (se conhecida)

6. **Gerar Tabela de Consumo:**
   - Tabela final: Ingrediente | Consumo Bruto | Estoque Antes | Estoque Depois | Status
   - Destacar itens críticos
   - Informar valor total consumido (R$)

7. **Oferecer Baixa:**
   - Perguntar: "Deseja registrar esta baixa no estoque? (`*saida`)"
   - Se sim, atualizar `posicao-atual.yaml`

## Output

```
📦 CONSUMO ESTIMADO — [Período]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Pratos vendidos: [lista]

| Ingrediente | Consumo (kg) | Estoque Antes | Estoque Depois | Status |
|-------------|:--------:|:----------:|:-----------:|--------|
| Frango      | 12,1 kg  | 40,0 kg    | 27,9 kg     | ✅ OK  |
| Batata      | 8,4 kg   | 10,0 kg    | 1,6 kg      | 🚨 ABAIXO PAR |
| ...         | ...      | ...        | ...         | ...    |

💰 Valor total consumido: R$ [X]
📊 CMV estimado do dia: [X]% (se receita informada)

⚠️ Alertas: [itens críticos]
```
