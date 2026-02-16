# Guia de Planejamento Financeiro para Pré-Abertura de Restaurante

## Sumário Executivo

Abrir um restaurante sem dados históricos de vendas é como navegar sem GPS — você sabe o destino, mas não a rota exata. Este guia fornece as ferramentas para planejar financeiramente **antes de servir o primeiro cliente**: como estimar cardápio, definir estoque inicial, calcular ponto de equilíbrio, projetar faturamento e criar cenários de CMV simulados. Tudo baseado em benchmarks do mercado brasileiro de food service.

---

## 1. Estimativa de Demanda (Sem Histórico)

### 1.1 Método de Estimativa por Capacidade e Rotação

Quando não há dados de vendas, a projeção começa pela **capacidade física** do restaurante.

**Variáveis de entrada:**

| Variável | Como Descobrir | Exemplo |
|----------|---------------|---------|
| Lugares sentados | Contar mesas × cadeiras | 60 lugares |
| Dias de operação/mês | Decisão do gestor | 26 dias (seg-sáb) |
| Turnos de refeição | Almoço? Jantar? Ambos? | 1 turno (almoço) |
| Taxa de ocupação esperada | Benchmarks de mercado | 65% (média para novo) |
| Rotação de mesas | Quantos turnos de clientes por serviço | 1,5x (buffet rápido) |

**Cálculo:**

$$Clientes/dia = Lugares \times Ocupação \times Rotação$$

$$Clientes/dia = 60 \times 0,65 \times 1,5 = 58,5 \approx 59\ clientes/dia$$

$$Clientes/mês = 59 \times 26 = 1.534\ clientes/mês$$

### 1.2 Taxa de Ocupação por Fase de Maturação

Um restaurante novo **não atinge ocupação máxima no primeiro dia**. Use esta curva realista:

| Fase | Período | Ocupação Esperada | Clientes/Dia (60 lugares) |
|------|---------|-------------------|--------------------------|
| **Inauguração** | Semana 1-2 | 80-100% (curiosidade) | 72-90 |
| **Queda pós-inauguração** | Mês 1-2 | 40-50% | 36-45 |
| **Estabilização** | Mês 3-6 | 55-65% | 50-59 |
| **Maturidade** | Mês 7-12 | 65-80% | 59-72 |
| **Consolidação** | Ano 2+ | 70-85% | 63-77 |

**Regra de Ouro:** Planeje seu fluxo de caixa para sobreviver com **40-50% de ocupação** nos primeiros 2 meses. Se as contas só fecham com 80%, o negócio está subcapitalizado.

### 1.3 Ticket Médio Estimado

| Modelo | Ticket Médio Brasil (2026, estimativa) | Faixa |
|--------|---------------------------------------|-------|
| Buffet por quilo (popular) | R$ 25,00 - R$ 35,00 | Bairros residenciais |
| Buffet por quilo (executivo) | R$ 35,00 - R$ 55,00 | Regiões comerciais |
| Prato executivo (popular) | R$ 22,00 - R$ 32,00 | Classe C/D |
| Prato executivo (premium) | R$ 35,00 - R$ 55,00 | Classe B/C |
| À la carte (casual) | R$ 55,00 - R$ 90,00 | Classe A/B |

**O ticket médio inclui:** prato principal + bebida (nem todos compram) + sobremesa (minoria compra)

**Fórmula do ticket médio estimado:**

$$Ticket\ Médio = (Preço\ prato \times 1,0) + (Preço\ bebida \times 0,70) + (Preço\ sobremesa \times 0,15)$$

Os multiplicadores (1.0, 0.70, 0.15) representam a probabilidade de cada item ser comprado.

---

## 2. Projeção de Faturamento

### 2.1 Cenários de Faturamento Mensal

Usando o exemplo: 60 lugares, almoço, buffet por quilo, ticket médio R$ 38,00

