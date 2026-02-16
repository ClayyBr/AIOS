---
name: indicadores-financeiros
description: Dashboard consolidado de KPIs financeiros com classificação (✅⚠️🚨) e tendência
agent: financeiro
version: 1.0.0
purpose: Visão 360° da saúde financeira em uma única consulta — o "painel de controle" do dono

inputs:
  - name: periodo
    type: string
    description: Mês/ano de referência (ex. "fevereiro 2026")
    required: true

  - name: dados
    type: object
    description: Dados financeiros do período (pode vir do DRE já gerado ou informados pelo dono)
    required: true

outputs:
  - description: Dashboard de KPIs com classificação, tendência e top 3 ações
    format: markdown (tabela + emojis de status)

dependencies:
  data:
    - Manual_Contabilidade_Restaurante.md
    - modelo-dre-restaurante.md
---

# Task: Indicadores Financeiros (Dashboard)

Apresenta KPIs consolidados com classificação e tendência. Referência: Manual seções 5 (DRE), 7 (Balanço) e 8 (KPIs).

## Steps

1. **Calcular KPIs Primários:**

   | Indicador | Fórmula | Meta |
   |-----------|---------|------|
   | CMV Alimentos (%) | CMV Alim ÷ RL Alim × 100 | 28-35% |
   | CMV Bebidas (%) | CMV Beb ÷ RL Beb × 100 | 18-25% |
   | CMV Total (%) | CMV Total ÷ RL Total × 100 | 28-33% |
   | CMO (%) | (Salários+Encargos+Provisões) ÷ RL × 100 | 25-30% |
   | Prime Cost (%) | (CMV + CMO) ÷ RL × 100 | < 60% |
   | Margem de Contribuição (%) | MC ÷ RL × 100 | > 50% |
   | EBITDA (%) | EBITDA ÷ RL × 100 | 10-15% |
   | Lucro Líquido (%) | LL ÷ RL × 100 | 5-12% |

2. **Calcular KPIs Secundários:**

   | Indicador | Fórmula | Referência |
   |-----------|---------|-----------|
   | Ticket Médio (R$) | Faturamento ÷ Nº Clientes | Variação vs mês anterior |
   | Clientes/Dia | Total Clientes ÷ Dias Operação | Média com variação |
   | RevPASH (R$) | Receita ÷ (Assentos × Horas Operação) | Produtividade do salão |
   | Giro de Estoque | CMV ÷ Estoque Médio | Ideal: 4-8× /mês |
   | Break-even | Custos Fixos ÷ MC% | Clientes/dia mínimos |

3. **Classificar Cada Indicador:**
   - ✅ Dentro da meta (zona de conforto)
   - ⚠️ Fora da faixa ideal mas aceitável (1-5% de desvio)
   - 🚨 Crítico — risco operacional (>5% de desvio ou abaixo do break-even)

4. **Mostrar Tendência (vs mês anterior):**
   - ↑ Melhorando (bom se indicador deve subir, ruim se deve descer)
   - → Estável
   - ↓ Piorando
   - Se não houver mês anterior, marcar como "📭 Primeiro mês"

5. **Top 3 Indicadores que Precisam de Ação:**
   - Listar os 3 KPIs com pior desempenho
   - Para cada: diagnóstico + ação recomendada + impacto estimado

## Output

Tabela de KPIs com colunas: Indicador | Valor | Meta | Status | Tendência + Top 3 Ações
