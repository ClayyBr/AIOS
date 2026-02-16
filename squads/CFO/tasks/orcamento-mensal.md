---
name: orcamento-mensal
description: Cria orçamento mensal com metas por categoria e acompanha realizado vs planejado
agent: financeiro
version: 1.0.0
purpose: Disciplina financeira — gastar apenas o planejado e alertar desvios antes que virem crises

inputs:
  - name: mes
    type: string
    description: Mês/ano de referência (ex. "março 2026")
    required: true

  - name: receita_meta
    type: float
    description: Meta de receita bruta do mês (R$)
    required: true

  - name: categorias
    type: object
    description: Metas personalizadas por categoria (se não informado, usa benchmarks padrão)
    required: false

outputs:
  - description: Orçamento com colunas Planejado/Realizado/Variação + alertas
    format: markdown (template orcamento-mensal-template.md)

dependencies:
  templates:
    - orcamento-mensal-template.md
  data:
    - Manual_Contabilidade_Restaurante.md
---

# Task: Orçamento Mensal

Cria orçamento mensal com metas percentuais e acompanha realizado vs planejado. Referência: Manual seções 5 (DRE) e 6 (DFC).

## Steps

1. **Definir Metas de Receita por Centro de Custo:**
   - Buffet: X% do faturamento
   - Executivo: Y% do faturamento
   - Delivery: Z% do faturamento
   - Bebidas: W% do faturamento
   - Se centro único, usar faturamento total

2. **Definir Metas de Custo por Categoria (benchmarks padrão):**

   | Categoria | Meta % da RL | R$ Planejado |
   |-----------|:------------:|:------------:|
   | CMV Alimentos | 30% | Receita × 30% |
   | CMV Bebidas | 22% | Receita Beb × 22% |
   | Mão de Obra | 28% | Receita × 28% |
   | Ocupação (Aluguel+IPTU+Cond) | 10% | Fixo |
   | Utilidades (Energia+Água+Gás) | 5% | Fixo |
   | Marketing | 3% | Receita × 3% |
   | Manutenção | 2% | Fixo |
   | Impostos (DAS) | ~7% | Alíquota efetiva × Receita |
   | Financeiro (Taxas cartão) | 3% | Receita × 3% |
   | Provisões (13º/Férias) | 5% | Folha × 19,44% |

3. **Registrar Valores Realizados:**
   - À medida que dados reais chegam do dono, preencher coluna "Realizado"
   - Fontes: NFs de compra (CMV), folha (MO), boletos (fixos)

4. **Calcular Variação:**
   - `Var R$ = Realizado - Planejado`
   - `Var % = Var R$ ÷ Planejado × 100`
   - Positivo = gastou MAIS que o previsto (⚠️ se > 10%)
   - Negativo = gastou MENOS (✅ se é economia real, ⚠️ se é falta de investimento)

5. **Alertar Desvios > 10%:**
   - Listar categorias com variação > 10% (positiva ou negativa)
   - Diagnosticar causa provável
   - Recomendar ação corretiva

6. **Projetar Fim de Mês:**
   - Extrapolar tendência atual para o mês inteiro
   - "Se continuar neste ritmo, o CMV fechará em X% ao invés dos Y% planejados"

## Output

Tabela de orçamento (template) + alertas de desvio + projeção de fechamento
