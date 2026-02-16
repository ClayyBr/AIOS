---
name: projecao-cenarios
description: Simula 3 cenários financeiros (pessimista, realista, otimista) com DRE projetado para cada um
agent: financeiro
version: 1.0.0
purpose: Preparar o dono para diferentes realidades de mercado e antecipar riscos

inputs:
  - name: base
    type: object
    description: Dados base (faturamento atual ou estimado, custos fixos, CMV%, MO%, ticket médio, clientes/dia)
    required: true

  - name: variaveis
    type: list
    description: Variáveis específicas a simular (ex. "aluguel sobe R$ 500", "faturamento -20%")
    required: false

outputs:
  - description: 3 DREs projetados + análise comparativa + ponto de quebra
    format: markdown (tabelas comparativas)

dependencies:
  data:
    - Manual_Contabilidade_Restaurante.md
    - modelo-dre-restaurante.md
---

# Task: Projeção de Cenários

Simula 3 cenários financeiros para antecipar riscos e oportunidades. Referência: Manual seções 5 (DRE) e 6 (Fluxo de Caixa).

## Steps

1. **Definir Cenário Base:**
   - Coletar dados reais ou estimados do mês atual
   - Faturamento, CMV%, CMO%, custos fixos, ticket médio, clientes/dia

2. **Construir Cenário Pessimista:**
   - Faturamento: -20% (ex: chuva forte, concorrente abriu, sazonalidade ruim)
   - CMV: +5 pontos percentuais (inflação de alimentos, fornecedor falhou)
   - Clientes/dia: -30%
   - MO: mantém (custo fixo — salários não reduzem)

3. **Construir Cenário Realista:**
   - Projeção com tendência atual (média dos últimos 3 meses se disponível)
   - Ajustar por sazonalidade conhecida

4. **Construir Cenário Otimista:**
   - Faturamento: +15% (marketing, boca-a-boca, evento na região)
   - CMV: -3 pontos percentuais (negociação com fornecedores, redução de desperdício)
   - Clientes/dia: +20%

5. **DRE Projetado para Cada Cenário:**
   - Receita Bruta → Deduções → Receita Líquida
   - CMV → Margem Bruta
   - MO → Prime Cost
   - Custos Fixos → EBITDA
   - Lucro Líquido

6. **Identificar Ponto de Quebra:**
   - Em qual cenário o restaurante dá prejuízo?
   - Qual variável tem mais impacto? (sensibilidade)
   - "Se o faturamento cair X%, o lucro zera"

7. **Recomendar Plano de Contingência:**
   - Para o pessimista: cortes possíveis, renegociações, promoções para atrair clientes
   - Para o otimista: como absorver demanda extra sem explodir custos

## Output

Tabela comparativa dos 3 cenários (lado a lado) + ponto de quebra + plano de contingência.
Formato: **dois arquivos** — `projecao-mes-ano.md` + `projecao-mes-ano.html` (usar template `relatorio-financeiro-template.html`)
