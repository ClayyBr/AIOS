---
name: precificar-prato
description: Calcula o preço de venda de um prato usando markup divisor, considerando Simples Nacional, margem de perda operacional e todos os custos
agent: arquiteto-lucro
version: 1.1.0
purpose: Precificar pratos e itens do cardápio com prova reversa, incluindo margem para perdas operacionais (desperdício)

inputs:
  - name: nome_prato
    type: string
    description: Nome do prato a precificar
    required: true

  - name: custo_ficha
    type: float
    description: Custo total do prato (da ficha técnica). Se não informado, criar ficha primeiro.
    required: true

  - name: tipo
    type: enum
    description: Tipo de operação
    required: true
    options: ["executivo", "buffet_kg", "delivery"]
    default: "executivo"

  - name: cmv_meta
    type: float
    description: CMV meta percentual (padrão 32%)
    required: false
    default: 0.32

  - name: margem_perda
    type: float
    description: |
      Margem de perda operacional (desperdício). Cobre perdas que NÃO são FC/FCc:
      porcionamento incorreto, sobras de buffet, quebra de estoque, devoluções.
      Recomendado: 7% para restaurante novo, 5% para operação madura.
    required: false
    default: 0.07

  - name: faixa_simples
    type: integer
    description: Faixa do Simples Nacional (1-6)
    required: false
    default: 1

outputs:
  - description: Preço de venda sugerido com prova reversa (incluindo margem de perda)
    format: markdown

dependencies:
  data:
    - formula-precificacao-simples.md
---

# Task: Precificar Prato

Calcula o preço de venda ideal usando markup divisor com todos os custos considerados, **incluindo margem de perda operacional**.

## Fórmula Completa

### Passo 1 — Custo Real (com perda operacional)

```
Custo Real = Custo da Ficha × (1 + Margem de Perda)
```

- O **Custo da Ficha** (R$ 9,13 no strogonoff) já inclui FC e FCc
- A **Margem de Perda** cobre o desperdício operacional que FC/FCc NÃO cobrem

#### O que cada perda cobre:

```
FC (Fator de Correção)        ← Perda no PREPARO (casca, osso, gordura)
                                 JÁ incluído na ficha técnica ✅

FCc (Fator de Cocção)         ← Perda na COCÇÃO (encolhimento, evaporação)
                                 JÁ incluído na ficha técnica ✅

Margem de Perda Operacional   ← Perda na OPERAÇÃO (desperdício real)
                                 NOVO — incluído na precificação ✅
  ├── Porcionamento incorreto:   ~3% (equipe serve mais ou menos)
  ├── Sobra de buffet:           ~2% (comida que sobra no balcão)
  ├── Quebra de estoque:         ~1% (insumo que venceu/estragou)
  └── Erros e devoluções:        ~1% (prato que voltou, pedido errado)
```

### Passo 2 — Estrutura de Custos (soma = 100%)

```
CMV meta:          32%   (custo dos ingredientes / receita)
Mão de Obra:       30%   (salários, encargos, pró-labore)
Impostos (Simples): 6%   (DAS — varia por faixa)
Custos Fixos:      15%   (aluguel, energia, água, gás)
Despesas:           5%   (contabilidade, marketing, sistemas)
Lucro Desejado:    12%   (meta do dono)
─────────────────────
TOTAL:            100%   ← TEM que somar 100%
```

### Passo 3 — Fator de Markup

```
Fator de Markup = CMV meta ÷ 100
```

Se CMV meta = 32%, Fator de Markup = 0,32

### Passo 4 — Preço de Venda

```
Preço de Venda = Custo Real ÷ Fator de Markup
```

### Exemplo Completo: Strogonoff de Frango

```
Custo da Ficha:              R$ 9,13
Margem de Perda (7%):      × 1,07
                            ─────────
Custo Real:                  R$ 9,77 ← este é o custo VERDADEIRO

Fator de Markup (CMV 32%):   0,32

Preço = R$ 9,77 ÷ 0,32 =    R$ 30,53
Preço Comercial:             R$ 31,90
```

### Passo 5 — Prova Reversa (verificação)

```
Preço de Venda:        R$ 31,90  (100%)
├── CMV Real:           R$  9,77  (30,6%) ✅ abaixo de 32%
├── Mão de Obra:        R$  9,57  (30,0%)
├── Impostos (Simples): R$  1,91  ( 6,0%)
├── Custos Fixos:       R$  4,79  (15,0%)
├── Despesas:           R$  1,60  ( 5,0%)
└── 💰 LUCRO:           R$  4,26  (13,4%) ✅ acima da meta de 12%

Verificação: R$ 9,77 ÷ R$ 31,90 = 30,6% ← CMV real CONFIRMADO ✅
```

## Steps

1. **Coletar Estrutura de Custos:**
   - Perguntar ou usar padrão: CMV meta, % MO, % custos fixos, % impostos (Simples), % despesas, % lucro desejado
   - Validar que a soma = 100%
   - Se não somar 100%, alertar e ajudar a corrigir

2. **Definir Margem de Perda Operacional:**
   - Perguntar o nível de controle operacional do restaurante
   - Sugerir margem com base no perfil:

   | Perfil | Margem Recomendada |
   |--------|-------------------|
   | Restaurante novo (equipe em treinamento) | 7-8% |
   | Restaurante rodando (controle razoável) | 5-6% |
   | Operação madura (porcionamento rigoroso) | 3-4% |
   | Excelência operacional (balança, fichas, auditorias) | 2-3% |

3. **Calcular Custo Real:**
   - Custo Real = Custo da Ficha × (1 + Margem de Perda)
   - Mostrar claramente: "A ficha custa R$ X, mas com Y% de perda o custo real é R$ Z"

4. **Calcular Preço de Venda:**
   - Preço = Custo Real ÷ Fator de Markup
   - Arredondar para valor comercial (ex: R$ 30,53 → R$ 31,90)

5. **Para Buffet por Quilo:**
   - Calcular custo médio ponderado do buffet
   - Adicionar margem de perda (usar 8-10% por conta das sobras do balcão)
   - Simular cenários: mix ideal vs mix pesado em proteína

6. **Para Delivery:**
   - Incluir custo de embalagem no custo total ANTES de aplicar margem de perda
   - Considerar taxa do marketplace (iFood ~27%, Rappi ~30%)
   - Usar margem de perda menor (5%) — delivery tem menos sobra
   - Calcular preço mínimo para compensar as taxas

7. **Prova Reversa:**
   - SEMPRE mostrar a decomposição do preço final: quanto vai para CMV, MO, impostos, fixos, lucro
   - Confirmar que o lucro real está ≥ meta
   - Mostrar comparação: preço SEM margem de perda vs COM margem

8. **Comparação com Mercado:**
   - Perguntar se o usuário sabe o preço dos concorrentes
   - Avaliar se o preço calculado é competitivo
   - Se acima do mercado, sugerir alternativas (reduzir porção, trocar ingrediente, aceitar margem menor, reduzir margem de perda com melhor controle)

## Output

Tabela com:
- Preço sugerido (com margem de perda inclusa)
- Prova reversa detalhada
- Comparativo: sem margem vs com margem
- Status (✅ Viável / ⚠️ Marginal / 🚨 Acima do mercado)
- Nota: "Para reduzir o preço, melhore o controle operacional e reduza a margem de perda"
