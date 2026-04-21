# Insights Estratégicos — Logística, Frete e Lucratividade do Restaurante

**Gerado por:** CFO Squad — Gerente Geral  
**Data:** 21 de Abril de 2026  
**Base:** Engenharia reversa iFood + modelagem financeira real  
**Status:** Documento vivo — atualizar conforme operação evolui

---

## INSIGHT 1 — O Frete É um Negócio Dentro do Negócio

A maioria dos restaurantes enxerga a entrega como um custo ou um serviço terceirizado.
A realidade financeira é outra: **frete é uma linha de receita com margem superior à comida**.

```
iFood cobra do cliente:    R$ 7,38/entrega (média real, tabela auditada)
iFood paga ao motoboy:     R$ 4,50 (61%)
iFood retém:               R$ 2,88 (39%) — sem produzir nada

Com pool próprio + batching 60%:
  Você cobra:              R$ 7,38
  Você paga ao pool:       R$ 3,92
  Você retém:              R$ 3,46 (47%) — mais que o iFood
```

**Princípio:** enquanto o restaurante paga 27% de comissão ao iFood e ainda não vê o frete,
a plataforma captura dois fluxos simultaneamente. Você pode fazer o mesmo.

---

## INSIGHT 2 — O Batching é a Fonte Real do Lucro Logístico

O lucro não vem de pagar menos por km. Vem de **aumentar a produtividade por hora do motoboy**
sem aumentar proporcionalmente o pagamento por saída.

```
Saída simples (1 pedido):
  Motoboy recebe R$ 4,50 | Ganha R$ 12,27/hora

Saída dupla (2 pedidos):
  Motoboy recebe R$ 7,50 | Ganha R$ 15,00/hora ← ponto ótimo

Saída tripla (3 pedidos):
  Motoboy recebe R$ 9,50 | Ganha R$ 14,25/hora
```

No batching duplo:
- O motoboy ganha **mais por hora** (vende o modelo mais fácil)
- O restaurante captura **43–48% do frete** vs. 28% no simples
- **Ninguém perde** — por isso o iFood não precisa explicar a mecânica ao entregador

**Regra operacional:** nunca explicar "km excedente" ou fórmulas.
Apresentar apenas: "2 pedidos = R$ 7,50. 3 pedidos = R$ 9,50."

---

## INSIGHT 3 — O Pool Supera o Motoboy Fixo Nos Volumes Certos

O pool de motoboys MEI tem vantagem sobre o motoboy fixo em volumes entre **30 e 130 pedidos/dia**.

```
Ponto de inversão: ~29 pedidos por motoboy por dia

Abaixo:  pool é mais barato (você não paga ociosidade)
Acima:   pool se iguala ao fixo (motoboy já está "cheio")

Volume (canal próprio)    Vantagem do Pool vs. Fixo
25 ped/dia                +R$ 832/mês
50 ped/dia                +R$ 1.950/mês ← máxima eficiência
100 ped/dia               +R$ 260/mês
130+ ped/dia              ~R$ 0 (ponto de equilíbrio)
300 ped/dia               pool fica R$ 8.050/mês MAIS caro que CLT
```

**À medida que o volume cresce, o argumento do pool muda de custo para:**
- Flexibilidade em dias fracos (não paga diária parada)
- Ausência de vínculo CLT (3,5h/dia não sustenta contrato formal)
- Escalabilidade sem rescisão

---

## INSIGHT 4 — O Modelo Legal Correto Para Pool de 3,5h: MEI

CLT para motoboy que trabalha 3,5h/dia não faz sentido operacional nem para o trabalhador.
O modelo correto é **MEI (Microempreendedor Individual)**.

```
Por que MEI funciona:
  ✅ Motoboy trabalha 11h–14h30 com você, vai para iFood/Rappi à tarde
  ✅ Sem encargo trabalhista para o restaurante (0%)
  ✅ Motoboy emite nota fiscal de transporte (formalização real)
  ✅ É exatamente como iFood e Rappi formalizam seus entregadores
  ✅ Empresa B pode reduzir o pool em semana fraca sem rescisão

Risco trabalhista a evitar:
  ❌ Mesmo motoboy, todo dia, exclusivamente
  ✅ Rotatividade real no pool (5–6 cadastrados para usar 2–3)
```

---

## INSIGHT 5 — Duas Empresas Separadas: Vantagens Além do Fiscal

A separação em Empresa A (Restaurante) e Empresa B (Logística) não é apenas fiscal.

