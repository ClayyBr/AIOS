# Ficha Técnica Gerencial — {{NOME_DA_PREPARACAO}} (Buffet)

| Campo | Valor |
|-------|-------|
| **Preparação** | {{nome_preparacao}} |
| **Categoria Buffet** | {{categoria}} (Arroz/Massa, Feijão, Salada, Legume, Proteína Econômica, Proteína Nobre, Complemento) |
| **Tipo** | Buffet por Quilo |
| **Rendimento** | {{rendimento}} porções (ex: 50 porções / 1 GN 1/1) |
| **Peso por Bandeja (GN)** | {{peso_bandeja}} kg |
| **Tempo de Exposição Máx.** | {{tempo_exposicao}} horas |
| **Fator de Reposição** | {{fator_reposicao}} (ex: 1,20 = repor 20% durante o turno) |
| **Data** | {{data}} |
| **Última Atualização** | {{data_precos}} |

---

## Ingredientes e Custos

| Ingrediente | PB (g/ml) | FC | PL (g/ml) | FCc | Peso Servido (g) | Custo/kg ou /L | Custo Porção (R$) | % do Total |
|---|---|---|---|---|---|---|---|---|
| {{ingrediente_1}} | {{pb}} | {{fc}} | {{pl}} | {{fcc}} | {{servido}} | R$ {{custo_kg}} | R$ {{custo_porcao}} | {{pct}}% |
| {{ingrediente_2}} | {{pb}} | {{fc}} | {{pl}} | {{fcc}} | {{servido}} | R$ {{custo_kg}} | R$ {{custo_porcao}} | {{pct}}% |
| {{ingrediente_3}} | {{pb}} | {{fc}} | {{pl}} | {{fcc}} | {{servido}} | R$ {{custo_kg}} | R$ {{custo_porcao}} | {{pct}}% |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |
| **TOTAL** | — | — | — | — | **{{peso_total}}g** | — | **R$ {{custo_total}}** | **100%** |

---

## Decomposição por Grupo

| Grupo | Custo (R$) | % do Total |
|-------|-----------|-----------|
| Proteína | R$ {{custo}} | {{pct}}% |
| Guarnição (arroz, feijão, massa) | R$ {{custo}} | {{pct}}% |
| Salada / Legumes | R$ {{custo}} | {{pct}}% |
| Molho | R$ {{custo}} | {{pct}}% |
| Temperos e Gorduras | R$ {{custo}} | {{pct}}% |
| **Total** | **R$ {{custo_total}}** | **100%** |

---

## Indicadores de Buffet

| Indicador | Valor |
|-----------|-------|
| **Custo por Porção (ficha)** | R$ {{custo_porcao}} |
| **Custo por KG Produzido** | R$ {{custo_kg_produzido}} |
| **Rendimento Total** | {{rendimento_kg}} kg |
| **Peso por Porção Estimada** | {{peso_porcao}}g (clientes se servem ≈300-400g no total) |
| **Reposição Estimada** | {{reposicao_kg}} kg ({{fator_reposicao}}× do peso inicial) |
| **Custo Total com Reposição** | R$ {{custo_com_reposicao}} |

### Cálculo do Custo/kg Produzido

```
Custo Total da Receita:        R$ {{custo_total_receita}}
Rendimento Total:              {{rendimento_kg}} kg
Custo/kg Produzido:            R$ {{custo_total_receita}} ÷ {{rendimento_kg}} = R$ {{custo_kg}}
```

---

## Precificação (Contribuição ao Buffet)

> ⚠️ Esta preparação NÃO é precificada individualmente.
> O preço do kg do buffet é calculado pelo **Template de Custo do Buffet Montado** que consolida todas as preparações.

| Referência | Valor |
|-----------|-------|
| Custo/kg desta preparação | R$ {{custo_kg_produzido}} |
| Participação no mix | {{participacao_mix}}% (estimativa) |
| Contribuição ao custo/kg do buffet | R$ {{contribuicao}} |

---

## Ficha Operacional (Cozinha)

**Mise en Place:**
- {{instrucoes_prep}}

**Cocção:**
- {{instrucoes_coccao}}

**Montagem na Bandeja (GN):**
- Bandeja: GN {{tamanho_gn}} (ex: 1/1, 1/2, 1/3)
- Peso padrão: {{peso_bandeja}} kg
- Apresentação: {{instrucoes_apresentacao}}

**Reposição:**
- Frequência: a cada {{frequencia_reposicao}} minutos ou quando o nível baixar de 30%
- Fator de reposição: {{fator_reposicao}}× (preparar {{reposicao_porcoes}} porções extras)
- Não misturar preparação fresca com restante — trocar a bandeja GN

**Tempo de Exposição:**
- Máximo: {{tempo_exposicao}} horas no balcão térmico
- Após o limite: descartar (risco sanitário)

---

## Observações

- **Ingrediente de maior impacto:** {{ingrediente}} ({{pct}}% do custo total)
- **FC alto:** {{ingrediente}} com FC {{valor}} — considerar alternativa
- **Sazonalidade:** {{observacao_sazonal}}
- **Sobra esperada:** {{sobra_esperada}}% (referência: 3-7% para buffet bem gerido)
