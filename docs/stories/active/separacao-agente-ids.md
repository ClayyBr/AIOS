---
status: Draft
epic: 4
story: 1
title: Extração do Motor de Simulação IDS
---

# Story 4.1: Extração do Motor de Simulação IDS

## Status
Draft

## Story
**As a** Gerente do Restaurante (Squad CFO Master),
**I want** extrair as capacidades do Incremental Decision Engine (IDS) do `@arquiteto-lucro` para um agente autônomo e focado (`@ids`),
**so that** eu tenha relatórios forenses precisos, sem risco de alucinações matemáticas devido à sobrecarga de contexto no Arquivo do Lucro, que deve manter o foco apenas no cálculo das fichas técnicas e precificação.

## Acceptance Criteria
1. O manifesto do squad (`squads/CFO/squad.yaml` e `README.md`) precisa refletir o novo agente `@ids`.
2. O arquivo do agente `@arquiteto-lucro` (`squads/CFO/agents/arquiteto-lucro.md`) deve ser enxugado, removendo instruções de processamento macro/grafos/`*simular-impacto`.
3. Um novo agente `@ids` deve ser criado (`squads/CFO/agents/ids.md`), focado 100% em processar as dependências e variações de preços em massa.
4. O `README.md` do squad deve deixar clara a diferença entre pedir uma análise isolada de ficha (`@arquiteto-lucro`) e pedir uma análise de impacto em cascata de custos (`@ids`).

## Tasks / Subtasks
- [ ] Mapear todos os arquivos tocados por esta refatoração
  - [x] `squads/CFO/squad.yaml`
  - [x] `squads/CFO/README.md`
  - [x] `squads/CFO/agents/arquiteto-lucro.md`
  - [x] `squads/CFO/agents/ids.md` (novo)
- [x] Limpar `@arquiteto-lucro.md` (AC: 2)
- [x] Escrever manifesto do `@ids` (AC: 3)
- [x] Atualizar README e squad.yaml para roteamento correto (AC: 1, 4)

## Dev Notes
- **Contexto:** A estrutura anterior sobrecarregava a janela de contexto do `@arquiteto-lucro`, colocando-o em risco de misturar regras do "Simples Nacional" com "Rendimentos de Cocção" numéricas do IDS.
- O novo agente deve agir como uma calculadora pura, cruzando `financial-registry.yaml` ou equivalentes com grafos de dependência e fornecendo outputs objetivos e probabilísticos sem invenções de UX.

### Testing
- Validar se a descrição dos dois agentes, após a refatoração, estão com papéis muito claros e sem sobreposição de propósitos.

## Change Log
| Date       | Version | Description         | Author |
|------------|---------|---------------------|--------|
| 2026-02-20 | 1.0     | Criação inicial     | @po    |

## Dev Agent Record
_A ser preenchido durante a implementação_

### Agent Model Used
TBD
### Debug Log References
TBD
### Completion Notes List
TBD
### File List
TBD

## QA Results
_A ser preenchido após review_
