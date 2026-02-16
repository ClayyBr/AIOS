# Fórmula Completa de Precificação para Restaurantes no Simples Nacional

## Sumário Executivo

A precificação é o momento em que o gestor transforma custo em lucro — ou em prejuízo, se feita incorretamente. No Brasil, o sistema tributário do Simples Nacional simplifica a apuração fiscal, mas introduz uma armadilha: como o imposto é uma alíquota única sobre a Receita Bruta, ele deve ser incorporado diretamente na fórmula de markup. Este documento fornece as fórmulas completas, com exemplos numéricos reais, para precificar tanto pratos executivos quanto o preço por quilo do buffet, considerando todos os custos envolvidos.

---

## 1. Entendendo a Estrutura de Custos de um Restaurante

Antes de calcular o preço de venda, é necessário entender onde cada real de faturamento vai. A estrutura típica de um restaurante brasileiro é:

### 1.1 Composição da Receita (Para Onde Vai Cada R$ 1,00 Faturado)

| Componente | % da Receita Bruta | Descrição |
|------------|-------------------|-----------|
| **CMV** (Custo Mercadoria Vendida) | 28% a 35% | Insumos alimentícios |
| **Mão de Obra** | 25% a 35% | Salários, encargos (CLT), freelancers |
| **Custos Fixos Operacionais** | 12% a 18% | Aluguel, energia, água, gás, manutenção |
| **Impostos (Simples Nacional)** | 6% a 19% | Depende da faixa de faturamento |
| **Despesas Administrativas** | 3% a 5% | Contabilidade, software, material escritório |
| **Marketing** | 2% a 5% | Redes sociais, iFood, promoções |
| **Lucro Líquido** | 8% a 15% | O que sobra para o dono |

**Regra de Ouro:** A soma de todos os percentuais DEVE ser igual a 100%. Se somar mais, há prejuízo. Se somar menos, há lucro.

### 1.2 Tabela de Alíquotas do Simples Nacional — Anexo I (Comércio/Restaurante)

O Simples Nacional para restaurantes geralmente se enquadra no **Anexo I** (comércio) ou em alguns casos no **Anexo III** (serviços), dependendo da interpretação fiscal. Consulte seu contador para confirmar.

**Anexo I — Alíquotas Efetivas por Faixa (2026):**

| Faixa | Receita Bruta 12 meses | Alíquota Nominal | Parcela a Deduzir | Alíquota Efetiva Aproximada |
|-------|----------------------|-----------------|-------------------|---------------------------|
| 1ª | Até R$ 180.000 | 4,00% | — | 4,00% |
| 2ª | De R$ 180.001 a R$ 360.000 | 7,30% | R$ 5.940,00 | ~5,65% |
| 3ª | De R$ 360.001 a R$ 720.000 | 9,50% | R$ 13.860,00 | ~7,57% |
| 4ª | De R$ 720.001 a R$ 1.800.000 | 10,70% | R$ 22.500,00 | ~9,45% |
| 5ª | De R$ 1.800.001 a R$ 3.600.000 | 14,30% | R$ 87.300,00 | ~11,87% |
| 6ª | De R$ 3.600.001 a R$ 4.800.000 | 19,00% | R$ 378.000,00 | ~14,93% |

**A fórmula da alíquota efetiva:**

$$Alíquota\ Efetiva = \frac{(RBT_{12} \times Alíquota\ Nominal) - Parcela\ Deduzir}{RBT_{12}}$$

Onde: $RBT_{12}$ = Receita Bruta Total dos últimos 12 meses.

**Para um restaurante novo (sem histórico):** Inicia na 1ª faixa (4,00%). O imposto é calculado sobre o faturamento acumulado.

---

## 2. A Fórmula Master de Precificação

### 2.1 Método do Markup Divisor (Recomendado)

Esta é a fórmula que garante que o preço de venda cubra todos os custos e gere o lucro desejado:

$$Preço\ de\ Venda = \frac{Custo\ do\ Prato}{1 - (\%CMV_{meta} + \%Impostos + \%Custos\ Fixos + \%MO + \%Despesas + \%Lucro)}$$

Ou, simplificando:

$$Preço\ de\ Venda = \frac{Custo\ do\ Prato}{Fator\ de\ Markup}$$

Onde:

$$Fator\ de\ Markup = 1 - Soma\ de\ todas\ as\ \%\ despesas\ sobre\ o\ faturamento$$

### 2.2 Exemplo Completo — Prato Executivo

**Dados do Restaurante:**

| Componente | % da Receita |
|-----------|-------------|
| CMV meta | 32% |
| Impostos (Simples, 1ª faixa) | 4% |
| Mão de Obra | 28% |
| Custos Fixos | 14% |
| Despesas Administrativas | 4% |
| Marketing | 3% |
| **Lucro Desejado** | **15%** |
| **TOTAL** | **100%** |

**Fator de Markup:**

$$Markup = 1 - (0,04 + 0,28 + 0,14 + 0,04 + 0,03 + 0,15) = 1 - 0,68 = 0,32$$

**Atenção:** O 0,32 restante é justamente o espaço para o CMV! Isso confirma que as contas estão consistentes (o CMV meta de 32% fecha com o fator de 0,32).

**Aplicando ao Filé Mignon ao Molho Madeira (custo R$ 26,65):**

$$Preço\ de\ Venda = \frac{R\$\ 26,65}{0,32} = R\$\ 83,28$$

**Arredondamento comercial:** R$ 84,90 ou R$ 89,90 (dependendo do posicionamento)

**Verificação reversa (prova real):**

| Componente | % | Valor (sobre R$ 84,90) |
|-----------|---|----------------------|
| CMV | 31,4% | R$ 26,65 |
| Impostos | 4,0% | R$ 3,40 |
| Mão de Obra | 28,0% | R$ 23,77 |
| Custos Fixos | 14,0% | R$ 11,89 |
| Despesas Admin | 4,0% | R$ 3,40 |
| Marketing | 3,0% | R$ 2,55 |
| **Lucro** | **16,6%** | **R$ 14,09** |
| **Total** | **100%** | **R$ 84,90** ✅ |

O lucro ficou em 16,6% (acima da meta de 15%) porque arredondamos para cima. Isso é normal e desejável.

### 2.3 Exemplo Completo — Prato Executivo Econômico

**Frango Grelhado com Arroz, Feijão e Salada (custo R$ 6,00):**

$$Preço\ de\ Venda = \frac{R\$\ 6,00}{0,32} = R\$\ 18,75$$

**Preço sugerido:** R$ 18,90 a R$ 21,90

---

## 3. Precificação do Buffet por Quilo

### 3.1 O Desafio: Preço Único para Custos Diferentes

No buffet por quilo, todos os itens são vendidos pelo **mesmo preço por kg**, mas têm custos drasticamente diferentes. O preço deve cobrir o **custo médio ponderado** do que o cliente serve, com margem de segurança.

### 3.2 Método de Precificação do Buffet

**Passo 1: Calcular o custo médio ponderado do buffet por kg produzido**

Usando a tabela completa de todas as preparações:

| Preparação | Custo/kg Produzido | % do Buffet (participação em peso) | Custo Ponderado |
|-----------|-------------------|-----------------------------------|----------------|
| Arroz branco | R$ 2,60 | 25% | R$ 0,65 |
| Feijão | R$ 4,68 | 12% | R$ 0,56 |
| Frango grelhado | R$ 30,12 | 10% | R$ 3,01 |
| Carne assada | R$ 52,40 | 7% | R$ 3,67 |
| Strogonoff | R$ 35,80 | 8% | R$ 2,86 |
| Salada mista | R$ 8,50 | 15% | R$ 1,28 |
| Legumes refogados | R$ 9,80 | 8% | R$ 0,78 |
| Macarrão | R$ 3,16 | 10% | R$ 0,32 |
| Farofa | R$ 11,40 | 5% | R$ 0,57 |
| **TOTAL** | — | **100%** | **R$ 13,70** |

