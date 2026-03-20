---
name: buscar-precos-ingredientes
description: Pesquisa preços de ingredientes em supermercados atacadistas via MCP Server e gera relatório CSV comparativo
agent: comprador
version: 1.0.0
purpose: Encontrar os melhores preços para ingredientes em atacadistas da região (Spani, Tenda, Atacadão, Assaí, Fort)

inputs:
  - name: ingredientes
    type: array<string>
    description: Lista de ingredientes a pesquisar (ex. ["arroz 5kg", "feijão carioca 1kg", "óleo de soja"])
    required: true

  - name: mercados
    type: array<string>
    description: Lista de mercados específicos para consultar (opcional — default é todos)
    required: false

outputs:
  - description: Arquivo CSV com comparativo de preços por ingrediente e mercado
    format: CSV (UTF-8 com BOM)
    path: squads/CFO/relatorios/cotacoes/cotacao-{timestamp}.csv
    columns:
      - Ingrediente (string)
      - Preço R$ (number)
      - Unidade (string)
      - Mercado (string)
      - Link (URL)
      - Data da Coleta (datetime)

dependencies:
  tools:
    - mcp-comprador.buscar_precos_ingredientes
---

# Task: Buscar Preços de Ingredientes

Pesquisa preços de ingredientes nos sites públicos dos principais supermercados atacadistas da região do Vale do Paraíba — SP.

## Steps

1. **Receber Lista de Ingredientes:**
   - O usuário informa a lista via chat (separado por vírgula ou em linhas)
   - Ou o `@controlador-estoque` fornece itens abaixo do Par Stock
   - Normalizar nomes: remover acentos desnecessários, padronizar unidades

2. **Chamar Tool MCP `buscar_precos_ingredientes`:**
   - Enviar `ingredientes` como array de strings
   - Enviar `mercados` se o usuário especificou mercados específicos (senão, todos)
   - A tool realiza a busca em paralelo nos sites dos mercados

3. **Processar Resposta da Tool:**
   - Verificar campo `success` no retorno JSON
   - Coletar `csv_path` (caminho absoluto do CSV gerado)
   - Coletar `total_itens` (quantidade de resultados)
   - Verificar `erros[]` — informar ao usuário se algum mercado falhou

4. **Apresentar Resumo ao Usuário:**
   - Tabela resumida com top preço por item (melhor preço)
   - Path do CSV para download/consulta
   - Alertas para preços muito acima da média

5. **Armazenamento:**
   - CSV é salvo automaticamente pela tool em `relatorios/cotacoes/`
   - Nome: `cotacao-YYYY-MM-DD-HHmmss.csv`

## Error Handling

| Erro | Ação |
|------|------|
| Nenhum mercado respondeu | Informar erro de rede e sugerir tentar novamente |
| Ingrediente não encontrado | Incluir na resposta como "não encontrado" + sugerir termo alternativo |
| Mercado específico falhou | Continuar com os demais + informar qual falhou |
| Tool MCP não disponível | Informar que o MCP Server `mcp-comprador` não está registrado/rodando |

## Output

- CSV salvo em `squads/CFO/relatorios/cotacoes/`
- Resumo formatado no chat com tabela Markdown dos melhores preços
