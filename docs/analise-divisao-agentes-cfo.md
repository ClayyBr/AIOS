# 🔬 Análise de Divisão de Responsabilidades — CFO Squad

**Agente:** Alex (@analyst)
**Data:** 16/02/2026
**Objetivo:** Mapear todas as funções do `arquiteto-lucro` e propor a divisão com o novo agente `financeiro`

---

## 1. Situação Atual — Mapa de Responsabilidades

### Distribuição de Tasks por Agente

| Task | Agente Atual | Domínio |
|------|:------------:|---------|
| `criar-ficha-tecnica.md` | 💰 arquiteto-lucro | Custos operacionais |
| `precificar-prato.md` | 💰 arquiteto-lucro | Custos operacionais |
| `analisar-cmv.md` | 💰 arquiteto-lucro | Contabilidade / Auditoria |
| `gerar-dre.md` | 💰 arquiteto-lucro | Contabilidade / Relatórios |
| `planejar-cardapio.md` | 💰 arquiteto-lucro | Planejamento operacional |
| `avaliar-fornecedor.md` | 💰 arquiteto-lucro | Compras / Suprimentos |
| `relatorio-mensal.md` | 💰 arquiteto-lucro | Relatórios / Comunicação |
| `registrar-entrada.md` | 📦 controlador-estoque | Logística |
| `registrar-saida.md` | 📦 controlador-estoque | Logística |
| `fazer-inventario.md` | 📦 controlador-estoque | Logística |
| `alerta-estoque.md` | 📦 controlador-estoque | Logística |
| `curva-abc.md` | 📦 controlador-estoque | Logística / Análise |
| `estimar-consumo.md` | 📦 controlador-estoque | Logística |
| `gerir-operacao.md` | 👔 gerente-geral | Orquestração |

### Diagnóstico

```
📊 Carga por agente:
        arquiteto-lucro:    7 tasks  +  11 comandos  +  3 templates  ← SOBRECARREGADO
   controlador-estoque:    6 tasks  +   4 comandos  +  0 templates  ← Adequado
          gerente-geral:    1 task   +   4 comandos  +  0 templates  ← Adequado
```

> ⚠️ **Problema:** O `arquiteto-lucro` concentra funções de **3 perfis distintos**: engenheiro de custos (fichas, precificação), contador/CFO (DRE, CMV, relatórios) e planejador (cardápio, fornecedor). Isso gera um agente "faz-tudo" que perde especialização.

---

## 2. Proposta de Divisão

### Princípio Guia

```
Quem CALCULA CUSTOS DE PRATO ≠ Quem FAZ CONTABILIDADE E RELATÓRIOS
```

- **Arquiteto do Lucro** → Foco em **custos operacionais do dia-a-dia** (ficha técnica, precificação, cardápio, fornecedor)
- **Financeiro** → Foco em **contabilidade gerencial, relatórios e análise macro** (DRE, CMV auditoria, relatórios, projeções)

### Matriz RACI Proposta

> R = Responsável | A = Aprovador | C = Consultado | I = Informado

| Função | Arquiteto Lucro | Financeiro (NOVO) | Controlador Estoque | Gerente Geral |
|--------|:---------------:|:-----------------:|:-------------------:|:-------------:|
| **Ficha técnica** | **R** | I | C (estoque) | I |
| **Precificação** | **R** | C (impostos) | — | I |
| **Cardápio semanal** | **R** | C (orçamento) | C (estoque) | A |
| **Avaliar fornecedor** | **R** | C (impacto financeiro) | C (qualidade) | I |
| **Análise CMV** | C (por prato) | **R** | C (estoque) | I |
| **DRE gerencial** | — | **R** | — | A |
| **Relatório mensal** | — | **R** | — | A |
| **Projeções / cenários** | — | **R** | — | A |
| **Fluxo de caixa** | — | **R** | — | A |
| **Impostos (Simples)** | — | **R** | — | I |
| **Break-even / ponto equilíbrio** | — | **R** | — | I |
| **Estoque (entradas/saídas)** | — | — | **R** | I |
| **Inventário / par stock** | — | — | **R** | I |
| **Curva ABC** | — | C | **R** | I |
| **Orquestração** | — | — | — | **R** |

