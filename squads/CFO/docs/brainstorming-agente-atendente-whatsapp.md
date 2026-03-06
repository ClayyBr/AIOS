# Brainstorming: Agente Atendente IA — WhatsApp (Squad CFO)

**Data:** 2026-03-06
**Status:** ✅ Alinhamento Concluído — Pronto para PRD
**Participantes:** Cleison (Dono) + Antigravity (Arquitetura)

---

## 🎯 Visão Geral

Construir um **Agente IA** que atua como **atendente 24/7 no WhatsApp** do restaurante, conectado ao modelo **Gemini 1.5 Flash** (API Key do Google AI Studio) e integrado à API Oficial do WhatsApp (Meta). O agente faz parte do **Squad CFO** e consulta dados centralizados (cardápio, promoções) para atender clientes.

### Dois Modos de Operação

| Modo | Gatilho | Comportamento |
|------|---------|---------------|
| **Confirmador** | Cliente faz pedido pelo site/menu online e é redirecionado ao WhatsApp com a comanda pronta | Lê a comanda, confirma o pedido, informa que está sendo preparado |
| **Consultivo** | Cliente envia mensagem diretamente no WhatsApp querendo pedir | Conversa humanizada: mostra cardápio, sugere pratos, monta o pedido, coleta endereço e pagamento |

---

## 📋 Definições Consolidadas (5 Pontos)

### 1. Infraestrutura e Conexão

| Item | Decisão |
|------|---------|
| **API WhatsApp** | API Oficial da Meta (WhatsApp Business Platform) |
| **Conta Meta** | Será criada e verificada pelo Cleison |
| **Tipo de Conversa** | 100% Receptiva (inbound) — 1.000 conversas/mês grátis |
| **Hospedagem (MVP)** | **Render** (plano gratuito, servidor Node.js contínuo) |
| **Evolução** | Migrar para VPS ou Railway ($5/mês) quando necessário |
| **Webhook** | Endpoint HTTPS no Render recebendo mensagens da Meta |

### 2. Arquitetura do Agente e Integração AIOS

| Item | Decisão |
|------|---------|
| **Hierarquia** | Agente à parte (não subordinado ao Gerente Geral), roda 24/7 autonomamente |
| **Comunicação Inter-Agentes (MVP)** | **Opção A** — Leitura de dados centralizados (Google Sheets/arquivo) |
| **Evolução Inter-Agentes** | Opção B (sub-tarefas agênticas) para versão futura |
| **Consulta ao @vendas** | Ler planilha de promoções do dia (não invoca o agente diretamente no MVP) |
| **Stack do Servidor** | Node.js + Express/Fastify |
| **Modelo IA** | Gemini 1.5 Flash (velocidade ideal para chats) |

### 3. Memória, Contexto e Banco de Dados

| Item | Decisão |
|------|---------|
| **Armazenamento de Pedidos** | Google Sheets (gerente acompanha os pedidos facilmente) |
| **Cardápio / Promoções** | Google Sheets (leitura dinâmica) |
| **Estado da Conversa** | Em memória do servidor (sessão por número de telefone) |
| **Evolução** | Migrar para banco de dados (Supabase/PostgreSQL) + Redis |

### 4. Fluxos de Negócio

#### 4.1 Fluxo: Pedido via Site (Confirmador)
```
Cliente finaliza pedido no site
  → Redirecionado para WhatsApp com comanda formatada
  → Agente detecta padrão da comanda
  → Agente confirma: "Pedido #48 recebido! Já está sendo preparado 🍽️"
  → Registra na planilha de pedidos
```

#### 4.2 Fluxo: Pedido via WhatsApp (Consultivo)
```
Cliente envia mensagem no WhatsApp
  → Agente cumprimenta de forma humanizada
  → Apresenta cardápio / sugere promoções do dia
  → Cliente escolhe itens
  → Agente coleta: itens + endereço + forma de pagamento
  → Se Pix: envia código Pix pré-configurado + pede comprovante
  → Se cartão/dinheiro: apenas registra a escolha
  → Confirma pedido com resumo formatado (modelo de comanda)
  → Registra na planilha de pedidos
```

