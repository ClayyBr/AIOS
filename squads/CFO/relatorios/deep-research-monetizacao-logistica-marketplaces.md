# 📦 DEEP RESEARCH: Engenharia Reversa da Monetização Logística em Marketplaces
**Para:** Gerente Geral (Estrategista)  
**Classificação:** Alto Impacto Estratégico — Logística como Centro de Lucro  
**Data:** 2026-04-18  
**Escopo:** iFood (BR) × DoorDash/UberEats (EUA) → Transposição para Frota Própria

---

## 📋 Sumário Executivo

Os grandes marketplaces de delivery não são apenas plataformas de tecnologia — são **máquinas de arbitragem logística**. A cada pedido entregue, eles capturam um spread entre o frete cobrado do cliente e o repasse ao entregador, enquanto otimizam custo via algoritmos de agrupamento (batching), gamificação de oferta de trabalho e precificação dinâmica. Este relatório desmonta esses mecanismos e propõe como um restaurante com frota própria pode replicar a inteligência operacional dessas plataformas na sua escala.

**Conclusão Antecipada:** Um restaurante que domina sua logística não precisa de escala de marketplace. Precisa de **inteligência de alocação**. A diferença entre gastar R$ 18 por entrega e R$ 9 está nos mesmos princípios matemáticos que DoorDash usa para valer US$ 50 bilhões.

---

## PARTE 1: A CAIXA-PRETA DOS MARKETPLACES — Como Eles Lucram na Logística

### 1.1 A Anatomia de uma Entrega: O "Spread" de Frete

A estrutura financeira de uma entrega em marketplace funciona em camadas. O cliente paga uma coisa; o entregador recebe outra. O que está no meio é a engenharia de monetização da plataforma.

#### Modelo iFood — Plano Entrega (Logística da Plataforma)

| Componente | Quem Paga | Quem Recebe | Observação |
|:-----------|:----------|:------------|:-----------|
| Taxa de Entrega (Frete) | Cliente | iFood (plataforma) | Valor dinâmico baseado em distância + demanda |
| Taxa de Serviço (R$ 0,99–R$ 1,99) | Cliente | iFood exclusivamente | Não repassa ao restaurante nem ao motoboy |
| Comissão sobre vendas (23%–27%) | Restaurante | iFood | Cobre logística + tecnologia + marketing |
| Repasse ao Motoboy | iFood | Entregador | Base fixa de rota + R$/km + adicional de agrupamento |
| Gorjeta | Cliente | Entregador (100%) | iFood não retém nada |

**Interpretação Gerencial:** O iFood recebe do cliente uma taxa de frete de mercado livre (pode ser R$ 5 a R$ 15 dependendo da zona e horário), mas paga ao motoboy um valor calculado algoritmicamente com base na distância realizada + pisos mínimos regulatórios. O **spread retido** pelo iFood é a diferença entre essas duas variáveis, mais as taxas de serviço fixas. Em pico de demanda, quando o frete sobe por precificação dinâmica (surge), mas o custo marginal do entregador não acompanha proporcionalmente, **a margem logística da plataforma expande**.

#### Modelo DoorDash (EUA) — Decomposição de um Pedido de US$ 50

| Componente | Valor Estimado | Destinatário |
|:-----------|:---------------|:-------------|
| Subtotal do restaurante (após comissão 25%) | US$ 37,50 | Restaurante |
| Comissão DoorDash (25% do subtotal) | US$ 12,50 | DoorDash |
| Taxa de entrega (cliente) | US$ 3,99–US$ 7,99 | DoorDash |
| Taxa de serviço (~13%) | US$ 6,50 | DoorDash |
| Base pay do Dasher (estimado) | US$ 3,00–US$ 5,00 | Entregador |
| Gorjeta (méd. 15%) | US$ 7,50 | Entregador |
| **Receita Bruta DoorDash/pedido** | **~US$ 14–22** | — |
| **Custo DoorDash com o motorista** | **US$ 3–5 (sem gorjeta)** | — |

