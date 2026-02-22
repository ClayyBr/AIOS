---
description: Skill Clone Mind — Orquestração multi-agente para clonagem cognitiva usando DNA Mental™
---
# 🧠 Clone Mind — DNA Mental™ 9-Layer Pipeline

Cria clones cognitivos de alta fidelidade que pensam, comunicam e decidem como o especialista original.

## Pré-Requisitos

- Slug/nome do especialista a clonar
- Fontes de conteúdo disponíveis (vídeos, livros, entrevistas, posts)

## Pipeline (5 Fases)

### Fase 1: Viability Assessment
1. Avaliar disponibilidade e qualidade das fontes
2. Recomendar modo de workflow (full/lite)
3. Output: `outputs/minds/{slug}/analysis/viability-assessment.yaml`

### Fase 2: Source Collection & Validation
1. Coletar e validar fontes para o especialista
2. Triangular informações
3. Output: `outputs/minds/{slug}/sources/sources-master.yaml`

### Fase 3: Analysis (Execução Paralela)
1. **Behavioral Patterns** — Mapear padrões comportamentais e triggers
2. **Cognitive Architecture** — Extrair frameworks, modelos mentais, heurísticas
3. Outputs em `outputs/minds/{slug}/analysis/`

### Fase 4: Synthesis & Identity Core
1. **HUMAN CHECKPOINT** — Parar para validação humana nos layers L6-L8 (Identity Core)
   - Opções: APPROVE / REVISE / ABORT
2. Integrar conhecimento, criar conexões, gerar frases-assinatura
3. Output: `outputs/minds/{slug}/synthesis/`

### Fase 5: Quality Validation
1. Validar fidelidade do clone (score > 90%)
2. Testar use cases e deployment readiness
3. Output: `outputs/minds/{slug}/quality/fidelity-score.yaml`

## Referências

- Skill completa: `.claude/skills/clone-mind.md`
- Workflows: `squads/mmos/workflows/*.yaml`
- Output: `outputs/minds/{slug}/`
