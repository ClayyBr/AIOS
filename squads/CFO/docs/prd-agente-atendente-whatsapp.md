# Agente Atendente IA WhatsApp — Product Requirements Document (PRD)

**Projeto:** Squad CFO — Atendente IA WhatsApp
**Versão:** 1.0
**Data:** 2026-03-06
**Autor:** @pm (Morgan)
**Status:** Draft — Aguardando Aprovação

---

## 1. Goals

- Automatizar o atendimento ao cliente no WhatsApp 24/7 utilizando IA (Gemini 1.5 Flash) conectada à API Oficial da Meta
- Confirmar automaticamente pedidos vindos do site/menu online do restaurante
- Conduzir conversas humanizadas com clientes que desejam pedir diretamente pelo WhatsApp
- Consultar cardápio, promoções e preços dinamicamente via Google Sheets
- Registrar pedidos automaticamente em Google Sheets para acompanhamento do gerente
- Suportar múltiplas formas de pagamento (Pix, cartão, dinheiro) com envio de chave Pix pré-configurada
- Permitir handoff para atendente humano quando necessário

## 2. Background Context

O restaurante recebe pedidos por dois canais: site/menu online e WhatsApp direto. Atualmente, o atendimento no WhatsApp é manual, limitando a capacidade de resposta fora do horário comercial e sobrecarregando a equipe durante picos de demanda. O Agente Atendente IA resolve esse gargalo operando 24/7 como um serviço autônomo integrado ao ecossistema do Squad CFO, porém independente da hierarquia de agentes internos (Gerente Geral).

O projeto será desenvolvido como MVP com foco em validação rápida, usando Google Sheets como banco de dados e Render (free tier) como hospedagem, com um roadmap claro de evolução para banco de dados dedicado, comunicação inter-agentes e pagamento automatizado.

### Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 2026-03-06 | 1.0 | Criação inicial do PRD | @pm (Morgan) |

---

## 3. Requirements

### 3.1 Functional Requirements

- **FR1:** O sistema deve receber mensagens de clientes via Webhook da API Oficial do WhatsApp (Meta Cloud API)
- **FR2:** O sistema deve detectar automaticamente se a mensagem recebida é uma comanda pré-formatada do site (Modo Confirmador) ou uma mensagem livre do cliente (Modo Consultivo)
- **FR3:** No Modo Confirmador, o sistema deve parsear a comanda recebida, confirmar o pedido ao cliente com uma mensagem amigável e registrar na planilha de pedidos
- **FR4:** No Modo Consultivo, o sistema deve iniciar uma conversa humanizada usando Gemini 1.5 Flash para apresentar o cardápio, sugerir promoções, coletar itens, endereço e forma de pagamento
- **FR5:** O sistema deve ler o cardápio, preços e promoções do dia de uma Google Sheets configurada (fonte centralizada de verdade)
- **FR6:** O sistema deve registrar cada pedido finalizado em uma Google Sheets de pedidos, seguindo o formato de comanda padrão (nº do pedido, cliente, telefone, endereço, itens, valores, pagamento, prazo)
- **FR7:** O sistema deve manter o estado da conversa por número de telefone (sessão em memória) para suportar diálogos multi-turno
- **FR8:** O sistema deve enviar a chave Pix pré-configurada (copia e cola) quando o cliente escolher pagamento via Pix, e solicitar o envio do comprovante
- **FR9:** Para pedidos vindos do site, o sistema deve exibir a forma de pagamento que o cliente já selecionou na plataforma
- **FR10:** O sistema deve executar handoff para humano quando o cliente solicitar explicitamente falar com um atendente, reclamar de algo, ou perguntar algo fora do contexto do restaurante
- **FR11:** O handoff deve pausar o bot **apenas para o número específico** do cliente, sem afetar outros atendimentos simultâneos
- **FR12:** O sistema deve responder apenas em Português Brasileiro (pt-BR) com tom simpático, profissional e humanizado
- **FR13:** O sistema deve gerar automaticamente o número sequencial do pedido
- **FR14:** O sistema deve informar o prazo estimado de entrega ao confirmar o pedido

### 3.2 Non-Functional Requirements

