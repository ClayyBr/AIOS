---
name: fluxo-caixa
description: Projeta fluxo de caixa semanal/mensal com entradas e saídas previstas, calcula ciclo financeiro e identifica riscos de liquidez
agent: financeiro
version: 1.0.0
purpose: Antecipar gaps de caixa e evitar insolvência — o lucro no DRE não garante dinheiro no banco

inputs:
  - name: periodo
    type: string
    description: Período de projeção (ex. "próximas 4 semanas", "março 2026")
    required: true

  - name: saldo_atual
    type: float
    description: Saldo atual em conta bancária (R$)
    required: true

  - name: recebimentos
    type: object
    description: Previsão de entradas (vendas cartão crédito D+30, débito D+1, PIX D+0, dinheiro)
    required: true

  - name: pagamentos
    type: object
    description: Contas a pagar fixas (aluguel, salários, DAS) e variáveis (fornecedores, reposição)
    required: true

outputs:
  - description: Projeção de fluxo de caixa com saldo projetado, alertas e recomendações
    format: markdown (tabelas + gráfico textual)

dependencies:
  data:
    - Manual_Contabilidade_Restaurante.md
---

# Task: Fluxo de Caixa (DFC)

Projeta o fluxo de caixa para identificar dias/semanas com risco de saldo negativo. Referência: Manual seção 6 (Fluxo de Caixa e Ciclo Financeiro).

## Steps

1. **Mapear Entradas Previstas:**
   - Vendas em cartão de crédito: D+30 (ou D+1 se antecipado — registrar taxa como Despesa Financeira)
   - Vendas em cartão de débito: D+1
   - Vendas em PIX/dinheiro: D+0
   - Outras receitas (eventos, catering)

2. **Mapear Saídas Fixas:**
   - Salários + encargos (provisionar 13º: 8,33% e Férias+1/3: 11,11% mensalmente)
   - Aluguel + IPTU + condomínio
   - DAS (Simples Nacional)
   - Energia, água, gás, internet
   - Contador, software, seguros

3. **Mapear Saídas Variáveis:**
   - Fornecedores (por data de vencimento do boleto)
   - Reposição de estoque
   - Marketing e promoções
   - Manutenção emergencial

4. **Calcular Saldo Projetado:**
   - Para cada dia/semana: `Saldo = Saldo Anterior + Entradas - Saídas`
   - Identificar dias com saldo negativo → 🚨 ALERTA

5. **Calcular Ciclo Financeiro:**
   - `PME (Prazo Médio de Estocagem)` = dias que o insumo fica em estoque
   - `PMR (Prazo Médio de Recebimento)` = dias até receber (cartão crédito = 30)
   - `PMP (Prazo Médio de Pagamento)` = prazo de pagamento ao fornecedor
   - `Ciclo Financeiro = PME + PMR - PMP`
   - Se positivo: restaurante precisa financiar X dias com capital próprio

6. **Avaliar Necessidade de Capital de Giro:**
   - Capital de Giro necessário = Custo Diário × Ciclo Financeiro
   - Comparar com saldo disponível

7. **Recomendar Ações:**
   - Se gap de caixa: avaliar antecipação de recebíveis (custo 3-5%) vs cheque especial
   - Se sobra de caixa: sugerir aplicação de curto prazo
   - Negociar PMP maior com fornecedores de curva A
   - Incentivar vendas em PIX/débito (recebimento imediato)

## Output

Tabela de fluxo de caixa projetado (saldo por semana) + Ciclo Financeiro + Alertas + Recomendações.
Formato: **dois arquivos** — `fluxo-caixa-mes-ano.md` + `fluxo-caixa-mes-ano.html` (usar template `relatorio-financeiro-template.html`)
