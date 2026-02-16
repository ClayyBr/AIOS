---
name: gerar-dre
description: Gera DRE (Demonstrativo do Resultado do Exercício) gerencial completo do período com KPIs e análise comparativa
agent: financeiro
version: 1.0.0
purpose: Consolidar todos os dados financeiros do mês em um DRE gerencial com indicadores de saúde financeira

inputs:
  - name: periodo
    type: string
    description: Mês/ano de referência
    required: true

  - name: dados_financeiros
    type: object
    description: Dados financeiros do período (receitas, custos, despesas). Pode ser fornecido parcialmente.
    required: true

  - name: comparar_anterior
    type: boolean
    description: Comparar com mês anterior (se houver dados na memória)
    required: false
    default: true

outputs:
  - description: DRE gerencial completo com KPIs
    format: markdown

dependencies:
  data:
    - modelo-dre-restaurante.md
  templates:
    - dre-mensal-template.md
---

# Task: Gerar DRE Gerencial

Gera o Demonstrativo do Resultado do Exercício gerencial do mês.

## Steps

1. **Coletar Dados:**
   - Receitas: alimentos (salão), bebidas, delivery, outras
   - Deduções: impostos (DAS), taxas de cartão, taxas marketplace, cancelamentos
   - CMV: alimentos, bebidas, embalagens delivery
   - Mão de obra: salários, encargos, pró-labore, extras, VT/VA
   - Custos fixos: aluguel, energia, água, gás, internet, manutenção, seguros, limpeza
   - Despesas admin: contabilidade, sistemas, marketing, taxas bancárias
   - Não operacionais: depreciação, juros, receitas financeiras

2. **Montar DRE:**
   - Seguir a estrutura do template `dre-mensal-template.md`
   - Calcular cada subtotal: Receita Líquida, Lucro Bruto, Lucro Operacional, Resultado Final
   - Calcular % de cada linha sobre a Receita Bruta

3. **Calcular KPIs:**
   - CMV Alimentos %
   - CMV Bebidas %
   - CMV Global %
   - Custo de MO %
   - Prime Cost % (CMV + MO)
   - Custos Fixos %
   - Lucro Líquido %
   - Classificar cada KPI: ✅ / ⚠️ / 🚨

4. **Análise Comparativa (se dados disponíveis):**
   - Comparar com mês anterior
   - Mostrar tendência (↗ ↘ →)
   - Alertar se tendência de piora por 2+ meses consecutivos

5. **Separação por Centro de Custo:**
   - Se dados permitirem, separar DRE por: Buffet | Executivo | Delivery
   - Mostrar CMV de cada operação isoladamente

6. **Insights e Alertas:**
   - Prime Cost > 65%: 🚨 ALERTA
   - Lucro < 8%: ⚠️ margem apertada
   - CMV alimentos > 35%: investigar
   - Custos fixos > 18%: revisar estrutura

## Output

DRE gerencial completo + dashboard de KPIs + insights + comparativo (se disponível)