- **NFR1:** O tempo de resposta ao cliente não deve exceder 10 segundos (incluindo chamada ao Gemini)
- **NFR2:** O sistema deve rodar 24/7 sem intervenção manual (servidor Node.js contínuo)
- **NFR3:** O sistema deve suportar atendimentos simultâneos de múltiplos clientes sem interferência entre sessões
- **NFR4:** A API Key do Google AI Studio e o Token da Meta devem ser armazenados em variáveis de ambiente, nunca expostos no código
- **NFR5:** O sistema deve ser deployável no Render (free tier) com restart automático em caso de crash
- **NFR6:** O sistema deve respeitar os limites da Meta Cloud API (1.000 conversas inbound/mês gratuitas)
- **NFR7:** A arquitetura deve ser modular, permitindo migração futura de Google Sheets para banco de dados dedicado sem reescrita total
- **NFR8:** O modelo Gemini deve ser configurado com temperature baixa (~0.3) para respostas previsíveis e corretas
- **NFR9:** O agente IA deve permanecer estritamente no contexto do restaurante, recusando perguntas fora do escopo

---

## 4. Technical Assumptions

### 4.1 Repository Structure: Monorepo

O projeto será parte do monorepo `aios-core`, dentro de `squads/CFO/`. O servidor Node.js do agente ficará numa subpasta dedicada (ex: `squads/CFO/atendente-whatsapp/` ou `apps/atendente-whatsapp/`).

### 4.2 Service Architecture

- **Servidor:** Node.js (>=18) com Express ou Fastify
- **Linguagem:** TypeScript
- **Modelo IA:** Google AI Studio — Gemini 1.5 Flash (`@google/generative-ai` SDK)
- **WhatsApp:** Meta Cloud API (Webhooks HTTP)
- **Dados:** Google Sheets API (`googleapis` npm package)
- **Hospedagem MVP:** Render (free tier)
- **Gerenciamento de Sessão:** In-memory Map (por número de telefone)

### 4.3 Testing Requirements

- **Unit tests** para: parser de comanda, gerenciador de sessão, formatador de mensagens
- **Integration tests** para: fluxo Webhook → Gemini → Google Sheets
- **Manual testing** com número de teste do WhatsApp (Meta sandbox)

### 4.4 Additional Technical Assumptions

- A API Key do Google AI Studio já está disponível (usada pelo MCP `chef-imagem`)
- O Cleison criará/configurará a conta Meta for Developers em paralelo
- O Google Sheets será acessado via Service Account com credenciais JSON
- Sem necessidade de banco de dados relacional para o MVP
- O sistema deve funcionar independente do dashboard AIOS (sem dependência de apps/dashboard)

---

## 5. Epic List

### Epic 1: Fundação e Infraestrutura do Servidor
Estabelecer o servidor Node.js/TypeScript com Express, configurar webhook da Meta, deploy no Render, e implementar o health check básico. Base sólida para todas as funcionalidades subsequentes.

### Epic 2: Integração Gemini e Gestão de Conversas
Conectar o modelo Gemini 1.5 Flash como motor de IA do agente, implementar gerenciamento de sessão por telefone, e criar o system prompt com persona humanizada de atendente.

### Epic 3: Cardápio, Pedidos e Google Sheets
Integrar Google Sheets como fonte de dados (leitura de cardápio/promoções e escrita de pedidos), implementar o Modo Confirmador (comanda do site) e o Modo Consultivo (conversa completa) com registro de pedidos.

### Epic 4: Pagamento, Handoff e Polimento
Implementar fluxo de pagamento (Pix + outras formas), handoff para humano, refinamento da persona e testes end-to-end para produção.

---

## 6. Epic Details

### Epic 1: Fundação e Infraestrutura do Servidor

**Objetivo:** Criar o esqueleto funcional do servidor que recebe e responde mensagens do WhatsApp via API Oficial da Meta, com deploy automatizado no Render.

#### Story 1.1: Setup do Projeto TypeScript + Express

> Como desenvolvedor,
> quero um projeto Node.js/TypeScript configurado com Express e estrutura de pastas padronizada,
> para ter a base de código pronta para desenvolvimento.

**Acceptance Criteria:**
1. Projeto inicializado com `package.json`, `tsconfig.json`, e scripts de dev/build/start
2. Express configurado com endpoint `GET /health` retornando `{ status: "ok", timestamp: ... }`
3. Variáveis de ambiente carregadas via `dotenv` com arquivo `.env.example` documentado
4. Estrutura de pastas: `src/`, `src/routes/`, `src/services/`, `src/config/`, `src/types/`
5. ESLint e Prettier configurados
6. `.gitignore` configurado (node_modules, .env, dist/)

#### Story 1.2: Webhook da Meta (Verificação + Recepção)

> Como sistema,
> quero receber mensagens do WhatsApp via webhook da Meta,
> para processar cada mensagem do cliente.

