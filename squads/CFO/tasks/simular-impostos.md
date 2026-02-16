---
name: simular-impostos
description: Simula impacto de faixa do Simples Nacional e otimiza carga tributária via segregação monofásica e ICMS-ST
agent: financeiro
version: 1.0.0
purpose: Otimizar carga tributária legal — pagar o mínimo possível dentro da lei

inputs:
  - name: rbt12
    type: float
    description: Receita Bruta Total dos últimos 12 meses (R$)
    required: true

  - name: receita_mensal
    type: float
    description: Receita bruta do mês atual (R$)
    required: true

  - name: mix_receita
    type: object
    description: Breakdown por tipo de receita (alimentos, bebidas frias, bebidas quentes, delivery)
    required: false

outputs:
  - description: Faixa atual, alíquota efetiva, economia com segregação, simulação de mudança de faixa
    format: markdown (tabelas + cálculos)

dependencies:
  data:
    - Manual_Contabilidade_Restaurante.md
---

# Task: Simulação de Impostos (Simples Nacional)

Otimiza a carga tributária usando segregação de receitas. Referência: Manual seção 3 (Inteligência Tributária).

## Steps

1. **Identificar Faixa Atual do Simples Nacional (Anexo I):**
   - Usar a tabela do Manual seção 3.4:
   - 1ª Faixa: até R$ 180.000 → 4,00%
   - 2ª Faixa: R$ 180.001 a R$ 360.000 → 7,30% (PD: R$ 5.940)
   - 3ª Faixa: R$ 360.001 a R$ 720.000 → 9,50% (PD: R$ 13.860)
   - 4ª Faixa: R$ 720.001 a R$ 1.800.000 → 10,70% (PD: R$ 22.500)
   - 5ª Faixa: R$ 1.800.001 a R$ 3.600.000 → 14,30% (PD: R$ 87.300)
   - 6ª Faixa: R$ 3.600.001 a R$ 4.800.000 → 19,00% (PD: R$ 378.000)

2. **Calcular Alíquota Efetiva:**
   - `AE = (RBT12 × AlíqNominal - ParcelaDeduzir) / RBT12`
   - Exemplo: RBT12 = R$ 500.000 → AE = (500.000 × 9,50% - 13.860) / 500.000 = 6,73%

3. **Segregar Receitas Monofásicas (PIS/COFINS):**
   - Identificar vendas de bebidas frias pelos NCMs:
     - Águas minerais: NCM 2201
     - Refrigerantes: NCM 2202
     - Cervejas: NCM 2203
     - Isotônicos/energéticos: NCM 2202.99.00
   - Calcular economia: desconto da parcela PIS/COFINS da alíquota sobre essas vendas
   - ⚠️ Vinhos e destilados NÃO são monofásicos

4. **Segregar ICMS-ST:**
   - Bebidas frias com ICMS-ST já recolhido na indústria
   - Segregar e calcular desconto adicional do ICMS
   - ⚠️ Varia por estado (verificar legislação UF)

5. **Calcular Economia Total:**
   - DAS sem segregação (tudo "Tributada Integralmente")
   - DAS com segregação (monofásica + ICMS-ST)
   - Economia mensal e anual em R$

6. **Simular Mudança de Faixa:**
   - "Se faturar +R$ X/mês nos próximos meses, a RBT12 sobe para Y"
   - Calcular nova alíquota efetiva
   - ⚠️ Na 6ª Faixa: ICMS sai do DAS (pago por fora via GARE/DARE)

7. **Verificar Fator R:**
   - Se folha de pagamento ≥ 28% do faturamento → possível enquadramento favorável
   - Calcular: `Fator R = Folha 12 meses / RBT12`

## Output

Faixa atual + alíquota efetiva + economia com segregação + simulação de faixa + Fator R
