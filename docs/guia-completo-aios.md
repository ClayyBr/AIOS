# Guia Completo: O que é o Synkra AIOS e como ele pode te ajudar 🚀

> **Para quem é este guia:** Qualquer pessoa que quer entender o AIOS do zero, sem conhecimento prévio.

---

## 📌 O Que é o Synkra AIOS?

Imagine que você pudesse contratar uma **equipe inteira de profissionais especializados** — desenvolvedores, arquitetos, gerentes de projeto, analistas, testadores — mas todos eles são **agentes de IA** que trabalham dentro do seu computador, seguindo regras claras e colaborando entre si.

**Isso é o Synkra AIOS.**

É um **framework** (uma estrutura pronta) que organiza agentes de IA para trabalharem **como uma equipe real**, cada um com seu papel, suas responsabilidades e suas regras. Em vez de você conversar com uma IA genérica e torcer para ela entender o contexto, o AIOS garante que:

- Cada agente **sabe exatamente o que fazer**
- Eles **se comunicam entre si** passando informações
- Existe um **processo claro** do início ao fim
- A **qualidade é verificada** automaticamente antes de entregar

### Analogia Simples

| Sem AIOS | Com AIOS |
|----------|----------|
| Você pede a uma IA genérica: "faça um app" | Você ativa o `@analyst` que pesquisa, depois o `@architect` que projeta, depois o `@dev` que implementa, depois o `@qa` que testa |
| A IA "esquece" o contexto entre conversas | Cada agente recebe o documento completo do anterior |
| Você não sabe se o resultado está bom | Quality Gates bloqueiam código ruim automaticamente |
| Resultado inconsistente | Processo padronizado e repetível |

---

## 🧩 As Funcionalidades Principais

### 1. Sistema de Agentes Especializados

O AIOS vem com **11+ agentes**, cada um com uma persona, habilidades e autoridades específicas:

#### Agentes de Planejamento
| Agente | Persona | O que faz |
|--------|---------|-----------|
| `@analyst` | Alex | Pesquisa mercado, analisa concorrentes, cria briefings |
| `@pm` | Morgan | Gerencia o produto, cria o PRD (documento de requisitos), prioriza features |
| `@architect` | Aria | Projeta a arquitetura técnica, decide tecnologias, cria diagramas |
| `@ux-design-expert` | Uma | Design de interfaces, experiência do usuário, wireframes |

#### Agentes de Desenvolvimento
| Agente | Persona | O que faz |
|--------|---------|-----------|
| `@po` | Pax | Cria e gerencia stories (tarefas detalhadas de desenvolvimento) |
| `@sm` | River | Scrum Master — organiza sprints, transforma planos em stories hiper-detalhadas |
| `@dev` | Dex | O desenvolvedor — escreve código, implementa features |
| `@qa` | Quinn | Testa tudo, roda validações, garante qualidade |
| `@devops` | Gage | O único que pode fazer deploy e push para o repositório |

#### Agentes Meta
| Agente | O que faz |
|--------|-----------|
| `@aios-master` | Orquestra todo o sistema, gerencia o framework |
| `@data-engineer` | Projeta bancos de dados, schemas, migrações |

> [!IMPORTANT]
> **Cada agente tem autoridade exclusiva.** Por exemplo, apenas o `@devops` pode fazer `git push`. Isso evita que um agente de desenvolvimento acidentalmente publique código não testado.

---

### 2. Story-Driven Development (Desenvolvimento Dirigido por Stories)

No AIOS, **nenhum código é escrito sem uma story**. Uma story é um documento detalhado que descreve:

- **O que** precisa ser feito (acceptance criteria)
- **Por que** precisa ser feito (contexto de negócio)
- **Como** implementar (orientação técnica)
- **Checklist** para acompanhar progresso

O fluxo é:

```
@po cria a story → @dev implementa → @qa testa → @devops faz deploy
```

Cada agente marca os checkboxes conforme completa suas tarefas, e o próximo agente continua de onde o anterior parou.

---

### 3. Templates Prontos (18 Templates)

Em vez de começar do zero, o AIOS oferece **18 templates** profissionais para diferentes tipos de documentos:

| Categoria | Templates |
|-----------|-----------|
| **Produto** | PRD, Project Brief, Brownfield PRD |
| **Arquitetura** | Sistema, Full-Stack, Front-end, Brownfield |
| **Desenvolvimento** | Story, Task, Workflow, QA Gate |
| **Pesquisa** | Brainstorming, Market Research, Competitor Analysis |
| **Dados** | Database Schema (Full e Lite) |
| **Agentes** | Agent Template |
| **Front-end** | Spec Front-end |