**Acceptance Criteria:**
1. Endpoint `GET /webhook` implementado com verificação de token (Meta Webhook Verification)
2. Endpoint `POST /webhook` implementado para receber mensagens (extracting: sender phone, message text, message type)
3. Validação de assinatura do payload (X-Hub-Signature-256) para segurança
4. Log estruturado de cada mensagem recebida (timestamp, remetente, tipo, preview)
5. Resposta `200 OK` imediata para a Meta (processo assíncrono)

#### Story 1.3: Deploy no Render + Variáveis de Ambiente

> Como operador,
> quero o servidor deployado no Render com variáveis de ambiente configuradas,
> para que o webhook esteja acessível publicamente 24/7.

**Acceptance Criteria:**
1. `Dockerfile` ou `render.yaml` configurado para deploy
2. Variáveis de ambiente documentadas: `META_VERIFY_TOKEN`, `META_ACCESS_TOKEN`, `META_PHONE_NUMBER_ID`, `GEMINI_API_KEY`, `GOOGLE_SHEETS_CREDENTIALS`
3. Health check do Render configurado no endpoint `/health`
4. Servidor respondendo publicamente em URL HTTPS do Render
5. Readme com instruções de deploy

---

### Epic 2: Integração Gemini e Gestão de Conversas

**Objetivo:** Conectar o Gemini 1.5 Flash como cérebro do agente, com memória de conversa por telefone e persona humanizada de atendente do restaurante.

#### Story 2.1: Integração com Gemini 1.5 Flash

> Como agente IA,
> quero processar mensagens dos clientes usando Gemini 1.5 Flash,
> para gerar respostas inteligentes e contextuais.

**Acceptance Criteria:**
1. SDK `@google/generative-ai` configurado com a API Key do Google AI Studio
2. System prompt definido com persona de atendente humanizada (pt-BR, tom simpático)
3. Temperature configurada em 0.3 (respostas previsíveis)
4. Safety settings configurados para contexto de restaurante
5. Tratamento de erros da API (rate limit, timeout, falha) com fallback message ao cliente

#### Story 2.2: Gerenciador de Sessão por Telefone

> Como agente IA,
> quero manter contexto da conversa de cada cliente separadamente,
> para conduzir diálogos multi-turno sem misturar informações.

**Acceptance Criteria:**
1. Sessão identificada pelo número de telefone do cliente
2. Histórico de mensagens (até últimas 20) mantido em memória para contexto do Gemini
3. Timeout de sessão configurável (padrão: 30 minutos de inatividade)
4. Limpeza automática de sessões expiradas
5. Estado do carrinho de compras armazenado na sessão (itens, endereço, pagamento)

#### Story 2.3: Envio de Respostas via API da Meta

> Como agente IA,
> quero enviar mensagens de resposta ao cliente pelo WhatsApp,
> para completar o ciclo de comunicação.

**Acceptance Criteria:**
1. Função `sendWhatsAppMessage(to, text)` implementada usando Meta Cloud API
2. Suporte a mensagens de texto simples
3. Tratamento de erros de envio (retry com backoff)
4. Log de cada mensagem enviada (timestamp, destinatário, preview)

---

### Epic 3: Cardápio, Pedidos e Google Sheets

**Objetivo:** Integrar Google Sheets para leitura de cardápio/promoções e escrita de pedidos. Implementar os dois modos de operação do agente.

#### Story 3.1: Integração Google Sheets — Leitura de Cardápio

> Como agente IA,
> quero consultar o cardápio e promoções do dia no Google Sheets,
> para informar o cliente sobre os itens disponíveis e preços.

**Acceptance Criteria:**
1. Service Account do Google configurado com acesso à planilha de cardápio
2. Função `getCardapio()` retornando itens com: nome, descrição, preço, categoria, disponibilidade
3. Função `getPromocoesAtivas()` retornando promoções do dia com preço promocional
4. Cache de 15 minutos para evitar chamadas excessivas à API do Sheets
5. System prompt do Gemini enriquecido com dados do cardápio e promoções

#### Story 3.2: Modo Confirmador — Pedidos do Site

> Como agente IA,
> quero detectar e confirmar automaticamente pedidos vindos do site,
> para agilizar o fluxo de pedidos online.

**Acceptance Criteria:**
1. Parser que detecta o padrão de comanda formatada (ex: `#### NOVO PEDIDO ####`)
2. Extração de dados da comanda: nº pedido, cliente, telefone, endereço, itens, valores, pagamento
3. Resposta automática confirmando o pedido: "Pedido #XX recebido! Já está sendo preparado 🍽️"
4. Registro do pedido na Google Sheets de pedidos

