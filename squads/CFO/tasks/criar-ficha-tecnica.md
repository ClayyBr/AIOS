---
name: criar-ficha-tecnica
description: Cria ou calcula ficha técnica de preparo completa (operacional e gerencial) para um prato, incluindo FC, FCc e custo por porção
agent: arquiteto-lucro
version: 1.0.0
purpose: Guiar o usuário passo a passo na criação de fichas técnicas do zero, consultando a tabela de FC/FCc

inputs:
  - name: nome_prato
    type: string
    description: Nome do prato (ex: "Filé Mignon ao Molho Madeira")
    required: true

  - name: tipo
    type: enum
    description: Tipo de operação
    required: true
    options: ["executivo", "buffet", "delivery"]
    default: "executivo"

  - name: ingredientes
    type: array
    description: Lista de ingredientes com peso bruto e unidade (o usuário pode fornecer parcialmente)
    required: false

  - name: rendimento
    type: string
    description: Rendimento esperado (ex: "1 porção" ou "50 porções para buffet")
    required: false
    default: "1 porção"

outputs:
  - description: Ficha técnica gerencial completa com custo total
    format: markdown (tabela)

dependencies:
  data:
    - tabela-fatores-correcao.yaml
    - guia-ficha-tecnica-passo-a-passo.md
  templates:
    - ficha-tecnica-template.md
---

# Task: Criar Ficha Técnica

Cria uma ficha técnica de preparo completa, tanto operacional (para a cozinha) quanto gerencial (para controle de custos).

## Quando Usar

- Quando o usuário quer criar uma ficha técnica de um prato novo
- Quando precisa calcular o custo de um prato existente
- Quando vai precificar um item do cardápio e precisa do custo base

## Steps

1. **Coletar Ingredientes:**
   - Perguntar o nome do prato e listar todos os ingredientes com peso bruto
   - Se o usuário não souber os pesos, sugerir quantidades típicas baseadas no conhecimento

2. **Aplicar Fator de Correção (FC):**
   - Consultar `data/tabela-fatores-correcao.yaml` para cada ingrediente
   - Calcular Peso Líquido = Peso Bruto ÷ FC
   - Mostrar a perda em gramas e porcentagem

3. **Aplicar Fator de Cocção (FCc):**
   - Consultar `data/tabela-fatores-correcao.yaml` para o método de cocção
   - Calcular Peso Servido = Peso Líquido ÷ FCc
   - Perguntar o método de cocção se não informado (grelha, forno, fritura, vapor, refogado)

4. **Calcular Custo por Porção:**
   - Perguntar o preço de compra por kg/L de cada ingrediente
   - Se o usuário não souber, usar preço de referência da tabela FC
   - Custo Porção = (Peso Bruto × Custo/kg) ÷ 1000

5. **Montar Ficha Completa:**
   - Gerar tabela com: Ingrediente | PB | FC | PL | FCc | Peso Servido | Custo/kg | Custo Porção | % do Total
   - Mostrar custo total do prato
   - Identificar o ingrediente de maior impacto no custo
   - Calcular peso final servido

6. **Insight e Recomendações:**
   - Apontar se algum ingrediente tem FC alto (perda significativa)
   - Sugerir alternativas mais econômicas se CMV do prato for alto
   - Para buffet: calcular custo/kg produzido

7. **Salvar:**
   - Perguntar se o usuário deseja salvar a ficha na memória

## Output

Ficha técnica formatada usando o template `ficha-tecnica-template.md`, incluindo:
- Tabela completa de ingredientes com todos os cálculos
- Custo total do prato
- Decomposição por grupo (proteína, guarnição, temperos, molho)
- Peso final da porção servida

## Output Secundário (Obrigatório)

Gerar arquivo HTML em `squads/CFO/fichas-cozinha/nome-do-prato-cozinha.html` usando o template `templates/ficha-cozinha-template.html`.
Este arquivo DEVE conter apenas informações operacionais (sem custos) para impressão.