| Cenário | Ocupação | Clientes/Dia | Clientes/Mês | Faturamento Mensal |
|---------|----------|-------------|-------------|-------------------|
| **Pessimista** | 40% | 36 | 936 | R$ 35.568 |
| **Conservador** | 55% | 50 | 1.287 | R$ 48.906 |
| **Realista** | 65% | 59 | 1.534 | R$ 58.292 |
| **Otimista** | 80% | 72 | 1.872 | R$ 71.136 |

### 2.2 Faturamento do Modelo Duplo (Buffet + Executivo)

Se o restaurante opera buffet no almoço e executivos à noite:

| Turno | Modelo | Ticket Médio | Clientes/Dia | Receita/Dia |
|-------|--------|-------------|-------------|-------------|
| Almoço | Buffet por quilo | R$ 38,00 | 59 | R$ 2.242 |
| Jantar | Pratos executivos | R$ 55,00 | 25 | R$ 1.375 |
| **Total** | — | — | **84** | **R$ 3.617** |

**Faturamento mensal estimado (26 dias):** R$ 94.042

---

## 3. Ponto de Equilíbrio (Break-Even)

### 3.1 O Que É

O ponto de equilíbrio é o faturamento mínimo mensal necessário para cobrir **todos os custos** sem lucro nem prejuízo. Abaixo dele, há prejuízo.

### 3.2 Cálculo

**Passo 1: Levantar Custos Fixos Mensais Totais**

| Custo Fixo | Valor Mensal |
|-----------|-------------|
| Aluguel | R$ 8.000 |
| Condomínio / IPTU | R$ 800 |
| Energia Elétrica | R$ 3.200 |
| Água | R$ 900 |
| Gás | R$ 1.800 |
| Salários + Encargos (8 funcionários) | R$ 26.680 |
| Pró-labore (2 sócios) | R$ 8.000 |
| VT + VA | R$ 2.400 |
| Internet + Telefone | R$ 350 |
| Contabilidade | R$ 800 |
| Sistemas | R$ 450 |
| Seguros | R$ 250 |
| Marketing mínimo | R$ 1.500 |
| Material de limpeza | R$ 600 |
| Manutenção | R$ 500 |
| Outros | R$ 500 |
| **TOTAL CUSTOS FIXOS** | **R$ 56.730** |

**Passo 2: Calcular Margem de Contribuição**

$$Margem\ de\ Contribuição\ \% = 1 - (\%CMV + \%Impostos + \%Taxas\ Cartão)$$

Usando:
- CMV: 32%
- Simples Nacional: 4% (1ª faixa)
- Taxas de cartão: 2,5%

$$MC\% = 1 - (0,32 + 0,04 + 0,025) = 0,615 = 61,5\%$$

**Passo 3: Calcular Ponto de Equilíbrio**

$$Ponto\ de\ Equilíbrio = \frac{Custos\ Fixos}{Margem\ de\ Contribuição\ \%}$$

$$PE = \frac{R\$\ 56.730}{0,615} = R\$\ 92.244$$

### 3.3 Interpretação

| Indicador | Valor |
|-----------|-------|
| **Faturamento mínimo para sobreviver** | **R$ 92.244/mês** |
| **Clientes mínimos/dia** (ticket R$ 38) | **93 clientes** |
| **Ocupação mínima** (60 lugares × 1,5 rotação) | **~103%** 🚨 |

**ALERTA:** Neste exemplo, o ponto de equilíbrio exige mais de 100% de ocupação no almoço! Isso indica que:

1. Os custos fixos estão muito altos para o faturamento projetado
2. O restaurante PRECISA do turno de jantar (executivos) para ser viável
3. Ou precisa reduzir custos fixos (renegociar aluguel, menos funcionários)

**Com o modelo duplo (buffet + executivo = R$ 94.042):**

$$\frac{R\$\ 94.042}{R\$\ 92.244} = 1,02$$

Margem apertadíssima — praticamente no ponto de equilíbrio, sem lucro. Necessário buscar otimizações.

