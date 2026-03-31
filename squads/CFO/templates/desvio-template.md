# Relatório de Desvios — {{DATA}}

**Período:** {{DATA_INICIO}} a {{DATA_FIM}}
**Tipo:** Semanal / Mensal
**Fonte:** Calibração `{{arquivo_calibracao}}`

---

## Resumo Executivo

| Indicador | Valor | Meta | Status |
|-----------|:-----:|:----:|:------:|
| Acurácia Geral | {{%}} | > 95% | {{✅/⚠️/🚨}} |
| Itens com Desvio Crítico (>10%) | {{n}} | 0 | {{✅/⚠️/🚨}} |
| Valor Total dos Desvios | R$ {{valor}} | — | — |
| Causas Identificadas | {{n}}/{{total}} | 100% | {{✅/⚠️}} |

---

## Desvios Identificados

### 🚨 Críticos (>10%)

| Item | Sistema | Real | Desvio | Causa | Ação |
|------|:-------:|:----:|:------:|-------|------|
| {{item}} | {{kg}} | {{kg}} | {{%}} | {{causa}} | {{ação}} |

### 🟠 Atenção (5-10%)

| Item | Sistema | Real | Desvio | Causa | Ação |
|------|:-------:|:----:|:------:|-------|------|
| {{item}} | {{kg}} | {{kg}} | {{%}} | {{causa}} | {{ação}} |

### 🟡 Aceitáveis (3-5%)

| Item | Sistema | Real | Desvio | Nota |
|------|:-------:|:----:|:------:|------|
| {{item}} | {{kg}} | {{kg}} | {{%}} | Normal — perdas de cocção/vapor |

---

## Análise de Causas Raiz

1. **Porcionamento:** {{observações}}
2. **Perdas de produção:** {{observações}}
3. **Recebimento:** {{observações}}
4. **Fichas técnicas desatualizadas:** {{observações}}

## Ações Corretivas

- [ ] {{ação 1}}
- [ ] {{ação 2}}
- [ ] {{ação 3}}

---

*Gerado pelo @controlador-estoque em {{data_geracao}}*
