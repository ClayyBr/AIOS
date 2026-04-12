# Product Requirements Document (PRD) / Specification

## Project: NFC-e Scraper (SEFAZ SP)
**Author:** @pm (Morgan)
**Date:** 2026-04-12

### 1. Visão Geral (Overview)
O objetivo deste projeto é permitir que os agentes `@gerente-geral` e `@controlador-estoque` consigam receber uma URL de consulta de Nota Fiscal de Consumidor Eletrônica (NFC-e) do Governo de São Paulo (SEFAZ SP), extrair todos os itens comprados (com suas quantidades e valores) automaticamente e registrar as entradas no estoque de forma fluida.

### 2. Casos de Uso (User Stories)
- **Como** Dono/Usuário, **Quero** poder colar a URL do QR Code da minha nota fiscal de supermercado no chat com o agente.
- **Como** `@controlador-estoque`, **Quero** ter uma ferramenta que extraia os dados dessa URL para que eu não precise pedir ao usuário para digitar os itens um a um.
- **Como** Agente, **Quero** receber a lista de compra em um formato estruturado (JSON) para que eu possa atualizar os custos (CMP) e o inventário sem erros manuais, e salvar o arquivo em formato Markdown conforme meu padrão.

### 3. Requisitos Estruturais
- O Scraper deve processar as páginas ASPX do SEFAZ-SP e extrair:
  - **Emissor:** Nome do local de compra e CNPJ (para identificar o fornecedor).
  - **Data da Emissão:** Data e hora da compra.
  - **Valor Total:** Valor total da nota (útil para auditoria).
  - **Forma de Pagamento:** Cartão, Dinheiro, Pix, etc.
  - **Lista de Itens:** Para cada item, extrair `Nome`, `Código/EAN` (se disponível), `Quantidade (Qtd)`, `Unidade (Un)`, `Valor Unitário`, e `Valor Total`.
- O Scraper deve lidar com elementos expansíveis (se houver), rodando em background usando Headless Browser (Puppeteer/Playwright) visto que o site muitas vezes exige execução de scripts.
- Comunicação: O scraper deve ser exposto como um script na pasta `squads/CFO/scripts/` e os agentes devem saber o comando exato para executá-lo ou ele pode ser um sub-script acionável.

### 4. Fluxo de Trabalho (Workflow)
1. Usuário envia URL NFC-e SP.
2. Agente (`@gerente-geral` ou `@controlador-estoque`) detecta o contexto de URL de nota fiscal.
3. Agente roda o comando (via ferramenta `run_command` do seu backend ou terminal): `node squads/CFO/scripts/scraper-nfce-sp.js "<URL>"`
4. O script sobe um Puppeteer headless, navega até a página, extrai os itens da tabela e dá output ao `stdout` em formato JSON.
5. O agente lê o JSON resultante, processa os ingredientes compatíveis com a pasta `estoque/inventario/posicao-atual.yaml`.
6. O agente gera o arquivo `YYYY-MM-DD-compras.md` na pasta `estoque/entradas/`.

### 5. Regras de Negócio e Limites de Escopo
- Somente URLs de NFC-e de SP estão no escopo (`https://www.nfce.fazenda.sp.gov.br/...`).
- Tratamento de itens com nomes genéricos dependerá da inteligência já contida no `@controlador-estoque` para cruzar o identificador do item com o `posicao-atual.yaml`.
- Tolerância a falhas na extração: Se a CAPTCHA bloquear (geralmente não ocorre em consulta QRCode resumida), retornar erro amigável pedindo envio dos dados via imagem/print.

### 6. Próximos Passos
O `@architect` e `@dev` procederão com a implementação do script Node com Puppeteer e atualizarão os "system prompts" dos agentes relevantes.
