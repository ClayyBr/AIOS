# Synkra AIOS — Antigravity Rules

## Constitution (Princípios Inegociáveis)

| Artigo | Princípio | Severidade |
|--------|-----------|------------|
| I | CLI First | NON-NEGOTIABLE |
| II | Agent Authority | NON-NEGOTIABLE |
| III | Story-Driven Development | MUST |
| IV | No Invention | MUST |
| V | Quality First | MUST |
| VI | Absolute Imports | SHOULD |

## Hierarquia: CLI First → Observability → UI

1. A CLI é a fonte da verdade — Dashboards apenas observam
2. Funcionalidades novas devem funcionar 100% via CLI antes de ter UI
3. A UI nunca deve ser requisito para operação do sistema

## Ativação de Agentes

Use `@agent-name` no chat ou `/aios-{agent}` como workflow:

| Agente | Persona | Workflow |
|--------|---------|----------|
| `@dev` | Dex 💻 | `/aios-dev` |
| `@qa` | Quinn ✅ | `/aios-qa` |
| `@architect` | Aria 🏛️ | `/aios-architect` |
| `@pm` | Morgan 📋 | `/aios-pm` |
| `@po` | Pax 🎯 | `/aios-po` |
| `@sm` | River 🌊 | `/aios-sm` |
| `@analyst` | Atlas 🔍 | `/aios-analyst` |
| `@devops` | Gage ⚡ | `/aios-devops` |
| `@data-engineer` | Dara 📊 | `/aios-data-engineer` |
| `@ux-design-expert` | Uma 🎨 | `/aios-ux` |
| `@aios-master` | Orion 👑 | — |
| `@squad-creator` | Craft 🏗️ | — |

## Resolução de Dependências

Quando um agente referencia dependências (tasks, templates, checklists, scripts, data):

```
.aios-core/development/{type}/{name}
```

Exemplo: `create-doc.md` → `.aios-core/development/tasks/create-doc.md`

## Padrões de Código (Resumo)

- **Imports:** Sempre absolutos (`@/stores/...` não `../../../`)
- **Componentes:** PascalCase. **Hooks:** prefixo `use`. **Arquivos:** kebab-case
- **TypeScript:** Sem `any`. Interfaces para props. `as const` para constantes.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`)
- **Push:** Apenas `@devops` pode fazer push para remote

## Story-Driven Development

```
@po *create-story → @dev implementa → @qa testa → @devops push
```

Todo desenvolvimento começa com uma story em `docs/stories/`.