**Passo 2: Aplicar o Fator de Markup**

$$Preço_{kg} = \frac{R\$\ 13,70}{0,32} = R\$\ 42,81$$

**Preço sugerido:** R$ 44,90/kg

**Passo 3: Adicionar Margem de Segurança para "Desvio de Mix"**

Como o cliente pode servir mais carne e menos arroz, adicione 5-10% de margem de segurança:

$$Preço_{seguro} = R\$\ 42,81 \times 1,08 = R\$\ 46,23$$

**Preço final sugerido:** R$ 46,90/kg ou R$ 49,90/kg (dependendo da região e concorrência)

### 3.3 Simulação de Cenários: O Que Acontece Quando o Mix Muda

| Cenário | Descrição | Custo Médio/kg | CMV (a R$ 46,90) | Situação |
|---------|-----------|---------------|-----------------|----------|
| **Ideal** | Cliente serve mix equilibrado | R$ 13,70 | 29,2% | ✅ Saudável |
| **Moderado** | Cliente serve +20% proteína | R$ 16,44 | 35,1% | ⚠️ Atenção |
| **Crítico** | Cliente serve +40% proteína | R$ 19,18 | 40,9% | 🚨 Perigo |
| **Catastrófico** | 60% do prato é carne | R$ 25,00+ | 53,3% | ❌ Prejuízo |

**Estratégia de defesa:** Layout do buffet com carboidratos no início e proteínas no final (ou com porcionamento assistido por funcionário).

---

## 4. A Fórmula do Markup Multiplicador (Alternativa)

Alguns gestores preferem usar o multiplicador ao invés do divisor:

$$Multiplicador = \frac{1}{\%CMV_{meta}}$$

Para CMV meta de 32%:

$$Multiplicador = \frac{1}{0,32} = 3,125$$

**Uso:** Custo × 3,125 = Preço de Venda

**PORÉM, CUIDADO:** Este método **só considera o CMV** como base e **não garante** que os outros custos (MO, fixo, impostos) estejam cobertos. Ele deve ser usado apenas como **estimativa rápida**, nunca como precificação definitiva. A fórmula do markup divisor (Seção 2) é a correta.

---

## 5. Precificação Dinâmica: Quando Reajustar

### 5.1 Gatilhos de Reajuste

| Gatilho | Ação |
|---------|------|
| IPCA de alimentos acumula > 3% no trimestre | Reavaliar preços de todos os pratos |
| Custo de um insumo-chave sobe > 10% | Reavaliar pratos que usam este insumo |
| CMV Real ultrapassa CMV meta por 2 meses seguidos | Reajustar preços OU trocar fornecedor |
| Mudança de faixa do Simples Nacional | Recalcular markup com nova alíquota |
| Sazonalidade (ex: Quaresma aumenta preço do peixe) | Ajustar cardápio, não preço (trocar proteína no executivo) |

### 5.2 Estratégias de Reajuste (Sem Perder Clientes)

| Estratégia | Como Funciona | Quando Usar |
|-----------|--------------|-------------|
| **Engenharia de porção** | Reduzir em 10-15g a porção de proteína/prato | Aumentos pontuais de 5-10% no custo |
| **Reajuste direto** | Aumentar preço declarado | Inflação generalizada, todos reajustando |
| **Substituição inteligente** | Trocar carne bovina por suína/frango no executivo | Preço da carne disparou |
| **Criação de novos pratos** | Lançar prato novo com preço correto, descontinuar prato defasado | Preço antigo está muito abaixo do ideal |
| **Ajuste de mix do buffet** | Mais opções de baixo custo, menos opções de alto custo | CMV do buffet subiu por mix pesado |

---

## 6. Precificação de Bebidas (Bônus)

