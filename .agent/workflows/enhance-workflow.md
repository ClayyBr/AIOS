---
description: Skill Enhance Workflow — Pipeline de enhancement com análise de determinismo e roundtable dinâmico
---
# 🔧 Enhance Workflow v2.0

Pipeline de enhancement com análise de determinismo, roundtable dinâmico por domínio, e validação QA.

## Fluxo

```
Pre-flight → Determinism Check → Discovery → Research → Roundtable → Epic → QA Validation
```

### Phase 0: Pre-flight Check
- Verificar que diretório `outputs/enhance/` existe
- Validar que README ou PRD do projeto existe
- Timeout: 30s

### Phase 0.5: Determinism Analysis
**ANTES de gastar tokens**, avaliar se o enhancement pode ser resolvido deterministicamente:
- **rename/migration/config**: → Executar diretamente (sem pipeline)
- **feature/refactor/integration**: → Continuar com pipeline

### Phase 1: Discovery (@architect)
- Analyzer projeto e gerar discovery report
- Output: `outputs/enhance/{slug}/01-discovery.md`

### Phase 2: Research (@analyst)
- Pesquisar dependências e patterns
- Output: `outputs/enhance/{slug}/02-research.md`

### Phase 3: Dynamic Roundtable
Roundtable selecionado automaticamente pelo domínio:
- **code_app**: architect, data-engineer, devops, ux
- **business_strategy**: pm, analyst, po
- **design_ui**: ux-design-expert, architect
- **squad_workflow**: squad-creator, qa, devops

### Phase 4: Create Epic (@pm)
- Gerar epic com stories e acceptance criteria
- Output: `outputs/enhance/{slug}/04-epic.md`

### Phase 5: QA Validation (@qa)
- Validar epic completude e qualidade
- Gate: PASS / CONCERNS / FAIL

## Referências

- Skill completa: `.claude/skills/enhance-workflow.md`