> 🔴 **Insight Crítico:** O cliente paga uma "taxa de entrega" de até US$ 7,99 que vai 100% para o DoorDash, mas o driver recebe apenas US$ 3–5 de base pay da plataforma. O restante (US$ 3–5 de spread puro) vai para o caixa da plataforma como "lucro logístico". A gorjeta, paga separadamente, é o mecanismo que mantém os motoristas engajados sem que a plataforma precise aumentar o base pay.

---

### 1.2 A Matemática da Arbitragem por Quilômetro

A arbitragem não é simplesmente "cobrar mais do que paga". É uma estrutura de precificação que maximiza a diferença entre **receita variável** (que escala com distância e demanda) e **custo marginal** (que iFood/DoorDash controlam via algoritmo).

**Fórmula de Arbitragem por KM:**

```
Spread por KM = (Frete Cobrado do Cliente / KM) - (Repasse ao Motoboy / KM)

Exemplo iFood (entrega de 3km):
  Frete cobrado: R$ 9,00 → R$ 3,00/km
  Repasse motoboy: R$ 5,50 → R$ 1,83/km
  Spread: R$ 1,17/km para a plataforma

Exemplo DoorDash (entrega de 3km ≈ 1,86mi):
  Delivery fee: US$ 5,99
  Base pay: US$ 3,50
  Spread: US$ 2,49 para a plataforma
```

**O que isso significa para o restaurante com frota própria:**
Se o restaurante cobra R$ 9,00 de frete do cliente e paga R$ 5,50 ao motoboy (custo justo), ele retém **R$ 3,50 de spread** — significativamente mais do que a plataforma por não pagar a camada de overhead tecnológico. O desafio é replicar a **eficiência de alocação** que garante que cada saída do motoboy seja economicamente viável.

---

## PARTE 2: ENGENHARIA DE AGRUPAMENTO (BATCHING) — A Máquina de Redução de Custo

### 2.1 Como o Algoritmo de Batching Funciona

O batching é o principal alavancador de rentabilidade logística dos marketplaces. A lógica central: **um motoboy fazendo 2 entregas na mesma rota custa quase o mesmo que fazer 1**, mas a plataforma cobra frete de **2 clientes diferentes**.

**Critérios que o Algoritmo Avalia (iFood/DoorDash):**

| Variável | Lógica do Algoritmo | Impacto no Agrupamento |
|:---------|:--------------------|:----------------------|
| Proximidade geográfica | Calcula desvio de rota para 2º destino | Se desvio < 15% da rota principal → agrupa |
| Tempo de preparo sincronizado | Ambos os pedidos devem estar prontos num janela de ~4 min | Evita espera excessiva do motoboy |
| Disponibilidade do entregador | Considera capacidade da bag e tipo de veículo | Moto: max 3 pedidos; carro: max 5 |
| Perfil de demanda local | Clusters de pedidos por horário e bairro | Em pico, agrupa mais agressivamente |
| Temperatura/urgência | Pedidos frios agrupam com mais flexibilidade | Açaí + pizza = improvável; açaí + sushi = possível |

**Economia gerada pelo batching (modelo de 2 pedidos agrupados):**

```
SEM batching (2 entregadores):
  Custo motoboy 1: R$ 8,00
  Custo motoboy 2: R$ 8,00
  Total: R$ 16,00
  Frete cobrado dos 2 clientes: R$ 18,00 (R$ 9 cada)
  Margem da plataforma: R$ 2,00

COM batching (1 entregador, 2 pedidos):
  Custo motoboy: R$ 11,00 (base + adicional de rota: R$ 3)
  Frete cobrado dos 2 clientes: R$ 18,00 (R$ 9 cada)
  Margem da plataforma: R$ 7,00
  
→ GANHO DE MARGEM: +R$ 5,00 por operação de batching bem-sucedida
→ EQUIVALENTE: 250% de incremento na margem logística
```

### 2.2 O Que o Restaurante Sinaliza para Forçar o Batching Favorável

A partir do conhecimento extraído das lives processadas pela base de conhecimento interna:

> *"Se você tem vários Pedidos Prontos concentrados no balcão, o algoritmo prioriza mostrar sua loja para casar a coleta de 3 ou 4 pedidos de uma vez por um único motoboy."*  
> — Fonte: `knowledge/videos/themes/logistica-operacional.md` [Dica 10]

**Playbook para Forçar o Batching a Seu Favor no iFood:**