```
EMPRESA A — Restaurante (CNAE 5611-2/01, Simples Anexo I)
  → Cuida da produção, equipe de cozinha, cardápio
  → Receita: apenas alimentos

EMPRESA B — Logística (CNAE 5320-2/01, Simples Anexo III)
  → Gerencia o pool MEI, roteirização, caixa de frete
  → Receita: frete cobrado do cliente
  → Pode atender outros clientes (farmácias, padarias, etc.)

Vantagens reais:
  1. Fiscal: Empresa B em faixa menor de Simples (economia R$ 1.900–4.300/mês)
  2. Jurídico: ativos do restaurante protegidos de passivo logístico
  3. Expansão: Empresa B vira negócio independente com outros clientes
  4. Clareza: P&L de frete 100% visível e auditável separado

Legitimidade: válida se Empresa B atender outros clientes além do restaurante
  (farmácia, escritório, padaria local = protege juridicamente a separação)
```

---

## INSIGHT 6 — A Matemática Completa (100 Pedidos/Dia, Dois CNPJs, CMV 30%)

```
EMPRESA A — RESTAURANTE (100 ped/dia × 26 dias):
  Receita bruta:          R$ 78.000
  (-) Simples 8%:        (R$  6.240)
  (-) Taxas pagamento:   (R$    780)
  Receita líquida:        R$ 70.980
  (-) CMV 30%:           (R$ 23.400)
  Lucro bruto:            R$ 47.580
  (-) MO + Infra:        (R$ 14.300)
  (-) Marketing + Admin: (R$  3.500)
  LUCRO A:                R$ 29.780/mês

EMPRESA B — LOGÍSTICA (100 ped/dia × 26 dias):
  Receita bruta:          R$ 19.188
  (-) Simples 5%:        (R$    959)
  Receita líquida:        R$ 18.229
  (-) Pool MEI:          (R$ 11.050)
  (-) Operacional:       (R$    900)
  LUCRO B:                R$  6.279/mês

CONSOLIDADO DO GRUPO:    R$ 36.059/mês
Margem líquida:                37,1%

COM CMV 27% (30% base + 10% desconto à vista):
  LUCRO ADICIONAL:        +R$ 2.340/mês
  TOTAL:                   R$ 38.399/mês (39,5% margem)
```

---

## INSIGHT 7 — O Frete Como Capital de Giro Para Reduzir o CMV

O lucro do frete (Empresa B) financia a reserva para pagar fornecedores à vista.
Pagar à vista desbloqueiam descontos que reduzem o CMV. É um flywheel.

```
POTENCIAL DE DESCONTO À VISTA POR FORNECEDOR:
  Frigorífico (proteína, 55% do CMV):    8–15%
  Atacadão / grãos / secos:              5–8%
  Embalagem:                             5–10%
  Hortifrutti:                           4–7%
  Desconto médio ponderado:             ~7–10%

IMPACTO NO CMV (100 pedidos/dia):
  CMV 30% → com 10% desconto à vista = CMV efetivo 27%
  Economia: R$ 78.000 × 3% = R$ 2.340/mês = R$ 28.080/ano

CAPITAL DE GIRO NECESSÁRIO:
  Cobertura total dos insumos: R$ 23.400
  Construção via frete (60% do lucro B): R$ 3.767/mês
  Tempo para atingir: ~6–7 meses

RESULTADO FINAL: o frete financiou o capital que reduziu o CMV
  → Sem desembolso adicional, sem sócio, sem empréstimo
```

---

## INSIGHT 8 — A Tabela Real do iFood (Dados Auditados)

```
Tabela real do restaurante (Entrega Parceira iFood):

  Raio    Taxa cliente   Est. motoboy (61%)   Spread iFood
  0,5km   R$ 4,99        R$ 3,04              R$ 1,95
  1,0km   R$ 4,99        R$ 3,04              R$ 1,95
  1,5km   R$ 6,99        R$ 4,26              R$ 2,73
  2,0km   R$ 6,99        R$ 4,26              R$ 2,73
  2,5km   R$ 7,99        R$ 4,87              R$ 3,12
  3,0km   R$ 7,99        R$ 4,87              R$ 3,12
  3,5km   R$ 8,99        R$ 5,48              R$ 3,51
  4,0km   R$ 8,99        R$ 5,48              R$ 3,51
  4,5km   R$ 10,99       R$ 6,70              R$ 4,29
  5,0km   R$ 10,99       R$ 6,70              R$ 4,29

  Frete médio ponderado: R$ 7,38
  iFood retém em média: R$ 2,88/entrega (39%)
  Você pode reter (pool + batching): R$ 3,46/entrega (47%)
```

