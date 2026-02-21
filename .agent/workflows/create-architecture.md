---
description: Criar documento de Arquitetura seguindo os templates AIOS
---

# Create Architecture — Workflow AIOS

## Passos

1. **Escolha o template adequado:**

   | Cenário           | Template                                              |
   | ----------------- | ----------------------------------------------------- |
   | Projeto novo      | `.claude/templates/architecture-tmpl.yaml`            |
   | Projeto existente | `.claude/templates/brownfield-architecture-tmpl.yaml` |
   | Full-stack        | `.claude/templates/fullstack-architecture-tmpl.yaml`  |
   | Front-end         | `.claude/templates/front-end-architecture-tmpl.yaml`  |

2. **Leia o template escolhido:**
   Analise a estrutura completa do template antes de começar

3. **Ative o agente architect:**
   Diga `@architect` para ativar Aria — ela vai projetar a arquitetura

4. **Forneça o contexto:**
   - PRD existente (se houver)
   - Stack tecnológico desejado
   - Restrições e requisitos não-funcionais

5. **O architect vai gerar:**
   - Visão geral da arquitetura
   - Diagramas de componentes
   - Decisões técnicas (ADRs)
   - Padrões de integração
   - Estratégia de dados

6. **Salve o documento:**
   Em `docs/architecture/` seguindo o formato do template

## Templates Complementares

- Spec front-end: `.claude/templates/front-end-spec-tmpl.yaml`
- Database schema: `.claude/templates/database-schema-request-full.md`
- Database schema (lite): `.claude/templates/database-schema-request-lite.md`