#### 4.3 Formato da Comanda (Padrão)
```
#### NOVO PEDIDO ####

#️⃣   Nº pedido: 48
feito em 27/08/2025 22:16

👤   Nome do Cliente
📞   Telefone

🛵   Endereço de entrega
Rua, Número
Bairro: ...
(Referência)

------- ITENS DO PEDIDO -------

*1 x Prato / Item*
  Opcionais/Adicionais
💵 1 x R$ XX,XX = R$ XX,XX

-------------------------------

SUBTOTAL: R$ XX,XX
ENTREGA: R$ X,XX ou GRATUITA
*VALOR FINAL: R$ XX,XX*

PAGAMENTO
*Forma*: R$ XX,XX (detalhes)

🕐   Prazo para entrega: XX min
```

#### 4.4 Handoff para Humano
- Se cliente pedir para falar com humano, reclamar, ou perguntar algo fora de contexto
- Agente: *"Vou te transferir para nosso atendimento pessoal. Aguarde um momento 😊"*
- Pausa o bot **apenas para esse número**
- Cleison acompanha as conversas manualmente no início (sem notificação automática)

#### 4.5 Pagamento
| Origem | Comportamento |
|--------|---------------|
| **Pedido do Site** | Apenas exibe a forma que o cliente já escolheu (Pix, cartão, dinheiro) |
| **Pedido WhatsApp** | Pergunta a forma. Se Pix: envia código copia-e-cola + pede comprovante. Verificação manual pelo Cleison no app do banco |

### 5. Configuração Técnica do Modelo

| Item | Decisão |
|------|---------|
| **Modelo** | Gemini 1.5 Flash |
| **API** | Google AI Studio (API Key) |
| **Persona** | Atendente humanizada, simpática, eficiente |
| **Temperature** | Baixa (~0.3) para respostas previsíveis e corretas |
| **Safety** | Filtros padrão + instruções de não sair do contexto do restaurante |

---

## 🏗️ Posição no Squad CFO

```
Squad CFO (cfo-restaurante)
├── 👔 Gerente Geral (orquestrador interno)
│   ├── 💰 Arquiteto Lucro
│   ├── 📊 Financeiro
│   ├── 📦 Controlador Estoque
│   ├── 🎯 Vendas
│   ├── 📸 Chef de Imagem
│   └── 🔍 IDS
│
└── 💬 Atendente WhatsApp (NOVO — autônomo, roda 24/7)
    ├── Lê: Google Sheets (cardápio, promoções, preços)
    ├── Escreve: Google Sheets (pedidos)
    └── Modelo: Gemini 1.5 Flash
```

> O Atendente é um agente **à parte** da hierarquia do Gerente Geral porque roda como um serviço externo 24/7 (webhook HTTP), diferente dos demais agentes que rodam via CLI sob demanda.

---

## 🛠️ Stack Técnica do MVP

| Componente | Tecnologia |
|------------|-----------|
| Runtime | Node.js (>=18) |
| Framework HTTP | Express ou Fastify |
| WhatsApp API | Meta Cloud API (Webhooks) |
| Modelo IA | Google AI Studio — Gemini 1.5 Flash |
| Banco de Dados (MVP) | Google Sheets API |
| Hospedagem | Render (free tier) |
| Linguagem | TypeScript |

---

## 🤖 Agentes AIOS Envolvidos no Projeto

### Agentes que SERÃO utilizados

| Fase | Agente | Persona | Papel no Projeto |
|------|--------|---------|------------------|
| **1. PRD** | `@pm` (Morgan) | Product Manager | Criar o PRD usando template `prd-tmpl.yaml`. Definir requisitos, personas, métricas de sucesso |
| **2. Arquitetura** | `@architect` (Aria) | System Architect | Criar doc de arquitetura full-stack (Node.js + Webhooks + Gemini + Sheets API). Definir stack, APIs, deploy |
| **3. Stories** | `@po` (Pax) | Product Owner | Criar e validar stories de desenvolvimento. Gerenciar backlog. Definir acceptance criteria |
| **4. Implementação** | `@dev` (Dex) | Full Stack Developer | Implementar código: servidor Express, webhooks Meta, integração Gemini, Google Sheets API |
| **5. Qualidade** | `@qa` (Quinn) | Test Architect | Validar quality gates, revisar código, testar fluxos de conversa |
| **6. Deploy** | `@devops` (Gage) | DevOps Specialist | Push para repositório, configurar CI/CD, gerenciar releases |

### Agentes que serão utilizados na **V2 (Evolução)**

| Agente | Persona | Papel Futuro |
|--------|---------|--------------|
| `@data-engineer` (Dara) | Database Architect | Quando migrarmos de Google Sheets para Supabase/PostgreSQL — schema, migrations, RLS |
| `@analyst` (Atlas) | Business Analyst | Quando implementarmos analytics — pesquisa de métricas, análise de dados de atendimento |