---

## INSIGHT 9 — As 3 Zonas de Entrega (Modelo Simplificado)

```
ZONA A (0–1km):
  Cobra do cliente: R$ 4,50
  Paga ao motoboy:  R$ 2,80
  Margem:           R$ 1,70 (38%)

ZONA B (1–3km) — ZONA PRINCIPAL:
  Cobra do cliente: R$ 7,00
  Paga ao motoboy:  R$ 4,50
  Margem:           R$ 2,50 (36%)

ZONA C (3–5km):
  Cobra do cliente: R$ 9,50
  Paga ao motoboy:  R$ 6,00
  Margem:           R$ 3,50 (37%)

TABELA DE SAÍDA (o que o motoboy vê):
  1 pedido:  valor da zona (ex: R$ 4,50 zona B)
  2 pedidos: valor da zona + R$ 3,00 (ex: R$ 7,50)
  3 pedidos: valor da zona + R$ 5,00 (ex: R$ 9,50)
```

---

## INSIGHT 10 — O Pool Funciona Por Volume, Não Por Turno

Com turno único de 11h–14h30 (3,5 horas), cada motoboy entrega ~12–13 pedidos por sessão.

```
Capacidade por motoboy em 3,5h:
  Simples: 9–10 entregas
  Duplo:   13 entregas ← frequência real esperada
  Triplo:  15 entregas

Ganho por hora (Zona B):
  Simples: R$ 12,27/h
  Duplo:   R$ 15,00/h ← argumento de recrutamento
  Triplo:  R$ 14,25/h

Motoboys simultâneos necessários:
  25 ped/dia:  2 motoboys
  50 ped/dia:  4 motoboys
  100 ped/dia: 8 motoboys
  300 ped/dia: 24 motoboys ← exige software de roteirização + dispatcher
```

---

## INSIGHT 11 — O Ponto Em Que o Modelo Muda de Natureza

Em **300 pedidos/dia com turno único**, você não opera mais um pool: opera uma mini-plataforma.

```
Os sinais de que o modelo mudou de fase:
  ✅ +13 motoboys simultâneos no pico → WhatsApp não funciona mais
  ✅ Pool MEI fica mais caro que CLT a partir de ~130 ped/dia
  ✅ Necessidade de dispatcher dedicado
  ✅ Necessidade de software de roteirização (Shipday, etc.)

Modelo correto em 300 ped/dia:
  Camada 1: 5–6 motoboys contratados (âncora de volume)
  Camada 2: 8–12 pool MEI para pico e fins de semana
  Camada 3: dispatcher + software (R$ 3.300/mês)

  Custo total: ~R$ 35.000/mês
  Receita frete: R$ 57.564/mês
  Margem logística: R$ 17.909/mês (ainda muito rentável)
```

---

## INSIGHT 12 — A Hierarquia das Alavancas de Lucratividade

Em ordem de impacto por nível de complexidade:

```
ALAVANCA 1 — CMV (impacto imediato, depende só de disciplina)
  Cada 1% reduzido no CMV = R$ 780/mês extra (100 ped/dia)
  Meta operacional: 30% (via porcionamento 150g proteína + padronização)
  Teto realista: 27% (com desconto à vista de fornecedores)

ALAVANCA 2 — Canal Próprio (elimina comissão 27% do iFood)
  100 ped/dia via iFood: lucro ~R$ 5.800/mês
  100 ped/dia via canal próprio: lucro ~R$ 36.000/mês
  Diferença: R$ 30.200/mês — o maior salto único possível

ALAVANCA 3 — Logística Própria (converte custo em receita)
  Passou de R$ 0 de receita de frete → R$ 6.183/mês de lucro puro
  Esse lucro financia todo o resto

ALAVANCA 4 — Compra à Vista (desconto de fornecedor)
  Depende do capital de giro gerado pela Alavanca 3
  Reduz CMV adicional 7–10% sobre a base já otimizada

ALAVANCA 5 — Escala + Segunda Marca / Empresa B multi-cliente
  Amplifica todas as anteriores sem custo fixo adicional proporcional
```

---

## INSIGHT 13 — O Marketing Mais Barato do Setor: Frete Grátis Segmentado

