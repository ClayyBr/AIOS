# GEMINI.md - Synkra AIOS

Este arquivo configura o comportamento do Antigravity/Gemini ao trabalhar neste repositório.

---

## Constitution

O AIOS possui uma **Constitution formal** com princípios inegociáveis e gates automáticos.

**Documento completo:** `.aios-core/constitution.md`

**Princípios fundamentais:**

| Artigo | Princípio                | Severidade     |
| ------ | ------------------------ | -------------- |
| I      | CLI First                | NON-NEGOTIABLE |
| II     | Agent Authority          | NON-NEGOTIABLE |
| III    | Story-Driven Development | MUST           |
| IV     | No Invention             | MUST           |
| V      | Quality First            | MUST           |
| VI     | Absolute Imports         | SHOULD         |

**Gates automáticos bloqueiam violações.** Consulte a Constitution para detalhes completos.

---

## Premissa Arquitetural: CLI First

O Synkra AIOS segue uma hierarquia clara de prioridades que deve guiar **TODAS** as decisões:

```
CLI First → Observability Second → UI Third
```

| Camada            | Prioridade | Descrição                                                      |
| ----------------- | ---------- | -------------------------------------------------------------- |
| **CLI**           | Máxima     | Onde a inteligência vive. Toda execução, decisões e automação. |
| **Observability** | Secundária | Observar e monitorar o que acontece no CLI em tempo real.      |
| **UI**            | Terciária  | Gestão pontual e visualizações quando necessário.              |

### Princípios Derivados

1. **A CLI é a fonte da verdade** - Dashboards apenas observam, nunca controlam
2. **Funcionalidades novas devem funcionar 100% via CLI** antes de ter qualquer UI
3. **A UI nunca deve ser requisito** para operação do sistema
4. **Observabilidade serve para entender** o que o CLI está fazendo, não para controlá-lo
5. **Ao decidir onde implementar algo**, sempre prefira CLI > Observability > UI

> **Referência formal:** Constitution Artigo I - CLI First (NON-NEGOTIABLE)

---

## Estrutura do Projeto

```
aios-core/
├── .aios-core/              # Core do framework
│   ├── core/                # Módulos principais (orchestration, memory, etc.)
│   ├── development/         # Agents, tasks, templates, checklists
│   └── scripts/             # Utilitários e scripts
├── apps/
│   └── dashboard/           # Dashboard Next.js (Observability + UI)
├── bin/                     # CLI executables (aios-init.js, aios.js)
├── src/                     # Source code
├── docs/                    # Documentação
│   └── stories/             # Development stories (active/, completed/)
├── squads/                  # Expansion packs
├── packages/                # Shared packages
└── tests/                   # Testes
```

---

## Sistema de Agentes

### Ativação de Agentes

Use `@agent-name` para ativar um agente:

| Agente              | Persona | Escopo Principal             |
| ------------------- | ------- | ---------------------------- |
| `@dev`              | Dex     | Implementação de código      |
| `@qa`               | Quinn   | Testes e qualidade           |
| `@architect`        | Aria    | Arquitetura e design técnico |
| `@pm`               | Morgan  | Product Management           |
| `@po`               | Pax     | Product Owner, stories/epics |
| `@sm`               | River   | Scrum Master                 |
| `@analyst`          | Alex    | Pesquisa e análise           |
| `@data-engineer`    | Dara    | Database design              |
| `@ux-design-expert` | Uma     | UX/UI design                 |
| `@devops`           | Gage    | CI/CD, git push (EXCLUSIVO)  |

### Comandos de Agentes

Use prefixo `*` para comandos:

- `*help` - Mostrar comandos disponíveis
- `*create-story` - Criar story de desenvolvimento
- `*task {name}` - Executar task específica
- `*exit` - Sair do modo agente

### Mapeamento Agente → Codebase

