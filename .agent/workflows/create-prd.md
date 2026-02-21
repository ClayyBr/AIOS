---
description: Criar um PRD (Product Requirements Document) seguindo o template AIOS
---

# Create PRD — Workflow AIOS

## Passos

1. **Leia o template de PRD:**
   Abra e analise o arquivo `.claude/templates/prd-tmpl.yaml` para entender o formato esperado

2. **Ative o agente analyst:**
   Diga `@analyst` para ativar Alex — ele fará a pesquisa e análise inicial

3. **Colete os requisitos:**
   Diga `*help` para ver os comandos disponíveis do analyst
   Forneça ao analyst o contexto do projeto, público-alvo e objetivos

4. **Ative o PM:**
   Diga `@pm` para ativar Morgan — ele vai estruturar o PRD

5. **Gere o PRD:**
   O PM vai criar o documento seguindo o template `prd-tmpl.yaml` com:
   - Visão geral do produto
   - User personas
   - Funcionalidades e requisitos
   - Priorização (MoSCoW)
   - Métricas de sucesso

6. **Salve o PRD:**
   O documento deve ser salvo em `docs/` com nome descritivo

## Templates Disponíveis

- PRD padrão: `.claude/templates/prd-tmpl.yaml`
- PRD brownfield: `.claude/templates/brownfield-prd-tmpl.yaml`
- Project brief: `.claude/templates/project-brief-tmpl.yaml`