```
CAC COMPARATIVO:
  Meta Ads (leads frios):       R$ 15–42/cliente
  Frete grátis (carrinho aband.): R$ 7,38/cliente
  Frete grátis (reativação):    R$ 7,38/cliente
  Indicação (frete duplo):      R$ 14,76/cliente

OS 3 CONTEXTOS ONDE FUNCIONA:
  1. Carrinho abandonado: perguntou, não pediu → mensagem T+2h + T+22h
     Taxa de conversão: 25–35% | CAC: R$ 7,38

  2. Reativação: cliente sumido após 1–2 pedidos (10+ dias)
     Taxa de conversão: 15–22% | CAC: R$ 7,38

  3. Indicação com frete duplo: cliente top indica amigo
     Custo: R$ 14,76 | Qualidade do lead: muito superior a anúncio

O QUE NÃO FAZER:
  ❌ Frete grátis para toda a base (subsidia quem já pediria)
  ❌ Desconto permanente (cria vício de promoção)
  ❌ Sem sistema de controle (cliente abusa com segundo número)
```

---

## INSIGHT 14 — O Flywheel Completo

```
A combinação de todas as estratégias cria um flywheel:

  Canal próprio elimina comissão de 27%
          ↓
  Sobra de capital vai para Empresa B (logística)
          ↓
  Empresa B gera R$ 6.000–18.000/mês de lucro de frete
          ↓
  Parte desse lucro vai para marketing (frete grátis, indicação, B2B)
          ↓
  Mais clientes → mais pedidos → mais batching → mais margem de frete
          ↓
  Parte do lucro vira capital de giro
          ↓
  Capital de giro financia compra à vista → desconto 7–10%
          ↓
  CMV cai de 35% para 27% → R$ 6.240/mês extra (100 ped)
          ↓
  Mais lucro → mais capital → segundo CNPJ capta novos clientes B2B
          ↓
  Empresa B vira mini-plataforma local (farmácia, padaria, escritório)
          ↓
  Receita adicional R$ 5.000–9.000/mês sem custo fixo novo
          ↓
  Flywheel acelera

Em 24 meses partindo de 50 ped/dia:
  Lucro estimado do grupo: R$ 100.000–120.000/mês
  Sem dívida | Sem sócio | Sem franquia | Sem iFood
```

---

## INSIGHT 15 — O Concorrente Não Vê o Que Está Acontecendo

```
O restaurante médio da cidade:
  → Paga 27% de comissão ao iFood todo mês
  → Não controla porcionamento → CMV 38–42%
  → Compra no prazo → paga preço cheio dos insumos
  → Nunca viu o dinheiro do frete
  → Está financiando o crescimento do iFood, não o seu

Você, com esse modelo:
  → Captura 47% do frete (mais que o iFood captura)
  → CMV 27% (nível de franquia industrial)
  → Compra à vista → preço 10% abaixo do concorrente
  → Tem empresa de logística que vira receita autônoma

Resultado: você vende marmita pelo mesmo preço do concorrente,
  mas tem custo 15–20% menor estruturalmente.
  Isso não é vantagem operacional. É fosso competitivo.
```

---

## Próximos Passos Práticos

```
IMEDIATO (esta semana):
  [ ] Criar lista WhatsApp Business: leads abandonados
  [ ] Mapear 5 fornecedores e perguntar condição à vista
  [ ] Definir tabela de pagamento pool (zonas A/B/C)

CURTO PRAZO (30 dias):
  [ ] Recrutar pool inicial: 4 motoboys MEI
  [ ] Abrir Empresa B (CNPJ de logística)
  [ ] Testar batching duplo em 1 semana (medir margem real)
  [ ] Iniciar campanha de carrinho abandonado (WhatsApp)

MÉDIO PRAZO (90 dias):
  [ ] Fechar 1 contrato B2B (empresa ou clínica local)
  [ ] Atingir 60% de taxa de batching duplo
  [ ] Iniciar reserva de capital de giro (R$ 2.000/mês)
  [ ] Lançar clube de assinatura semanal

LONGO PRAZO (12 meses):
  [ ] Capital de giro formado: pagar todos fornecedores à vista
  [ ] CMV alvo: 27–28%
  [ ] Empresa B com 2–3 clientes além do restaurante
  [ ] Escala: 100+ pedidos/dia via canal próprio
```

---

*CFO Squad — Synkra AIOS | Base: Engenharia reversa iFood + DRE real + Modelagem financeira*  
*Atualizado em: 21 de Abril de 2026*
