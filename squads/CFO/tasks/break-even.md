---
name: break-even
description: Calcula ponto de equilíbrio em clientes/dia e faturamento mínimo para cobrir todos os custos
agent: financeiro
version: 1.0.0
purpose: Saber o mínimo que o restaurante precisa faturar para não ter prejuízo

inputs:
  - name: custos_fixos
    type: float
    description: Total de custos fixos mensais (aluguel, salários, DAS, energia, etc.) em R$
    required: true

  - name: ticket_medio
    type: float
    description: Ticket médio por cliente em R$ (receita por cliente)
    required: true

  - name: cmv_percentual
    type: float
    description: CMV como percentual do faturamento (ex. 30 para 30%)
    required: true

  - name: custos_variaveis_pct
    type: float
    description: Outros custos variáveis como percentual — taxas de cartão, delivery, embalagens (ex. 8 para 8%)
    required: false
    default: 0

  - name: dias_operacao
    type: integer
    description: Dias de operação por mês
    required: false
    default: 26

outputs:
  - description: Ponto de equilíbrio em R$/mês e clientes/dia + margem de segurança + simulações
    format: markdown (cálculos + tabela)

dependencies:
  data:
    - Manual_Contabilidade_Restaurante.md
---

# Task: Ponto de Equilíbrio (Break-Even)

Calcula o faturamento mínimo e o número mínimo de clientes/dia para cobrir todos os custos.

## Steps

1. **Calcular Margem de Contribuição:**
   - MC% = 100% - CMV% - Custos Variáveis%
   - MCU (unitária) = Ticket Médio × MC%
   - Exemplo: Ticket R$ 35, CMV 30%, CV 8% → MC = 62% → MCU = R$ 21,70

2. **Calcular Ponto de Equilíbrio em R$:**
   - `PE = Custos Fixos ÷ MC%`
   - Exemplo: Fixos R$ 25.000 ÷ 0,62 = R$ 40.322/mês

3. **Calcular PE em Clientes/Dia:**
   - `PE_clientes = PE_mensal ÷ Dias Operação ÷ Ticket Médio`
   - Exemplo: R$ 40.322 ÷ 26 dias ÷ R$ 35 = 44 clientes/dia

4. **Mostrar Faixas:**
   - < PE = 🚨 Prejuízo
   - PE a PE+20% = ⚠️ Zona de risco (margem baixa)
   - > PE+20% = ✅ Zona de conforto

5. **Calcular Margem de Segurança:**
   - Se tiver faturamento real: `MS = (Faturamento Real - PE) ÷ Faturamento Real × 100`
   - "Você está X% acima/abaixo do ponto de equilíbrio"

6. **Simulações de Sensibilidade:**
   - "Se o aluguel subir R$ 500, o PE sobe para Y clientes/dia"
   - "Se o CMV cair 3%, o PE cai para Z clientes/dia"
   - "Se o ticket subir R$ 5, o PE cai para W clientes/dia"

## Output

Cálculos detalhados com fórmulas + Faixas de risco + Margem de segurança + 3 simulações de sensibilidade
