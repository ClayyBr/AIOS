---
name: relatorio-mensal
description: Gera relatório mensal formatado para apresentação aos sócios, com linguagem acessível e indicadores visuais
agent: financeiro
version: 1.0.0
purpose: Comunicar a saúde financeira do restaurante de forma clara para stakeholders não-técnicos

inputs:
  - name: periodo
    type: string
    description: Mês/ano de referência
    required: true

  - name: dados
    type: object
    description: Dados financeiros consolidados do mês (pode vir do DRE já gerado)
    required: true

  - name: destaques
    type: array
    description: Eventos relevantes do mês (ex. "inauguração", "feriado", "aumento de fornecedor")
    required: false

outputs:
  - description: Relatório formatado para sócios
    format: markdown

dependencies:
  templates:
    - relatorio-socios-template.md
  tasks:
    - gerar-dre.md
---

# Task: Relatório Mensal para Sócios

Gera relatório executivo mensal para apresentação aos sócios do restaurante.

## Steps

1. **Resumo Executivo (1 parágrafo):**
   - Faturamento total, resultado (lucro ou prejuízo), variação vs mês anterior
   - Tom positivo mas realista. Sem jargões técnicos.

2. **Dashboard Semáforo:**
   - 🟢 Verde: indicador saudável (dentro da meta)
   - 🟡 Amarelo: indicador de atenção (próximo do limite)
   - 🔴 Vermelho: indicador crítico (fora da meta)
   - Indicadores: Faturamento, CMV, Lucro Líquido, Prime Cost

3. **Números do Mês (Tabela Simples):**
   - Faturamento total
   - Custos totais
   - Lucro líquido (R$ e %)
   - Comparativo com mês anterior (↗ ↘ →)

4. **Destaques e Eventos:**
   - O que impactou positivamente
   - O que impactou negativamente
   - Eventos especiais (feriados, inauguração, etc.)

5. **Top 3 Ações para o Próximo Mês:**
   - 3 ações concretas, priorizadas por impacto
   - Cada ação com: o que fazer, por que, impacto estimado
   - Linguagem direta: "Trocar fornecedor de frango pode economizar R$ 800/mês"

6. **Projeção do Próximo Mês:**
   - Com base nos dados atuais, projetar resultado do mês seguinte
   - Alertar se há riscos (sazonalidade, aumento previsto de custos)

## Regras de Formatação

- **NÃO usar:** CMV, markup, Prime Cost, FC, FCc, variância
- **USAR:** "custo dos ingredientes", "margem de lucro", "gastos com equipe", "desperdício"
- Números sempre em R$ e com comparativo ("+5% vs mês passado")
- Máximo 2 páginas
- Tom profissional mas acessível

## Output

Relatório formatado usando `relatorio-socios-template.md`, pronto para ser compartilhado via WhatsApp, e-mail ou impressão.
Formato: **dois arquivos** — `relatorio-mes-ano.md` + `relatorio-mes-ano.html` (usar template `relatorio-financeiro-template.html`)
