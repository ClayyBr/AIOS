---
name: gerir-operacao
description: Task Mestra que recebe pedidos em linguagem natural e orquestra os especialistas
agent: gerente-geral
version: 1.0.0
inputs:
  - name: pedido
    type: string
    description: O que o dono quer fazer (ex: "Comprei frango", "Crie um prato")
    required: true
---

# Task: Gerir Operação (Orquestração)

Esta é a tarefa principal do Gerente Geral. Ela interpreta intenções e delega execução.

## Steps

1.  **Analisar Intenção:**
    - O que o usuário quer?
    - Envolve dinheiro? (Financeiro)
    - Envolve mercadoria física? (Estoque)
    - Envolve ambos? (Complexo)

2.  **Roteamento (Exemplos):**

    - **Caso: "Comprei [item] por [valor]"**
      1.  Narrar: "Vou pedir ao @controlador-estoque para registrar essa entrada."
      2.  Chamar task `registrar-entrada` (Estoque).
      3.  Verificar se o preço mudou muito.
      4.  Se mudou: Narrar "O preço variou. Vou pedir ao @arquiteto-lucro para reavaliar o impacto no CMV."

    - **Caso: "Crie o prato [nome]"**
      1.  Narrar: "Ok, vamos lançar o [nome]. Primeiro, checando viabilidade com o Estoque."
      2.  Consultar `posicao-atual.yaml`: Temos os insumos principais?
      3.  Narrar: "Estoque validado. Agora, pedindo ao Financeiro para montar a ficha e precificar."
      4.  Chamar task `criar-ficha-tecnica` (Financeiro).
          - **IMPORTANTE:** Instruir o Financeiro a gerar TAMBÉM a versão HTML (`.html`) na pasta `fichas-cozinha/`.
      5.  Chamar task `precificar-prato` (Financeiro).
      6.  Apresentar o resultado consolidado: "Prato pronto. Ficha de Cozinha HTML gerada."

    - **Caso: "Como estamos indo?" (Analise Geral)**
      1.  Consultar `relatorios/` (último DRE).
      2.  Consultar `estoque/` (alertas e inventário).
      3.  Gerar síntese: "Financeiramente o lucro está em X%. Operacionalmente, atenção ao estoque de Y que está alto."

    - **Caso: "Gere o DRE" / "Quanto lucrei?"**
      1.  Narrar: "Vou pedir ao @financeiro para gerar o DRE gerencial."
      2.  Chamar task `gerar-dre` (Financeiro).
      3.  Adicionar sua camada: contexto de estoque e tendência.

    - **Caso: "O CMV está alto" / "Audite os custos"**
      1.  Narrar: "Vou pedir ao @financeiro para auditar o CMV do período."
      2.  Chamar task `analisar-cmv` (Financeiro).
      3.  Cruzar com dados de estoque para diagnóstico completo.

    - **Caso: "Relatório para os sócios"**
      1.  Narrar: "Vou pedir ao @financeiro para gerar o relatório mensal."
      2.  Chamar task `relatorio-mensal` (Financeiro).

    - **Caso: "Vai dar pra pagar as contas?"**
      1.  Narrar: "Vou pedir ao @financeiro para projetar o fluxo de caixa."
      2.  Chamar task `fluxo-caixa` (Financeiro).

    - **Caso: "E se o faturamento cair 20%?"**
      1.  Narrar: "Vou pedir ao @financeiro para simular cenários."
      2.  Chamar task `projecao-cenarios` (Financeiro).

3.  **Sintetizar Resposta:**
    - Não mostre apenas o output bruto dos especialistas.
    - Adicione sua camada de inteligência ("Isso é bom/ruim porque...").

## Output
Resposta executiva contendo:
1. Ação tomada pelos especialistas.
2. Resultado prático.
3. Recomendação ou Próximo Passo.
