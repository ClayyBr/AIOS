# Chef de Imagem — Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Criar um agente especialista em geração de imagens fotorrealistas de pratos do restaurante
- Integrar com a API do Google AI Studio (Gemini Flash Image / Imagen) via MCP Server
- Produzir fotos consistentes em estilo, ângulo e iluminação usando imagens de referência
- Permitir iteração rápida (gerar → avaliar → ajustar → regerar) via CLI/chat
- Salvar resultados fisicamente no repositório local (`squads/CFO/design/`)

### Background Context

O Squad CFO do restaurante necessita de assets visuais profissionais para cardápios digitais, redes sociais e materiais de marketing. Hoje, a produção de fotos de pratos é manual, cara e demorada. O agente "Chef de Imagem" resolve isso automatizando a geração de fotos hiper-realistas usando IA generativa.

O agente atua como um **Prompt Engineer de Food Photography intermediário**: recebe um pedido simples (ex: "Bife Ancho grelhado"), consulta imagens de referência arrastadas para o chat para manter consistência visual (mesmo ângulo, prato, iluminação), e transforma tudo em um prompt fotográfico denso e técnico antes de chamar a API do Google. Isso elimina a necessidade de conhecimento técnico por parte do usuário.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 06/03/2026 | 1.0 | PRD criado | @po (Pax) |

---

## Requirements

### Functional

- **FR1:** O agente deve receber um texto descritivo de um prato (ex: "filé de frango grelhado com arroz e salada") e gerar uma imagem fotorrealista
- **FR2:** O agente deve aceitar imagens de referência (arrastadas para o chat) para manter consistência visual (ângulo, iluminação, estilo, elementos de composição)
- **FR3:** O agente deve atuar como Prompt Engineer intermediário — transformar textos simples em prompts fotográficos densos e técnicos automaticamente
- **FR4:** O agente deve integrar com a API do Google AI Studio (Gemini Flash Image) usando API Key para geração de imagens
- **FR5:** O agente deve salvar as imagens geradas fisicamente na pasta `squads/CFO/design/` do repositório local
- **FR6:** O agente deve permitir iteração: se o resultado não agradar, o usuário envia feedback textual e o agente regenera a imagem
- **FR7:** O agente deve aplicar restrições negativas (Negative Prompts) quando fornecidas pelo usuário no comando
- **FR8:** O agente deve gerar nomes de arquivo descritivos automaticamente (ex: `bife-ancho-grelhado-v1.png`)
- **FR9:** O agente deve fornecer feedback sobre a imagem gerada (confirmação de salvamento, path do arquivo, descrição do prompt usado)
- **FR10:** A integração com a API deve ser implementada via servidor MCP (Model Context Protocol) para exposição segura e padronizada das ferramentas ao agente

### Non Functional

- **NFR1:** O MCP Server deve funcionar localmente (localhost) sem necessidade de deploy em cloud
- **NFR2:** Custo zero de infraestrutura — usar apenas API Key gratuita do Google AI Studio
- **NFR3:** Tempo de resposta da geração: depende da API do Google (~5-15 segundos), mas o agente não deve adicionar latência significativa ao pipeline
- **NFR4:** O agente deve seguir o formato AIOS padrão (YAML frontmatter + markdown body) consistente com os demais agentes do Squad CFO
- **NFR5:** O MCP Server deve ser implementado em Node.js/TypeScript seguindo as práticas da skill `mcp-builder`
- **NFR6:** O sistema deve funcionar em Windows (ambiente do usuário)

---

## Technical Assumptions

### Repository Structure

Monorepo — integrado ao `aios-core` existente.

### Service Architecture

MCP Server local (Node.js) rodando como processo stdio, registrado na configuração do ambiente Antigravity.

### Testing Requirements

Validação manual: YAML frontmatter válido, MCP Server compila e responde, imagem é gerada e salva corretamente.

### Additional Technical Assumptions

- API utilizada: Google AI Studio — modelo `gemini-3.1-flash-image-preview` ou equivalente com capacidade de geração de imagens
- Autenticação: API Key simples (variável de ambiente `GOOGLE_AI_STUDIO_API_KEY`)
- Formato de saída da API: imagem em base64 (PNG), convertida e salva localmente
- Transporte MCP: stdio (padrão para integração local)
- Imagens de referência: enviadas como input multimodal (base64) junto ao prompt

---

## Epic List

### Epic 1: Agente Chef de Imagem + MCP Server de Geração

Objetivo: Criar o agente completo (`chef-imagem.md`) com persona de Food Photographer, suas tasks, o MCP Server de integração com o Google AI Studio, e a integração no Squad CFO.

---

## Epic 1: Agente Chef de Imagem + MCP Server de Geração

Criar o agente "Chef de Imagem" do Squad CFO — um especialista em Food Photography com IA generativa. O agente transforma pedidos simples em prompts fotográficos profissionais e utiliza o MCP Server para gerar e salvar imagens via Google AI Studio.

### Story 3.1: Criação do Agente Chef de Imagem e MCP Server

**As a** dono de restaurante,
**I want** um agente de IA que gere fotos profissionais dos meus pratos a partir de descrições simples e imagens de referência,
**so that** eu tenha assets visuais consistentes e de alta qualidade para cardápios e marketing sem depender de fotógrafo profissional.

#### Acceptance Criteria

1. Arquivo `squads/CFO/agents/chef-imagem.md` criado com system prompt completo no formato AIOS
2. O agente declara dependência nas tasks: `gerar-foto-prato.md`
3. System prompt define: persona (Food Photographer & Prompt Engineer), princípios de fotografia culinária, regras de prompt engineering, comandos, formato de resposta
4. Nova task `squads/CFO/tasks/gerar-foto-prato.md` criada com steps: receber input, montar prompt, chamar MCP tool, salvar imagem
5. Pasta `squads/CFO/design/` criada para armazenamento das imagens geradas
6. MCP Server criado em `packages/mcp-chef-imagem/` com tool `gerar_imagem_prato` que conecta com Google AI Studio
7. MCP Server aceita parâmetros: `prompt` (string), `imagem_referencia` (base64, opcional), `negative_prompt` (string, opcional)
8. MCP Server salva imagem gerada em `squads/CFO/design/` com nome descritivo
9. MCP Server retorna path do arquivo salvo e metadata (prompt usado, timestamp)
10. `squads/CFO/squad.yaml` atualizado com novo agente e task
11. `squads/CFO/agents/gerente-geral.md` atualizado para reconhecer `@chef-imagem`
12. Configuração MCP adicionada ao arquivo de config do ambiente (`.mcp.json` ou equivalente)

---

## Next Steps

### Architect Prompt

> @architect, analise o PRD `docs/prd-chef-imagem.md` e crie a arquitetura técnica. Foco em: (1) Design do MCP Server Node.js para Google AI Studio, (2) Estrutura do system prompt com técnicas de food photography, (3) Fluxo de dados imagem-referência → prompt enrichment → API call → save. Use a skill `/mcp-builder` como referência para o servidor.

### Dev Prompt

> @dev, implemente a Story 3.1 seguindo a arquitetura e o PRD. Use `/mcp-builder` para criar o servidor MCP. O agente segue o formato de `agents/vendas.md` como referência estrutural.
