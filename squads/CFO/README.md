# Squad CFO — Inteligência Financeira, Estoque & Estratégia 🚀

> 👔 **Gerente Geral** (Master) + 💰 **Arquiteto do Lucro** (CFO) + 📦 **Controlador de Estoque** (Ops)

## O Que Este Squad Faz

O Squad CFO é uma equipe de **5 agentes** hierarquizados:

1.  **👔 Gerente Geral (Master):** Seu ponto de contato único. Recebe ordens, orquestra os especialistas e propõe estratégias.
2.  **💰 Arquiteto do Lucro (CFO):** Calcula fichas técnicas e precificações unitárias.
3.  **📊 Financeiro (Fiscal):** DRE, CMV Global, Fluxo de Caixa, e relatórios mensais.
4.  **📦 Estoque (Ops):** Cuida das compras, validades e inventário.
5.  **🧠 IDS (Motor de Decisão):** Simulador de impacto de custos, cascatas e entressafra do mercado.
6.  **🎯 Vendas (Estrategista):** Cria campanhas, raspadinhas e cuida do Revenue Management.

**Recomendação:** Fale sempre com o `@gerente-geral`. Ele saberá quem acionar.
 Se você precisa precificar um prato novo: o Master usará o `@arquiteto-lucro`.
 Se você precisa calcular o impacto nas vendas se o alface dobrar o preço amanhã: o Master usará o `@ids`.

## Comandos Principais (Gerente Geral)

```
*dashboard           → Resumo 360º do negócio
*novo-prato          → Orquestra Estoque + Financeiro para lançar produto
*analise-estrategica → Insights profundos sobre a saúde da empresa
*otimizar            → Onde cortar custos (cruzamento Finanças x Estoque)
```

### Comandos dos Especialistas (Uso direto opcional)

**💰 Arquiteto do Lucro:** `*ficha-tecnica`, `*precificar`
**📊 Financeiro:** `*cmv`, `*dre`, `*relatorio-mensal`
**🧠 IDS:** `*simular-impacto`, `*extracao-teia`
**📦 Estoque:** `*entrada`, `*saida`, `*inventario`, `*alerta`
**🎯 Vendas:** `*vendas-criar-raspadinha`, `*analisar-oportunidades`, `*sugerir-acao`

## Base de Conhecimento Compartilhada

- 📚 **Guia de Estoque:** CMP, PVPS e Par Stock
- 📊 **Fichas Técnicas:** Salvas em `fichas/`
- 📥 **Histórico:** Em `estoque/` e `relatorios/`

## 📏 Padrões de Documentação

1.  **Fichas de Cozinha (Operacionais):**
    *   **Formato:** HTML obrigatório.
    *   **Local:** `squads/CFO/fichas-cozinha/`
    *   **Template:** Use `templates/ficha-cozinha-template.html`.
    *   **Estilo:** Visual limpo, pronto para impressão e com checklist visual.

2.  **Fichas Técnicas (Gerenciais):**
    *   **Formato:** Markdown.
    *   **Local:** `squads/CFO/fichas/`


## Estrutura Atualizada (v2.0.0)

```
squads/CFO/
├── squad.yaml                   # Manifesto
├── agents/
│   ├── gerente-geral.md         
│   ├── arquiteto-lucro.md       # Especialista Receitas/Preços
│   ├── financeiro.md            # Controlador DRE/CMV
│   ├── controlador-estoque.md   # Especialista Estoque
│   ├── ids.md                   # [NOVO] Motor Forense (IDS)
│   └── vendas.md                
├── tasks/                       # 13 tasks (1 mestra + 12 operacionais)
├── templates/                   # 5 templates (incl. HTML cozinha)
├── checklists/                  # 3 checklists
├── data/                        # 9 arquivos de conhecimento
├── estoque/                     # Banco de dados do estoque
├── fichas/                      # Fichas técnicas gerenciais (MD)
├── fichas-cozinha/              # Fichas operacionais (HTML)
├── insights/                    # Análises e otimizações
├── fornecedores/                # Cotações e dados de fornecedores
└── relatorios/                  # DREs e relatórios mensais
```