| Agente           | Diretórios Principais                   |
| ---------------- | --------------------------------------- |
| `@dev`           | `src/`, `packages/`, `.aios-core/core/` |
| `@architect`     | `docs/architecture/`, system design     |
| `@data-engineer` | `packages/db/`, migrations, schema      |
| `@qa`            | `tests/`, `*.test.js`, quality gates    |
| `@po`            | `docs/stories/`, epics, requirements    |
| `@devops`        | `.github/`, CI/CD, git operations       |

### Agentes Detalhados

Os arquivos detalhados de cada agente estão em:

- `.antigravity/rules/agents/` — Agentes adaptados para Antigravity
- `.claude/agents/` — Referência completa (24 agentes incluindo chiefs de squads)

---

## Story-Driven Development

1. **Trabalhe a partir de stories** - Todo desenvolvimento começa com uma story em `docs/stories/`
2. **Atualize progresso** - Marque checkboxes conforme completa: `[ ]` → `[x]`
3. **Rastreie mudanças** - Mantenha a seção File List na story
4. **Siga critérios** - Implemente exatamente o que os acceptance criteria especificam

### Workflow de Story

```
@po *create-story → @dev implementa → @qa testa → @devops push
```

---

## Padrões de Código

### Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------||
| Componentes | PascalCase | `WorkflowList` |
| Hooks | prefixo `use` | `useWorkflowOperations` |
| Arquivos | kebab-case | `workflow-list.tsx` |
| Constantes | SCREAMING_SNAKE_CASE | `MAX_RETRIES` |
| Interfaces | PascalCase + sufixo | `WorkflowListProps` |

### Imports

**Sempre use imports absolutos.** Nunca use imports relativos.

```typescript
// ✓ Correto
import { useStore } from '@/stores/feature/store';

// ✗ Errado
import { useStore } from '../../../stores/feature/store';
```

**Ordem de imports:**

1. React/core libraries
2. External libraries
3. UI components
4. Utilities
5. Stores
6. Feature imports
7. CSS imports

### TypeScript

- Sem `any` - Use tipos apropriados ou `unknown` com type guards
- Sempre defina interface de props para componentes
- Use `as const` para objetos/arrays constantes
- Tipos de ref explícitos: `useRef<HTMLDivElement>(null)`

### Error Handling

```typescript
try {
  // Operation
} catch (error) {
  logger.error(`Failed to ${operation}`, { error });
  throw new Error(`Failed to ${operation}: ${error instanceof Error ? error.message : 'Unknown'}`);
}
```

---

## Templates AIOS

Os templates de documentos estão em `.claude/templates/` e devem ser usados como base ao gerar documentos:

| Template                   | Arquivo                                               | Uso                                  |
| -------------------------- | ----------------------------------------------------- | ------------------------------------ |
| **PRD**                    | `.claude/templates/prd-tmpl.yaml`                     | Documento de Requisitos do Produto   |
| **Arquitetura**            | `.claude/templates/architecture-tmpl.yaml`            | Arquitetura de Sistema               |
| **Arquitetura Full-Stack** | `.claude/templates/fullstack-architecture-tmpl.yaml`  | Arquitetura completa                 |
| **Arquitetura Front-end**  | `.claude/templates/front-end-architecture-tmpl.yaml`  | Arquitetura front-end                |
| **Spec Front-end**         | `.claude/templates/front-end-spec-tmpl.yaml`          | Especificação front-end              |
| **Story**                  | `.claude/templates/story-tmpl.yaml`                   | Stories de desenvolvimento           |
| **QA Gate**                | `.claude/templates/qa-gate-tmpl.yaml`                 | Gates de qualidade                   |
| **Project Brief**          | `.claude/templates/project-brief-tmpl.yaml`           | Brief do projeto                     |
| **Brainstorming**          | `.claude/templates/brainstorming-output-tmpl.yaml`    | Output de brainstorming              |
| **Market Research**        | `.claude/templates/market-research-tmpl.yaml`         | Pesquisa de mercado                  |
| **Competitor Analysis**    | `.claude/templates/competitor-analysis-tmpl.yaml`     | Análise de concorrentes              |
| **Brownfield PRD**         | `.claude/templates/brownfield-prd-tmpl.yaml`          | PRD para projetos existentes         |
| **Brownfield Arch**        | `.claude/templates/brownfield-architecture-tmpl.yaml` | Arquitetura para projetos existentes |
| **Database Schema (Full)** | `.claude/templates/database-schema-request-full.md`   | Schema completo                      |
| **Database Schema (Lite)** | `.claude/templates/database-schema-request-lite.md`   | Schema simplificado                  |
| **Agent Template**         | `.claude/templates/agent-template.yaml`               | Template de agente                   |
| **Task Template**          | `.claude/templates/task-template.md`                  | Template de task                     |
| **Workflow Template**      | `.claude/templates/workflow-template.yaml`            | Template de workflow                 |