Bebidas normalmente têm CMV muito mais baixo (15% a 25%) e compensam o CMV mais alto dos alimentos.

### 6.1 Markup Típico de Bebidas

| Categoria | CMV Médio | Multiplicador |
|-----------|----------|---------------|
| Refrigerantes (lata/garrafa) | 20-25% | 4x a 5x |
| Sucos naturais | 15-22% | 4,5x a 6x |
| Cerveja (long neck) | 25-30% | 3,3x a 4x |
| Água mineral | 12-18% | 5,5x a 8x |
| Café expresso | 8-12% | 8x a 12x |

### 6.2 Impacto no CMV Global

Se o restaurante fatura 30% em bebidas (CMV 20%) e 70% em alimentos (CMV 34%):

$$CMV\ Global = (0,70 \times 34\%) + (0,30 \times 20\%) = 23,8\% + 6,0\% = 29,8\%$$

**Insight:** As bebidas "puxam" o CMV global para baixo. Por isso, **nunca misture** CMV de alimentos e bebidas na análise. O CMV de alimentos isolado pode estar perigoso (34%), mas o global parece saudável (29,8%), mascarando o problema.

---

## 7. Planilha de Precificação — Modelo

Para cada prato do cardápio, monte a seguinte tabela:

| Campo | Valor |
|-------|-------|
| **Nome do Prato** | [Nome] |
| **Custo da Ficha Técnica** | R$ [X,XX] |
| **CMV Meta** | [XX]% |
| **Preço pelo CMV** | R$ [Custo ÷ %CMV] |
| **Preço de Mercado** (concorrência) | R$ [X,XX] |
| **Preço Final Definido** | R$ [X,XX] |
| **CMV Real do Preço Final** | [XX]% |
| **Status** | ✅ Dentro da meta / ⚠️ Marginal / 🚨 Abaixo |

---

## 8. Exercício Prático: Monte Seu Primeiro Cardápio

Use esta tabela como ponto de partida para precificar 5 pratos executivos:

| Prato | Custo Ficha | Markup (÷ 0,32) | Preço Sugerido | Preço Mercado | Decisão |
|-------|------------|-----------------|---------------|--------------|---------|
| Frango grelhado completo | R$ 6,00 | R$ 18,75 | R$ 21,90 | R$ 18-25 | ✅ Viável |
| Filé mignon completo | R$ 26,65 | R$ 83,28 | R$ 89,90 | R$ 75-95 | ✅ Viável |
| Strogonoff de carne | R$ 12,40 | R$ 38,75 | R$ 39,90 | R$ 32-45 | ✅ Viável |
| Peixe grelhado completo | R$ 18,50 | R$ 57,81 | R$ 59,90 | R$ 45-65 | ⚠️ Testar |
| Feijoada completa | R$ 8,90 | R$ 27,81 | R$ 29,90 | R$ 25-35 | ✅ Viável |

**Regra:** Se o preço calculado pelo markup for **maior** que o preço de mercado, você tem 3 opções:
1. Reduzir o custo da ficha (trocar insumo, reduzir porção)
2. Aceitar margem menor neste prato (e compensar em outros)
3. Não servir este prato (não vale a pena financeiramente)

Nunca venda abaixo do custo apenas para "ter o prato no cardápio".

---

## 9. Checklist de Precificação

- [ ] Defini minha estrutura de custos (% CMV, MO, fixos, impostos, lucro)?
- [ ] A soma de todos os percentuais = 100%?
- [ ] Sei em qual faixa do Simples Nacional me enquadro?
- [ ] Calculei o Fator de Markup?
- [ ] Cada prato tem ficha técnica com custo atualizado?
- [ ] O preço calculado foi comparado com o mercado/concorrência?
- [ ] Separei a análise de CMV de alimentos e bebidas?
- [ ] Defini gatilhos de quando reajustar o preço?
- [ ] O preço do buffet inclui margem de segurança para desvio de mix?