1. **Sinalizar "Pedido Pronto" em lote** — Finalizar vários pedidos simultaneamente aumenta a probabilidade de batching
2. **Manter tempo de preparo realista e consistente** — Algoritimo testa sincronização; inconsistências bloqueiam agrupamento
3. **Segregação de raios** (Dica 9 da base de conhecimento): raio 0-2km para logística iFood, 3-4km para motoboy próprio
4. **Não "expulsar" motoboys da plataforma** — Manter densidade de entregadores próximos à loja garante que o algoritmo tenha com quem agrupar

---

## PARTE 3: SISTEMAS DE RECOMPENSA E GAMIFICAÇÃO — O Custo de Aquisição de Trabalho

### 3.1 Como os Marketplaces Usam Gamificação para Controlar Custo de Entregador

Os marketplaces transformaram a gestão de oferta de trabalho em um sistema de game design. O objetivo: manter o número máximo de entregadores disponíveis nos horários críticos sem pagar salários fixos.

**Mecanismos de Gamificação — iFood/DoorDash:**

| Mecanismo | Como Funciona | Efeito Econômico para a Plataforma |
|:----------|:--------------|:-----------------------------------|
| **Missões** | "Complete 15 entregas até domingo e ganhe R$ 40 bônus" | Dilui o bônus em 15 entregas; custo incremental por entrega = R$ 2,67 |
| **Peak Pay** | Bônus temporário de US$ 2–5/entrega durante pico | Sem pico, não há custo extra. Concentra oferta em horários críticos sem custo fixo |
| **Score/Avaliação** | Entregadores com score alto recebem pedidos primeiro | Incentiva qualidade sem custo adicional; "punição" automática por desempenho ruim |
| **Zonas quentes** | Mapa mostra onde haverá mais pedidos | Manipula posicionamento geográfico do entregador; reduz tempo de despacho sem custo |
| **Desafios de sequência** | "Complete 3 entregas em 2h e ganhe bônus" | Induz entregadores a aceitar pedidos subótimos para não "quebrar a sequência" |

**Estratégia Central dos Marketplaces:** O bônus de missão nunca é um custo puro — é um **investimento em disponibilidade**. Ao garantir 200 motoboys disponíveis às 19h de sexta-feira (via missões que exigem presença nesse horário), a plataforma evita o sistema travar e maximiza a receita do pico.

### 3.2 Como Aplicar Gamificação na Frota Própria

Um restaurante com 1–3 motoboys pode criar um sistema simples de incentivo que mimetiza essa lógica:

**Modelo de Incentivo Próprio (2-3 motoboys):**

```
REGRA BÁSICA:
  - Se o motoboy fizer X entregas nesta semana → bônus R$ Y (semanal)
  - X e Y calibrados para que o motoboy "puxe" mais entregas, não só cumpra o mínimo

EXEMPLO PRÁTICO:
  Meta base: 40 entregas/semana → Diária normal
  Faixa Prata: 55 entregas/semana → +R$ 30 de bônus
  Faixa Ouro: 70 entregas/semana → +R$ 70 de bônus
  
IMPACTO:
  Na faixa Ouro, cada entrega extra custa R$ 1,00 de incentivo.
  Mas cada entrega extra gera R$ 3,50–R$ 9,00 de frete líquido para o restaurante.
  ROI do incentivo: 250–800%
```

---

## PARTE 4: PRECIFICAÇÃO DINÂMICA — Transformar Adversidade em Lucro

### 4.1 Como os Marketplaces Precificam o Frete Dinamicamente

DoorDash e UberEats usam algoritmos que ajustam a taxa de entrega em tempo real com base em:

- **Demanda:** Número de pedidos ativos na área
- **Oferta de entregadores:** Quantos Dashers estão disponíveis (low supply = high surge)
- **Clima:** Chuva → demanda explode → frete sobe 40–120%
- **Horário:** Happy hour, jantar, fins de semana
- **Distância e densidade:** Zonas com menos entregadores disponíveis recebem taxas maiores
- **Elasticidade do usuário:** Usuários de DashPass pagam taxa zero → margem vem de outro lugar