---

## 4. Planejamento do Cardápio Inicial

### 4.1 Princípios para Definir o Cardápio Sem Dados

| Princípio | Justificativa |
|-----------|-------------|
| **Comece enxuto** | 5-7 opções de executivo, não 15. Menos SKUs = menos estoque parado |
| **80% custo baixo, 20% premium** | Garante mix de CMV controlado |
| **Cross-utilization obrigatória** | Cada insumo deve aparecer em pelo menos 2 pratos |
| **Sazonalidade** | Cardápio rotativo semanal usando ingredientes da época |
| **Flexibilidade de troca** | Poder substituir proteínas sem mudar o prato inteiro |

### 4.2 Cardápio Executivo Inicial Sugerido (5 Opções)

| Opção | Prato | Custo Estimado | Preço Venda | CMV |
|-------|-------|---------------|-------------|-----|
| 1 | Frango grelhado + arroz, feijão, salada | R$ 6,00 | R$ 21,90 | 27,4% |
| 2 | Strogonoff de carne + arroz, batata palha | R$ 12,40 | R$ 39,90 | 31,1% |
| 3 | Peixe grelhado + arroz, legumes | R$ 14,20 | R$ 44,90 | 31,6% |
| 4 | Bife acebolado + arroz, feijão, salada | R$ 9,80 | R$ 32,90 | 29,8% |
| 5 | Feijoada completa (quarta e sábado) | R$ 8,90 | R$ 29,90 | 29,8% |

**CMV médio ponderado (assumindo vendas iguais):** 29,9% ✅

### 4.3 Composição do Buffet por Quilo Sugerida

| Categoria | % do Buffet (peso) | Nº de Opções | CMV Médio da Categoria |
|-----------|-------------------|------------|----------------------|
| Arroz e massas | 25% | 2 (branco + integral) | R$ 3,50/kg |
| Feijão | 10% | 1-2 tipos | R$ 5,00/kg |
| Saladas | 15% | 4-5 tipos | R$ 9,00/kg |
| Legumes e guarnições | 15% | 3-4 tipos | R$ 10,00/kg |
| Proteína econômica (frango, suíno) | 20% | 2-3 tipos | R$ 25,00/kg |
| Proteína nobre (bovino, peixe) | 10% | 1-2 tipos | R$ 45,00/kg |
| Farofa e complementos | 5% | 2 tipos | R$ 12,00/kg |

---

## 5. Estoque Inicial (Par Stock)

### 5.1 Como Calcular o Estoque Inicial Sem Histórico

A regra para restaurante novo: **estoque para 3-5 dias de operação**. Não mais.

**Fórmula:**

$$Estoque\ Inicial = Consumo\ Diário\ Estimado \times Dias\ de\ Segurança$$

**Onde Consumo Diário Estimado vem da ficha técnica × número de clientes/dia:**

$$Consumo_{diário/insumo} = Peso\ por\ porção\ (PB) \times Clientes/dia$$

### 5.2 Exemplo de Par Stock para 60 Clientes/Dia

| Insumo | Consumo/Dia (kg) | Par Stock (5 dias) | Custo/kg | Investimento |
|--------|------------------|-------------------|---------|-------------|
| Arroz branco | 5,0 | 25,0 | R$ 6,50 | R$ 162,50 |
| Feijão carioca | 2,5 | 12,5 | R$ 8,90 | R$ 111,25 |
| Frango (sobrecoxa) | 6,0 | 30,0 | R$ 18,90 | R$ 567,00 |
| Carne bovina (alcatra) | 3,0 | 15,0 | R$ 52,90 | R$ 793,50 |
| Carne moída | 2,0 | 10,0 | R$ 34,90 | R$ 349,00 |
| Tomate | 3,0 | 15,0 | R$ 8,90 | R$ 133,50 |
| Cebola | 2,0 | 10,0 | R$ 7,90 | R$ 79,00 |
| Alface | 1,5 | 7,5 | R$ 6,50 | R$ 48,75 |
| Cenoura | 1,5 | 7,5 | R$ 5,90 | R$ 44,25 |
| Óleo de soja | 2,0L | 10,0L | R$ 9,90/L | R$ 99,00 |
| Azeite | 0,5L | 2,5L | R$ 45,00/L | R$ 112,50 |
| Sal | 0,5 | 2,5 | R$ 2,50 | R$ 6,25 |
| Temperos diversos | — | — | — | R$ 200,00 |
| Descartáveis (se delivery) | — | — | — | R$ 300,00 |
| Produtos de limpeza | — | — | — | R$ 200,00 |
| **TOTAL ESTOQUE INICIAL** | — | — | — | **~R$ 3.200** |