Quando você pede `@pm *create-story`, o agente **lê o template** e gera um documento completo, padronizado e profissional.

---

### 4. Skills (Habilidades Avançadas)

Skills são **capacidades especiais** que os agentes podem usar. São como "superpoderes" que vão além das tarefas básicas:

| Skill | O que faz |
|-------|-----------|
| **Squad Creator** | Cria novas equipes de agentes para qualquer domínio |
| **Mind Clone** | Clona o conhecimento de um especialista humano para um agente |
| **Enhance Workflow** | Melhora workflows existentes automaticamente |
| **MCP Builder** | Constrói servidores MCP (Model Context Protocol) |
| **Skill Creator** | Cria novas skills |
| **Architect First** | Workflow que garante que a arquitetura vem antes do código |
| **Course Generation** | Gera cursos educacionais completos |
| **Ralph** | Assistente personalizado |

---

### 5. Constitution (Constituição)

O AIOS tem uma **constituição formal** — um documento com regras inegociáveis que todos os agentes devem seguir. Isso garante consistência e qualidade:

| Princípio | O que significa | Severidade |
|-----------|-----------------|------------|
| **CLI First** | Tudo funciona primeiro via linha de comando, não depende de interface gráfica | NON-NEGOTIABLE |
| **Agent Authority** | Cada agente tem autoridades exclusivas que não podem ser violadas | NON-NEGOTIABLE |
| **Story-Driven** | Todo desenvolvimento começa com uma story | MUST |
| **No Invention** | Ninguém inventa requisitos — tudo vem de dados reais | MUST |
| **Quality First** | Código ruim é bloqueado automaticamente | MUST |
| **Absolute Imports** | Padrão técnico para organização de código | SHOULD |

**Gates automáticos** verificam essas regras e **bloqueiam** violações antes que causem problemas.

---

### 6. Quality Gates (Portões de Qualidade)

Antes de qualquer código ir para produção, ele passa por **3 camadas de validação**:

```
Camada 1: Pre-commit (local, <5s)
  → ESLint, TypeScript

Camada 2: Pre-push (local)
  → Validação de stories, consistência

Camada 3: CI/CD (cloud)
  → Testes completos, cobertura 80%+, GitHub Actions
```

---

### 7. ADE — Autonomous Development Engine

O motor de desenvolvimento autônomo é composto por **7 sistemas** que transformam requisitos em código funcionando:

```
Seu pedido → Spec Pipeline → Execution Engine → QA Review → Código pronto
                                    ↓
                            Recovery System (se der erro, recupera)
                                    ↓
                            Memory Layer (aprende com o processo)
```

| Sistema | O que faz |
|---------|-----------|
| Worktree Manager | Isola cada feature em uma branch separada |
| Spec Pipeline | Transforma requisitos em especificações executáveis |
| Execution Engine | Executa as specs em 13 passos com autocrítica |
| Recovery System | Recupera automaticamente de falhas |
| QA Evolution | Review estruturado em 10 fases |
| Memory Layer | Memória persistente — o sistema aprende com cada projeto |

---

## 🍽️ Exemplo Real: O Squad CFO do Restaurante

Este é o melhor exemplo de como o AIOS funciona **além do desenvolvimento de software**. O Squad CFO é uma equipe de agentes para **gestão financeira de restaurante**.

### Os 3 Agentes do CFO

```
👔 Gerente Geral (Master)
   ├── 💰 Arquiteto do Lucro (CFO)
   └── 📦 Controlador de Estoque (Ops)
```

| Agente | Papel | Exemplos do que faz |
|--------|-------|-------------------|
| **Gerente Geral** | Seu ponto de contato | Recebe pedidos, orquestra os outros, dá visão estratégica |
| **Arquiteto do Lucro** | Financeiro | Calcula custos, precifica pratos, gera DRE, analisa CMV |
| **Controlador de Estoque** | Operacional | Registra entradas/saídas, faz inventário, alerta sobre estoque baixo |

### As 13 Tarefas Disponíveis

| Tarefa | O que faz |
|--------|-----------|
| `*dashboard` | Resumo 360° do negócio |
| `*novo-prato` | Lançar novo prato (custo, preço, ficha técnica) |
| `*ficha-tecnica` | Criar ficha técnica com todos os ingredientes e custos |
| `*precificar` | Calcular preço de venda ideal |
| `*cmv` | Analisar custo da mercadoria vendida |
| `*dre` | Gerar DRE (Demonstração do Resultado) mensal |
| `*entrada` | Registrar entrada de mercadoria |
| `*saida` | Registrar saída de mercadoria |
| `*inventario` | Fazer inventário completo |
| `*alerta` | Alertas de estoque baixo |
| `*curva-abc` | Análise de Curva ABC dos produtos |
| `*avaliar-fornecedor` | Avaliar e comparar fornecedores |
| `*analise-estrategica` | Insights profundos sobre saúde financeira |

