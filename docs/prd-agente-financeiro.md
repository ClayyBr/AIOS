# PRD — Agente Financeiro (CFO Squad)

## Goals and Background Context

### Goals

- Criar um agente especializado em **contabilidade gerencial e estratégia financeira** para o CFO Squad
- **Desafogar o `arquiteto-lucro`**, migrando funções contábeis (DRE, CMV auditoria, relatórios) para o novo agente
- Adicionar **capacidades financeiras novas** que não existem hoje: fluxo de caixa, projeções, orçamento, simulação de impostos
- Manter **compatibilidade total** com a orquestração do `gerente-geral` (agora com 3 especialistas)
- Garantir que o **protocolo de comunicação** entre agentes funcione sem conflitos de escopo

### Background Context

O CFO Squad atualmente opera com 3 agentes: `gerente-geral` (orquestração), `arquiteto-lucro` (finanças) e `controlador-estoque` (logística). A análise do @analyst identificou que o `arquiteto-lucro` concentra 7 tasks e 11 comandos cobrindo 3 perfis distintos — engenheiro de custos, contador e planejador. Isso causa sobrecarga de responsabilidades e impede a evolução de capacidades financeiras mais sofisticadas.

A divisão proposta separa o foco: `arquiteto-lucro` fica com custos operacionais (fichas, precificação, cardápio), enquanto o novo `financeiro` assume contabilidade gerencial (DRE, CMV auditoria, relatórios) e adiciona capacidades estratégicas (projeções, fluxo de caixa, orçamento).