**Nota:** Este é um estoque mínimo. A primeira compra real pode chegar a R$ 5.000-8.000 incluindo itens de despensa (farinhas, conservas, condimentos) que duram mais.

### 5.3 Frequência de Compra Recomendada

| Categoria | Frequência | Motivo |
|-----------|-----------|--------|
| Hortifrúti | 3x/semana | Perecibilidade alta, preço varia |
| Proteínas (carne/frango) | 2-3x/semana | Perecível, alto valor |
| Peixes | Dia de uso ou véspera | Altamente perecível |
| Grãos e secos | 1x/semana a 1x/quinzena | Longa validade |
| Laticínios | 2x/semana | Perecível |
| Limpeza e descartáveis | 1x/mês | Não perecível |

---

## 6. Simulação de CMV para Cenários de Abertura

### 6.1 Cenário Mês 1: Fase de Teste

| Item | Projeção |
|------|---------|
| Clientes/dia | 40 (baixa ocupação) |
| Ticket médio | R$ 38,00 |
| Faturamento | R$ 39.520 |
| CMV meta (32%) | R$ 12.646 |
| CMV real esperado | R$ 14.228 (36%) ⚠️ |

**Por que o CMV do mês 1 será alto:**
- Desperdício de aprendizagem (equipe se ajustando a porções)
- Sobras altas (ainda não sabe o volume de produção ideal)
- Compras em excesso (sem dados para calibrar)
- Cortesias para inauguração

**Meta realista mês 1:** CMV de 36-40% é aceitável. Acima de 45% é alarmante.

### 6.2 Curva de Aprendizagem do CMV

| Mês | CMV Esperado | Ação Foco |
|-----|-------------|-----------|
| 1 | 36-40% | Registrar TUDO. Pesar sobras. Criar dados. |
| 2 | 33-37% | Ajustar volume de produção com base nos dados do mês 1 |
| 3 | 31-35% | Refinar fichas técnicas com rendimentos reais |
| 4-6 | 30-33% | Otimizar compras, negociar fornecedores |
| 7-12 | 28-32% | Meta estável. Foco em manter, não reduzir mais |

---

## 7. Capital de Giro Necessário

### 7.1 O Que É

Capital de giro é o dinheiro necessário para pagar as contas **enquanto o restaurante ainda não gera caixa suficiente**. É o combustível dos primeiros meses.

### 7.2 Fórmula de Capital de Giro Mínimo

$$Capital\ de\ Giro = Custos\ Fixos\ Mensais \times Meses\ de\ Operação\ Deficitária + Estoque\ Inicial$$

Assumindo que os primeiros 3 meses terão mais custos do que receita:

| Componente | Cálculo | Valor |
|-----------|---------|-------|
| Custos fixos × 3 meses | R$ 56.730 × 3 | R$ 170.190 |
| Estoque inicial | — | R$ 5.000 |
| Fundo de emergência (1 mês) | R$ 56.730 × 1 | R$ 56.730 |
| **Receita esperada nos 3 meses** | R$ 39.520 + R$ 48.906 + R$ 58.292 | **(R$ 146.718)** |
| **CAPITAL DE GIRO MÍNIMO** | Custos - Receitas + Estoque + Emergência | **~R$ 85.200** |