### Base de Conhecimento Incluída

O CFO não trabalha "no escuro". Ele vem com **9 arquivos de conhecimento embutido**:

- 📊 Gestão de CMV e Eficiência Operacional (Brasil)
- 💲 Engenharia de Custos e Análise (US)
- 📝 Fórmula de Precificação Simples
- 📋 Guia de Ficha Técnica Passo a Passo
- 📦 Guia de Gestão de Estoque
- 🌅 Guia de Pré-Abertura
- 📈 Modelo de DRE para Restaurante
- 🥬 Sazonalidade de Hortifruti (tabela completa)
- 🔢 Tabela de Fatores de Correção (rendimento de ingredientes)

> [!TIP]
> Quando você pede `*precificar` um prato, o agente **consulta automaticamente** a tabela de fatores de correção para calcular o rendimento real dos ingredientes, e a sazonalidade para ajustar preços.

---

## 🆚 Por Que Usar o AIOS ao Invés de Fazer Agentes Manualmente?

### O Problema de Fazer Manualmente

Se você tentar criar agentes de IA por conta própria, vai enfrentar esses problemas:

| Problema | Descrição |
|----------|-----------|
| **Perda de contexto** | Cada conversa com a IA começa do zero — ela "esquece" tudo |
| **Inconsistência** | Sem padrões, cada resposta é diferente |
| **Sem controle de qualidade** | Ninguém verifica se o resultado está correto |
| **Sem colaboração** | Um agente não consegue passar informações para outro |
| **Reinventar a roda** | Você precisa criar toda a estrutura do zero |
| **Sem governança** | Qualquer agente pode fazer qualquer coisa, sem limites |
| **Sem memória** | O sistema não aprende com experiências anteriores |

### O Que o AIOS Resolve

| Problema | Solução AIOS |
|----------|-------------|
| Perda de contexto | Stories e documentos passam contexto completo entre agentes |
| Inconsistência | Constitution + Templates garantem padrão |
| Sem controle de qualidade | Quality Gates bloqueiam erros automaticamente |
| Sem colaboração | Agentes delegam entre si com autoridades claras |
| Reinventar a roda | Framework pronto com 18 templates, 8 skills, 11+ agentes |
| Sem governança | Constitution com gates automáticos |
| Sem memória | Memory Layer persiste aprendizados |

### Comparação Direta

```
MANUAL:
  Você → "ChatGPT, faça um app de restaurante"
  Resultado: Código genérico, sem estrutura, sem testes

AIOS:
  Você → @analyst pesquisa mercado
       → @pm cria PRD detalhado
       → @architect projeta solução
       → @sm cria stories detalhadas
       → @dev implementa com contexto completo
       → @qa testa e valida
       → @devops faz deploy seguro
  Resultado: Projeto profissional, testado, documentado
```

---

## 🚀 Primeiros Passos: Como Começar

### Passo 1: Instalação

```bash
# Criar um novo projeto
npx aios-core init meu-projeto

# Ou instalar em projeto existente
cd seu-projeto
npx aios-core install
```

O instalador interativo te guia por todas as opções.

### Passo 2: Verificar a Instalação

```bash
npx aios-core doctor
```

Isso verifica se tudo está funcionando corretamente.

### Passo 3: Configurar o IDE

O AIOS funciona dentro do seu IDE (editor de código):

| IDE | Configuração |
|-----|-------------|
| **Antigravity** | ✅ Automático via `GEMINI.md` |
| **Claude Code** | ✅ Automático via `.claude/CLAUDE.md` |
| **Cursor** | Copiar regras de `.cursor/global-rules.md` |
| **Windsurf** | Copiar regras de `.windsurf/global-rules.md` |

### Passo 4: Ativar Seu Primeiro Agente

No chat do seu IDE, digite:

```
@analyst *help
```

Isso ativa o agente Analyst (Alex) e mostra os comandos disponíveis.

### Passo 5: Criar Algo

**Para criar um projeto do zero:**
```
@analyst     → Pesquisa e cria briefing
@pm          → Transforma o briefing em PRD
@architect   → Cria arquitetura técnica  
@sm          → Cria stories de desenvolvimento
@dev         → Implementa cada story
@qa          → Testa e valida
@devops      → Faz deploy
```

**Para usar o Squad CFO do Restaurante:**
```
@gerente-geral *dashboard       → Ver panorama geral
@gerente-geral *novo-prato      → Lançar um prato novo
@gerente-geral *analise-estrategica → Análise da saúde financeira
```