Documentos de referência:
- [analise-divisao-agentes-cfo.md](file:///c:/Users/Cleison/Desktop/Google/aios-core/docs/analise-divisao-agentes-cfo.md)
- [Manual_Contabilidade_Restaurante.md](file:///c:/Users/Cleison/Desktop/Google/aios-core/squads/CFO/data/Manual_Contabilidade_Restaurante.md) — Manual técnico de Contabilidade de Performance cobrindo CMV (real/teórico/variância), inteligência tributária (Simples Nacional, monofásica, ICMS-ST), CMO, DRE gerencial (USALI), fluxo de caixa, balanço patrimonial, KPIs avançados (Kasavana & Smith, RevPASH) e controle interno

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 16/02/2026 | 1.0 | PRD criado | @pm (Morgan) |

---

## Requirements

### Functional

- **FR1:** O agente financeiro deve gerar DRE gerencial mensal completo com KPIs, usando o template `dre-mensal-template.md` e dados fornecidos pelo dono
- **FR2:** O agente deve auditar CMV do período com decomposição de variância (preço, eficiência, mix) e separação por centro de custo (buffet/executivo/delivery)
- **FR3:** O agente deve gerar relatório mensal formatado para sócios em linguagem acessível, sem jargões técnicos, usando o template `relatorio-socios-template.md`
- **FR4:** O agente deve projetar fluxo de caixa semanal/mensal com previsão de entradas e saídas
- **FR5:** O agente deve simular cenários financeiros (pessimista, realista, otimista) com projeção de faturamento, custos e lucro
- **FR6:** O agente deve calcular e atualizar o ponto de equilíbrio (break-even) em número de clientes/dia e faturamento mínimo
- **FR7:** O agente deve simular impacto de mudança de faixa do Simples Nacional nos preços e lucro
- **FR8:** O agente deve apresentar dashboard consolidado de KPIs financeiros (CMV%, Prime Cost%, Lucro Líquido%, Ticket Médio)
- **FR9:** O agente deve criar orçamento mensal com metas por centro de custo e acompanhar realizado vs planejado
- **FR10:** O agente deve consultar dados de fichas técnicas do `arquiteto-lucro` (leitura de `fichas/`) para cálculos de CMV e DRE
- **FR11:** O agente deve consultar dados de inventário do `controlador-estoque` (leitura de `estoque/`) para cálculos de CMV
- **FR12:** O agente deve salvar relatórios e DREs em `squads/CFO/relatorios/` seguindo a convenção de nomenclatura existente
- **FR13:** O agente deve executar o checklist de fechamento mensal (`fechamento-mensal.md`)
- **FR14:** O agente deve usar o `Manual_Contabilidade_Restaurante.md` como base de conhecimento técnico para todos os cálculos e análises, incluindo: fórmulas de CMV (real e teórico), decomposição de variância, inteligência tributária (monofásica, ICMS-ST), custos de mão de obra (CLT, 13º, férias, gorjeta), DRE gerencial padrão USALI, fluxo de caixa (DFC direto/indireto), engenharia de menu (Kasavana & Smith) e procedimentos de auditoria interna

### Non Functional

- **NFR1:** Todas as respostas devem ser em Português do Brasil (pt-BR)
- **NFR2:** Números devem seguir o padrão brasileiro (R$ 1.234,56) e usar emojis de status (✅ ⚠️ 🚨)
- **NFR3:** Relatórios para sócios devem ter no máximo 2 páginas e linguagem acessível
- **NFR4:** O agente deve ser compatível com o sistema de salvamento existente (paths dentro de `squads/CFO/`)
- **NFR5:** O agent file (`.md`) deve seguir o formato AIOS padrão (YAML frontmatter + system prompt markdown)
- **NFR6:** Todas as tasks devem ter o campo `agent: financeiro` e seguir o formato existente das tasks do squad
- **NFR7:** O `squad.yaml` deve ser atualizado com o novo agente e suas tasks

---

## Technical Assumptions

### Repository Structure

Monorepo — o agente vive dentro de `squads/CFO/` junto com os outros agentes do squad.

### Service Architecture

Agent-based — cada agente é um arquivo `.md` com system prompt, dependências declaradas em YAML frontmatter, e tasks em `tasks/`.

### Testing Requirements

Validação manual — agents de squad não têm testes automatizados. A validação é feita pelo @qa executando cada comando do agente e verificando outputs contra os AC.

### Additional Technical Assumptions

- O agente financeiro tem **permissão de leitura** em todos os diretórios do squad (fichas, estoque, relatorios, data)
- O agente financeiro tem **permissão de escrita** apenas em `relatorios/` e `insights/`
- O protocolo de comunicação com outros agentes é via **leitura de arquivos compartilhados**, não chamadas diretas
- O `gerente-geral` será atualizado para reconhecer e rotear para o `@financeiro`
- Tasks migradas (`analisar-cmv`, `gerar-dre`, `relatorio-mensal`) mantêm a mesma lógica, apenas mudam o campo `agent:`

---

## Epic List

### Epic 1: Agente Base e Migração de Funções

Criar o agente financeiro e migrar as 3 tasks existentes do `arquiteto-lucro`, ajustando o squad para operar com 3 especialistas.

### Epic 2: Capacidades Financeiras Novas

Adicionar as 6 novas tasks que expandem as capacidades do squad: fluxo de caixa, projeções, break-even, impostos, indicadores e orçamento.

---

## Epic 1: Agente Base e Migração de Funções

**Objetivo:** Estabelecer o agente financeiro funcional com as capacidades já existentes (DRE, CMV, relatório), integrá-lo ao squad sem quebrar nada, e ajustar o `arquiteto-lucro` para refletir seu novo escopo reduzido.

### Story 2.1: Criar o Agente Financeiro

**As a** dono de restaurante,
**I want** um agente especializado em contabilidade gerencial,
**so that** eu tenha um CFO virtual focado em DRE, relatórios e análise financeira macro.

#### Acceptance Criteria

1. Arquivo `agents/financeiro.md` criado com system prompt completo no formato AIOS (YAML frontmatter + markdown)
2. O agente deve declarar dependência nas tasks: `analisar-cmv.md`, `gerar-dre.md`, `relatorio-mensal.md`
3. O agente deve declarar dependência nos templates: `dre-mensal-template.md`, `relatorio-socios-template.md`
4. O agente deve declarar dependência nos data files: `modelo-dre-restaurante.md`, `Engenharia de Custos e Análise US.md`, `Gestão de CMV e Eficiência Operacional BR.md`, `Manual_Contabilidade_Restaurante.md`
5. O agente deve declarar dependência no checklist: `fechamento-mensal.md`
6. O system prompt deve definir persona, princípios, regras operacionais, comandos (13), formato de resposta e segurança
7. O campo `whenToUse` deve descrever claramente quando usar este agente vs o `arquiteto-lucro`

### Story 2.2: Migrar Tasks e Ajustar Arquiteto do Lucro

**As a** dono de restaurante,
**I want** que as funções contábeis sejam do agente financeiro e as de custo fiquem no arquiteto,
**so that** cada agente tenha escopo claro e especializado.

#### Acceptance Criteria

1. `tasks/analisar-cmv.md` — campo `agent:` alterado para `financeiro`
2. `tasks/gerar-dre.md` — campo `agent:` alterado para `financeiro`
3. `tasks/relatorio-mensal.md` — campo `agent:` alterado para `financeiro`
4. `agents/arquiteto-lucro.md` — removidas dependências das 3 tasks migradas
5. `agents/arquiteto-lucro.md` — removidos comandos `*cmv`, `*dre`, `*relatorio` e `*checklist` (fechamento)
6. `agents/arquiteto-lucro.md` — atualizado `role:` e `whenToUse:` para refletir foco em custos operacionais
7. Nenhuma task ou template deve ser deletado — apenas se movem entre agentes

### Story 2.3: Atualizar Orquestração (Gerente Geral + Squad)

**As a** dono de restaurante,
**I want** que o gerente geral saiba delegar para 3 especialistas,
**so that** quando eu peço "como está o financeiro" ele sabe acionar o agente certo.

#### Acceptance Criteria

1. `agents/gerente-geral.md` — lista de agentes atualizada com `@financeiro`
2. `agents/gerente-geral.md` — `dependencies.agents` inclui `financeiro.md`
3. `tasks/gerir-operacao.md` — adicionados exemplos de roteamento para `@financeiro` (ex: "quanto lucrei?", "faz o DRE", "relatório para sócios")
4. `squad.yaml` — seção `agents:` inclui `financeiro`
5. `squad.yaml` — tasks do financeiro listadas na seção `tasks:`
6. `README.md` — atualizado com o 4º agente e seus comandos

---

## Epic 2: Capacidades Financeiras Novas

**Objetivo:** Expandir o squad com 6 novas tasks que adicionam capacidades financeiras que não existiam antes, transformando o `financeiro` num CFO virtual completo.

### Story 2.4: Fluxo de Caixa e Projeções

**As a** dono de restaurante,
**I want** projetar meu fluxo de caixa e simular cenários,
**so that** eu saiba se vou ter dinheiro em caixa para pagar as contas do mês.

#### Acceptance Criteria

1. Nova task `tasks/fluxo-caixa.md` criada com steps para: coletar entradas previstas, coletar saídas fixas/variáveis, calcular saldo diário/semanal, alertar riscos de caixa negativo
2. Nova task `tasks/projecao-cenarios.md` criada com steps para: definir 3 cenários (pessimista, realista, otimista), projetar faturamento, custos e lucro, calcular probabilidade de cada cenário
3. Ambas as tasks declaradas como dependência do agente financeiro
4. Ambas as tasks adicionadas ao `squad.yaml`
5. Comandos `*fluxo-caixa` e `*projecao` funcionais no agente financeiro

### Story 2.5: Break-Even, Impostos e Indicadores

**As a** dono de restaurante,
**I want** visualizar meu ponto de equilíbrio, simular impostos e ter um dashboard de KPIs,
**so that** eu tome decisões baseadas em dados e não em achismo.

#### Acceptance Criteria

1. Nova task `tasks/break-even.md` criada com steps para: calcular custos fixos totais, calcular margem de contribuição, calcular ponto de equilíbrio em clientes/dia e faturamento
2. Nova task `tasks/simular-impostos.md` criada com steps para: informar faturamento dos últimos 12 meses, identificar faixa do Simples Nacional, calcular alíquota efetiva, simular impacto de mudança de faixa
3. Nova task `tasks/indicadores-financeiros.md` criada com steps para: consolidar KPIs (CMV%, Prime Cost%, Lucro%, Ticket Médio, Break-even), classificar cada indicador (✅⚠️🚨), mostrar tendência
4. Todas as 3 tasks declaradas como dependência do agente financeiro
5. Todas as 3 tasks adicionadas ao `squad.yaml`
6. Comandos `*break-even`, `*impostos` e `*indicadores` funcionais

### Story 2.6: Orçamento Mensal

**As a** dono de restaurante,
**I want** definir um orçamento mensal e acompanhar realizado vs planejado,
**so that** eu saiba se estou gastando mais ou menos do que o previsto.

#### Acceptance Criteria

1. Nova task `tasks/orcamento-mensal.md` criada com steps para: definir metas de receita e custos por categoria, registrar valores realizados, calcular variação (R$ e %), alertar desvios > 10%
2. Task declarada como dependência do agente financeiro
3. Task adicionada ao `squad.yaml`
4. Comando `*orcamento` funcional
5. Template `templates/orcamento-mensal-template.md` criado com estrutura: categorias de receita, CMV, MO, custos fixos, despesas, com colunas planejado/realizado/variação

---

## Next Steps

### Architect Prompt

> @architect, use o PRD `docs/prd-agente-financeiro.md` e a análise de divisão `docs/analise-divisao-agentes-cfo.md` como base para criar o design técnico do agente financeiro. Foque no system prompt, protocolo de comunicação entre os 3 especialistas, e a estrutura detalhada de cada task nova.

### Story Creation Prompt

> @po, use o PRD para criar as stories de desenvolvimento no formato AIOS, uma para cada story listada no Epic 1 e Epic 2.
