---
name: analisar-viabilidade-promocao
description: Calcula o ROI, Break-Even e Eficiência de Variância de uma promoção proposta.
inputs:
  - name: tipo_promocao
    type: string
    description: "Desconto (%) ou Brinde (Produto)"
  - name: valor_venda_projetado
    type: number
  - name: custo_acao
    type: number
    description: "Valor do desconto ou CMV do brinde"
outputs:
  - Tabela comparativa de cenários
  - Ponto de Equilíbrio (Volume Hurdle)
  - Recomendação (Go/No-Go)
---

# Task: Analisar Viabilidade

1.  **Coletar Dados Financeiros**:
    - Consultar `@arquiteto-lucro` para obter Margem de Contribuição atual.

2.  **Calcular Cenários**:
    - **Cenário Base**: Venda normal (com taxa iFood se aplicável).
    - **Cenário Promo**: Venda com desconto/brinde (considerar economia de taxa se houver migração).

3.  **Aplicar Fórmula de Break-Even (Volume Hurdle)**:
    - `Hurdle = Margem Atual / (Margem Nova - Margem Atual)`
    - *Significado*: Quanto eu preciso vender a mais para empatar o lucro em reais?

4.  **Verificar Variância de Eficiência ("Raspadinha")**:
    - Se `Custo do Brinde < Valor do Desconto Equivalente`, ponto positivo.
    - Se `Valor Percebido Pelo Cliente > 3x Custo do Brinde`, ponto positivo.

5.  **Emitir Veredito**:
    - Se o aumento de volume necessário for irrealista (>50%), REPROVAR a campanha.