---

## 📁 Outros Squads Disponíveis

Além do CFO, o repositório já tem outros squads prontos:

| Squad | Descrição | Agentes |
|-------|-----------|---------|
| **CFO Restaurante** | Gestão financeira, estoque e estratégia de restaurante | 3 agentes, 13 tarefas |
| **LP Creator** | Criação de landing pages profissionais | 3 agentes |
| **Squad Creator** | Meta-squad que cria outros squads | 3 agentes, 16 tarefas |
| **MMOS Squad** | Squad de grande porte (1395 arquivos) | Squad complexo |
| **Video Downloader** | Download e processamento de vídeos | Squad utilitário |

---

## 🏗️ Como o AIOS é Organizado

```
aios-core/
├── .aios-core/              ← O coração do framework
│   ├── core/                ← 18 módulos: orquestração, memória, qualidade, etc.
│   ├── development/         ← Agentes, tasks, templates, checklists
│   ├── constitution.md      ← As regras sagradas
│   └── scripts/             ← Utilitários
├── .claude/                 ← Configuração para Claude Code
│   ├── agents/              ← 24 agentes (core + squad chiefs)
│   ├── templates/           ← 18 templates profissionais
│   └── skills/              ← 8 habilidades avançadas
├── .antigravity/            ← Configuração para Antigravity
│   └── rules/agents/        ← 12 agentes adaptados
├── squads/                  ← Expansion packs (CFO, LP Creator, etc.)
├── apps/dashboard/          ← Dashboard de observabilidade
├── docs/                    ← Documentação completa
└── tests/                   ← Testes automatizados
```

### Os 18 Módulos Core

O coração do AIOS tem módulos para cada aspecto do desenvolvimento:

| Módulo | Função |
|--------|--------|
| `orchestration/` | Coordena agentes e workflows |
| `memory/` | Memória persistente entre sessões |
| `execution/` | Motor de execução de tarefas |
| `quality-gates/` | Portões automáticos de qualidade |
| `permissions/` | Controle de autoridade dos agentes |
| `events/` | Sistema de eventos entre componentes |
| `session/` | Gerenciamento de sessões |
| `registry/` | Registro de agentes e capabilities |
| `config/` | Sistema de configuração |
| `manifest/` | Manifestos de componentes |
| `health-check/` | Diagnóstico do sistema |
| `migration/` | Migração entre versões |
| `elicitation/` | Extração de requisitos |
| `ideation/` | Geração de ideias |
| `mcp/` | Model Context Protocol |
| `ui/` | Componentes visuais |
| `utils/` | Utilitários |

---

## 🎯 Resumo: Por Que o AIOS Existe

O AIOS resolve os **dois maiores problemas** do desenvolvimento assistido por IA:

### 1. Inconsistência de Planejamento
Sem o AIOS, cada vez que você pede algo a uma IA, ela pode dar uma resposta completamente diferente. O AIOS resolve isso com **templates, constitution e agentes especializados** que garantem saídas consistentes e profissionais.

### 2. Perda de Contexto
Sem o AIOS, quando o agente de development começa a codar, ele não sabe o que o analista descobriu ou o que o arquiteto decidiu. O AIOS resolve isso com **stories hiper-detalhadas** que carregam todo o contexto de um agente para outro.

```
     O AIOS é como a diferença entre:
     
     🏚️  Construir uma casa pedindo favores aleatórios para amigos
     🏗️  Contratar uma construtora com engenheiro, arquiteto, mestre de obras e pedreiros
```

---

## ❓ Perguntas Frequentes

**P: Preciso saber programar para usar o AIOS?**
R: Para os squads de desenvolvimento de software, ajuda. Mas squads como o CFO do Restaurante funcionam 100% em linguagem natural — você só conversa.

**P: O AIOS funciona com qual IA?**
R: Ele funciona com qualquer LLM (ChatGPT, Claude, Gemini) através de IDEs como Antigravity, Claude Code, Cursor ou Windsurf.

**P: Posso criar meus próprios agentes?**
R: Sim! Use a skill **Squad Creator** ou o template `agent-template.yaml` para criar agentes para qualquer domínio.

**P: O AIOS é gratuito?**
R: Sim, é open source sob licença MIT.

**P: Posso usar só os Squads sem o framework todo?**
R: Os squads foram projetados para funcionar dentro do ecossistema AIOS, mas os agentes individuais podem ser adaptados para uso standalone com algum trabalho.

---

*Synkra AIOS — CLI First | Observability Second | UI Third*
*Versão deste guia: 1.0 | Fevereiro 2026*
