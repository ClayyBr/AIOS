---
description: Fluxo completo de desenvolvimento de uma story AIOS — desde ativar o agente até push
---

# Develop Story — Workflow AIOS

## Pré-requisito
- Ter uma story criada em `docs/stories/active/`

## Passos

1. **Ative o agente dev:**
   Diga `@dev` para ativar o desenvolvedor Dex

2. **Abra a story:**
   Diga `*develop {story-id}` ou peça para implementar a story

3. **O agente vai:**
   - Ler a story e seus acceptance criteria
   - Analisar os arquivos existentes relevantes
   - Implementar cada task da story
   - Marcar checkboxes conforme completa: `[ ]` → `[x]`
   - Atualizar a seção File List com os arquivos modificados

4. **Após implementação, ative o QA:**
   Diga `@qa` para ativar Quinn e revisar a implementação

5. **QA vai verificar:**
   - Rodar `npm run lint`
   - Rodar `npm run typecheck`
   - Rodar `npm test`
   - Verificar se acceptance criteria foram atendidos

6. **Se tudo OK, ative o devops para push:**
   Diga `@devops` para fazer push (apenas devops tem autoridade de push)

## Referências
- Agentes: `.antigravity/rules/agents/`
- Templates de story: `.claude/templates/story-tmpl.yaml`
- Constitution: `.aios-core/constitution.md`
