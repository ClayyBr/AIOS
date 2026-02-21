# Insight AIOS: Arquitetura Next.js para IA Especialista do Squad CFO

**Data:** 2026-02-20
**Autor:** Equipe de Arquitetura (`@architect`)
**Status:** Planejamento (Roadmap Futuro)
**Contexto:** O usuário deseja evoluir a interação com os agentes do Squad CFO (atualmente via `.md` nos terminais/IDEs) para uma Interface Web amigável (Vercel + Next.js), que permita gerir o restaurante via Chat (conversando de forma coloquial com os dados).

---

## 🎯 Objetivo da Implementação

Transformar o atual repositório GitHub (que age como Módulo Core + Banco de Dados Local) no "Cérebro" de uma Aplicação Web (Dashboard/Chatbot), empoderando os cozinheiros, gerentes e proprietários a consultarem e preverem custos através de um site mobile-first simples, sem precisar abrir código.

## 🏛️ System Design (A "Mágica")

O projeto será erguido em **3 Camadas de Engenharia**:

### 1. A Camada de Interface (Frontend Next.js)
Será injetada uma tela nativa de Chat dentro do projeto `/apps/dashboard/` existente no repositório.
*   **Tech Stack:** React, Next.js (App Router), TailwindCSS.
*   **Acelerador:** Biblioteca oficial `ai` (Vercel AI SDK), que abstrai todo o trabalho de *streaming* (aquelas letrinhas aparecendo uma por uma, estilo ChatGPT).
*   **Aparência:** Um chat limpo, onde o usuário pode simplesmente perguntar: *"Qual prato do executivo tá dando prejuízo hoje?"*

### 2. A Camada de Integração (Backend / API Route)
A chave da IA não deve nunca ficar no frontend. Faremos uma ponte segura.
*   **Endpoint:** Criar o arquivo `apps/dashboard/app/api/chat/route.ts`.
*   **Funcionalidade:** Essa rota recebe a pergunta do usuário e instancializa a API do `@google/generative-ai` com a chave salva de forma segura `.env.local` e hospedada nos *Secrets* da Vercel.

### 3. A Injeção de Contexto (O "Pulo do Gato" do CFO)
Para que o Gemini não responda como uma IA genérica do exterior e sim como o seu Agente Master (Gerente Geral), precisamos injetar a inteligência que já desenvolvemos.
*   No momento exato que a API Route receber a pergunta, um script Node.js (`fs.readFileSync`) lerá instatanemente do servidor Vercel:
    1. A Persona Master: `squads/CFO/agents/gerente-geral.md`
    2. O Banco de Dados: `squads/CFO/data/financial-registry.yaml`
    3. Custos Fixos em R$: `squads/CFO/squad.yaml`
*   **O System Prompt:** O Backend concatenará todos esses arquivos num bloco gigante e colocará *antes* da pergunta do usuário. 
*   **O Resultado:** O Gemini vai ler (em milissegundos) o preço de todos os tomates, carnes e pratos, junto com a regra de só falar como o "Gerente do restaurante", respondendo a pergunta do usuário com os dados do próprio CFO.

## 📋 Epic/Story para o Gestor de Produto (`@po`)

Quando chegar a hora de construir isso, invoque o agente `@po` e passe à ele a seguinte macro-visão para criar as *Stories* de Desenvolvimento e passá-las ao `@dev`:

**Epic X. Chatbot Nativo CFO**
- **Story X.1: Setup do Vercel AI SDK no Dashboard.** (Instalar `@google/generative-ai`, `ai` e criar UI do chat com balões de mensagem).
- **Story X.2: Rota API de Injeção de Contexto.** (Criar rota `/api/chat` no Next.js programada para embutir o conteúdo bruto da pasta `squads/CFO/data/*` no `system_instruction` do Gemini).
- **Story X.3: Tratamento de Erro e Segurança.** (Não permitir que a IA mude as tabelas do YAML, apenas atue como "leitura" Consultiva RAG - Retrieval-Augmented Generation).

---
*Nota de Arquitetura:* O deploy na Vercel suporta tranquilamente a leitura desses arquivos estáticos locais no momento que o servidor Bootar. Nenhuma necessidade de banco de dados SQL pesado será necessária para esta V1 do Chatbot. A base de dados será o próprio `.yaml` rastreado via o Git que acabamos de configurar.*
