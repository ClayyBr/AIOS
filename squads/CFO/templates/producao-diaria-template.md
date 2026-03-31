# Registro de Produção — {{DATA}}

**Data:** {{DATA}}
**Turno:** {{TURNO}} (almoço / jantar)
**Responsável pela produção:** {{RESPONSAVEL}}

---

## Produção do Dia

> Registre cada prato/preparação feita hoje. A baixa de insumos será calculada automaticamente pela ficha técnica.

| # | Prato / Preparação | Ficha Técnica | Qtd Produzida | Unidade | Qtd Vendida | Sobrou? |
|---|-------------------|---------------|:-------------:|:-------:|:-----------:|:-------:|
| 1 | {{prato}} | `fichas/{{ficha}}.md` | {{qtd}} | porções | {{vendidas}} | {{sim/não}} |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |

### Bases e Guarnições (sem ficha individual)

| Item | Qtd Utilizada (cru) | Unidade | Observação |
|------|:-------------------:|:-------:|-----------|
| Arroz Branco | {{kg}} | kg | |
| Feijão Carioca | {{kg}} | kg | |
| Salada (mix) | {{kg}} | kg | |
| Óleo (fritura) | {{L}} | L | |

---

## WIP Gerado (Sobras para Reutilizar)

> Registre APENAS o que foi guardado na geladeira/congelador para uso futuro.
> NÃO precisa pesar tudo — apenas o que está sendo GUARDADO.

| ID WIP | Nome | Qtd (kg) | Local | Validade Estimada | Obs |
|--------|------|:--------:|-------|:-----------------:|-----|
| wip-{{id}} | {{nome}} | {{kg}} | Geladeira / Congelador | {{data}} | |
| | | | | | |

## WIP Consumido (Sobras de Dias Anteriores Utilizadas Hoje)

> Registre as sobras de dias anteriores que foram utilizadas na produção de hoje.

| ID WIP | Nome | Qtd Consumida (kg) | Origem |
|--------|------|:------------------:|--------|
| wip-{{id}} | {{nome}} | {{kg}} | Sobra do dia {{data}} |
| | | | |

---

## Perdas e Descarte

| Item | Qtd Perdida | Unidade | Motivo |
|------|:-----------:|:-------:|--------|
| | | | Ex: queimou, caiu, venceu |

---

**Notas do dia:** {{observações livres}}