#### Story 3.3: Modo Consultivo — Montagem de Pedido via Chat

> Como cliente,
> quero fazer meu pedido conversando naturalmente com a atendente pelo WhatsApp,
> para ter uma experiência personalizada e tirar dúvidas sobre o cardápio.

**Acceptance Criteria:**
1. Agente apresenta o cardápio de forma amigável quando solicitado
2. Agente sugere promoções do dia proativamente
3. Agente coleta itens do pedido com opções/adicionais conforme o cardápio
4. Agente solicita endereço de entrega
5. Agente pergunta forma de pagamento (Pix, cartão na entrega, dinheiro)
6. Agente gera resumo formatado do pedido no padrão de comanda para confirmação do cliente
7. Após confirmação, registra na Google Sheets de pedidos

#### Story 3.4: Integração Google Sheets — Registro de Pedidos

> Como gerente,
> quero que todos os pedidos sejam registrados automaticamente no Google Sheets,
> para acompanhar e gerenciar a operação.

**Acceptance Criteria:**
1. Função `registrarPedido(pedido)` que insere nova linha na planilha de pedidos
2. Colunas: nº pedido, data/hora, nome cliente, telefone, endereço, itens (texto), valor total, forma pagamento, status, origem (site/whatsapp)
3. Número do pedido gerado sequencialmente (leitura do último nº + 1)
4. Status inicial: "Em Preparo"

---

### Epic 4: Pagamento, Handoff e Polimento

**Objetivo:** Completar os fluxos de pagamento (Pix), implementar handoff para humano, e refinar a persona e a experiência para produção.

#### Story 4.1: Fluxo de Pagamento Pix

> Como cliente,
> quero receber a chave Pix para pagamento e poder enviar meu comprovante,
> para pagar meu pedido de forma rápida e prática.

**Acceptance Criteria:**
1. Chave Pix pré-configurada em variáveis de ambiente (chave + nome do recebedor)
2. Quando cliente escolhe Pix, agente envia: chave copia-e-cola + nome do recebedor + valor total
3. Agente solicita envio do comprovante após pagamento
4. Quando cliente envia imagem/documento, agente registra recebimento e confirma o pedido
5. Status do pedido atualizado na planilha

#### Story 4.2: Handoff para Atendente Humano

> Como cliente,
> quero poder falar com um atendente humano quando a IA não conseguir me ajudar,
> para resolver situações complexas ou reclamações.

**Acceptance Criteria:**
1. Agente detecta gatilhos de handoff: pedido explícito ("falar com humano"), reclamação, ou pergunta fora do contexto
2. Agente envia mensagem educada: "Vou te transferir para nosso atendimento pessoal. Aguarde um momento 😊"
3. Bot pausa **apenas para o número do cliente** que solicitou handoff
4. Lista de números em handoff armazenada em memória (não processa mensagens desses números)
5. Mecanismo para reativar o bot para um número (manual via endpoint ou timeout configurável)

#### Story 4.3: Refinamento de Persona e Testes E2E

> Como dono do restaurante,
> quero que o agente converse de forma natural e profissional em todas as situações,
> para que os clientes tenham uma experiência excelente.

**Acceptance Criteria:**
1. System prompt revisado com instruções detalhadas de persona (tom, vocabulário, emojis, regras)
2. Instruções de segurança: não falar sobre temas fora do restaurante, não inventar itens
3. Tratamento gracioso de: mensagens de áudio (informar que só processa texto), stickers, mídia
4. Teste manual completo dos fluxos: Confirmador, Consultivo com Pix, Consultivo com cartão/dinheiro, Handoff
5. Documentação de operação (README) com instruções de manutenção

---

## 7. Checklist Results Report

*Será preenchido após revisão e aprovação do PRD pelo proprietário.*

---

## 8. Next Steps

### Architect Prompt

> @architect (Aria): Crie a arquitetura técnica completa para o Agente Atendente IA WhatsApp do Squad CFO, usando este PRD como base. O projeto é um servidor Node.js/TypeScript com Express, hospedado no Render, que integra: API Oficial do WhatsApp (Meta Cloud API via Webhooks), Gemini 1.5 Flash como modelo de IA, e Google Sheets como banco de dados do MVP. Foco em: estrutura de pastas, fluxo de dados (webhook → processamento → resposta), gerenciamento de sessão, e arquitetura modular para evolução futura. Use o template `/create-architecture`.