> **IMPORTANTE:** Ao criar PRDs, arquiteturas, stories ou qualquer documento AIOS, sempre leia o template correspondente da tabela acima e siga seu formato.

---

## Skills AIOS

Skills são habilidades avançadas disponíveis em `.claude/skills/`:

| Skill                 | Arquivo                                        | Descrição                                    |
| --------------------- | ---------------------------------------------- | -------------------------------------------- |
| **Squad Creator**     | `.claude/skills/squad.md`                      | Criar e gerenciar squads de agentes IA       |
| **Mind Clone**        | `.claude/skills/clone-mind.md`                 | Clonar conhecimento de especialistas humanos |
| **Enhance Workflow**  | `.claude/skills/enhance-workflow.md`           | Melhorar workflows existentes                |
| **MCP Builder**       | `.claude/skills/mcp-builder/`                  | Construir servidores MCP                     |
| **Skill Creator**     | `.claude/skills/skill-creator/`                | Criar novas skills                           |
| **Ralph**             | `.claude/skills/ralph.md`                      | Assistente Ralph                             |
| **Course Generation** | `.claude/skills/course-generation-workflow.md` | Gerar cursos                                 |
| **Architect First**   | `.claude/skills/architect-first/`              | Workflow de arquitetura primeiro             |

> Ao usar uma skill, leia o arquivo completo antes de executar.

---

## Testes & Quality Gates

### Comandos de Teste

```bash
npm test                    # Rodar testes
npm run test:coverage       # Testes com cobertura
npm run lint                # ESLint
npm run typecheck           # TypeScript
```

### Quality Gates (Pre-Push)

Antes de push, todos os checks devem passar:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test            # Jest
```

---

## Convenções Git

### Commits

Seguir Conventional Commits:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `test:` - Testes
- `chore:` - Manutenção
- `refactor:` - Refatoração

**Referencie story ID:** `feat: implement feature [Story 2.1]`

### Branches

- `main` - Branch principal
- `feat/*` - Features
- `fix/*` - Correções
- `docs/*` - Documentação

### Push Authority

**Apenas `@devops` pode fazer push para remote.**

---

## Comandos Frequentes

### Desenvolvimento

```bash
npm run dev                 # Iniciar desenvolvimento
npm test                    # Rodar testes
npm run lint                # Verificar estilo
npm run typecheck           # Verificar tipos
npm run build               # Build produção
```

### AIOS

```bash
npx aios-core install       # Instalar AIOS
npx aios-core doctor        # Diagnóstico do sistema
npx aios-core info          # Informações do sistema
```

### Dashboard (apps/dashboard/)

```bash
cd apps/dashboard
npm install
npm run dev                 # Desenvolvimento
npm run build               # Build produção
```

---

## Debug

### Habilitar Debug

```bash
$env:AIOS_DEBUG = "true"
```

---

_Synkra AIOS Antigravity Configuration v1.0_
_CLI First | Observability Second | UI Third_
