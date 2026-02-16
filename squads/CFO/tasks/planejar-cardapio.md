---
name: planejar-cardapio
description: Sugere cardápio semanal otimizado por sazonalidade e custo, priorizando ingredientes em safra
agent: arquiteto-lucro
version: 1.0.0
purpose: Reduzir CMV de hortifrúti em 15-30% através de planejamento sazonal inteligente

inputs:
  - name: semana
    type: string
    description: Semana de referência (ex. "3ª semana de março")
    required: true

  - name: tipo
    type: enum
    description: Para qual operação planejar
    required: false
    options: ["buffet", "executivo", "ambos"]
    default: "ambos"

  - name: restricoes
    type: array
    description: Restrições (ex. "sem frutos do mar", "feijoada no sábado")
    required: false

outputs:
  - description: Cardápio semanal com estimativa de custo
    format: markdown

dependencies:
  data:
    - sazonalidade-hortifruti.yaml
    - tabela-fatores-correcao.yaml
---

# Task: Planejar Cardápio

Sugere cardápio semanal otimizado por sazonalidade, priorizando ingredientes em safra para reduzir CMV.

## Steps

1. **Identificar Mês e Sazonalidade:**
   - Consultar `data/sazonalidade-hortifruti.yaml` para o mês
   - Listar: itens em SAFRA (comprar), itens em ALTA (boas opções), itens em BAIXA (evitar)
   - Mostrar as estratégias de substituição relevantes

2. **Montar Cardápio Buffet (se aplicável):**
   - Distribuir categorias: arroz/massas (25%), feijão (10%), saladas (15%), legumes (15%), proteína econômica (20%), proteína nobre (10%), complementos (5%)
   - Variar proteínas: segunda (frango), terça (carne), quarta (feijoada ou peixe), etc.
   - Usar legumes da safra para saladas e guarnições
   - Estimar custo/kg médio do buffet

3. **Montar Cardápio Executivo (se aplicável):**
   - Sugerir 5-7 opções respeitando cross-utilization com buffet
   - Priorizar proteínas mais acessíveis nos dias de menor movimento
   - Incluir opção premium em dias de maior movimento
   - Estimar custo de cada prato

4. **Análise de Cross-Utilization:**
   - Identificar ingredientes que aparecem em ambas as operações (buffet + executivo)
   - Maximizar aproveitamento (ex: frango do buffet e strogonoff do executivo usam mesma sobrecoxa)
   - Alertar se algum ingrediente aparece em apenas 1 prato (risco de desperdício)

5. **Estimativa de Compras:**
   - Com base no cardápio e número estimado de clientes, sugerir quantidades de compra
   - Frequência recomendada por categoria

6. **Tradições Regionais SP:**
   - Feijoada no sábado
   - Virada paulista quando aplicável
   - Considerações de Quaresma (semana santa: mais peixe)

## Output

Cardápio semanal detalhado por dia e operação, com estimativa de custo e lista de compras