**Resultado prático:** Um pedido que custa US$ 3,99 de frete numa terça ensolarada pode custar US$ 9,99 numa sexta chuvosa. A demanda pelo serviço aumenta EXATAMENTE quando ninguém quer sair de casa — e a plataforma capitaliza sobre isso.

### 4.2 Modelo de Frete Dinâmico para Restaurante Próprio

O restaurante pode aplicar os mesmos princípios sem precisar de um algoritmo de US$ 1 bilhão:

**Matriz de Precificação Dinâmica do Frete:**

| Condição | Frete Padrão | Ajuste | Frete Final | Justificativa para o Cliente |
|:---------|:-------------|:-------|:------------|:-----------------------------|
| Dia normal, horário comercial | R$ 6,00 | — | R$ 6,00 | Padrão de mercado |
| Horário de pico (12h–13h, 19h–20h) | R$ 6,00 | +R$ 2,00 | R$ 8,00 | "Alta demanda — entrega garantida" |
| Chuva intensa/tempestade | R$ 6,00 | +R$ 3,00–R$ 5,00 | R$ 9–11,00 | "Taxa de clima — motoboy em risco; entrega garantida" |
| Feriado/finais de semana especiais | R$ 6,00 | +R$ 2,00–R$ 3,00 | R$ 8–9,00 | "Taxa de feriado — operamos quando outros fecham" |
| Raio estendido (>4km) | R$ 6,00 | +R$ 1,50/km extra | Variável | "Entrega em área estendida" |
| Pedido pequeno (<R$ 30) | R$ 6,00 | +R$ 2,00 | R$ 8,00 | "Taxa de conveniência para pedido pequeno" |

> ⚠️ **Regra de Elasticidade:** O cliente aceita pagar mais pelo frete quando:
> 1. A justificativa é transparente e compreensível
> 2. A alternativa (sair em chuva) é pior
> 3. O frete ainda é competitivo vs. o marketplace (que também sobe no surge)
> A resistência a frete maior é menor do que os restaurantes acreditam — especialmente em clima adverso.

**Implantação Prática:**
- Criar 3 "perfis de frete" no sistema de pedidos: Normal / Pico / Clima
- Comunicar proativamente via WhatsApp/cardápio digital: "⛈️ Frete climático em vigor agora"
- Monitorar taxa de cancelamento: se subir >15% com frete alto, recalibrar

---

## PARTE 5: LOGÍSTICA PRÓPRIA COMO UNIDADE DE NEGÓCIO

### 5.1 A Frota Como "Mini Plataforma"

O maior salto mental que um restaurante com frota própria precisa dar é: **o motoboy não é um custo operacional — é um ativo gerador de receita**.

Um motoboy que faz 8 entregas/dia com frete médio de R$ 7,00 gera **R$ 56,00/dia de receita de frete**. Se o custo total do motoboy (diária + combustível + manutenção proporcional) é R$ 120/dia, e ele faz 20 entregas, a receita de frete cobre **93% do custo dele**. A comida entrega o resto.

**Modelo de Frota como Centro de Lucro:**

```
CENÁRIO: 1 motoboy, 5 horas de operação (11h–13h30 e 18h–20h30)

Entregas médias por turno: 3–4
Entregas no dia: 6–8
Frete médio cobrado: R$ 8,00
Receita bruta de frete/dia: R$ 48–64

Custo do motoboy (diária MEI ou PJ):
  Diária: R$ 80–100
  Combustível: R$ 20–25
  Total custo: R$ 100–125

MARGEM LOGÍSTICA:
  Receita de frete: R$ 56 (7 entregas × R$ 8)
  Custo total: R$ 112
  Cobertura de custo pelo frete: 50%
  Custo real do motoboy para o restaurante: R$ 56
  (O frete do cliente financia metade do motoboy)
```

### 5.2 O Modelo "Nunca Volta Vazio"

O maior inimigo da eficiência logística é o **retorno vazio**. Cada vez que o motoboy volta da entrega sem carregar outro pedido, o custo por entrega dobra.

**Estratégias para eliminar retorno vazio:**

1. **Modelo de Batching Manual**
   - Nunca despachar motoboy com 1 único pedido se há 2 pedidos prontos em destinos próximos
   - Regra: Aguardar no máximo **8 minutos** para acumular 2 pedidos antes de despachar