### Agentes que NÃO se aplicam

| Agente | Motivo |
|--------|--------|
| `@sm` (River) | Scrum Master — útil mas não essencial para este projeto específico |
| `@ux-design-expert` (Uma) | Não há interface visual (o canal é WhatsApp texto) |
| `@aios-master` (Orion) | Orquestração de framework — não aplica diretamente ao produto |
| `@squad-creator` (Craft) | Não estamos criando uma nova squad |

---

## 🔧 Workflows AIOS Envolvidos

| Workflow | Comando | Quando Usar |
|----------|---------|-------------|
| `/create-prd` | Criar PRD | **Fase 1** — Gerar documento de requisitos |
| `/create-architecture` | Criar Arquitetura | **Fase 2** — Gerar documento de arquitetura técnica |
| `/develop-story` | Desenvolver Story | **Fase 4** — Fluxo completo de desenvolvimento de cada story |
| `/mcp-builder` | Construir MCP Server | **Fase 4** — Se decidirmos encapsular a integração WhatsApp+Gemini como um MCP Server |
| `/aios-dev` | Ativar @dev | **Fase 4** — Para implementação de código |
| `/aios-qa` | Ativar @qa | **Fase 5** — Para revisão de qualidade |
| `/aios-devops` | Ativar @devops | **Fase 6** — Para push e deploy |

### Workflows que NÃO se aplicam

| Workflow | Motivo |
|----------|--------|
| `/squad`, `/clone-mind`, `/enhance-workflow` | Skills de criação/otimização — não relacionados ao MVP |
| `/copy-chief`, `/story-chief`, `/traffic-masters-chief` | Squads de conteúdo/marketing — não envolvidos |
| `/cyber-chief`, `/legal-chief`, `/data-chief` | Squads especializados — não necessários para o MVP |
| `/course-generation-workflow` | Geração de cursos — sem relação |
| `/architect-first` | Para projetos novos greenfield complexos — nosso MVP é focado |

---

## 📚 Skills Claude Aplicáveis

### Skills que SERÃO utilizadas

| Skill | Diretório | Papel no Projeto |
|-------|-----------|------------------|
| **mcp-builder** | `Skills Claude/skills/mcp-builder/` | Guia para construir o MCP Server de integração WhatsApp+Gemini (se optarmos por essa arquitetura). Inclui: scaffold, implementação de tools, testes, validação |
| **webapp-testing** | `Skills Claude/skills/webapp-testing/` | Testar o servidor webhook localmente usando Playwright — verificar endpoints, simular webhooks da Meta, validar respostas |

### Skills que podem ser úteis na V2

| Skill | Papel Futuro |
|-------|--------------|
| **xlsx** | Se precisarmos gerar relatórios Excel de pedidos |
| **pdf** | Se precisarmos gerar recibos PDF para os clientes |
| **frontend-design** | Se criarmos um painel administrativo web |

### Skills que NÃO se aplicam

| Skill | Motivo |
|-------|--------|
| `claude-api` | Usamos Gemini, não Claude API, para o modelo de IA |
| `algorithmic-art`, `canvas-design`, `brand-guidelines` | Design visual — sem UI neste projeto |
| `docx`, `pptx`, `slack-gif-creator` | Geração de documentos — sem relação |
| `doc-coauthoring`, `internal-comms` | Comunicação interna — não aplica |
| `skill-creator`, `theme-factory`, `web-artifacts-builder` | Ferramentas de criação — sem uso direto |

---

## ✅ Próximos Passos

### Pipeline de Desenvolvimento (Ordem dos Agentes)

```
@pm (PRD) → @architect (Arquitetura) → @po (Stories) → @dev (Implementação) → @qa (Qualidade) → @devops (Deploy)
```

1. **`@pm` — Criar PRD** detalhado seguindo template AIOS (`/create-prd`)
2. **`@architect` — Criar Arquitetura** técnica seguindo template AIOS (`/create-architecture`)
3. **`@po` — Criar Stories** de desenvolvimento e validar
4. **`@dev` — Implementar MVP** seguindo as stories (`/develop-story`)
5. **`@qa` — Validar qualidade** (quality gates, testes)
6. **`@devops` — Push e Deploy** para Render
7. **Cleison — Configurar conta Meta** (em paralelo com fases 1-3)
8. **Testar com número de teste Meta** antes de ir para produção

> 📁 Melhorias futuras documentadas em `roadmap/atendimento/`
