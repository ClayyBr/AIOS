---
name: avaliar-fornecedor
description: Compara cotações de fornecedores considerando custo real (preço × FC), qualidade e condições comerciais
agent: arquiteto-lucro
version: 1.0.0
purpose: Identificar o fornecedor com melhor custo-benefício real, não apenas o menor preço de nota

inputs:
  - name: insumo
    type: string
    description: Nome do insumo (ex. "Filé Mignon", "Sobrecoxa de Frango")
    required: true

  - name: cotacoes
    type: array
    description: Lista de cotações com fornecedor, preço/kg, condições
    required: true

outputs:
  - description: Comparativo de fornecedores com ranking por custo real
    format: markdown (tabela)

dependencies:
  data:
    - tabela-fatores-correcao.yaml
---

# Task: Avaliar Fornecedor

Compara fornecedores pelo custo REAL (não apenas preço de nota fiscal).

## Steps

1. **Coletar Cotações:**
   - Nome do fornecedor, preço/kg, prazo de pagamento, mínimo de pedido, frete
   - Se possível: FC já testado com este fornecedor

2. **Calcular Custo Real:**
   - Custo Real = Preço/kg × FC do insumo
   - Se o FC específico do fornecedor não for conhecido, usar FC médio da tabela
   - Incluir frete no custo se cobrado separadamente

3. **Comparar Condições Comerciais:**
   - Prazo de pagamento (à vista vs 7/14/30 dias)
   - Mínimo de pedido (afeta estoque e capital de giro)
   - Frequência de entrega
   - Confiabilidade (cumpre prazo? Qualidade constante?)

4. **Calcular Impacto Mensal:**
   - Baseado no consumo estimado, calcular diferença mensal entre fornecedores
   - Ex: "Trocar do Fornecedor A para B economiza R$ 450/mês em frango"

5. **Recomendar:**
   - Ranking por custo real (menor primeiro)
   - Alertar se o mais barato tem risco (qualidade, confiabilidade)
   - Sugerir fornecedor principal + fornecedor backup

6. **Teste de FC Recomendado:**
   - Sugerir que o usuário faça teste de rendimento (FC real) com amostra de cada fornecedor
   - Explicar como: pesar bruto → limpar → pesar líquido → FC = PB ÷ PL

## Output

Tabela comparativa: Fornecedor | Preço/kg | FC | Custo Real/kg | Condições | Impacto Mensal | Ranking