2. **Janela de Despacho Agendada**
   - Em vez de despachar cada pedido individualmente, criar "rodadas" de entrega: 12h15, 12h30, 12h45
   - Cada rodada agrupa pedidos finalizados num bloco, maximizando combinações de rota

3. **Aceitar Entregas para Parceiros Vizinhos** *(a "mini plataforma")*
   - Farmácias, padarias e outros estabelecimentos próximos frequentemente pagam por entrega avulsa
   - Taxa: R$ 10–15 por entrega para terceiros (sem desconto de comissão de marketplace)
   - Requisito: Acordos informais com 2–3 vizinhos; o motoboy passa pela rota natural e coleta

4. **Coleta de Retorno** *(modelo farmácia)*
   - Na entrega, se possível, o motoboy recolhe embalagens retornáveis ou insumos de fornecedor próximo
   - Elimina uma viagem autônoma futura; o custo do retorno útil é zero

### 5.3 Modelo de VRP Simplificado para o Restaurante

O Problema de Roteamento de Veículos (VRP) resolve: dado N endereços de entrega e 1 veículo, qual a sequência de rota com menor distância/tempo total?

**Solução Acessível para Restaurante Pequeno:**

**Nível 1 — Google Maps + Critério Manual (Gratuito)**
- Inserir todos os endereços do lote no Google Maps como "parada"
- O Maps otimiza automaticamente a sequência de rota
- Resultado: 15–25% de redução de km rodados vs. rota em ordem de chegada dos pedidos

**Nível 2 — Apps Especializados (R$ 0–200/mês)**

| Software | Foco | Custo Estimado | Diferencial |
|:---------|:-----|:---------------|:------------|
| **Saipos Delivery** | Restaurantes BR | R$ 0–150/mês | Integrado com PDV; módulo de roteirização nativo |
| **RoutEasy** | Logística BR | R$ 200–500/mês | Algoritmo VRP avançado; relatórios de performance |
| **Vuupt** | Last-mile BR | R$ 199/mês | Rastreamento, prova de entrega, dashboard |
| **Shipday** | SMBs global | USD 19–49/mês | Mais acessível; app motorista intuitivo |
| **Google Maps API** | Customizado | Paga por chamada | Para quem quer integrar no próprio sistema |

**Nível 3 — Regra Prática de Agrupamento para Usar Hoje (sem software)**
```
REGRA DAS ZONAS:
  Divida sua área de entrega em "setores" (Norte, Sul, Leste, Oeste do restaurante)
  
  Ao acumular pedidos:
  - Se 2 pedidos estão no mesmo setor → despacho junto SEMPRE
  - Se 2 pedidos estão em setores adjacentes → analisa desvio de rota (máx. 2km extra)
  - Se pedidos estão em setores opostos → despacho separado (custo < ineficiência)

TEMPO DE ECONOMIA ESTIMADO POR BATCHING:
  Entrega individual: 25 min round-trip
  Entrega agrupada (2 pedidos): 35 min round-trip
  
  Tempo ganho: 15 min (entrega 2 sem viagem de retorno extra)
  Entregas/hora sem batching: 2,4
  Entregas/hora com batching: 3,4 → +42% de capacidade de throughput
```

---

## PARTE 6: MATRIZ DE FERRAMENTAS E TECNOLOGIAS

### Tecnologias Acessíveis que Replicam Inteligência de Marketplace

| Categoria | Ferramenta | Custo Mensal | O Que Resolve | Equivalente Marketplace |
|:----------|:-----------|:-------------|:--------------|:------------------------|
| **Roteirização** | Saipos Delivery | R$ ~150 | Agrupamento de rotas + despacho | Algoritmo de batching |
| **Roteirização** | RoutEasy | R$ ~300 | VRP completo + rastreamento + dashboard | Logística iFood completa |
| **Rastreamento** | Vuupt | R$ ~200 | GPS em tempo real + prova de entrega | "Onde está meu pedido" do app |
| **Gestão de pedidos** | Shipday | USD 19 | Despacho automático + app motorista | Back-end de despacho |
| **Roteirização manual** | Google Maps (free) | R$ 0 | Sequência de rota otimizada | Roteamento básico |
| **CRM simples** | WhatsApp + planilha | R$ 0 | Histórico de clientes + fidelização | First-party data collection |
| **Cardápio online** | Goomer / iFood Shop | R$ 99–150 | Canal próprio sem comissão de marketplace | Frontend da plataforma |
| **Pagamentos** | Mercado Pago / PagSeguro | % do pedido | PIX, cartão, sem precisar do marketplace | Gateway de pagamentos |

