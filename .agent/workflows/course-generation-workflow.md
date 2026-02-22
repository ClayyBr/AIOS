---
description: Skill Course Generation — Gerar cursos usando workflow linear NO-SEARCH
---
# 📚 Course Generation Workflow

Workflow linear para geração de cursos usando CreatorOS. Princípio: "Know, don't search."

## Pré-Requisitos

Verificar que existem ANTES de começar:
1. `outputs/courses/{slug}/COURSE-BRIEF.md` (ou criar do template)
2. `expansion-packs/creator-os/checklists/checklist-aula-perfeita.md`
3. `expansion-packs/creator-os/templates/` (todos os templates)
4. `outputs/minds/{professor_slug}/` (se modo clone)

Se FALTANDO → Parar e pedir ao usuário ou criar do template.

## Execução Linear

1. **Verify** — Confirmar que todos os inputs existem
2. **Create/Read** — COURSE-BRIEF.md
3. **Generate** — curriculum.yaml
4. **Generate** — Lessons (uma por uma)
5. **Validate** — Quality checklist (checklist-aula-perfeita)
6. **Fix** — Issues prioritárias
7. **Done**

## File Locations (SEM BUSCA)

| Tipo | Caminho |
|------|---------|
| Templates | `expansion-packs/creator-os/templates/` |
| Checklists | `expansion-packs/creator-os/checklists/` |
| Personas MMOS | `outputs/minds/{professor_slug}/` |
| Output | `outputs/courses/{slug}/` |

## Referências

- Skill completa: `.claude/skills/course-generation-workflow.md`
