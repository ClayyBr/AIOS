---
name: analisar-cmv
description: Auditoria de CMV mensal ou semanal com decomposição de variância (preço, eficiência, mix) e identificação de causas
agent: financeiro
version: 1.0.0
purpose: Identificar por que o CMV está acima ou abaixo da meta e recomendar ações corretivas

inputs:
  - name: periodo
    type: string
    description: Período de análise (ex. "março 2026", "semana 1 de abril")
    required: true

  - name: estoque_inicial
    type: float
    description: Valor do estoque no início do período (R$)
    required: true

  - name: compras
    type: float
    description: Total de compras no período (R$)
    required: true

  - name: estoque_final
    type: float
    description: Valor do estoque no final do período (R$)
    required: true

  - name: receita_alimentos
    type: float
    description: Receita de vendas de alimentos no período (R$)
    required: true

  - name: receita_bebidas
    type: float
    description: Receita de vendas de bebidas no período (R$)
    required: false

  - name: cmv_meta
    type: float
    description: CMV meta percentual
    required: false
    default: 0.32

outputs:
  - description: Análise de CMV com decomposição de variância e recomendações
    format: markdown

dependencies:
  data:
    - Engenharia de Custos e Análise US.md
    - Gestão de CMV e Eficiência Operacional BR.md
---

# Task: Analisar CMV

Auditoria completa de CMV com identificação de causas de desvio e ações corretivas.

## Steps

1. **Calcular CMV Real:**
   - CMV (R$) = Estoque Inicial + Compras - Estoque Final
   - CMV (%) = CMV (R$) ÷ Receita de Alimentos
   - SEPARAR: CMV alimentos vs CMV bebidas (se dados disponíveis)

2. **Comparar com Meta:**
   - Diferença = CMV Real - CMV Meta
   - Classificar: ✅ Dentro (variação < 2%) | ⚠️ Atenção (2-5%) | 🚨 Crítico (> 5%)
   - Calcular o impacto financeiro da variação: (CMV Real% - CMV Meta%) × Receita

3. **Decomposição de Variância (se dados disponíveis):**
   - Variância de Preço: fornecedores cobraram mais/menos?
   - Variância de Eficiência: desperdício acima do normal?
   - Variância de Mix: clientes serviram mais proteína? (buffet)
   - Para cada variância, quantificar em R$ e %

4. **Investigar Causas Prováveis:**
   - Aumento de preço de insumos-chave?
   - Desperdício elevado (sobra limpa, resto ingesto)?
   - Falha de porcionamento?
   - Contagem de inventário incorreta?
   - Furto ou desvio?
   - Variação sazonal de preços (consultar sazonalidade-hortifruti.yaml)?

5. **Comparar com Meses Anteriores:**
   - Se houver dados históricos na memória, mostrar tendência
   - Identificar se é pontual ou tendência de piora

6. **Recomendar Ações Corretivas:**
   - Para cada causa identificada, sugerir ação específica
   - Priorizar por impacto financeiro (R$ economizados se corrigido)
   - Definir prazo para reavaliação

7. **Oferecer Salvar:**
   - Perguntar se deseja salvar o resultado na memória para acompanhamento histórico

## Output

Relatório de CMV com: valor real, comparação com meta, decomposição de variância, causas prováveis, ações corretivas priorizadas por impacto
