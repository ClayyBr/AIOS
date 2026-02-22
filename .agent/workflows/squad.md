---
description: Skill Squad Creator — Criar squads de agentes IA especializados em qualquer domínio
---
# 🎨 Squad Creator — Multi-Agent Orchestration

Cria times de agentes IA especializados usando clonagem de mentes reais (não bots genéricos).

## Filosofia

**"Clone minds > create generic bots."** Pessoas com skin in the game = frameworks melhores.

## Fluxo

### 1. Research First (NÃO perguntar antes)
- Ao receber pedido de squad, IMEDIATAMENTE pesquisar as melhores mentes do domínio
- Executar 3-5 iterações de pesquisa com devil's advocate
- Apresentar lista curada de mentes REAIS

### 2. Mind Cloning
- Para cada mente aprovada, clonar usando `/clone-mind`
- Extrair Voice DNA + Thinking DNA
- Gerar `mind_dna_complete.yaml` por agente

### 3. Squad Assembly
- Criar estrutura em `squads/{domain}/`
- Validar contra quality gates (SC_AGT_001, SC_AGT_002, SC_AGT_003)
- Mínimo 300 linhas por agente com Voice DNA e exemplos

### 4. Validation
- Agents: estrutura + conteúdo + profundidade
- Todos devem ter: persona levels, commands, dependencies
- Quality Score mínimo: 8/10

## Quality Gates

| Gate | Critério |
|------|----------|
| SC_AGT_001 | Estrutura: 300+ linhas, Voice DNA, exemplos |
| SC_AGT_002 | Completude: persona, commands, dependencies |
| SC_AGT_003 | Profundidade: frameworks com teoria, thinking DNA |

## Referências

- Skill completa: `.claude/skills/squad.md`
- Workflows: `squads/squad-creator/workflows/`
- State: `squads/squad-creator/.state.json`