---

## PARTE 7: PLANO DE MAXIMIZAÇÃO DE LUCRO — O FRETE COMO RECEITA

### Passo a Passo: De "Custo Necessário" a "Fonte de Receita"

#### 🔵 Fase 1 — Fundação (Semana 1–2): Medir para Gerenciar

**Ações:**
- [ ] Calcular o **Custo Real Por Entrega (CPE)** atual: (Custo motoboy/mês) ÷ (Entregas/mês)
- [ ] Mapear o **Frete Médio Cobrado** atualmente por entrega
- [ ] Calcular **Margem Logística** = Frete Cobrado - CPE
- [ ] Identificar os **5 endereços mais frequentes** (oportunidade de batching recorrente)

**Métrica de Baseline (exemplo):**
```
Custo motoboy: R$ 3.000/mês
Entregas/mês: 180
CPE: R$ 16,67
Frete médio cobrado: R$ 7,00
Margem logística: -R$ 9,67 (PREJUÍZO LOGÍSTICO)
```

#### 🟡 Fase 2 — Otimização (Semana 3–8): Aumentar Eficiência

**Ações:**
- [ ] **Implementar janelas de despacho** em vez de rodadas individuais (3–4 rodadas/turno)
- [ ] **Regra do batching manual**: nunca despachar pedido único se há 2 prontos
- [ ] **Ajustar frete** para cobrir 60–80% do CPE baseline → frete mínimo = R$ 10–R$ 13
- [ ] **Implementar frete dinâmico**: 3 "categorias" (normal / pico / clima)
- [ ] **Testar "rota de retorno carregado"**: coleta de insumos ou entrega para vizinho

**Nova Métrica Esperada:**
```
Entregas/mês: 230 (+28% pelo batching)
CPE: R$ 13,04 (mais entregas, mesmo custo fixo)
Frete médio ajustado: R$ 10,50
Margem logística: -R$ 2,54 (quase no break-even)
```

#### 🟢 Fase 3 — Monetização (Mês 3+): Frete Como Lucro

**Ações:**
- [ ] **Implementar software de roteirização** (Saipos ou Shipday) → reduz CPE em 15–25%
- [ ] **Expandir raio de entrega** para zonas de menor concorrência com frete premium
- [ ] **Aceitar 1–2 entregas/dia para parceiros vizinhos** (farmácia, padaria) a R$ 12–R$ 15
- [ ] **Criar programa "Entrega Garantida"**: frete +R$ 2 em troca de SLA de 35 min garantidos
- [ ] **Rastreamento ao cliente** via WhatsApp automático: "Seu pedido saiu! ETA: 22 minutos"

**Métrica Projetada — Fase 3:**
```
Entregas próprias/mês: 260
Entregas para parceiros/mês: 40 (R$ 12 cada = R$ 480 de receita nova)
CPE: R$ 10,50 (software + ganho de eficiência)
Frete médio cobrado: R$ 11,00
Margem logística: +R$ 0,50/entrega × 260 = +R$ 130/mês
Receita de parcerias logísticas: +R$ 480/mês
→ RESULTADO: Logística POSITIVA em R$ 610/mês (era prejuízo de R$ 1.740)
→ SWING TOTAL: +R$ 2.350/mês de impacto na linha operacional
```

---

## PARTE 8: ANÁLISE DE ELASTICIDADE E DIFERENCIAIS COMPETITIVOS

### 8.1 Até Onde o Cliente Aceita Pagar de Frete?

Com base em dados do mercado e comportamento do consumidor de food service no Brasil:

| Frete | Elasticidade | Observação |
|:------|:-------------|:-----------|
| R$ 0 (grátis) | Elástico | Conversão máxima; insustentável sem escala |
| R$ 5–R$ 7 | Pouco elástico | Zona de conforto; percebido como "justo" |
| R$ 8–R$ 10 | Moderadamente elástico | Aceitável se comunicado bem; igual ao marketplace |
| R$ 11–R$ 14 | Elástico | Precisa de justificativa clara (clima, distância, garantia) |
| R$ 15+ | Muito elástico | Perda de conversão significativa; usar só em casos extremos |

**Fator Determinante:** A elasticidade do frete cai (cliente aceita mais) quando:
- O pedido tem ticket alto (R$ 60+)
- O clima está ruim (chuva → demanda inelástica)
- O cliente é recorrente (já confianças estabelecida)
- A entrega tem rastreamento em tempo real
- O frete do marketplace está também subindo (surge pricing)

---

## PARTE 9: SÍNTESE EXECUTIVA — OS 7 PRINCÍPIOS DO MARKETPLACE TRANSPOSTOS

| Princípio do Marketplace | Versão para Restaurante Próprio | Impacto Estimado |
|:-------------------------|:--------------------------------|:-----------------|
| **1. Agrupamento (Batching)** | Janelas de despacho + regra do lote mínimo 2 pedidos | +28–42% de throughput do motoboy |
| **2. Spread de Frete** | Precificar frete para cobrir 80–110% do CPE | De prejuízo a breakeven/lucro logístico |
| **3. Precificação Dinâmica** | 3 perfis de frete: Normal / Pico / Clima | +R$ 200–500/mês de receita extra |
| **4. Gamificação de Entregadores** | Sistema de metas semanais com bônus por faixa | +15–20% de produtividade do motoboy |
| **5. Segregação de Raios** | Raio curto = logística da plataforma; raio longo = frota própria | Elimina custo logístico de entregas lentas |
| **6. Logística como negócio** | Aceitar entregas para parceiros vizinhos | +R$ 400–600/mês de receita nova |
| **7. Nuvem de Demanda** | Concentrar pedidos em turnos definidos; não operar disperso | Reduz custo fixo do motoboy em 20% |

---

## 🔴 ALERTAS E RISCOS

| Risco | Severidade | Mitigação |
|:------|:-----------|:----------|
| Frete alto faz cliente voltar para o marketplace | 🔴 Crítico | Manter frete ≤ frete do marketplace no mesmo raio |
| Batching atrasa entrada e derruba avaliação | 🟡 Atenção | SLA máximo de espera por lote: 8–10 min |
| Motoboy com custo fixo alto + baixa eficiência | 🔴 Crítico | Calcular CPE semanalmente; definir mínimo de entregas/dia |
| Precariedade legal de contratação de motoboy | 🟡 Atenção | Formalizar como MEI prestador de serviços; evitar vínculo |
| Entrega para parceiros compromete pontualidade | 🟡 Atenção | Entregas de parcerias só após pedidos do restaurante despachados |

---

## 📚 Fontes e Referências

1. iFood — Portal do Parceiro: Estrutura de Comissões e Repasse de Logística
2. iFood — Documentação de API: Eventos de Delivery Group (batching)
3. DoorDash — How Dasher Pay Works (doordash.com)
4. NerdWallet — DoorDash Fees Breakdown 2025
5. Saipos — Módulo de Roteirização para Delivery Brasil
6. RoutEasy — Plataforma de gestão de última milha (routeasy.com.br)
7. Vuupt — Software de logística e rastreamento
8. Shipday — Delivery Management Software
9. Pesquisa Web: iFood algoritmo batching agrupamento pedidos (2024–2025)
10. CFO Squad Knowledge Base: `knowledge/videos/themes/logistica-operacional.md` (Dicas 6–11)
11. CFO Squad Insights: `insights/Estratégias de Desintermediação no Food Service.md`
12. Pesquisa Web: DoorDash surge pricing driver pay breakdown 2025
13. Pesquisa Web: Software roteirização restaurante Brasil last-mile SaaS 2025

---

*Relatório gerado pelo Gerente Geral (Agente Estrategista) — Synkra AIOS CFO Squad*  
*Data de processamento: 2026-04-18*  
*Próxima revisão recomendada: após 90 dias de implementação das fases 1 e 2*
