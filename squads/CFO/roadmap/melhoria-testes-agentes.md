# Insight AIOS: Desafios e Melhorias para Testes de Agentes (Prompt Engineering)

**Data:** 2026-02-20
**Autor:** Equipe de Arquitetura e QA (`@architect` & `@qa`)
**Contexto:** Identificação de débito técnico na validação automatizada de Prompts de IA no Squad CFO (Especificamente `@financeiro` e `@ids`).

---

## 🛑 O Problema Atual (Débito Técnico)

Durante a refatoração do Motor de Simulação (`@ids`), o processo formal de QA (`npm run test`) revelou a ausência completa de testes automatizados (`*.test.js` ou `Jest`) para os agentes alocados na pasta `squads/CFO/`. 

Embora o repositório `aios-core` possua vastos testes de sistema e funções em JavaScript nativo, os **Agentes do framework AIOS são arquivos de texto (`.md`) e de configuração (`.yaml`)**.

**Por que não há testes agora?**
Testar Engenharia de Prompt com metodologias tradicionais de Unit Testing (TDD) traz imensos gargalos:
1. **Modelos Não Determinísticos:** A IA não gera respostas binárias. A resposta exata difere estruturalmente, quebrando "Asserções" tradicionais do *Jest*.
2. **Latência Elevada e Rate Limits:** Bater na API da LLM (Gemini/Claude) a cada `npm test` geraria uma suíte que demora minutos para rodar e consome quotas excessivas, tornando a Integração Contínua (CI/CD) cara e disfuncional.
3. **Complexidade de Mock:** Mockar interações longas de agentes (como cálculos aninhados sobre `financial-registry.yaml`) exige uma infraestrutura de mock maciça, desfocando o time da construção principal de funcionalidades da ferramenta.

---

## 🎯 Por Quê Precisaremos Testar Futuramente?

Mesmo com os desafios acima, agentes matemáticos de alta criticidade, como o `@financeiro` e o `@ids`, estão expostos ao risco máximo da IA corporativa: as **Alucinações Matemáticas e Estruturais**.

### Caso 1: O Agente `@financeiro` (Validação de Fórmulas)
- **O Risco:** Ao ler balanços e registros para gerar um Relatório DRE, a inteligência artificial pode deduzir variáveis errôneas (ex. deduzir o CMV erroneamente no Anexo I do Simples Nacional).
- **A Utilidade do Teste:** Um script `valida-financeiro.test.js` injetará uma matriz estrita de gastos e faturamento no Agente (Mock), forçando-o a calcular. O teste validará no Assessor (Jest) se o valor `Lucro_Liquido` apontado pelo Agente corresponde matematicamente a exatos *X%*.
- **Benefício:** Evita relatórios caóticos em fechamentos mensais de alta temporada, blindando as métricas e o dinheiro da operação.

### Caso 2: O Agente `@ids` (Validação de Cascatas e Formatação)
- **O Risco:** O motor lida com cruzamento estrutural denso no banco de dados. Uma atualização futura na versão da IA pode fazê-la responder com o cálculo correto, mas ignorar a obrigatoriedade da tabela analítica exigida, misturando texto em parágrafos inescrutáveis e quebrando automações que venham depois do `@ids`.
- **A Utilidade do Teste:** O script `ids.test.js` aplicará uma deflação severa de *20%* no item `Tomate` dentro do `financial-registry.yaml` do ambiente de testes.
- **Benefício:** Avaliará unicamente **Regras Estruturais e de Extração**: o agente aplicou a cascata? Ele manteve a árvore no formato `.md` tabelado previsto pelo prompt do AIOS?

---

## 🛠️ Plano Estratégico de Implementação Profissional (Melhoria Futura)

Para elevar a arquitetura a um padrão verdadeiramente Enterprise, sugerimos alocar, futuramente, a criação de uma rotina paralela de "Testes Orientados a Prompt (LLM-eval)".

### Solução Proposta

1. **Camada de Mock Local (LLM-Mocking):**
   - Retirar a carga das APIs globais durantes a validação da CI/CD (`npm test`).
   - Construir o uso local e mais determinístico de modelos menores para testar estritamente o parse e o template (`.temp` e `.mock`) sob `tests/fixtures/`.

2. **Criação de Scripts Estruturados na pasta CFO:**
   - Construir a pasta `squads/CFO/tests/e2e-agents/`.
   - Criar `financeiro.math.test.js` aplicando Regex para interceptar asserções dos valores matemáticos críticos retornados pelos comandos.
   - Criar `ids.cascade.test.js` para analisar a estrutura DOM ou Markdown do relatório resultante.

3. **Rotina Semanal de Health-check Financeiro:**
   - Adicionar uma *Action* (`.github/workflows/aios-agent-eval.yml`) que rode os testes diretos contra as APIs pagas (Claude/Gemini) uma vez na semana para validar se a "personalidade" do Prompt ainda adere aos Acceptance Criteria matemáticos, mantendo a qualidade. 

---
*Este relatório foi gerado via CLI First, respeitando as prioridades do AIOS e provendo o entendimento do débito técnico a ser sanado na frente DevOps em futuras Stories de otimização.*