---

## 3. Detalhamento por Agente

### 💰 Arquiteto do Lucro (após divisão)

**Foco redefinido:** Engenheiro de Custos e Precificação Operacional

| O que FICA | Justificativa |
|-----------|---------------|
| `*ficha-tecnica` | Custo de prato é operacional — requer FC, FCc, ingredientes |
| `*precificar` | Markup divisor é extensão direta da ficha técnica |
| `*cardapio` | Planejamento de cardápio é operacional (sazonalidade, cross-utilization) |
| `*fornecedor` | Avaliação por custo real (preço × FC) é competência de custos |
| `*salvar` | Salvar insights de custos |

| O que SAI | Para onde vai | Justificativa |
|-----------|:------------:|---------------|
| `*cmv` (auditoria mensal) | 📊 Financeiro | CMV mensal é contabilidade, não custo de prato |
| `*dre` | 📊 Financeiro | DRE é demonstrativo contábil |
| `*relatorio` | 📊 Financeiro | Relatório para sócios é comunicação financeira |
| `*checklist` (fechamento mensal) | 📊 Financeiro | Fechamento é processo contábil |

> **Comandos restantes:** `*help`, `*ficha-tecnica`, `*precificar`, `*cardapio`, `*fornecedor`, `*salvar`, `*chat-mode`, `*exit` (8 comandos)

### 📊 Financeiro (NOVO agente)

**Foco:** CFO Virtual — Contabilidade Gerencial, Relatórios e Estratégia Financeira

| Função que RECEBE | De onde vem | Justificativa |
|------------------|:-----------:|---------------|
| `*cmv` (auditoria) | arquiteto-lucro | Auditoria de CMV é análise contábil macro |
| `*dre` | arquiteto-lucro | DRE é demonstrativo contábil gerencial |
| `*relatorio` | arquiteto-lucro | Comunicação financeira para stakeholders |
| `*checklist` (fechamento) | arquiteto-lucro | Processo de fechamento é contabilidade |

| Função NOVA | Descrição |
|-------------|-----------|
| `*fluxo-caixa` | Projeção de fluxo de caixa (entradas/saídas previstas) |
| `*projecao` | Simulação de cenários financeiros (otimista, realista, pessimista) |
| `*break-even` | Cálculo de ponto de equilíbrio atualizado |
| `*impostos` | Simulação de faixa do Simples Nacional e impacto em preços |
| `*indicadores` | Dashboard de KPIs financeiros consolidados |
| `*orcamento` | Orçamento mensal/semanal com metas por centro de custo |

> **Comandos totais:** `*help`, `*cmv`, `*dre`, `*relatorio`, `*checklist`, `*fluxo-caixa`, `*projecao`, `*break-even`, `*impostos`, `*indicadores`, `*orcamento`, `*chat-mode`, `*exit` (13 comandos)

### 📦 Controlador de Estoque (sem mudanças)

Mantém todas as 6 tasks atuais. Sem alterações.

### 👔 Gerente Geral (ajustes na orquestração)

Precisa ser atualizado para reconhecer **3 especialistas** ao invés de 2:

```diff
 Você coordena os agentes especialistas:
 - 💰 `@arquiteto-lucro` (Custos e Precificação)
+- 📊 `@financeiro` (CFO — DRE, Relatórios, Projeções)
 - 📦 `@controlador-estoque` (Logística/Ops)
```

---

## 4. Protocolo de Comunicação Entre Agentes