**Regra de Ouro do Mercado:** Ter reserva de **4-6 meses de custos fixos** como capital de giro. No exemplo: R$ 227.000 a R$ 340.000.

---

## 8. Cronograma Financeiro Pré-Abertura

| Semana | Ação Financeira |
|--------|----------------|
| **-8 semanas** | Definir cardápio e criar fichas técnicas de todos os pratos |
| **-6 semanas** | Cotar fornecedores (mínimo 3 por categoria), testar amostras |
| **-6 semanas** | Calcular precificação de todos os pratos |
| **-4 semanas** | Definir par stock e fazer lista de primeira compra |
| **-4 semanas** | Configurar sistema de gestão (Saipos ou similar) |
| **-3 semanas** | Testar todas as receitas, validar FC e FCc reais |
| **-2 semanas** | Simular DRE projetado para 3 cenários (pessimista/realista/otimista) |
| **-1 semana** | Primeira compra de estoque |
| **-1 semana** | Calibrar balanças (buffet e cozinha) |
| **-3 dias** | Soft opening (amigos/família) para calibrar produção |
| **Dia 1** | Inauguração com relatórios diários de vendas e sobras |
| **Dia 1-30** | Registrar TUDO para criar primeira base de dados |

---

## 9. Indicadores Para Acompanhar na Abertura

### 9.1 Dashboard Semanal do Primeiro Mês

| Indicador | Meta Semana 1 | Meta Semana 4 | Como Medir |
|-----------|--------------|--------------|-----------|
| Clientes/dia | 30-50 | 45-60 | PDV/caixa |
| Ticket médio | R$ 35-42 | R$ 36-40 (estável) | PDV |
| Sobra limpa/dia | < 15% da produção | < 8% | Pesagem |
| Resto ingesto/dia | < 10% dos pratos | < 5% | Pesagem lixo salão |
| Compras/semana | R$ 6.000-8.000 | R$ 5.000-6.500 | Notas fiscais |
| Cancelamentos | < 3/dia | < 1/dia | PDV |

### 9.2 Sinais de Alerta na Primeira Semana

| Sinal | Significado | Ação |
|-------|-----------|------|
| Muita sobra limpa (>20%) | Produzindo demais | Reduzir lotes, produção fracionada |
| Pouca sobra (< 3%) | Produzindo de menos | Risco de falta, aumentar lotes |
| Fila no caixa | Gargalo no atendimento | Adicionar operador |
| Reclamações de porção | Porcionamento inconsistente | Treinar equipe, usar utensílios padronizados |
| CMV diário > 45% | Desperdício ou erro de preço | Investigar imediatamente |

---

## 10. Checklist de Pré-Abertura Financeira

### Planejamento
- [ ] Cardápio definido com fichas técnicas completas
- [ ] Precificação calculada com fórmula de markup correta
- [ ] Ponto de equilíbrio calculado
- [ ] Capital de giro disponível (mínimo 4 meses de custos fixos)
- [ ] DRE projetado para 3 cenários

### Fornecedores
- [ ] Mínimo 3 cotações por categoria de insumo
- [ ] Testes de rendimento (FC) realizados por fornecedor
- [ ] Contratos ou acordos de preço para itens-chave
- [ ] Fornecedor de emergência identificado (caso o principal falhe)

### Operacional
- [ ] Sistema de gestão (PDV/ERP) configurado e testado
- [ ] Balanças calibradas (cozinha e salão, se buffet)
- [ ] Equipe treinada em fichas técnicas e porcionamento
- [ ] Planilha de controle de sobras e desperdício pronta
- [ ] Inventário inicial registrado com preços unitários

### Financeiro
- [ ] Conta bancária PJ separada da pessoal
- [ ] Fluxo de caixa projetado para 6 meses
- [ ] Regime tributário definido (Simples Nacional confirmado)
- [ ] Contador contratado e informado sobre o negócio
