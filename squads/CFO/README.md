# Squad CFO — Inteligência Financeira, Estoque & Estratégia 🚀

> 👔 **Gerente Geral** (Master) + 💰 **Arquiteto do Lucro** (CFO) + 📦 **Controlador de Estoque** (Ops)

## O Que Este Squad Faz

O Squad CFO é uma equipe de **3 agentes** hierarquizados:

1.  **👔 Gerente Geral (Master):** Seu ponto de contato único. Recebe ordens, orquestra os especialistas e propõe estratégias.
2.  **💰 Financeiro (CFO):** Calcula custos, preços e DRE.
3.  **📦 Estoque (Ops):** Cuida das compras, validades e inventário.

**Recomendação:** Fale sempre com o `@gerente-geral`. Ele saberá quem acionar.

## Comandos Principais (Gerente Geral)

```
*dashboard           → Resumo 360º do negócio
*novo-prato          → Orquestra Estoque + Financeiro para lançar produto
*analise-estrategica → Insights profundos sobre a saúde da empresa
*otimizar            → Onde cortar custos (cruzamento Finanças x Estoque)
```

### Comandos dos Especialistas (Uso direto opcional)

**💰 Financeiro:** `*ficha-tecnica`, `*precificar`, `*cmv`, `*dre`
**📦 Estoque:** `*entrada`, `*saida`, `*inventario`, `*alerta`

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
│   ├── gerente-geral.md         # [NOVO] Master Agent
│   ├── arquiteto-lucro.md       # Especialista Financeiro
│   └── controlador-estoque.md   # Especialista Estoque
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