```
                        👔 GERENTE GERAL
                       /       |        \
                      /        |         \
                💰 Arq.Lucro  📊 Financeiro  📦 Estoque
                     ↕                         ↕
              Dados cruzados:            Dados cruzados:
              ficha → financeiro         estoque → financeiro
              (custo de prato)           (valor em estoque)
```

### Fluxos de Dados

| De → Para | Dado | Quando |
|-----------|------|--------|
| Arq. Lucro → Financeiro | Custo de prato (ficha técnica) | Quando financeiro calcula CMV ou DRE |
| Estoque → Financeiro | Valor total de inventário, compras do período | Quando financeiro faz DRE ou CMV |
| Financeiro → Arq. Lucro | Faixa do Simples Nacional, % impostos | Quando arquiteto precifica |
| Financeiro → Gerente Geral | DRE, KPIs, alertas financeiros | Dashboard, relatórios |
| Estoque → Arq. Lucro | CMP atualizado de insumos | Quando arquiteto cria/atualiza ficha |

---

## 5. Impacto nos Arquivos Existentes

| Arquivo | Ação | Detalhe |
|---------|:----:|--------|
| `agents/financeiro.md` | **CRIAR** | Novo system prompt do agente |
| `agents/arquiteto-lucro.md` | **MODIFICAR** | Remover `*cmv`, `*dre`, `*relatorio`, `*checklist-fechamento` |
| `agents/gerente-geral.md` | **MODIFICAR** | Adicionar `@financeiro` na lista de especialistas |
| `tasks/analisar-cmv.md` | **MODIFICAR** | Mudar `agent: arquiteto-lucro` → `agent: financeiro` |
| `tasks/gerar-dre.md` | **MODIFICAR** | Mudar `agent: arquiteto-lucro` → `agent: financeiro` |
| `tasks/relatorio-mensal.md` | **MODIFICAR** | Mudar `agent: arquiteto-lucro` → `agent: financeiro` |
| `tasks/fluxo-caixa.md` | **CRIAR** | Nova task |
| `tasks/projecao-cenarios.md` | **CRIAR** | Nova task |
| `tasks/break-even.md` | **CRIAR** | Nova task |
| `tasks/simular-impostos.md` | **CRIAR** | Nova task |
| `tasks/indicadores-financeiros.md` | **CRIAR** | Nova task |
| `tasks/orcamento-mensal.md` | **CRIAR** | Nova task |
| `squad.yaml` | **MODIFICAR** | Adicionar agente + novas tasks |
| `gerir-operacao.md` | **MODIFICAR** | Adicionar roteamento para `@financeiro` |

**Resumo:** 6 arquivos novos + 7 arquivos modificados = **13 arquivos impactados**

---

## 6. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|:------------:|:-------:|-----------|
| Dono confunde qual agente chamar (custo vs finance) | Média | Baixo | Gerente Geral faz roteamento automático; `whenToUse` claro |
| Financeiro precisa de dados que estão no domínio do Arq. Lucro | Alta | Médio | Definir protocolo de leitura cruzada (financeiro lê `fichas/`) |
| Tasks migradas perdem contexto | Baixa | Alto | Manter mesma lógica, apenas trocar `agent:` no YAML |
| Gerente Geral não sabe delegar para 3 agentes | Média | Médio | Atualizar `gerir-operacao.md` com exemplos dos 3 fluxos |

---

## 7. Recomendação Final

| Aspecto | Recomendação |
|---------|-------------|
| **Nome do agente** | `financeiro` (alinhado com termos do mercado BR) |
| **Persona** | "Controller Financeiro" — perfil analítico e strategic |
| **Prioridade** | 🔴 Alta — o `arquiteto-lucro` está sobrecarregado |
| **Complexidade** | 🟡 Média — 13 arquivos, maioria são ajustes pontuais |
| **Próximo passo** | `@pm` criar o PRD formal do agente financeiro |

---

*Análise realizada por Alex (@analyst) — Squad CFO*
